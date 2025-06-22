// components/WaterDropButton.tsx

import React from "react";

export default function WaterDropButton() {
  return (
    <div className="relative w-40 h-40">
      {/* SVG hình giọt nước */}
      <svg
        viewBox="0 0 25e00 200"
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60,160 Q10,100 50,50 Q90,10 150,60 Q190,110 140,160 Q100,200 60,160 Z"
          fill="#ffffff"
        />
      </svg>

      {/* Nút tròn bên trong vùng giọt nước */}
      <div className="absolute bottom-6 right-6 z-10">
        <button className="w-10 h-10 rounded-full bg-yellow-400 shadow flex items-center justify-center border border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 L17 7 M17 7 H10 M17 7 V14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
