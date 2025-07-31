import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Grid, useTheme, useMediaQuery, Skeleton } from "@mui/material";

// Lazy load Sidebar and Banner
const Sidebar = dynamic(() => import("./SideBar/SideBar"), {
  ssr: false,
  loading: () => <Skeleton variant="rounded" width="100%" height={300} />, // fallback to reduce FCP
});

const Banner = dynamic(() => import("./Banner/Banner"), {
  ssr: false,
  loading: () => <Skeleton variant="rounded" width="100%" height={200} />,
});

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <Grid
      container
      spacing={0}
      sx={{
        width: "100%",
        mt: { xs: 8, sm: 10, md: 6 },
        minHeight: { xs: "50vh", sm: "10vh", md: "60vh" },
      }}
    >
      {/* 👉 Sidebar */}
      {!isMobile && (
        <Grid size={{ xs: 12, sm: 3, md: 3}}>
          <Sidebar />
        </Grid>
      )}

      {isMobile && showMobileSidebar && (
        <Grid size={{ xs: 12}}>
          <Sidebar closeSidebar={() => setShowMobileSidebar(false)} />
        </Grid>
      )}

      {/* 👉 Banner content */}
      <Grid size={{ xs: 12, sm: 9, md: 9}}>
        <Banner
          showMobileSidebar={isMobile}
          toggleMobileSidebar={() => setShowMobileSidebar((prev) => !prev)}
        />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
