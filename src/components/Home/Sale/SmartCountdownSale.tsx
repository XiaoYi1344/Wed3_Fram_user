"use client";

import React, { useEffect, useMemo, useState } from "react";
import AnimatedNumberRolling from "../../AnimatedNumberRolling";
import { Box, Typography } from "@mui/material";

interface SaleDay {
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm:ss"
  endTime: string; // "HH:mm:ss"
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  saleDays: SaleDay[];
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

const SmartCountdownSale: React.FC<Props> = ({ saleDays }) => {
  const { label, target } = useMemo(() => {
    const now = new Date(); // moved inside useMemo
    const nowTime = now.getTime();

    for (const sale of saleDays) {
      const start = new Date(`${sale.date}T${sale.startTime}`);
      const end = new Date(`${sale.date}T${sale.endTime}`);

      if (nowTime < start.getTime()) {
        return { label: "Sale Starts In", target: start };
      }

      if (nowTime >= start.getTime() && nowTime < end.getTime()) {
        return { label: "Sale Ends In", target: end };
      }
    }

    return { label: "", target: null };
  }, [saleDays]); // ✅ removed 'now' from deps

  const [countdown, setCountdown] = useState<Countdown>(() =>
    calculateCountdown(target)
  );

  useEffect(() => {
    if (!target) return;

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
    <Box display="flex" flexDirection="column" alignItems="center">
      {target ? (
        <>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ⏰ {label}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {timeUnits.map((unit, index) => (
              <React.Fragment key={unit.label}>
                <Box textAlign="center">
                  <Typography variant="caption" fontWeight="bold">
                    {unit.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ lineHeight: 1 }}
                  >
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
        </>
      ) : (
        <Typography>No active or upcoming sales</Typography>
      )}
    </Box>
  );
};

export default SmartCountdownSale;
