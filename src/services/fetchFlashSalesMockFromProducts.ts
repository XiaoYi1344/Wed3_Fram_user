import { fetchAllProducts } from "./axiosInstance"; // thay bằng đường dẫn đúng
import { FlashSale, Product } from "@/constant/type-res-api";

export const fetchFlashSales = async (): Promise<(FlashSale & { product: Product })[]> => {
  const allProducts = await fetchAllProducts();

  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 1000 * 60 * 60);

  const mockFlashSales: (FlashSale & { product: Product })[] = allProducts.slice(0, 5).map((product, index) => {
    const discountPercent = 10 + index * 5; // Giảm giá tăng dần 10%, 15%,...
    const flashPrice = Math.floor(product.price * (1 - discountPercent / 100));

    return {
      id: `mock-${product.id}`,
      productId: product.id,
      flashPrice,
      startTime: now.toISOString(),
      endTime: oneHourLater.toISOString(),
      quantityLimit: 100,
      quantitySold: 0,
      isActive: true,
      priority: index,
      bannerImage: product.imageUrl?.[0] || "/image/no-image.jpg",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      product,
    };
  });

  console.warn("⚠️ Đang dùng mock flash sales từ sản phẩm thực!");
  return mockFlashSales;
};
