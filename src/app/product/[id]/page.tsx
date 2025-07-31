import { fetchProductById, fetchAllProductIds } from "@/services/axiosInstance";
import ProductDetail from "@/components/Home/Product/ProductDetail/ProductDetail";
import type { Metadata } from "next";

// ✅ Định nghĩa đúng kiểu PageProps theo yêu cầu build-time của Next.js
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

// ✅ Metadata cho SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductById(id);

  const title = `${product.name} | Nông nghiệp thông minh`;
  const description =
    product.description || `Mua ${product.name} chất lượng cao, xuất xứ từ ${product.origin}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://yourdomain.com/product/${id}`,
      images: product.imageUrl?.map((img) => ({
        url: img.startsWith("http")
          ? img
          : `http://192.168.1.66:3000/image/${img}`,
        alt: product.name,
      })) || [
        {
          url: "https://yourdomain.com/default-og.jpg",
          alt: product.name,
        },
      ],
    },
    keywords: [
      product.name,
      "nông sản",
      "sản phẩm nông nghiệp",
      product.origin || "",
    ],
  };
}

// ✅ Static Params (cho SSG hoặc ISR)
export async function generateStaticParams() {
  const productIds = await fetchAllProductIds();
  return productIds.map((p) => ({ id: String(p.id) }));
}

// ✅ ISR (Incremental Static Regeneration)
export const revalidate = 60;

// ✅ Component trang chi tiết sản phẩm
export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);
  return <ProductDetail product={product} />;
}
