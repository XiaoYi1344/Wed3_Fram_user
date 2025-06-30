"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { categories } from "@/utils/categories";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "-translate-x-full";
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = showNav ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showNav]);

  const toggleExpand = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {showNav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-[1001] transition-opacity duration-300"
          onClick={closeNav}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-rose-900 text-white w-[80%] sm:w-[60%] z-[1050] transform transition-transform duration-500 ease-in-out ${navOpen}`}
      >
        <div className="absolute top-4 right-4 cursor-pointer">
          <CgClose
            onClick={closeNav}
            className="w-6 h-6 sm:w-8 sm:h-8 hover:text-gray-300"
          />
        </div>

        <nav className="flex flex-col items-start mt-16 ml-8 space-y-4 pr-4 overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat.label} className="w-full">
              <button
                onClick={() => toggleExpand(cat.label)}
                className="text-white text-lg font-medium w-full text-left mb-1 hover:underline"
                aria-expanded={expanded === cat.label}
              >
                {cat.label}
              </button>
              {expanded === cat.label && (
                <div className="ml-4 text-sm space-y-1">
                  {cat.children.map((item) => (
                    <Link
                      key={item}
                      href={`/category${cat.path}/${encodeURIComponent(item)}`}
                      onClick={closeNav}
                      legacyBehavior
                    >
                      <a className="block hover:underline">{item}</a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileNav;