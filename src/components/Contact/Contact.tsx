import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Stack, Typography, Box, Breadcrumbs, Link } from "@mui/material";

const Contact: React.FC = () => {
  return (
    <Stack py={30} px={{ xs: 2, md: 14, lg: 20 }} spacing={4}>
      <Stack>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" underline="none" sx={{ '&:hover': { color: 'black' } }}>
            Home
          </Link>
          <Typography color="textPrimary">Contact</Typography>
        </Breadcrumbs>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        mt={4}
      >
        {/* Contact Info Section */}
        <Card className="w-full md:w-1/3 p-4 shadow-md rounded-lg">
          <CardContent className="p-0">
            <Stack spacing={4}>
              {/* Call To Us */}
              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
                pt={4}
                pl={3}
              >
                <Box className="bg-orange-400 p-2 rounded-full text-white">
                  <Phone size={20} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginBottom: "24px", marginTop: "-2%" }}
                    fontSize={{ lg: 25 }}
                  >
                    Call To Us
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: "15px", marginLeft: "-20%" }}
                    fontSize={{ lg: 17 }}
                  >
                    We are available 24/7, 7 days a week.
                  </Typography>
                  <Typography
                    variant="body2"
                    mt={1}
                    sx={{ marginLeft: "-20%" }}
                    fontSize={{ lg: 17 }}
                  >
                    Phone: +8801611112222
                  </Typography>
                </Box>
              </Stack>

              <Box component="hr" sx={{ width: "80%", marginLeft: "50%" }} />

              {/* Write to Us */}
              <Stack direction="row" spacing={2} alignItems="flex-start" pl={3}>
                <Box className="bg-orange-400 p-2 rounded-full text-white">
                  <Mail size={20} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginBottom: "24px", marginTop: "-2%" }}
                    fontSize={{ xs: 10, md: 15, lg: 25 }}
                  >
                    Write to Us
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginBottom: "15px", marginLeft: "-20%" }}
                    fontSize={{ lg: 17 }}
                  >
                    Fill out our form and we will contact you within 24 hours.
                  </Typography>
                  <Typography
                    variant="body2"
                    mt={1}
                    sx={{ marginBottom: "15px", marginLeft: "-20%" }}
                    fontSize={{ lg: 17 }}
                  >
                    Emails: customer@exclusive.com
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: "-20%", marginBottom: "18%" }}
                    fontSize={{ lg: 17 }}
                  >
                    Emails: support@exclusive.com
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Message Form */}
        <Card className="w-full md:w-2/3 p-6 shadow-md rounded-lg">
          <CardContent className="p-0">
            <Stack spacing={4}>
              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
                gap={2}
              >
                <Input
                  placeholder="Your Name *"
                  className="bg-gray-100 rounded-[5px] border-none"
                />
                <Input
                  placeholder="Your Email *"
                  className="bg-gray-100 rounded-[5px] border-none"
                />
                <Input
                  placeholder="Your Phone *"
                  className="bg-gray-100 rounded-[5px] border-none"
                />
              </Box>
              <Textarea
                placeholder="Your Message"
                rows={18}
                className="h-auto min-h-[313px] bg-gray-100 rounded-[5px] border-none"
              />
              <Box display="flex" justifyContent="flex-end">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Send Message
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default Contact;
