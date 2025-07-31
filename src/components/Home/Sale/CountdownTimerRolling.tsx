"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AnimatedNumberRolling from "../../AnimatedNumberRolling";

const getCountdown = (t: Date | null) => {
  if (!t) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const d = t.getTime() - Date.now();
  return {
    days: Math.max(0, Math.floor(d / 86400000)),
    hours: Math.max(0, Math.floor((d % 86400000) / 3600000)),
    minutes: Math.max(0, Math.floor((d % 3600000) / 60000)),
    seconds: Math.max(0, Math.floor((d % 60000) / 1000)),
  };
};

export default function CountdownTimer({ target }: { target: Date | null }) {
  const [cd, setCd] = useState(getCountdown(target));

  useEffect(() => {
    const iv = setInterval(() => setCd(getCountdown(target)), 1000);
    return () => clearInterval(iv);
  }, [target]);

  return (
    <Box display="flex" justifyContent="center" gap={2}>
      {Object.entries(cd).map(([unit, value]) => (
        <Box key={unit} textAlign="center">
          <Typography variant="caption" textTransform="capitalize">
            {unit}
          </Typography>
          <AnimatedNumberRolling number={value} />
        </Box>
      ))}
    </Box>
  );
}
