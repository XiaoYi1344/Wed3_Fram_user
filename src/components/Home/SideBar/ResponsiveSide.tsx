'use client';

import React, { useState } from 'react';
import SideBar from './SideBar';
import MobileNav from './MobileSide';
import { FiMenu } from 'react-icons/fi';

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const [showDesktopSidebar, setShowDesktopSidebar] = useState(false);

//   const handleMobileNavShow = () => setShowNav(true);
  const handleMobileNavClose = () => setShowNav(false);

  const handleDesktopNavToggle = () => setShowDesktopSidebar(prev => !prev);

  return (
    <div className="relative">
      {/* Hamburger menu for desktop */}
      <button
        onClick={handleDesktopNavToggle}
        className="hidden md:flex items-center p-2 text-xl"
      >
        <FiMenu />
      </button>

      {/* Desktop SideBar */}
      {showDesktopSidebar && <SideBar />}

      {/* Mobile Navigation */}
      <MobileNav showNav={showNav} closeNav={handleMobileNavClose} />
    </div>
  );
};

export default ResponsiveNav;
