import { Skeleton } from "@/components/ui/skeleton";

export default function MainLoading() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Page Title Skeleton */}
        <div className="text-center space-y-2">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Upload Button Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-12 w-48 rounded-lg" />
        </div>

        {/* Content Area Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
