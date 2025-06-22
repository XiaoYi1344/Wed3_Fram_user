import React from 'react'
import { Grid } from '@mui/material'
import SidebarMenu from '../SideBar/SideBar'
import Banner from '../Banner/Banner'


const MainLayout: React.FC = () => {
  return (
    // <Box sx={{ width: '100%', height: '400px' }}>
    //   <Grid container spacing={2} sx={{ height: '100%' }}>
    //     <Grid item xs={12} md={3}>
    //       <Item>
    //         <SidebarMenu />
    //       </Item>
    //     </Grid>
    //     <Grid item xs={12} md={9}>
    //       <Item>
    //         <Banner />
    //       </Item>
    //     </Grid>
    //   </Grid>
    // </Box>

    <Grid container p={3} rowSpacing={1} spacing={2} sx={{ height: '100%' }}>
      <Grid size={{ xs: 12, md: 6, lg: 3 }} p={3}>
        <Grid><SidebarMenu /></Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 9 }} p={3}>
        <Grid><Banner /></Grid>
      </Grid>
    </Grid>
  );
}

export default MainLayout
