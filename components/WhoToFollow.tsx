import Image from "next/image";
import React from "react";
import { getRandomUsers } from "@/actions/user.action";
import { User } from "@prisma/client";
import Link from "next/link";
import FollowButton from "./FollowButton";

interface UserItemProps {
  user: User & {
    _count: {
      followers: number;
    };
  };
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-2 p-1">
      <Link href={`/profile/${user?.username}`}>
        <Image
          src={user.image || "/images/avatar.png"}
          alt="userAvatar"
          width={40}
          height={40}
          className="rounded-full overflow-hidden flex-shrink-0"
        />
      </Link>
      <div className="flex-1 text-xs ">
        <Link
          className=" cursor-pointer font-medium text-sm "
          href={`/profile/${user.username}`}
        >
          {user.name}
        </Link>
        <p className="text-muted-foreground">@{user.username}</p>
        <p className="text-muted-foreground">
          {user?._count.followers} Followers
        </p>
      </div>
      <FollowButton userId={user.id} />
    </div>
  );
};

const WhoToFollow = async () => {
  const users = await getRandomUsers();
  if (users.length === 0) return null;
  return (
    <div className="border p-4 min-h-[100px] rounded-xl shadow-sm sticky top-20">
      <h1> Who to Follow</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;
