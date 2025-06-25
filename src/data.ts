// src/data.ts (hoặc @/data.ts nếu bạn dùng alias)
export interface Product {
  id: number;
  title: string;
  description?: string;
  image: string;

  // Giá & khuyến mãi
  oldPrice: number;
  newPrice: number;
  discount: number;

  // Kho & trạng thái
  stock: number;
  isOnSale: boolean;
  isInStock?: boolean;

  // Review & xếp hạng
  rating: number;
  reviews: number;

  // Flash sale liên kết (nếu có)
  saleDay?: string; // ví dụ: "2025-06-22"

  // Tùy chọn lựa chọn
  colours?: string[];
  sizes?: string[];

  // Danh mục
  categories: string[];
}

export const products: Product[] = [
  {
    id: 1,
    title: "Mango",
    description: "Sweet tropical mango, high in vitamins.",
    image: "/fruit/mango.png",
    oldPrice: 160,
    newPrice: 120,
    discount: 25,
    stock: 50,
    isOnSale: true,
    rating: 4.5,
    reviews: 88,
    saleDay: "2025-06-25",
    categories: ["fruit", "tropical"],
    colours: ["#FFA500", "#FFD700"],
    sizes: ["M", "L"],
  },
  {
    id: 2,
    title: "Strawberry",
    description: "Fresh and juicy strawberries for your dessert.",
    image: "/fruit/strawberry.png",
    oldPrice: 160,
    newPrice: 100,
    discount: 38,
    stock: 30,
    isOnSale: true,
    rating: 4.6,
    reviews: 75,
    saleDay: "2025-06-25",
    categories: ["fruit", "berry"],
    colours: ["#FF6384"],
    sizes: ["S", "M"],
  },
  {
    id: 3,
    title: "Banana",
    description: "A healthy snack, perfect for breakfast.",
    image: "/fruit/banana.png",
    oldPrice: 400,
    newPrice: 370,
    discount: 7,
    stock: 100,
    isOnSale: true,
    rating: 4.7,
    reviews: 99,
    saleDay: "2025-06-25",
    categories: ["fruit"],
    colours: ["#FFE135"],
    sizes: ["L"],
  },
  {
    id: 4,
    title: "Papaya",
    description: "Rich in fiber and digestive enzymes.",
    image: "/fruit/papaya.png",
    oldPrice: 400,
    newPrice: 375,
    discount: 6,
    stock: 20,
    isOnSale: true,
    rating: 4.2,
    reviews: 89,
    saleDay: "2025-06-25",
    categories: ["fruit", "tropical"],
    colours: ["#FFA07A"],
    sizes: ["M", "L"],
  },
  {
    id: 5,
    title: "Tomato",
    description: "Fresh tomatoes, great for salads and cooking.",
    image: "/fruit/tomato.png",
    oldPrice: 400,
    newPrice: 375,
    discount: 6,
    stock: 15,
    isOnSale: true,
    rating: 4.2,
    reviews: 89,
    saleDay: "2025-06-25",
    categories: ["vegetable", "fruit"],
    colours: ["#FF6347"],
    sizes: ["S", "M"],
  },
];

export interface FlashSale {
  id: number;
  productId: number;
  flashPrice: number;
  startTime: Date;
  endTime: Date;
  quantityLimit: number;
  quantitySold: number;
  isActive: boolean;
  priority: number;
  bannerImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export const flashSales: FlashSale[] = [
  {
    id: 1,
    productId: 1,
    flashPrice: 120,
    startTime: new Date("2025-06-25T08:00:00Z"),
    endTime: new Date("2025-06-25T10:00:00Z"),
    quantityLimit: 100,
    quantitySold: 20,
    isActive: true,
    priority: 1,
    bannerImage: "/fruit/mango.png",
    createdAt: new Date("2025-06-21T12:00:00Z"),
    updatedAt: new Date("2025-06-25T08:00:00Z"),
  },
  {
    id: 2,
    productId: 2,
    flashPrice: 100,
    startTime: new Date("2025-06-22T10:00:00Z"),
    endTime: new Date("2025-06-26T12:00:00Z"),
    quantityLimit: 80,
    quantitySold: 30,
    isActive: true,
    priority: 2,
    bannerImage: "/fruit/strawberry.png",
    createdAt: new Date("2025-06-21T13:00:00Z"),
    updatedAt: new Date("2025-06-25T09:00:00Z"),
  },
  {
    id: 3,
    productId: 3,
    flashPrice: 370,
    startTime: new Date("2025-06-22T12:00:00Z"),
    endTime: new Date("2025-06-25T14:00:00Z"),
    quantityLimit: 50,
    quantitySold: 45,
    isActive: true,
    priority: 3,
    bannerImage: "/fruit/banana.png",
    createdAt: new Date("2025-06-20T10:00:00Z"),
    updatedAt: new Date("2025-06-25T12:01:00Z"),
  },
  {
    id: 4,
    productId: 4,
    flashPrice: 375,
    startTime: new Date("2025-06-22T14:00:00Z"),
    endTime: new Date("2025-06-22T16:00:00Z"),
    quantityLimit: 70,
    quantitySold: 50,
    isActive: true,
    priority: 4,
    bannerImage: "/fruit/papaya.png",
    createdAt: new Date("2025-06-21T11:00:00Z"),
    updatedAt: new Date("2025-06-25T13:00:00Z"),
  },
  {
    id: 5,
    productId: 5,
    flashPrice: 375,
    startTime: new Date("2025-06-22T16:00:00Z"),
    endTime: new Date("2025-06-25T18:00:00Z"),
    quantityLimit: 60,
    quantitySold: 10,
    isActive: true,
    priority: 5,
    bannerImage: "/fruit/papaya.png",
    createdAt: new Date("2025-06-21T15:00:00Z"),
    updatedAt: new Date("2025-06-25T15:30:00Z"),
  },
  {
    id: 6,
    productId: 6,
    flashPrice: 375,
    startTime: new Date("2025-06-22T18:00:00Z"),
    endTime: new Date("2025-06-25T20:00:00Z"),
    quantityLimit: 90,
    quantitySold: 15,
    isActive: true,
    priority: 6,
    bannerImage: "/fruit/tomato.png",
    createdAt: new Date("2025-06-21T16:00:00Z"),
    updatedAt: new Date("2025-06-22T18:00:00Z"),
  },
  {
    id: 7,
    productId: 7,
    flashPrice: 375,
    startTime: new Date("2025-06-22T20:00:00Z"),
    endTime: new Date("2025-06-25T22:00:00Z"),
    quantityLimit: 40,
    quantitySold: 5,
    isActive: true,
    priority: 7,
    bannerImage: "/fruit/papaya.png",
    createdAt: new Date("2025-06-21T17:00:00Z"),
    updatedAt: new Date("2025-06-25T19:00:00Z"),
  },
  {
    id: 8,
    productId: 8,
    flashPrice: 375,
    startTime: new Date("2025-06-25T22:00:00Z"),
    endTime: new Date("2025-06-28T00:00:00Z"),
    quantityLimit: 100,
    quantitySold: 25,
    isActive: true,
    priority: 8,
    bannerImage: "/fruit/tomato.png",
    createdAt: new Date("2025-06-25T18:00:00Z"),
    updatedAt: new Date("2025-06-30T21:00:00Z"),
  }
];


// data.ts

export interface ProductSale {
  id: number;
  image: string;
  title: string;
  oldPrice: number;
  newPrice: number;
  rating: number;
  discount: number;
  reviews: number;
  description?: string;
  categories?: string[];
  stock?: number;
  isFeatured?: boolean;
  isOnSale?: boolean;
  saleDay?: string; // YYYY-MM-DD
}
// data.ts

export const productSales: ProductSale[] = [
  {
    id: 1,
    image: "fruit/mango.png",
    title: "Mango",
    oldPrice: 160,
    newPrice: 120,
    rating: 4.5,
    discount: 25,
    reviews: 88,
    stock: 50,
    isOnSale: true,
    saleDay: "2025-06-25",
    categories: ["fruit", "tropical"],
  },
  {
    id: 2,
    image: "fruit/strawberry.png",
    title: "Strawberry",
    oldPrice: 160,
    newPrice: 100,
    rating: 4.6,
    discount: 18,
    reviews: 75,
    stock: 30,
    isOnSale: true,
    saleDay: "2025-06-25",
    categories: ["fruit", "berry"],
  },
  {
    id: 3,
    image: "fruit/banana.png",
    title: "Banana",
    oldPrice: 400,
    newPrice: 370,
    rating: 4.7,
    discount: 20,
    reviews: 99,
    stock: 100,
    isOnSale: true,
    saleDay: "2025-06-26",
    categories: ["fruit"],
  },
  {
    id: 4,
    image: "fruit/papaya.png",
    title: "Papaya",
    oldPrice: 400,
    newPrice: 375,
    rating: 4.2,
    discount: 35,
    reviews: 89,
    stock: 20,
    isOnSale: true,
    saleDay: "2025-06-26",
    categories: ["fruit", "tropical"],
  },
  {
    id: 5,
    image: "fruit/tomato.png",
    title: "Tomato",
    oldPrice: 400,
    newPrice: 375,
    rating: 4.2,
    discount: 35,
    reviews: 89,
    stock: 15,
    isOnSale: true,
    saleDay: "2025-06-28",
    categories: ["vegetable", "fruit"],
  },
  // Thêm sản phẩm khác nếu cần
];
// data.ts

export interface SaleDay {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm:ss
  endTime: string;   // HH:mm:ss
  title?: string;    // Tuỳ chọn, ví dụ: "Summer Flash Sale"
  banner?: string;   // Ảnh banner nếu cần
}
// data.ts

export const saleDays: SaleDay[] = [
  {
    date: "2025-06-22",
    startTime: "08:00:00",
    endTime: "23:00:00",
    title: "June Mega Sale",
    banner: "/banners/sale-june20.png",
  },
  {
    date: "2025-06-27",
    startTime: "09:00:00",
    endTime: "20:00:00",
    title: "Weekend Fruit Frenzy",
    banner: "/banners/sale-june22.png",
  },
];

export interface FlashSaleWithProduct extends FlashSale {
  product: Product;
}

export interface WishlistItem {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
}

export const wishlistItems: WishlistItem[] = [
  {
    id: "1",
    title: "Gucci duffle bag",
    image: "gucci-bag.png",
    price: 960,
    oldPrice: 1160,
    discount: 30,
  },
  {
    id: "2",
    title: "RGB liquid CPU Cooler",
    image: "rgb-cooler.png",
    price: 1960,
  },
  {
    id: "3",
    title: "GP11 Shooter USB Gamepad",
    image: "gamepad.png",
    price: 550,
  },
  {
    id: "4",
    title: "Quilted Satin Jacket",
    image: "jacket.png",
    price: 750,
  },
];