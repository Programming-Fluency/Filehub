import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side - Slogan and Steps Skeleton */}
        <div className="lg:col-span-5 space-y-8 lg:space-y-12">
          {/* Slogan Skeleton */}
          <div className="space-y-3 lg:space-y-4 text-center">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full mx-auto" />
          </div>

          {/* Three Steps Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-5 w-16" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-5 w-16" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>

        {/* Right Side - Logo and Buttons Skeleton */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-8 lg:space-y-10">
          {/* Logo Skeleton */}
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <Skeleton className="w-full aspect-square rounded-lg" />
          </div>

          {/* Auth Buttons Skeleton */}
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md space-y-4">
            <Skeleton className="h-12 sm:h-14 w-full rounded-lg" />
            <Skeleton className="h-12 sm:h-14 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
