// import Register from '@/components/Account/Register/Register'
// import React from 'react'

// const page = () => {
//   return (
//     <Register />
//   )
// }

// export default page
// app/signup/page.tsx
"use client";
import RegisterWithOtp from "@/components/Account/Register/RegisterOTP";

export default function Page() {
  return <RegisterWithOtp />;
}
