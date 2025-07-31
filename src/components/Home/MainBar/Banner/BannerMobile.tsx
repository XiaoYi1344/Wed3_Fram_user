"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const Menu = dynamic(() => import("lucide-react").then((mod) => mod.Menu), {
  ssr: false,
});

type Props = {
  showMobileSidebar: boolean;
  toggleMobileSidebar: () => void;
};

export default function BannerMobile({ showMobileSidebar, toggleMobileSidebar }: Props) {
  return (
    <div className="relative w-full h-[220px] sm:h-[280px] mt-2 sm:mt-4 ml-2 overflow-hidden rounded-xl">
      <Image
        src="/img/Group.webp"
        alt="Fresh everyday banner mobile"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {showMobileSidebar && (
        <button
          onClick={toggleMobileSidebar}
          className="absolute top-2 left-2 z-10 text-black"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <div className="absolute top-1/3 left-4 text-[#2e7d32] font-bold text-[30px] whitespace-pre-line leading-tight">
        {"Fresh\neveryday"}
      </div>

      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-white text-center text-[15px] whitespace-pre-line leading-tight">
        {"20%\nOFF"}
      </div>
    </div>
  );
}
