import ProductListPage from "@/components/Home/Product/Product/CardListWithFilter";
import { fetchCategories } from "@/services/axiosInstance";
// import { Category } from "@/constant/type-res-api";
import { Suspense } from "react";

// ✅ Metadata for SEO
export const metadata = {
  title: "Tất cả sản phẩm | My Shop",
  description: "Khám phá danh sách sản phẩm từ My Shop.",
  openGraph: {
    title: "Tất cả sản phẩm | My Shop",
    description: "Khám phá sản phẩm chất lượng với giá tốt.",
  },
};

export default async function ProductPage() {
  const categories = await fetchCategories();

  return (
    <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
      <ProductListPage categories={categories} />
    </Suspense>
  );
}