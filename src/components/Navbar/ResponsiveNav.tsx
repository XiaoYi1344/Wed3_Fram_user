// components/layout/ResponsiveNav.tsx (tên file được đề xuất)
"use client";

import React, { useState, useCallback } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái cho search term

  const handNavShow = useCallback(() => setShowNav(true), []);
  const handleCloseNav = useCallback(() => setShowNav(false), []);

  // Handler cho TextField search
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <>
      <Nav
        openNav={handNavShow}
        searchTerm={searchTerm} // Truyền searchTerm và handler xuống Nav
        onSearchChange={handleSearchChange}
      />
      <MobileNav
        showNav={showNav}
        closeNav={handleCloseNav}
        searchTerm={searchTerm} // Truyền searchTerm và handler xuống MobileNav
        onSearchChange={handleSearchChange}
      />
    </>
  );
};

export default ResponsiveNav;