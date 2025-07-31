// services/uploadImage.ts
import api from "./axiosInstance";

export const uploadImages = async (
  images: File[],
  moduleId: string,
  module = "product",
) => {
  const formData = new FormData();
  images.forEach((file) => formData.append("imageUrl", file));
  formData.append("moduleId", moduleId);
  formData.append("module", module);

  const response = await api.post("/api/image/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const deleteImage = async (fileName: string) => {
  const res = await api.delete(`/api/image/delete/${fileName}`);
  return res.data;
};
