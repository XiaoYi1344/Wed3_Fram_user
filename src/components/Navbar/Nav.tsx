"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  TextField,
  InputAdornment,
  IconButton as MUIIconButton,
  MenuItem,
  Badge,
  Fade,
  Menu,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";

import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import {
  FaRegUser,
  FaShoppingBag,
  FaTimesCircle,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/constant/constant";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [navBg, setNavBg] = useState(false);
  const [language, setLanguage] = useState("EN");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setNavBg(window.scrollY >= 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close Menu on scroll
  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      handleClose();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLanguage(e.target.value);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { icon: <FaRegUser />, label: "Manage My Account", href: "/account/profile" },
    { icon: <FaShoppingBag />, label: "My Order", href: "/orders" },
    {
      icon: <FaTimesCircle />,
      label: "My Cancellations",
      href: "/cancellations",
    },
    { icon: <FaStar />, label: "My Reviews", href: "/reviews" },
    { icon: <FaSignOutAlt />, label: "Logout", href: "/logout" },
  ];

  return (
    <div className="w-full fixed top-0 z-[1000] border-b border-[#ccc]">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2">
        <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between items-center">
          <p className="text-center flex-1">
            Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%!{" "}
            <a href="#" className="font-bold underline ml-1">
              ShopNow
            </a>
          </p>
          <TextField
            select
            value={language}
            onChange={handleLanguageChange}
            variant="standard"
            SelectProps={{ IconComponent: IoIosArrowDown }}
            InputProps={{ disableUnderline: true }}
            sx={{
              color: "white",
              ".MuiSelect-icon": {
                color: "white",
                right: "30px",
              },
              ".MuiInputBase-input": {
                color: "white",
                fontSize: "14px",
                paddingRight: "20px",
              },
              backgroundColor: "transparent",
              width: 100,
            }}
          >
            <MenuItem value="EN">English</MenuItem>
            <MenuItem value="VN">Vietnamese</MenuItem>
          </TextField>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`${
          navBg ? "bg-white shadow-md" : "bg-white"
        } transition-all duration-200 h-[12vh] flex items-center w-full`}
      >
        <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-bold text-black">
            Exclusive
          </h1>

          {/* Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.url;
              return (
                <Link key={link.id} href={link.url} legacyBehavior>
                  <p
                    className={`cursor-pointer text-base font-medium text-black relative after:block after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-gray-400 ${
                      isActive ? "after:w-full" : "after:w-0"
                    } hover:after:w-full after:transition-all after:duration-300`}
                  >
                    {link.label}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Search + Icons */}
          <div className="flex items-center gap-3">
            <TextField
              placeholder="What are you looking for?"
              variant="outlined"
              size="small"
              sx={{
                width: 250,
                backgroundColor: "#f5f5f5",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
                "& fieldset": {
                  border: "none",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MUIIconButton edge="end">
                      <FiSearch />
                    </MUIIconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="ghost" size="icon" onClick={() => router.push("/wishlist")}>
      <FiHeart className="w-5 h-5" />
    </Button>
            <Button variant="ghost" size="icon" className="relative">
              <FiShoppingCart className="w-6 h-6" />
              <Badge
                badgeContent={2}
                color="warning"
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  "& .MuiBadge-badge": {
                    fontSize: "0.6rem",
                    height: 16,
                    minWidth: 16,
                  },
                }}
              />
            </Button>
            {isLoggedIn && (
              <IconButton
                onClick={handleClick}
                sx={{
                  backgroundColor: open ? "#ff8d2f" : "transparent",
                  borderRadius: "50%",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#ff8d2f",
                  },
                }}
              >
                <GoPerson
                  style={{
                    color: open ? "#fff" : "#000",
                    transition: "color 0.3s",
                  }}
                />
              </IconButton>
            )}

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              PaperProps={{
                sx: {
                  mt: 1,
                  width: 230,
                  background: "rgba(255, 255, 255, 0.8)",
                  color: "#ff8d2f",
                  borderRadius: 2,
                  boxShadow: 8,
                  backdropFilter: "blur(3px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                },
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {menuItems.map(({ icon, label, href }) => (
                <MenuItem
                  key={label}
                  onClick={handleClose}
                  component="a"
                  href={href}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#ff8d2f",
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 30 }}>
                    {icon}
                  </ListItemIcon>
                  <Typography variant="body2">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden flex items-center">
            <HiBars3BottomRight
              onClick={openNav}
              className="w-8 h-8 cursor-pointer text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
