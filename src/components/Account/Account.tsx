"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  getUserById,
  putUpdateProfile,
  postChangePassword,
} from "@/services/userService";
import { useForm, Controller, useFormState } from "react-hook-form";
import { PasswordFormValues, ProfileFormValues } from "@/constant/type-res-api";

type FormValues = ProfileFormValues & PasswordFormValues;

const Account = () => {
  const queryClient = useQueryClient();
  const userId = useMemo(() => Cookies.get("user_id"), []);

  const cachedUser = queryClient.getQueryData(["user", userId]) as
    | Awaited<ReturnType<typeof getUserById>>
    | undefined;
  const { control, handleSubmit, setValue, reset, watch } = useForm<FormValues>(
    {
      defaultValues: {
        userName: "",
        email: "",
        phone: "",
        address: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    }
  );

  const { errors } = useFormState<FormValues>({ control });

  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    ...(cachedUser ? { initialData: cachedUser } : {}),
  });

  useEffect(() => {
    if (data) {
      setValue("userName", data.name || "");
      setValue("email", data.email || "");
      setValue("phone", data.phone || "");
      setValue("address", data.address || "");
    }
  }, [data, setValue]);

  const updateProfileMutation = useMutation({
    mutationFn: putUpdateProfile,
    onSuccess: () => {
      alert("✅ Cập nhật hồ sơ thành công!");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
    onError: () => {
      alert("❌ Cập nhật thất bại.");
    },
  });

  const handleProfileSubmit = (values: ProfileFormValues) => {
    if (!userId) return alert("Không tìm thấy ID người dùng.");
    updateProfileMutation.mutate({
      id: userId,
      userName: values.userName,
      email: values.email,
      phone: values.phone,
      nameCompany: "",
      city: "",
      district: "",
      address: values.address,
    });
  };

  const changePasswordMutation = useMutation({
  mutationFn: postChangePassword,
  onSuccess: () => {
    alert("🔐 Đổi mật khẩu thành công!");
    reset({
      ...watch(),
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  },
  onError: () => {
    alert("⚠️ Đổi mật khẩu thất bại.");
  },
});


  const handleChangePassword = (values: PasswordFormValues) => {
  if (values.newPassword !== values.confirmPassword) {
    alert("❗ Mật khẩu xác nhận không khớp.");
    return;
  }

  changePasswordMutation.mutate({
    oldPassword: values.currentPassword,
    newPassword: values.newPassword,
  });
};


  const profileFields: {
    name: keyof ProfileFormValues;
    label: string;
    type?: string;
  }[] = [
    { name: "userName", label: "Họ tên" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Số điện thoại" },
    { name: "address", label: "Địa chỉ" },
  ];

  const passwordFields: {
    name: keyof PasswordFormValues;
    placeholder: string;
  }[] = [
    { name: "currentPassword", placeholder: "Mật khẩu hiện tại" },
    { name: "newPassword", placeholder: "Mật khẩu mới" },
    { name: "confirmPassword", placeholder: "Xác nhận mật khẩu mới" },
  ];

  if (isLoading) {
    return (
      <Box py={10}>
        <Container>
          <Typography>Đang tải thông tin người dùng...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box bgcolor="#fff" minHeight="100vh" py={10} pt={30}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <Typography color="text.primary">Tài khoản</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3}}>
            <Typography fontWeight={600} mb={2}>
              Quản lý tài khoản
            </Typography>
            <List dense>
              <ListSubheader disableSticky>Thông tin</ListSubheader>
              <ListItemButton selected>
                <ListItemText primary="Hồ sơ của tôi" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Sổ địa chỉ" />
              </ListItemButton>
            </List>
          </Grid>

          <Grid size={{ xs: 12, md: 9}}>
            <Box
              component="form"
              onSubmit={handleSubmit(handleProfileSubmit)}
              p={4}
              borderRadius={2}
              boxShadow={1}
              bgcolor="#fafafa"
            >
              <Typography variant="h6" fontWeight={600} color="#ff8d2f" mb={3}>
                Cập nhật hồ sơ
              </Typography>

              <Grid container spacing={2}>
                {profileFields.map(({ name, label, type = "text" }) => (
                  <Grid size={{ xs: 12, md: 6}} key={name}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: `${label} không được để trống` }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={label}
                          type={type}
                          error={!!errors[name]}
                          helperText={errors[name]?.message?.toString()}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined">Hủy</Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={updateProfileMutation.isPending}
                  sx={{ backgroundColor: "#ff8d2f", color: "#fff" }}
                >
                  {updateProfileMutation.isPending
                    ? "Đang lưu..."
                    : "Lưu thay đổi"}
                </Button>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Typography fontWeight={600} mb={2}>
                Đổi mật khẩu
              </Typography>

              <Box component="form" onSubmit={handleSubmit(handleChangePassword)}>
  <Stack spacing={2}>
    {passwordFields.map(({ name, placeholder }) => (
      <Controller
        key={name}
        name={name}
        control={control}
        rules={{
          required: `${placeholder} không được để trống`,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            placeholder={placeholder}
            type="password"
            error={!!errors[name]}
            helperText={errors[name]?.message?.toString()}
          />
        )}
      />
    ))}
  </Stack>

  <Box mt={3} display="flex" justifyContent="flex-end">
    <Button
      type="submit"
      variant="contained"
      sx={{ backgroundColor: "#1976d2", color: "#fff" }}
      disabled={
        changePasswordMutation.isPending ||
        !watch("currentPassword") ||
        !watch("newPassword") ||
        !watch("confirmPassword")
      }
    >
      {changePasswordMutation.isPending
        ? "Đang đổi mật khẩu..."
        : "Đổi mật khẩu"}
    </Button>
  </Box>
</Box>

            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Account;
