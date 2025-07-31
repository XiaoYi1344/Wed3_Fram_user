import { get, put, post } from "./axiosInstance";
import {
  UpdateProfilePayload,
  ChangePasswordPayload,
  
} from "@/constant/type-res-api";

export const getUserById = async (id: string) =>
  get<{
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  }>(`/api/user/${id}`);

export const putUpdateProfile = async (data: UpdateProfilePayload) =>
  put<null, UpdateProfilePayload>("/api/profile", data);

export const postChangePassword = async (data: ChangePasswordPayload) =>
  post<null, ChangePasswordPayload>("/api/change-password", data);


