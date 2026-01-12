"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FilesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center px-4 py-16">
      <AlertCircle className="h-16 w-16 text-red-600" />
      <h1 className="text-2xl font-bold text-gray-900 mt-6">
        Something Went Wrong
      </h1>
      <p className="text-gray-600 mt-2 text-center">
        We encountered an error while loading your files. Please try again.
      </p>
      <Button
        onClick={() => reset()}
        className="mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Try Again
      </Button>
    </div>
  );
}
