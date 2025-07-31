// mock/fakeFlashSales.ts
import { fetchAllProducts } from "@/services/axiosInstance";
import { FlashSale, Product } from "@/constant/type-res-api";

export const fetchFakeFlashSales = async (): Promise<(FlashSale & { product: Product })[]> => {
  const products = await fetchAllProducts();
  const now = new Date();
  const hourLater = new Date(now.getTime() + 60 * 60 * 1000);

  return products.slice(0, 5).map((p, i) => ({
    id: `mock-${p.id}`,
    productId: p.id,
    flashPrice: Math.floor(p.price * 0.85),
    startTime: now.toISOString(),
    endTime: hourLater.toISOString(),
    quantityLimit: 50,
    quantitySold: 0,
    isActive: true,
    priority: i,
    bannerImage: p.imageUrl[0],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    product: p,
  }));
};
