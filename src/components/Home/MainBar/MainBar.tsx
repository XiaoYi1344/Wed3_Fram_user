import React from 'react'
import { Grid } from '@mui/material'
import SidebarMenu from '../SideBar/SideBar'
import Banner from '../Banner/Banner'


const MainLayout: React.FC = () => {
  return (

    // <Grid container p={3} rowSpacing={1} spacing={2} sx={{ height: '100%' }}>
    //   <Grid size={{ xs: 12, md: 6, lg: 3 }} p={3}>
    //     <Grid><SidebarMenu /></Grid>
    //   </Grid>
    //   <Grid size={{ xs: 12, md: 6, lg: 9 }} p={3}>
    //     <Grid><Banner /></Grid>
    //   </Grid>
    // </Grid>

    <Grid container p={{ xs: 1, md: 3 }} spacing={2} sx={{ height: '100%' }}>
      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <SidebarMenu />
      </Grid>
      <Grid size={{ xs: 12, md: 8, lg: 9 }}>
        <Banner />
      </Grid>
    </Grid>
  );
};

export default MainLayout
