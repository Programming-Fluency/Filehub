"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { incrementDownload } from "@/app/server/actions/file.actions";

type DownloadButtonProps = {
  fileURL: string;
  fileName: string;
  fileId: string;
};

export default function DownloadButton({
  fileURL,
  fileName,
  fileId,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);

    try {
      const response = await fetch(fileURL);

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobURL;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(blobURL);

      await incrementDownload(fileId);

      toast.success("Download started!", {
        description: "Your file is being downloaded.",
        position: "top-center",
      });
    } catch (error) {
      toast.error("Download failed", {
        description: "Something went wrong. Please try again.",
        position: "top-center",
      });
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="h-5 w-5 mr-2" />
          Download File
        </>
      )}
    </Button>
  );
}
