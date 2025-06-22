"use client";

import React from "react";
import AnimatedDigitCounter from "./AnimatedDigitCounter";

interface AnimatedNumberRollingProps {
  number: number;
  duration?: number;
}

const padNumber = (num: number, length: number) => {
  return num.toString().padStart(length, "0");
};

const AnimatedNumberRolling: React.FC<AnimatedNumberRollingProps> = ({
  number,
  duration = 0.4,
}) => {
  const digits = padNumber(number, 2).split("").map(Number); // 2 chữ số: 00 → 99

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {digits.map((digit, idx) => (
        <AnimatedDigitCounter key={idx} value={digit} duration={duration} />
      ))}
    </div>
  );
};

export default AnimatedNumberRolling;
