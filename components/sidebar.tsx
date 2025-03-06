import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { getUserByClerkId } from "@/actions/user.action";
import { Avatar, AvatarImage } from "./ui/avatar";

const Sidebar = async () => {
  let authUser;
  try {
    authUser = await currentUser();
  } catch (error) {
    console.error("Error in Sidebar:", error);
  }

  if (!authUser) {
    return (
      <div className="sticky top-20">
        <Card>
          <CardHeader className="mx-auto">
            <CardTitle className="font-semibold text-xl text-center">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-center mb-4">
              Login to access your profile and connect with others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton mode="modal" forceRedirectUrl="/">
              <Button variant={"outline"} className="w-full">
                Login
              </Button>
            </SignInButton>

            <SignUpButton mode="modal" forceRedirectUrl="/">
              <Button variant={"default"} className="w-full mt-2">
                Sign up
              </Button>
            </SignUpButton>
          </CardContent>
        </Card>
      </div>
    );
  }
  const user = await getUserByClerkId(authUser.id);
  // console.log(user);
  return (
    <div className="sticky top-20">
      <Card>
        <CardHeader className="justify-center items-center space-y-2">
          <Link href={`/profile/${user?.username}`}>
            <Avatar className="w-20 h-20 border-2">
              <AvatarImage src={user?.image || "/images/avatar.png"} />
            </Avatar>
          </Link>
          <CardTitle className="text-xl font-semibold text-center truncate">
            {user?.name}
          </CardTitle>
          <CardDescription className="text-center text-sm text-gray-600">
            <p>{user?.username} </p>
            {user?.bio && <p>{user?.bio}</p>}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex justify-around">
            <div className="text-center">
              <h6 className="font-bold">{user?._count.following}</h6>
              <p className="text-sm text-gray-600">Following</p>
            </div>
            <Separator orientation="vertical" className="h-12 w-[1px]" />
            <div className="text-center">
              <h6 className="font-bold">{user?._count.followers}</h6>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
          </div>
          <Separator />
          <div className="w-full space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5" />
              <span className="text-sm">{user?.location || "No Location"}</span>
            </div>
            {/* <div className="flex items-center space-x-2">
            <LinkIcon className="h-5 w-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm truncate">https://www.youtube.com</span>
          </div> */}
            <div className="flex items-center">
              <LinkIcon className="w-4 h-4 mr-3 shrink-0" />
              {user?.website ? (
                <a
                  href={`${user?.website}`}
                  className="hover:underline truncate cursor-pointer"
                  target="_blank"
                >
                  {user?.website}
                </a>
              ) : (
                "No website"
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
