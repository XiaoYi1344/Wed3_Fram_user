
// src/constant/type-res-api.ts

export interface RegisterFormValues {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  nameCompany: string;
  city: string;
  district: string;
  address: string;
  gender?: "Male" | "Female" | "Other";
  dateOfBirth?: string; // format: dd/MM/yyyy
}

export type RegisterPayload = Omit<RegisterFormValues, "confirmPassword">;

export type LoginPayload = {
  userName: string;
  password: string;
};

export interface LoginResponse {
  id: number;
  email: string;
  role: string;
  access_token: string;
}

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
export interface ConfirmPasswordPayload {
  email: string;
  otpCode: string;
  newPassword: string;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface UpdateProfilePayload {
  id: string; // 👈 thêm dòng này
  userName: string;
  email: string;
  phone: string;
  nameCompany: string;
  city: string;
  district: string;
  address: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}


export type Review = {
  rating: number;
  comment?: string;
  user?: string;
};

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  newPrice?: number;
  imageUrl: string[];
  origin: string;
  unit: string;
  quantity: number;
  isNew?: boolean;
  isInStock?: boolean;
  categoryId: number;
  reviews?: Review[];
  rating?: number;
  updatedAt: string;
}
//isNew nếu là san rphaamr mới thì là true còn lại false
//isInStock nếu còn thì true không thì false
//reviews lấy số lượng
//rating trung bình cộng
//newPrice hiện thị giá mới nếu chưa có thì false


export interface FlashSale {
  id: string;
  productId: string;
  flashPrice: number;
  startTime: string;
  endTime: string;
  quantityLimit: number;
  quantitySold: number;
  isActive: boolean;
  priority: number;
  bannerImage: string;
  createdAt: string;
  updatedAt: string;
  product?: Product;
}

export interface ProductSale {
  id: string;
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
  saleDay?: string;
  startTime?: string;
  endTime?: string;
}

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type WishlistItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
};

export type BuyerInfo = {
  name: string;
  email: string;
  city: string;
  postalCode: string;
  address: string;
  country: string;
};

export type OrderStatus = "pending" | "paid" | "failed";

export interface Order {
  buyerEmail: string;
  buyerPhone: string;
  cartItems: Product[];
  amount: number;
  amountInEth?: string;
  walletAddress?: string;
  paymentMethod: "card" | "crypto" | "cod";
  status?: OrderStatus;
}


export interface ProfileFormValues {
  userName: string;
  email: string;
  phone: string;
  address: string;
}

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
