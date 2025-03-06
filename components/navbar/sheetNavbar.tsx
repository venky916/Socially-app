"use client";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  UserIcon,
  LucideIcon,
  Dot,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { unReadNotification } from "@/actions/notification.action";

interface sheetNavbarProps {
  open: boolean;
  onClose: () => void;
}

interface IconComponentProps {
  icon: LucideIcon;
  label: string;
  path: string;
  alert?: boolean;
}

const IconComponent: React.FC<IconComponentProps> = ({
  icon: Icon,
  label,
  path,
  alert,
}) => {
  return (
    <div className="relative">
      {alert ? (
        <Dot className="text-sky-500 absolute -top-5 " size={60} />
      ) : null}
      <Button
        variant={"ghost"}
        className="flex items-center gap-3 cursor-pointer justify-start"
        asChild
      >
        <Link href={path}>
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </Button>
    </div>
  );
};

const SheetNavbar: React.FC<sheetNavbarProps> = ({ open, onClose }) => {
  const { user, isSignedIn } = useUser();

  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    const fetchAlert = async () => {
      // const hasUnread = await unReadNotification() as boolean;
      // setAlert(hasUnread);
      // const hasUnread = await unReadNotification() ?? false; //(if return type is null or undefined this works)
       const result = await unReadNotification(); //if return type is never[] or actual thing
       // Ensure `result` is a boolean
       setAlert(Array.isArray(result) ? false : result);
    };

    fetchAlert();
  }, [open]); // Re-fetch when `open` changes

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mx-auto">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 px-2 mt-6">
          <IconComponent icon={HomeIcon} label={"Home"} path="/" />
          {isSignedIn ? (
            <>
              <IconComponent
                icon={BellIcon}
                label="Notifications"
                path="/notifications"
                alert={alert}
              />
              <IconComponent
                icon={UserIcon}
                label="Profile"
                path={`/profile/${
                  user?.username ??
                  user?.emailAddresses[0].emailAddress.split("@")[0]
                }`}
              />
              <SignOutButton>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start w-full"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <Button variant="default" className="w-full">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetNavbar;
