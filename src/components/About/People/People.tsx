"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  //   CarouselNext,
  //   CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const items = [
  {
    image: "/img/person1.png",
    name: "John Doe",
    title: "CEO & Founder",
    description: "Passionate leader with 15 years of experience in tech.",
  },
  {
    image: "/img/person2.png",
    name: "Jane Smith",
    title: "CTO",
    description: "Expert in scalable architecture and cloud systems.",
  },
  {
    image: "/img/person3.png",
    name: "Alex Johnson",
    title: "Head of Marketing",
    description: "Driving brand growth through creative strategy.",
  },
  {
    image: "/img/person1.png",
    name: "Emily Davis",
    title: "Product Manager",
    description: "Building products that customers love.",
  },
  {
    image: "/img/person3.png",
    name: "Michael Lee",
    title: "UX Designer",
    description: "Crafting intuitive and delightful user experiences.",
  },
  {
    image: "/img/person2.png",
    name: "Michael Lee",
    title: "UX Designer",
    description: "Crafting intuitive and delightful user experiences.",
  },
  {
    image: "/img/person1.png",
    name: "Michael Lee",
    title: "UX Designer",
    description: "Crafting intuitive and delightful user experiences.",
  },
  {
    image: "/img/person1.png",
    name: "Michael Lee",
    title: "UX Designer",
    description: "Crafting intuitive and delightful user experiences.",
  },
];

const People = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-xs md:max-w-2xl lg:max-w-6xl py-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          slidesToScroll: 1, // 👈 chuyển 1 slide mỗi lần
        }}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Card className="overflow-hidden shadow-md">
                <CardContent className="p-0">
                  <div className="w-full h-[270px] bg-gray-100 -mt-6 flex justify-center items-start">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={200}
                      className="object-contain block"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="text-sm mt-2">{item.description}</p>
                    <div className="mt-3 flex justify-center gap-4 text-gray-600">
                      <a href="#">
                        <FaFacebookF className="hover:text-blue-600" />
                      </a>
                      <a href="#">
                        <FaTwitter className="hover:text-blue-400" />
                      </a>
                      <a href="#">
                        <FaLinkedinIn className="hover:text-blue-700" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <CarouselPrevious className="top-[calc(100%+0.5rem)] translate-y-0 left-0" />
        <CarouselNext className="top-[calc(100%+0.5rem)] translate-y-0 left-2 translate-x-full" /> */}
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-3.5 w-3.5 rounded-full border-2 transition-all duration-200",
              current === index + 1
                ? "border-gray-400 bg-[#ff8d2f] shadow-[inset_0_0_0_2px_white]"
                : "border-gray-400 bg-gray-400 hover:bg-gray-100"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default People;
