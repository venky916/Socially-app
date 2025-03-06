"use client";
import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import ModeToggle from "../toggle-theme";
import SheetNavbar from "./sheetNavbar";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex md:hidden items-center gap-2">
        <ModeToggle />
        <MenuIcon
          className="h-5 w-5 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <SheetNavbar open={open} onClose={() => setOpen(!open)} />
    </>
  );
};

export default MobileNavbar;
