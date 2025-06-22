import Image from "next/image";

type Props = {
  images: string[];
};

export default function ProductCarousel({ images }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={images[0]}
        alt="Main"
        className="w-full object-contain h-[300px] bg-gray-100 p-4 rounded-xl"
      />
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            className="w-16 h-16 object-contain bg-gray-100 p-2 rounded cursor-pointer hover:ring-2"
          />
        ))}
      </div>
    </div>
  );
}
