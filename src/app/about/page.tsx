import About from "@/components/About/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu | Nông nghiệp thông minh",
  description:
    "Tìm hiểu thêm về sứ mệnh và tầm nhìn của chúng tôi trong ngành nông nghiệp hiện đại.",
  alternates: {
    canonical: "https://yourdomain.com/about",
  },
};

export default function AboutPage() {
  return <About />;
}
