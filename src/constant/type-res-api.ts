// src/constant/type-res-api.ts

export interface RegisterFormValues {
  fullName: string;
  userName: string;
  phone: string;
  yearOfBirth: number;
  password: string;
  confirmPassword: string;
}

export type RegisterPayload = Omit<RegisterFormValues, "confirmPassword">;

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  jwt?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface OtpResponse {
  success: boolean;
  message?: string;
  otp?: string;
}


export interface LogoutResponse {
  success: boolean;
  message?: string;
}
