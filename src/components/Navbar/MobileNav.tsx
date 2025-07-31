// MobileNav.tsx
"use client";

import { navLinks } from "@/constant/constant";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";
import { TextField, InputAdornment, IconButton as MUIIconButton } from "@mui/material"; // Thêm import InputAdornment, IconButton

import { FiSearch } from "react-icons/fi"; // Import icon search

type Props = {
  showNav: boolean;
  closeNav: () => void;
  searchTerm: string; // Thêm prop cho giá trị tìm kiếm
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Thêm prop cho handler thay đổi
};

const MobileNav = ({ closeNav, showNav, searchTerm, onSearchChange }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          showNav ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeNav}
      ></div>

      {/* Navigation */}
      <div
        className={`fixed top-0 left-0 h-full z-[1050] w-[80%] sm:w-[60%] bg-[#5c4422] text-white transform ${navOpen} transition-transform duration-500 ease-in-out flex flex-col py-8 px-6 space-y-6 shadow-lg`}
      >
        <CgClose
          onClick={closeNav}
          className="absolute top-4 right-5 text-white w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
        />

        {/* Search Field for Mobile */}
        <div className="mb-4 mt-8"> {/* Thêm margin top để cách xa nút đóng */}
          <TextField
            placeholder="Tìm kiếm sản phẩm nông sản..."
            variant="outlined"
            size="small"
            value={searchTerm} // Sử dụng giá trị từ prop
            onChange={onSearchChange} // Sử dụng handler từ prop
            sx={{
              width: '100%', // Đảm bảo TextField chiếm toàn bộ chiều rộng trong mobile nav
              borderRadius: "10px",
              backgroundColor: "#fff9ec",
              "& fieldset": { border: "none" },
              // Tùy chỉnh màu chữ và icon cho MobileNav
              "& .MuiInputBase-input": {
                color: "#3b2f2f", // Màu chữ tối cho dễ đọc trên nền sáng
              },
              "& .MuiInputAdornment-root .MuiButtonBase-root": {
                color: "#3b2f2f", // Màu icon search tối
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MUIIconButton edge="end" aria-label="Tìm kiếm">
                    <FiSearch />
                  </MUIIconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{ 'aria-label': 'Tìm kiếm sản phẩm' }}
          />
        </div>

        {navLinks.map((link) => (
          <Link key={link.id} href={link.url} onClick={closeNav}>
            <p className="text-lg sm:text-xl font-semibold border-b border-white/30 pb-2 hover:text-[#ffe8b0] transition-colors ml-2">
              {link.label}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MobileNav;