"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
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
  Stack,
  Box,
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
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";

type Props = {
  openNav: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Nav = ({ openNav, searchTerm, onSearchChange }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [hasMounted, setHasMounted] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { isLoggedIn, checkLogin, logout } = useAuthStore();
  const { cart } = useCartStore();
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    setHasMounted(true);
    checkLogin();
  }, [checkLogin]);

  const handleScroll = useCallback(() => {
    setNavBg(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    []
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLanguage(e.target.value);

  const menuItems = useMemo(
    () => [
      {
        icon: <FaRegUser />,
        label: "Manage My Account",
        href: "/account/profile",
      },
      { icon: <FaShoppingBag />, label: "My Order", href: "/account/orders" },
      {
        icon: <FaTimesCircle />,
        label: "My Cancellations",
        href: "/cancellations",
      },
      { icon: <FaStar />, label: "My Reviews", href: "/reviews" },
      {
        icon: <FaSignOutAlt />,
        label: "Logout",
        href: "#",
        onClick: async () => {
          await logout(); // Gọi từ store
          router.push("/login"); // Điều hướng
        },
      },
    ],
    [logout, router]
  );

  if (!hasMounted) return null;

  return (
    <Stack>
      <header className="fixed w-full top-0 z-[1000] bg-[#f7f1e5] border-b border-[#ccc]">
        {/* Top Bar */}
        <div className="bg-[#5c4422] text-white py-2">
          <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between items-center">
            <Box className="flex-1 overflow-hidden">
              <p className="inline-block whitespace-nowrap text-[10px] md:text-[17px] font-medium animate-marquee">
                Summer Sale For All Organic Products – OFF 50%!
                <a
                  href="#"
                  className="font-semibold underline ml-2"
                  aria-label="Shop Now"
                >
                  Shop Now
                </a>
              </p>
            </Box>
            <TextField
              select
              value={language}
              onChange={handleLanguageChange}
              variant="standard"
              SelectProps={{ IconComponent: IoIosArrowDown }}
              InputProps={{ disableUnderline: true }}
              sx={{
                ".MuiInputBase-input": {
                  color: "white",
                  fontSize: { xs: "10px", sm: "15px", md: "17px" },
                  paddingLeft: { xs: "30px", sm: "15px", md: "10px" },
                },
                ".MuiSelect-icon": { color: "white", right: "20px" },
                width: 100,
              }}
            >
              <MenuItem value="EN">English</MenuItem>
              <MenuItem value="VN">Vietnamese</MenuItem>
            </TextField>
          </div>
        </div>

        {/* Main Nav */}
        <div
          className={`transition-all duration-200 h-[12vh] flex items-center ${navBg ? "shadow-md" : ""}`}
        >
          <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-[#3b2f2f]">
              <Link href="/">FarmFresh</Link>
            </h1>

            {/* Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <ul className="flex gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.url;
                  return (
                    <li key={link.id}>
                      <Link href={link.url}>
                        <span
                          className={`text-base font-medium text-[#3b2f2f] relative cursor-pointer after:block after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-[#8b5e3c] ${
                            isActive ? "after:w-full" : "after:w-0"
                          } hover:after:w-full after:transition-all after:duration-300`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <TextField
                placeholder="Tìm kiếm sản phẩm nông sản..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={onSearchChange}
                sx={{
                  width: 220,
                  borderRadius: "10px",
                  backgroundColor: "#fff9ec",
                  "& fieldset": { border: "none" },
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
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/wishlist")}
              >
                <FiHeart className="w-5 h-5 text-[#3b2f2f]" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => router.push("/cart")}
              >
                <Badge
                  badgeContent={totalItemsInCart}
                  color="warning"
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "0px",
                    "& .MuiBadge-badge": {
                      fontSize: "0.6rem",
                      height: 16,
                      minWidth: 16,
                    },
                  }}
                >
                  <FiShoppingCart className="w-6 h-6 text-[#3b2f2f]" />
                </Badge>
              </Button>

              {isLoggedIn && (
                <>
                  <IconButton onClick={handleClick}>
                    <GoPerson style={{ color: "#3b2f2f" }} />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        width: 230,
                        background: "#fff9ec",
                        color: "#5c4422",
                        borderRadius: 2,
                        boxShadow: 8,
                        border: "1px solid #d2b48c",
                      },
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    {menuItems.map(({ icon, label, href, onClick }) => (
                      <MenuItem
                        key={label}
                        onClick={() => {
                          handleClose();
                          onClick?.();
                        }}
                        component={href !== "#" ? "a" : "div"}
                        href={href !== "#" ? href : undefined}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#8b5e3c",
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
                </>
              )}

              {/* Hamburger menu mobile */}
              <div className="lg:hidden">
                <HiBars3BottomRight
                  onClick={openNav}
                  className="w-8 h-8 cursor-pointer text-[#3b2f2f]"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </Stack>
  );
};

export default Nav;
