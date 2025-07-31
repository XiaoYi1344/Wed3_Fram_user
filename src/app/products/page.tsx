// app/products/page.tsx
import ClientProductPage from "./ClientProductPage";

export const metadata = {
  title: "Sản phẩm | Nông nghiệp thông minh",
  description: "Xem danh sách các sản phẩm nông nghiệp chất lượng cao.",
  alternates: {
    canonical: "https://yourdomain.com/products",
  },
};

export default function ProductPage() {
  return <ClientProductPage />;
}
