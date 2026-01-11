import { Skeleton } from "@/components/ui/skeleton";

export default function OnboardingLoading() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Title Skeleton */}
        <div className="space-y-2 text-center">
          <Skeleton className="h-10 w-48 mx-auto" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>

        {/* Form Fields Skeleton */}
        <div className="space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Submit Button */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
