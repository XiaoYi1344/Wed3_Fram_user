"use client";

import { motion, easeIn, easeOut } from "framer-motion";
import {
  DropdownMenuContent,
  DropdownMenuPortal,
} from "@radix-ui/react-dropdown-menu";
import React from "react";

const dropIn = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15, ease: easeIn },
  },
};

interface Props extends React.ComponentPropsWithoutRef<typeof DropdownMenuContent> {
  children: React.ReactNode;
}

export const AnimatedDropdownContent = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => (
    <DropdownMenuPortal>
      <DropdownMenuContent
        asChild
        forceMount
        side="bottom"
        align="center"
        {...props}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropIn}
          className={className}
        >
          {children}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  )
);

AnimatedDropdownContent.displayName = "AnimatedDropdownContent";
