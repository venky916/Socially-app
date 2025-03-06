"use client";
import { getProfileByUsername, getUserPosts } from "@/actions/profile.action";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, FileText, Heart, Link, MapPin } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toggleFollow } from "@/actions/user.action";
import { toast } from "sonner";
import EditProfileModal from "@/components/modal/EditProfileModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/post/PostCard";

type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;

interface ProfilePageClientProps {
  user: NonNullable<User>;
  posts: Posts;
  likedPosts: Posts;
  isFollowing: boolean;
}

const ProfilePageClient = ({
  user,
  posts,
  likedPosts,
  isFollowing: initialIsFollowing,
}: ProfilePageClientProps) => {
  const { user: currentUser } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);

  const isOwnProfile =
    currentUser?.username === user?.username ||
    currentUser?.emailAddresses[0].emailAddress.split("@")[0] ===
      user?.username;

  const formattedDate = format(new Date(user?.createdAt), "MMMM yyyy");

  const handleFollow = async () => {
    if (!currentUser) return;
    if (!user) return;
    try {
      setIsUpdatingFollow(true);
      await toggleFollow(user.id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update follow status");
    } finally {
      setIsUpdatingFollow(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl">
        <div className="border p-4 max-w-lg mx-auto rounded-xl">
          <div className="flex flex-col justify-center items-center gap-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.image ?? "/images/avatar.png"} />
            </Avatar>
            <h1 className="font-bold text-2xl">
              {user?.name ?? user?.username}
            </h1>
            <p className="text-sm text-muted-foreground">@{user?.username}</p>
            <p className="text-sm truncate">{user?.bio}</p>
          </div>
          <div className="flex justify-around items-center my-2 px-4">
            <div className="text-center">
              <p>{user?._count.following}</p>
              <p>Following</p>
            </div>
            <Separator orientation="vertical" className="h-12 w-[1px]" />
            <div className="text-center">
              <p>{user?._count.followers}</p>
              <p>Followers</p>
            </div>
            <Separator orientation="vertical" className="h-12 w-[1px]" />
            <div className="text-center">
              <p>{user?._count.posts}</p>
              <p>Posts</p>
            </div>
          </div>

          {!currentUser ? (
            <SignInButton mode="modal">
              <Button className="w-full mt-4">Follow</Button>
            </SignInButton>
          ) : isOwnProfile ? (
            <Button
              className="w-full my-2"
              onClick={() => setOpenModal(!openModal)}
            >
              <Edit />
              Edit Profile
            </Button>
          ) : (
            <Button
              className="w-full my-2"
              onClick={handleFollow}
              disabled={isUpdatingFollow}
              variant={isFollowing ? "outline" : "default"}
            >
              {isFollowing ? "UnFollow" : "Follow"}
            </Button>
          )}

          <div className="flex flex-col justify-start gap-2 ">
            {user?.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" />
                <p>{user?.location}</p>
              </div>
            )}

            {user?.website && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Link className="size-4" />
                <a
                  href={
                    user.website.startsWith("http")
                      ? user.website
                      : `https://${user.website}`
                  }
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4" />
              Joined {formattedDate}
            </div>
          </div>
        </div>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="border-b bg-transparent w-full justify-start h-auto rounded-none pb-2">
            <TabsTrigger
              value="posts"
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent px-6 font-semibold"
            >
              <FileText className="size-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent px-6 font-semibold"
            >
              <Heart className="size-4" />
              Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-6">
              {(posts && posts?.length > 0) ? (
                posts?.map((post) => (
                  <PostCard key={post.id} post={post} userId={user?.id} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No posts yet
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="likes" className="mt-6">
            <div className="space-y-6">
              {(likedPosts && likedPosts.length > 0) ? (
                likedPosts.map((post) => (
                  <PostCard key={post.id} post={post} userId={user?.id} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No liked posts to show
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      />
    </>
  );
};

export default ProfilePageClient;
