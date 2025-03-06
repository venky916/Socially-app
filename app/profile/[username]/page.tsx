import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./_components/ProfilePageClient";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  try {
    const user = await getProfileByUsername(params.username);

    if (!user) {
      return {
        title: "User Not Found",
        description: "This profile does not exist.",
      };
    }

    return {
      title: `${user.name ?? user.username}`,
      description: user.bio || `Check out ${user.username}'s profile`,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);

    return {
      title: "Error",
      description: "Something went wrong while loading this profile.",
    };
  }
}

const ProfilePageServer = async ({
  params,
}: {
  params: { username: string };
}) => {
  const user = await getProfileByUsername(params.username);

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
};

export default ProfilePageServer;
