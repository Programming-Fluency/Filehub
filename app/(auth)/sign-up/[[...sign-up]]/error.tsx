"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function SignUpError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Registration Error
          </h1>
          <p className="text-gray-600">
            Something went wrong while loading the sign-up page. Please try again.
          </p>
        </div>

        {/* Try Again Button */}
        <Button
          onClick={() => reset()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          size="lg"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
