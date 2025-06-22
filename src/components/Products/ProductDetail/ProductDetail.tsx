import { Product } from "@/data";
import ProductCarousel from "./ProductCarousel";
import ProductInfo from "./ProductInfo";

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <ProductCarousel images={[product.image]} />
      <ProductInfo product={product} />
    </div>
  );
}
