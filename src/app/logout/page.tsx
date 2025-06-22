// app/logout/page.tsx (hoặc bất kỳ trang nào)

import LogoutButton from "@/components/Logout/Logout";


const LogoutPage = () => {
  const refreshToken = typeof window !== "undefined"
    ? localStorage.getItem("refreshToken") || ""
    : "";

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 shadow-lg bg-white rounded-lg">
      <h1 className="text-xl font-bold mb-4">Bạn có chắc chắn muốn đăng xuất?</h1>
      <LogoutButton refreshToken={refreshToken} />
    </div>
  );
};

export default LogoutPage;
