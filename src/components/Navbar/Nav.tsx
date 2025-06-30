"use client";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  // useMemo,
  // useTransition,
} from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Stack,
  TextField,
  MenuItem,
  Menu,
  Fade,
  ListItemIcon,
  Typography,
  Badge,
  InputAdornment,
  IconButton as MUIIconButton,
  IconButton,
} from "@mui/material";
import {
  FaRegUser,
  FaShoppingBag,
  FaTimesCircle,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/constant/constant";
// import { useCart } from "@/hook/useCart";

const menuItems = [
  { icon: <FaRegUser />, label: "Manage My Account", href: "/account/profile" },
  { icon: <FaShoppingBag />, label: "My Order", href: "/orders" },
  { icon: <FaTimesCircle />, label: "My Cancellations", href: "/cancellations" },
  { icon: <FaStar />, label: "My Reviews", href: "/reviews" },
  { icon: <FaSignOutAlt />, label: "Logout", href: "/logout" },
];

type Props = {
  openNav: () => void;
};


const useNavEffect = (
  setNavBg: (v: boolean) => void,
  closeMenu: () => void,
  menuOpen: boolean
) => {
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;

  useEffect(() => {
    const onScroll = () => {
      setNavBg(window.scrollY >= 90);
      if (menuOpenRef.current) closeMenu();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [closeMenu, setNavBg]);
};


const Nav = ({ openNav }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [navBg, setNavBg] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { totalQuantity } = useCart();

  const menuOpen = Boolean(menuAnchor);
  const closeMenu = useCallback(() => setMenuAnchor(null), []);
  const openMenu = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);

  useNavEffect(setNavBg, closeMenu, menuOpen);

  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  };

  const goTo = (url: string) => router.push(url);

  return (
    <Stack className="fixed top-0 z-[1000] w-full border-b border-[#ccc]">
      {/* Top bar */}
      <div className="bg-black text-white text-sm py-2">
        <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between items-center">
          <p className="text-center flex-1">
            Summer Sale For All Swim Suits – OFF 50%!
            <a href="#" className="font-bold underline ml-1">ShopNow</a>
          </p>
          <TextField
            select
            value={language}
            onChange={handleLanguageChange}
            variant="standard"
            SelectProps={{ IconComponent: IoIosArrowDown }}
            InputProps={{ disableUnderline: true }}
            sx={{
              width: 100,
              color: "white",
              background: "transparent",
              ".MuiSelect-icon": { color: "white", right: "30px" },
              ".MuiInputBase-input": { color: "white", fontSize: 14, pr: 2 },
            }}
          >
            <MenuItem value="EN">English</MenuItem>
            <MenuItem value="VN">Vietnamese</MenuItem>
          </TextField>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`${navBg ? "shadow-md" : ""} bg-white transition-all duration-200`}>
        <div className="w-[90%] xl:w-[80%] mx-auto flex justify-between items-center h-[12vh]">
          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-bold text-black">Exclusive</h1>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ id, url, label }) => (
              <Link key={id} href={url}>
                <p
                  className={`text-base font-medium text-black relative after:block after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-gray-400
                    ${pathname === url ? "after:w-full" : "after:w-0"} hover:after:w-full after:transition-all`}
                >
                  {label}
                </p>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <TextField
              placeholder="What are you looking for?"
              size="small"
              variant="outlined"
              sx={{
                width: 250,
                backgroundColor: "#f5f5f5",
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                "& fieldset": { border: "none" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MUIIconButton edge="end"><FiSearch /></MUIIconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="ghost" size="icon" onClick={() => goTo("/wishlist")}>
              <FiHeart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => goTo("/cart")}>
              <Badge
                // badgeContent={totalQuantity}
                color="warning"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  "& .MuiBadge-badge": {
                    fontSize: "0.6rem",
                    height: 16,
                    minWidth: 16,
                  },
                }}
              >
                <FiShoppingCart className="w-6 h-6" />
              </Badge>
            </Button>

            {/* User menu */}
            {isLoggedIn && (
              <>
                <IconButton
                  onClick={openMenu}
                  sx={{
                    backgroundColor: menuOpen ? "#ff8d2f" : "transparent",
                    "&:hover": { backgroundColor: "#ff8d2f" },
                  }}
                >
                  <GoPerson style={{ color: menuOpen ? "#fff" : "#000" }} />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={menuOpen}
                  onClose={closeMenu}
                  TransitionComponent={Fade}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      width: 230,
                      borderRadius: 2,
                      boxShadow: 8,
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    },
                  }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {menuItems.map(({ icon, label, href }) => (
                    <MenuItem
                      key={label}
                      onClick={() => {
                        closeMenu();
                        goTo(href);
                      }}
                      sx={{ "&:hover": { bgcolor: "#ff8d2f", color: "#fff" } }}
                    >
                      <ListItemIcon sx={{ color: "inherit", minWidth: 30 }}>{icon}</ListItemIcon>
                      <Typography variant="body2">{label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            {/* Mobile Nav Toggle */}
            <div className="lg:hidden">
              <HiBars3BottomRight
                onClick={openNav}
                className="w-8 h-8 text-black cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default Nav;
