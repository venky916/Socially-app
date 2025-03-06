import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { syncUsers } from "@/actions/user.action";

const Navbar = async() => {
   try {
     const user = await currentUser();
     if (user) await syncUsers();
   } catch (error) {
     console.error("Error in Navbar:", error);
   }
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl cursor-pointer font-bold text-primary tracking-wider font-mono">
            <Link href={"/"}>Socially</Link>
          </div>
          <div>
            <DesktopNavbar />
            <MobileNavbar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
