import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/post/CreatePost";
import PostCard from "@/components/post/PostCard";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import { Loader } from "lucide-react";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const userId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="col-span-1 lg:col-span-6">
        {user ? <CreatePost /> : null}
        <div className="space-y-6 mt-4">
          {posts && userId ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} userId={userId} />
            ))
          ) : (
            <Loader className="text-sky-600 text-4xl" size={60} />
          )}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4">
        <WhoToFollow />
      </div>
    </div>
  );
}
