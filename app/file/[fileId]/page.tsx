import Image from "next/image";
import { getFile } from "@/app/server/actions/file.actions";
import FileCard from "@/app/main/components/FileCard";
import DownloadButton from "@/app/file/[fileId]/components/DownloadButton";

type FilePageProps = {
  params: Promise<{
    fileId: string;
  }>;
};

export default async function FilePublicPage({ params }: FilePageProps) {
  const { fileId } = await params;

  const result = await getFile(fileId);

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch file");
  }

  const file = result.file ?? null;

  if (!file) {
    throw new Error("File not found");
  }

  return (
    <div className="min-h-screen p-4 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* App Logo */}
        <div className="flex justify-center">
          <Image
            src="/assets/logo.svg"
            alt="FileHub Logo"
            width={150}
            height={50}
          />
        </div>

        {/* File Card */}
        <FileCard file={file} showDelete={false} />

        {/* Download Button */}
        <DownloadButton
          fileURL={file.fileURL}
          fileName={file.title}
          fileId={file.id}
        />
      </div>
    </div>
  );
}
