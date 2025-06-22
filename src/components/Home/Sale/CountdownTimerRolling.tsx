// components/CountdownTimer.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AnimatedNumberRolling from "../../AnimatedNumberRolling";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateCountdown = (target: Date | null): Countdown => {
  const now = new Date().getTime();
  const targetTime = target?.getTime() ?? now;
  const distance = targetTime - now;

  return {
    days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((distance / (1000 * 60 * 60)) % 24)),
    minutes: Math.max(0, Math.floor((distance / 1000 / 60) % 60)),
    seconds: Math.max(0, Math.floor((distance / 1000) % 60)),
  };
};

interface Props {
  target: Date | null;
}

const CountdownTimer: React.FC<Props> = ({ target }) => {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  const timeUnits = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <Box textAlign="center">
            <Typography variant="caption" fontWeight="bold">
              {unit.label}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ lineHeight: 1 }}>
              <AnimatedNumberRolling number={unit.value} />
            </Typography>
          </Box>
          {index < timeUnits.length - 1 && (
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#ff8d2f", mx: 0.5, mt: 3 }}
            >
              :
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default CountdownTimer;
