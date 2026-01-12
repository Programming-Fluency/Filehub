import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/app/server/actions/user.actions";
import { getFiles } from "@/app/server/actions/file.actions";
import { FolderOpen } from "lucide-react";
import FileCard from "../components/FileCard";

export default async function FilesPage() {
  // Check if user is authenticated with Clerk
  const clerkUser = await currentUser();

  // If no Clerk user exists, redirect to sign-in
  if (!clerkUser) {
    redirect("/sign-in");
  }

  // Get the database user using the Clerk user ID
  const dbUser = await getUser(clerkUser.id);

  // If no database user is found, redirect to sign-in
  if (!dbUser) {
    redirect("/sign-in");
  }

  // Fetch the user's files
  const result = await getFiles(clerkUser.id);

  // If the result is not successful, throw an error
  if (!result.success) {
    throw new Error(result.error || "Failed to fetch files");
  }

  // Extract files from the result, defaulting to empty array
  const files = result.files ?? [];

  return (
    <section className="min-h-full w-full px-4 py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">My Files</h1>
          <p className="text-lg text-gray-600 mt-4">
            Manage and share your uploaded files
          </p>
        </div>

        {/* Files Grid or Empty State */}
        {files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <FolderOpen className="h-24 w-24 text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-700 mt-6">
              No files yet
            </h2>
            <p className="text-gray-500 mt-2 text-center max-w-md">
              You haven't uploaded any files yet. Start sharing by uploading
              your first file.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
