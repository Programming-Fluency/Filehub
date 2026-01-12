import { Skeleton } from "@/components/ui/skeleton";

export default function FileLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Cover Image Skeleton */}
        <Skeleton className="w-full h-64 rounded-lg" />

        {/* Title Skeleton */}
        <Skeleton className="h-8 w-3/4" />

        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* File Info Skeleton */}
        <div className="flex gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Download Button Skeleton */}
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
