"use client";

import { toast as reactToast, ToastOptions, ToastContent } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useToast = () => {
  const toast = (content: ToastContent, options?: ToastOptions) => {
    reactToast(content, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      ...options,
    });
  };

  return { toast };
};
