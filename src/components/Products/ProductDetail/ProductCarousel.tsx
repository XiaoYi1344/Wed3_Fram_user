import { Stack } from "@mui/material";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function ProductCarousel({ images }: Props) {
  return (
    <Stack mt={20}>
      <div className="flex flex-col gap-4">
      <Image
        src={images[0]}
        alt="Main"
        width={100} // ✅ bắt buộc
          height={300} // ✅ bắt buộc
        className="w-full object-contain h-[300px] bg-gray-100 p-4 rounded-xl"
      />
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            width={16} // ✅ bắt buộc
          height={16} // ✅ bắt buộc
            className="w-16 h-16 object-contain bg-gray-100 p-2 rounded cursor-pointer hover:ring-2"
          />
        ))}
      </div>
    </div>
    </Stack>
  );
}
