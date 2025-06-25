import { products } from "@/data";
import ProductDetail from "@/components/Products/ProductDetail/ProductDetail";

const page = () => {
  const product = products[0]; // hoặc mock product

  return <ProductDetail product={product} />;
};

export default page;
