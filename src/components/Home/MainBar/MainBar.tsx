import React from 'react'
import { Grid } from '@mui/material'
import SidebarMenu from '../SideBar/SideBar'
import Banner from '../Banner/Banner'


const MainLayout: React.FC = () => {
  return (


    <Grid container p={{ xs: 1, md: 3 }} spacing={2} sx={{ height: '100%' }}>
      <Grid size={{ xs: 0, sm: 3.8, md: 3 }}>
        <SidebarMenu />
      </Grid>
      <Grid size={{ xs: 12, sm: 8.2, md: 9 }}>
        <Banner />
      </Grid>
    </Grid>
  );
};

export default MainLayout
