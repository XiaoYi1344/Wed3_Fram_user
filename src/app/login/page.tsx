import type { Metadata } from "next";
import Login from "@/components/Account/Login/Login";
import QueryProvider from "@/services/QueryProvider";

export const metadata: Metadata = {
  title: "Đăng nhập | Nông nghiệp thông minh",
  description:
    "Đăng nhập vào hệ thống để sử dụng các tính năng quản lý nông nghiệp thông minh.",
  alternates: {
    canonical: "https://yourdomain.com/login",
  },
};

export default function Page() {
  return (
    <QueryProvider>
      <Login />
    </QueryProvider>
  );
}
