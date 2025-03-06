"use client";
import EditProfileModal from "@/components/modal/EditProfileModal";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, FileText, Heart, Link, MapPin } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState(true);
  return (
    <>
      <div className="max-w-4xl">
        <div className="border p-4 max-w-lg mx-auto rounded-xl">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={"/images/avatar.png"}
              alt="Profile"
              width={90}
              height={90}
            />
            <p className="font-bold text-lg">Venkatesh Maliga</p>
            <p className="text-sm text-gray-600">@venkateshmaliga</p>
            <p className="text-sm">Software Engineer @ google</p>
          </div>
          <div className="flex justify-between items-center my-2 px-4">
            <div className="text-center">
              <p>1</p>
              <p>Following</p>
            </div>
            <div className="text-center">
              <p>2</p>
              <p>Followers</p>
            </div>
            <div className="text-center">
              <p>5</p>
              <p>Posts</p>
            </div>
          </div>
          <Button
            className="w-full my-2"
            onClick={() => setOpenModal(!openModal)}
          >
            <Edit />
            Edit Profile
          </Button>
          <div className="flex flex-col justify-start gap-2 ">
            <div className="flex items-center gap-2">
              <MapPin />
              <p>Turkey</p>
            </div>
            <div className="flex items-center gap-2">
              <Link />
              <p>www.youtube.com/asaprogrammer</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar />
              <p>Joined December 2024</p>
            </div>
          </div>
        </div>
        <div>
          <div className="border-b mt-2 flex items-center gap-4">
            <Button variant={"ghost"} onClick={() => setPosts(true)}>
              <FileText />
              <p>Posts</p>
            </Button>
            <Button variant={"ghost"} onClick={() => setPosts(false)}>
              <Heart />
              <p>Likes</p>
            </Button>
          </div>
          <div className="">
            {posts ? (
              <p className="text-center mt-4">No Posts Yet</p>
              // <PostCard />
            ) : (
              <p className="text-center mt-4">No Likes Yet</p>
            )}
          </div>
        </div>
      </div>
      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      />
    </>
  );
};

export default UserProfile;
