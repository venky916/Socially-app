"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";
import { createPost } from "@/actions/post.action";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

const CreatePost = () => {
  const { user } = useUser();

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;
    try {
      setIsPosting(true);
      const result = await createPost(content, imageUrl);

      if (result?.success) {
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);
        toast.success("Post Created successfully");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="border p-3 rounded-xl space-y-4">
      <div className="flex space-x-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.imageUrl || "/images/avatar.png"} />
        </Avatar>
        <Textarea
          className="border-none focus-visible:ring-0 resize-none min-h-[100px] text-base p-0"
          placeholder="What's on your mind"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPosting}
        />
      </div>
      {(showImageUpload || imageUrl) && (
        <div className="border rounded-lg p-4">
          <ImageUpload
            onChange={(url) => {
              setImageUrl(url);
              if (!url) setShowImageUpload(false);
            }}
            endpoint="postImage"
            value={imageUrl}
          />
        </div>
      )}
      {/* <hr /> */}
      <div className="flex justify-between items-center px-4 border-t pt-4">
        <Button
          variant={"ghost"}
          type="button"
          size={"sm"}
          onClick={() => setShowImageUpload(!showImageUpload)}
          disabled={isPosting}
        >
          <ImageIcon className="size-4" />
          <p>Photo</p>
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={(!content.trim() && !imageUrl) || isPosting}
        >
          {isPosting ? (
            <>
              <Loader2Icon className="animate-spin size-4" />
              Posting...
            </>
          ) : (
            <>
              <SendIcon className="size-4" />
              Post
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
