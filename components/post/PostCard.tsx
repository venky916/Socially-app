"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Dot, Heart, Trash2, MessageCircle, Loader2 } from "lucide-react";

import Image from "next/image";
import CommentBox from "./CommentBox";

import { SignInButton, useUser } from "@clerk/nextjs";
import { deletePost, getPosts, toggleLike } from "@/actions/post.action";
import { toast } from "sonner";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import DeleteAlertDialog from "../modal/DeleteAlertDialog";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

const PostCard = ({ post, userId }: { post: Post; userId: string | null }) => {
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const [hasLiked, setHasLiked] = useState(
    post?.likes.some((like) => like.userId === userId)
  );
  const [optimisticLikes, setOptimisticLikes] = useState(post?._count?.likes);

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (error) {
      console.log(error);
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === userId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result.success) toast.success("Post Deleted successfully");
      else throw new Error(result?.error);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="border w-full p-4 rounded-xl overflow-hidden">
        <div className="flex items-start gap-1 text-sm ">
          <Link href={`/profile/${post.author.username}`}>
            <Avatar>
              <AvatarImage src={post?.author.image || "/images/avatar.png"} />
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                <Link
                  href={`/profile/${post?.author.username}`}
                  className="font-semibold truncate"
                >
                  {post.author.name}
                </Link>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Link href={`/profile/${post?.author.username}`}>
                    @{post.author.username}
                  </Link>
                  <Dot className="-mr-1" />
                  <p>{formatDistanceToNow(new Date(post.createdAt))}</p>
                </div>
              </div>
              {userId === post.author.id &&
                (isDeleting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2
                    className="size-4 cursor-pointer"
                    onClick={() => setModalOpen(true)}
                  />
                ))}
            </div>
            <p className="mt-2 text-sm text-foreground break-words">
              {post.content}
            </p>
          </div>
        </div>
        {post.image && (
          <div className="rounded-lg overflow-hidden mt-2">
            <Image
              src={post.image || "/images/avatar.png"}
              alt="postContent"
              width={500}
              height={500}
              className=" w-full max-w-96 h-auto max-h-96 object-cover mx-auto rounded-sm"
            />
          </div>
        )}
        <div className="ml-3 mt-3">
          <div className="flex items-center space-x-4">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground gap-2 ${
                  hasLiked
                    ? "text-red-500 hover:text-red-600"
                    : "hover:text-red-500"
                }`}
                onClick={handleLike}
              >
                {hasLiked ? (
                  <Heart className="size-5 fill-current" />
                ) : (
                  <Heart className="size-5" />
                )}

                <span>{optimisticLikes}</span>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground gap-2"
                >
                  <Heart className="size-5" />
                  <span>{optimisticLikes}</span>
                </Button>
              </SignInButton>
            )}

            <Button
              variant={"ghost"}
              className="text-muted-foreground gap-2 hover:text-blue-500"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle
                className={`size-5 ${
                  showComments ? "fill-blue-500 text-blue-500" : ""
                }`}
              />
              <span>{post.comments.length}</span>
            </Button>
          </div>
        </div>

        {showComments && (
          <CommentBox comments={post.comments} postId={post.id} />
        )}
      </div>
      <DeleteAlertDialog
        open={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default PostCard;
