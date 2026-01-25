"use client";

import { useState } from "react";
import Image from "next/image";

interface AvatarUploadProps {
  userId: string;
  currentAvatar: string | null | undefined;
}

export default function AvatarUpload({
  userId,
  currentAvatar,
}: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(
    currentAvatar || "/images/portrait-placeholder-1x1.png",
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setPreview(data.url);

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setPreview(currentAvatar || "/images/portrait-placeholder-1x1.png");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[200px] h-[200px]">
        <Image
          src={preview}
          alt="Avatar"
          width={200}
          height={200}
          className="rounded-full object-cover w-full h-full"
        />
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">Uploading...</span>
          </div>
        )}
      </div>

      <label className="cursor-pointer bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600 transition-colors">
        {uploading ? "Uploading..." : "Change profile picture"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}
