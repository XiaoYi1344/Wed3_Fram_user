"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import BannerMobile from "./BannerMobile";
import BannerDesktop from "./BannerDesktop";

type Props = {
  showMobileSidebar: boolean;
  toggleMobileSidebar: () => void;
};

export default function Banner({ showMobileSidebar, toggleMobileSidebar }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? (
    <BannerMobile
      showMobileSidebar={showMobileSidebar}
      toggleMobileSidebar={toggleMobileSidebar}
    />
  ) : (
    <BannerDesktop />
  );
}
