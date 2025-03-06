import { BellIcon, HomeIcon, UserIcon, LucideIcon, Dot } from "lucide-react";
import React from "react";
import ModeToggle from "../toggle-theme";
import { Button } from "../ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { unReadNotification } from "@/actions/notification.action";

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
      <Button variant={"ghost"} className="flex items-center gap-2" asChild>
        <Link href={path}>
          <Icon className="h-6 w-6" />
          <span className="hidden lg:inline">{label}</span>
        </Link>
      </Button>
    </div>
  );
};

const DesktopNavbar = async () => {
  const user = await currentUser();
  const alert = await unReadNotification();
  return (
    <div className=" hidden md:flex items-center space-x-4">
      <ModeToggle />
      <IconComponent icon={HomeIcon} label="Home" path="/" />

      {user ? (
        <div className="flex gap-2 items-center">
          <IconComponent
            icon={BellIcon}
            label="Notifications"
            path={"/notifications"}
            alert={alert as boolean}
          />
          <IconComponent
            icon={UserIcon}
            label="Profile"
            path={`/profile/${
              user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
            }`}
          />
          <UserButton />
        </div>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
};

export default DesktopNavbar;
