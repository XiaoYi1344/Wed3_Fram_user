"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

interface AnimatedDigitCounterProps {
  value: number;
  duration?: number;
}

const DIGIT_HEIGHT = 40; // Chiều cao mỗi số (đơn vị px)

const AnimatedDigitCounter: React.FC<AnimatedDigitCounterProps> = ({
  value,
  duration = 0.4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const [prevValue, setPrevValue] = useState(value);
  const [prevValue, setPrevValue] = useState(0);

  useEffect(() => {
  if (containerRef.current) {
    const startY = -prevValue * DIGIT_HEIGHT;
    const endY = -value * DIGIT_HEIGHT;

    animate(startY, endY, {
      duration,
      onUpdate: (latest) => {
        if (containerRef.current) {
          containerRef.current.style.transform = `translateY(${latest}px)`;
        }
      },
    });

    setPrevValue(value);
  }
}, [value, duration, prevValue]); // ✅ thêm prevValue

  return (
    <div
      style={{
        overflow: "hidden",
        height: DIGIT_HEIGHT,
        width: 24,
        display: "inline-block",
      }}
    >
      <div ref={containerRef}>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              height: DIGIT_HEIGHT,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedDigitCounter;
