import type { Metadata } from "next";
import CheckoutClientWrapper from "@/components/Checkout/CheckoutClientWrapper";

// Metadata config
export const metadata: Metadata = {
  title: "Thanh toán | Nông nghiệp thông minh",
  description:
    "Hoàn tất đơn hàng của bạn với các phương thức thanh toán như thẻ ngân hàng, ví crypto hoặc khi nhận hàng.",
  alternates: {
    canonical: "https://yourdomain.com/checkout",
  },
  openGraph: {
    url: "https://yourdomain.com/checkout",
    title: "Thanh toán | Nông nghiệp thông minh",
    description:
      "Trang thanh toán sản phẩm nông nghiệp thông minh - nhanh chóng, an toàn và linh hoạt.",
    images: [
      {
        url: "https://yourdomain.com/images/checkout-banner.jpg",
        alt: "Thanh toán đơn hàng",
      },
    ],
  },
};

export default function Checkout() {
  return <CheckoutClientWrapper />;
}
