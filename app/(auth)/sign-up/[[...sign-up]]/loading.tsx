import { Skeleton } from "@/components/ui/skeleton";

export default function SignUpLoading() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* Form Fields Skeleton */}
        <div className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Submit Button */}
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Divider Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-px flex-1" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-px flex-1" />
        </div>

        {/* Social Login Buttons Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Footer Link Skeleton */}
        <div className="flex justify-center gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
