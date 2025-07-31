import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamic import để tối ưu performance nếu Contact page không load thường xuyên
const Contact = dynamic(() => import("@/components/Contact/Contact"), {
  ssr: true, // hoặc false nếu bạn muốn tránh render phía server
});

export const metadata: Metadata = {
  title: "Liên hệ | Nông nghiệp thông minh",
  description: "Liên hệ với chúng tôi để được hỗ trợ nhanh chóng và tận tình.",
  alternates: {
    canonical: "https://yourdomain.com/contact",
  },
  openGraph: {
    title: "Liên hệ | Nông nghiệp thông minh",
    description: "Hỗ trợ nhanh chóng từ đội ngũ của chúng tôi.",
    url: "https://yourdomain.com/contact",
    siteName: "Nông nghiệp thông minh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nongnghiep",
  },
};

export default function ContactPage() {
  return <Contact />;
}
