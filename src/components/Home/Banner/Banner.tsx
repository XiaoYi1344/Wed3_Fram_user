import { Card, CardContent } from "@/components/ui/card";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Banner: React.FC = () => {
  return (
    //     <Box
    //   sx={{
    //     height: { xs: 250, sm: 300, md: 470 }, // Tăng chiều cao cho xs
    //     borderRadius: 0,
    //     boxShadow: "none",
    //     width: { xs: "100%", sm: "98%", md: "100%" },
    //     marginTop: { xs: 10, sm: 22, md: 20 },
    //     position: "relative", // Đảm bảo relative
    //     bgcolor:"black"
    //   }}
    // >
    //   <Card className="rounded-none border-0 shadow-none w-full h-full">
    //     <CardContent className="p-0 relative w-full h-full">
    //       <Box
    //         sx={{
    //           position: "relative",
    //           width: "100%",
    //           height: "100%",
    //         }}
    //       >
    //         <Image
    //           src="/img/Group.png"
    //           alt="Fresh everyday banner"
    //           fill
    //           sizes="(max-width: 600px) 100vw, 100vw"
    //           style={{ objectFit: "cover" }}
    //           priority
    //         />

    //         <Box
    //           sx={{
    //             position: "absolute",
    //             top: "50%",
    //             left: { xs: "16px", sm: "40px" },
    //             transform: "translateY(-50%)",
    //             color: "#2e7d32",
    //             zIndex: 1,
    //           }}
    //         >
    //           <Typography
    //             fontWeight="bold"
    //             sx={{
    //               whiteSpace: "pre-line",
    //               fontSize: { xs: "30px", sm: "40px", md: "60px" },
    //             }}
    //           >
    //             {`Fresh\neveryday`}
    //           </Typography>
    //         </Box>

    //         {/* <Box
    //           sx={{
    //             position: "absolute",
    //             top: "15%",
    //             left: "50%",
    //             transform: "translate(-50%, 10%)",
    //             color: "white",
    //             px: 2,
    //             py: 0.5,
    //             borderRadius: "20px",
    //             fontSize: { xs: "16px", sm: "20px", md: "30px" },
    //             whiteSpace: "pre-line",
    //             lineHeight: 1.1,
    //             textAlign: "center",
    //             zIndex: 1,
    //           }}
    //         >
    //           {`20%\nOFF`}
    //         </Box> */}
    //         <Box
    //   sx={{
    //     position: "absolute",
    //     top: { xs: "10%", sm: "15%" }, // thấp hơn chút trên mobile
    //     left: "50%",
    //     transform: { xs: "translate(-50%, 0%)", sm: "translate(-50%, 10%)" },
    //     color: "black",
    //     px: 2,
    //     py: 0.5,
    //     borderRadius: "20px",
    //     fontSize: { xs: "16px", sm: "20px", md: "30px" },
    //     whiteSpace: "pre-line",
    //     lineHeight: 1.1,
    //     textAlign: "center",
    //     zIndex: 1,
    //   }}
    // >
    //   {`20%\nOFF`}
    // </Box>

    //       </Box>
    //     </CardContent>
    //   </Card>
    // </Box>

    <Box
      sx={{
        height: { xs: 240, sm: 360, md: 470 },
        borderRadius: 0,
        boxShadow: "none",
        width: { sm: "98%", md: "100%" },
        marginTop: { xs: 17, sm: 22, md: 19 },
        paddingBottom: { xs: "-12"},
        position: "relative",
        // bgcolor: "black",
      }}
       data-aos="fade-right"
      data-aos-anchor-placement="left-center"
    >
      <Card className="rounded-none border-0 shadow-none w-full h-full">
        <CardContent className="p-0 relative w-full h-full">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src="/img/Group.png"
              alt="Fresh everyday banner"
              width={1200} // hoặc 600
              height={600}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              priority
            />

            {/* Text 1 */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: "34%", sm:"30%", md: "50%" },
                left: { xs: "16px", sm: "40px" },
                transform: "translateY(-50%)",
                color: "#2e7d32",
                zIndex: 2,
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  whiteSpace: "pre-line",
                  fontSize: { xs: "25px", sm: "40px", md: "60px" },
                }}
              >
                {`Fresh\neveryday`}
              </Typography>
            </Box>

            {/* Text 2 – 20% OFF */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: "12%", sm:"12%", md: "20%" },
                left: "50%",
                transform: "translate(-50%, 0%)",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                fontSize: { xs: "10px", sm: "15px", md: "30px" },
                whiteSpace: "pre-line",
                lineHeight: 1.1,
                textAlign: "center",
                zIndex: 2,
              }}
            >
              {`20%\nOFF`}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Banner;
