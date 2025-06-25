import { products } from "@/data";
import ProductCarousel from "@/components/Products/ProductDetail/ProductCarousel";
import ProductInfo from "@/components/Products/ProductDetail/ProductInfo";

type Params = {
  params: {
    id: string;
  };
};

export default function ProductDetailPage({ params }: Params) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <ProductCarousel images={[product.image]} />
      <ProductInfo product={product} />
    </div>
  );
}
