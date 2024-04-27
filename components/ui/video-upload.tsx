"use client";

import { CldUploadWidget } from "next-cloudinary";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileVideo, Trash } from "lucide-react";

interface VideoUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden "
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <video className="object-cover" src={url} controls />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset="sr90gznv"
        options={{
          clientAllowedFormats: ["video"],
          maxFileSize: 1073741824, // 1GB in bytes
          maxChunkSize: 100000 ** 6,
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <FileVideo className="h-4 w-4 mr-2" />
              Thêm video
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default VideoUpload;
