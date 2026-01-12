"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Share2, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteFile } from "@/app/server/actions/file.actions";

type FileCardProps = {
  file: {
    id: string;
    coverImageURL: string;
    title: string;
    description: string;
    downloads: number;
  };
  showDelete?: boolean;
};

export default function FileCard({ file, showDelete = true }: FileCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Format downloads text
  const getDownloadsText = () => {
    if (file.downloads === 0) {
      return "No downloads";
    } else if (file.downloads === 1) {
      return "1 download";
    } else {
      return `${file.downloads} downloads`;
    }
  };

  // Handle delete button click
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteFile(file.id);

      if (result.success) {
        toast.success("File deleted successfully!", {
          description: "The file has been removed.",
          position: "top-center",
        });
        router.refresh();
      } else {
        toast.error("Failed to delete file", {
          description: result.error || "Please try again.",
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to delete file", {
        description: "An unexpected error occurred. Please try again.",
        position: "top-center",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle share button click
  const handleShare = async () => {
    const publicLink = `${process.env.NEXT_PUBLIC_APP_URL}/file/${file.id}`;

    try {
      await navigator.clipboard.writeText(publicLink);
      toast.success("Link copied to clipboard!", {
        description: "You can now share this link with others.",
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to copy link", {
        description: "Please try again.",
        position: "top-center",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover Image */}
      <div className="relative h-48 w-full">
        <Image
          src={file.coverImageURL}
          alt={file.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {file.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{file.description}</p>

        {/* Downloads */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Download className="h-4 w-4" />
          <span>{getDownloadsText()}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleShare}
            className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          {showDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={isDeleting}
                  variant="outline"
                  className="cursor-pointer border-red-600 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete File</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &quot;{file.title}&quot;? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
