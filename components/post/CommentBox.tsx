"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Dot, LogIn, Send } from "lucide-react";
import { Comment, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { SignInButton, useUser } from "@clerk/nextjs";
import { createComment } from "@/actions/post.action";
import { toast } from "sonner";

type Author = Pick<User, "id" | "name" | "image" | "username">;

type CommentWithAuthor = Comment & {
  author: Author;
};

interface CommentBoxProps {
  comments: CommentWithAuthor[];
  postId: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comments, postId }) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment(postId, newComment);
      if (result?.success) {
        toast.success("Comment Posted successfully");
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className="border-t pt-4 space-y-2">
      <div className="space-y-4">
        {comments.map((comment: CommentWithAuthor) => (
          <div key={comment.id} className="flex items-center gap-2 text-sm ">
            <Avatar className="size-8 flex-shrink-0">
              <AvatarImage src={comment.author.image ?? "/images/avatar.png"} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium text-sm">
                  {comment.author.name}
                </span>
                <span className="text-muted-foreground">
                  @{comment.author.username}
                </span>
                <div className="flex items-start">
                  <Dot className="text-sm size-5 text-muted-foreground -mr-1" />
                  <span className="text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm break-words">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {user ? (
        <div className="flex space-x-3">
          <Avatar className="size-8 flex-shrink-0">
            <AvatarImage src={user.imageUrl || "/images/avatar.png"} />
          </Avatar>
          <div className="flex-1">
            <Textarea
              className="resize-none min-h-[80px] text-base p-2"
              placeholder="What's on your mind"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button
                size={"sm"}
                onClick={handleAddComment}
                className="flex items-center gap-2"
                disabled={!newComment.trim() || isCommenting}
              >
                {isCommenting ? (
                  "Posting..."
                ) : (
                  <>
                    <Send className="size-4" />
                    Comment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
          <SignInButton mode="modal">
            <Button variant="outline" className="gap-2">
              <LogIn className="size-4" />
              Sign in to comment
            </Button>
          </SignInButton>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
