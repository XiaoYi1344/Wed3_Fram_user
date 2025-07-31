"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { postChangePassword } from "@/services/axiosInstance";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type FormData = {
  oldPassword: string;
  newPassword: string;
};

const ChangePasswordForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await postChangePassword(data);
      toast.success("✅ Đổi mật khẩu thành công!");
      reset();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message ||
        "❌ Đổi mật khẩu thất bại. Vui lòng thử lại.";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          {...register("oldPassword", { required: true })}
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          {...register("newPassword", { required: true })}
          className="w-full border rounded px-4 py-2"
        />
        <Button type="submit" className="w-full bg-green-600 text-white">
          Xác nhận đổi mật khẩu
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
