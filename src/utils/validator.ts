import * as yup from "yup";
import { RegisterFormValues } from "@/constant/type-res-api";

export const schemaRegister: yup.ObjectSchema<RegisterFormValues> = yup.object({
  fullName: yup.string().required("Full name is required"),
  userName: yup.string().required("Username is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone must be digits only"),
  yearOfBirth: yup
    .number()
    .typeError("Year must be a number")
    .min(1900, "Year too early")
    .max(new Date().getFullYear(), "Year is invalid")
    .required("Year is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

// ✅ Login schema
export const schemaLogin = yup.object({
  identifier: yup
    .string()
    .required("Vui lòng nhập email hoặc số điện thoại")
    .test(
      "is-valid-identifier",
      "Email hoặc số điện thoại không hợp lệ",
      (value = "") => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
        const isPhone = /^(0|\+84)\d{9}$/.test(value.trim());
        return isEmail || isPhone;
      }
    ),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export const schemaOtp = yup.object({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP")
    .matches(/^\d{4,6}$/, "Mã OTP không hợp lệ"),
});
