"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import AnimatedNumberRolling from "../../AnimatedNumberRolling";

export interface SaleDay {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm:ss
  endTime: string;   // HH:mm:ss
  title?: string;
}

const getCountdown = (target: Date | null) => {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = target.getTime() - new Date().getTime();
  const clamp = (v: number) => (v > 0 ? v : 0);

  return {
    days: clamp(Math.floor(diff / 86400000)),
    hours: clamp(Math.floor((diff % 86400000) / 3600000)),
    minutes: clamp(Math.floor((diff % 3600000) / 60000)),
    seconds: clamp(Math.floor((diff % 60000) / 1000)),
  };
};

export default function SmartCountdownSale({ saleDays }: { saleDays: SaleDay[] }) {
  const { label, target } = useMemo(() => {
    const now = Date.now();
    for (const sd of saleDays) {
      const s = new Date(`${sd.date}T${sd.startTime}`);
      const e = new Date(`${sd.date}T${sd.endTime}`);
      if (now < s.getTime()) return { label: "Sale Starts In", target: s };
      if (now >= s.getTime() && now < e.getTime()) return { label: "Sale Ends In", target: e };
    }
    return { label: "", target: null };
  }, [saleDays]);

  const [cd, setCd] = useState(getCountdown(target));

  useEffect(() => {
    if (!target) return;
    const iv = setInterval(() => setCd(getCountdown(target)), 1000);
    return () => clearInterval(iv);
  }, [target]);

  if (!label || !target) return <Typography>No active sale</Typography>;

  return (
    <Box textAlign="center" py={2}>
      <Typography variant="h6">⏰ {label}</Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        {Object.entries(cd).map(([unit, value]) => (
          <Box key={unit} textAlign="center">
            <Typography variant="caption" fontWeight="bold">
              {unit}
            </Typography>
            <AnimatedNumberRolling number={value} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
