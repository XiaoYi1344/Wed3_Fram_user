import * as yup from "yup";
import { RegisterFormValues } from "@/constant/type-res-api";

export const schemaRegister: yup.ObjectSchema<RegisterFormValues> = yup.object({
  userName: yup.string().required("Username is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone must be digits only"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),

  confirmPassword: yup
  .string()
  .oneOf([yup.ref("password")], "Mật khẩu không khớp")
  .required("Vui lòng xác nhận mật khẩu"),

  nameCompany: yup.string().required("Company name is required"),

  city: yup.string().required("City is required"),

  district: yup.string().required("District is required"),

  address: yup.string().required("Address is required"),

  gender: yup
    .mixed<"Male" | "Female" | "Other">()
    .oneOf(["Male", "Female", "Other"])
    .optional(),

  dateOfBirth: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Định dạng ngày sinh không hợp lệ (dd/MM/yyyy)"
    )
    .optional(),
});

// ✅ Login schema
export const schemaLogin = yup.object({
  userName: yup
    .string()
    .required("Tên đăng nhập là bắt buộc")
    .min(3, "Tên đăng nhập quá ngắn"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const schemaOtp = yup.object({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP")
    .matches(/^\d{4,6}$/, "Mã OTP không hợp lệ"),
});
