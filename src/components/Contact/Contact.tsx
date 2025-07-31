'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import {
  Stack,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Contact: React.FC = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack py={24} px={{ xs: 2, md: 8, lg: 20 }} spacing={6}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          href="/"
          underline="hover"
          sx={{ "&:hover": { color: "black" }, fontWeight: 500 }}
        >
          Home
        </Link>
        <Typography color="text.primary" fontWeight={600}>
          Contact
        </Typography>
      </Breadcrumbs>

      {/* Main Content */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        alignItems="stretch"
      >
        {/* Contact Info */}
        <Card className="w-full md:w-1/2 lg:w-1/3 backdrop-blur-md bg-white/60 border border-gray-200 shadow-xl rounded-2xl">
          <CardContent>
            <Stack spacing={4}>
              <Typography variant="h5" fontWeight={700}>
                Get in Touch
              </Typography>

              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box className="bg-orange-500 p-3 rounded-full text-white shadow-md">
                  <Phone size={20} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Call Us
                  </Typography>
                  <Typography variant="body2" mt={0.5}>
                    Available 24/7
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    +880 1611 112 222
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box className="bg-orange-500 p-3 rounded-full text-white shadow-md">
                  <Mail size={20} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Email Us
                  </Typography>
                  <Typography variant="body2" mt={0.5}>
                    We&apos;ll reply within 24 hours.
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    customer@exclusive.com
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    support@exclusive.com
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="w-full md:w-2/3 backdrop-blur-md bg-white/60 border border-gray-200 shadow-xl rounded-2xl">
          <CardContent>
            <Stack spacing={4}>
              <Typography variant="h5" fontWeight={700}>
                Send Us a Message
              </Typography>

              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
                gap={2}
              >
                <Input
                  placeholder="Full Name *"
                  className="bg-gray-100 rounded-xl border-none px-4 py-3 text-sm"
                />
                <Input
                  placeholder="Email Address *"
                  className="bg-gray-100 rounded-xl border-none px-4 py-3 text-sm"
                />
                <Input
                  placeholder="Phone Number *"
                  className="bg-gray-100 rounded-xl border-none px-4 py-3 text-sm"
                />
              </Box>

              <Textarea
                placeholder="Write your message here..."
                rows={isMdDown ? 8 : 20}
                className="bg-gray-100 rounded-xl border-none px-4 py-3 text-sm"
              />

              <Box display="flex" justifyContent="flex-end">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2 rounded-xl shadow-md">
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

export default React.memo(Contact);
