// app/logout/page.tsx

import LogoutHandler from "@/components/Logout/Logout";

export const metadata = {
  title: "Phiên làm việc kết thúc - Đăng xuất | MyApp",
  description:
    "Bạn đã được đăng xuất do hết thời gian hoạt động. Vui lòng đăng nhập lại để tiếp tục.",
  robots: "index, follow",
  openGraph: {
    title: "Đăng xuất | MyApp",
    description: "Bạn đã đăng xuất thành công khỏi hệ thống MyApp.",
    url: "https://myapp.com/logout",
  },
};

export default function LogoutPage() {
  return <LogoutHandler />;
}
