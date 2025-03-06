"use client";
import { UploadDropzone } from "@/lib/uploadThing";
import Image from "next/image";
import React from "react";
import { X } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

const ImageUpload = ({ endpoint, onChange, value }: ImageUploadProps) => {
  if (value) {
    return (
      <div className="relative size-40">
        <Image
          src={value}
          alt="upload"
          className="rounded-md size-52 object-cover"
          fill
        />
        <button
          className="absolute top-0 right-0 p-2 bg-rose-500 rounded-full shadow-sm cursor-pointer "
          onClick={() => onChange("")}
        >
          <X className="size-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default ImageUpload;
