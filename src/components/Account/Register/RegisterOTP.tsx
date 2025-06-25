"use client";

import React, { useState, useEffect } from "react";
import Register from "./Register";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type OtpParams = {
  userId: string;
  email: string;
  phone: string;
};

const RegisterWithOtp = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [otpParams, setOtpParams] = useState<OtpParams>({
    userId: "",
    email: "",
    phone: "",
  });

  const router = useRouter();

  const handleRegisterSuccess = ({ userId, email, phone }: OtpParams) => {
    setOtpParams({ userId, email, phone });
    setShowOtp(true);
  };

  // 👇 Điều hướng khi showOtp chuyển sang true
  useEffect(() => {
    if (showOtp) {
      const { email, phone, userId } = otpParams;
      router.push(`/verify-otp?email=${email}&phone=${phone}&userId=${userId}`);
    }
  }, [showOtp, otpParams, router]);

  return (
    <div
      style={{ overflow: "hidden", position: "relative", minHeight: "100vh" }}
    >
      <AnimatePresence initial={false}>
        {!showOtp && (
          <motion.div
            key="register"
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", width: "100%" }}
          >
            <Register onSuccess={handleRegisterSuccess} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterWithOtp;
