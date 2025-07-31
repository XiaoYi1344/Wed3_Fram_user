// import { Product } from "@/constant/type-res-api";
// import { Rating, Stack } from "@mui/material";

// type Props = {
//   product: Product;
// };

// export default function ProductInfo({ product }: Props) {
//   return (
//     <Stack my={20}>
//       <div className="flex flex-col gap-4">
//         <h1 className="text-2xl font-semibold">{product.name}</h1>

//         <div className="flex items-center gap-2">
//           <Rating
//             value={product.rating || 0}
//             readOnly
//             precision={0.5}
//             size="small"
//           />
//           <span className="text-sm text-gray-600">
//             ({product.reviews?.length ?? 0} Reviews)
//           </span>
//           {product.isInStock && (
//             <span className="text-green-500 font-semibold ml-2">In Stock</span>
//           )}
//         </div>

//         {/* Ẩn giá nếu không có */}
//         {/* <div className="text-2xl font-bold text-orange-600">${product.newPrice}</div>
//         <p className="text-sm text-gray-500 line-through">${product.oldPrice}</p> */}

//         <p className="text-gray-700">{product.description}</p>

//         {/* <div className="flex gap-2">
//           {product.colours?.map((c, i) => (
//             <div
//               key={i}
//               className="w-6 h-6 rounded-full border"
//               style={{ backgroundColor: c }}
//             />
//           ))}
//         </div> */}

//         {/* <div className="flex gap-2">
//           {product.sizes?.map((s) => (
//             <button key={s} className="border rounded px-3 py-1 hover:bg-orange-100">
//               {s}
//             </button>
//           ))}
//         </div> */}

//         <div className="flex items-center gap-2">
//           <button className="border px-2">-</button>
//           <span>1</span>
//           <button className="border px-2">+</button>
//           <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
//             Buy Now
//           </button>
//         </div>

//         <div className="border-t pt-4 mt-4 text-sm text-gray-600">
//           <p>🚚 Free Delivery (check with your postal code)</p>
//           <p>🔁 Return in 30 days</p>
//         </div>
//       </div>
//     </Stack>
//   );
// }
