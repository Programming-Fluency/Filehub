import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { UserPlus, Upload, Share2 } from "lucide-react";
import { getUser } from "@/app/server/actions/user.actions";

export default async function SignUpPage() {
  // Check if user is authenticated with Clerk
  const clerkUser = await currentUser();

  if (clerkUser) {
    // User is authenticated, check if they exist in database
    const dbUser = await getUser(clerkUser.id);

    if (dbUser) {
      // Database user exists, check onboarding status
      if (dbUser.onboarded) {
        // User is onboarded, redirect to main app
        redirect("/main");
      } else {
        // User is not onboarded, redirect to onboarding
        redirect("/onboarding");
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Logo, Slogan, and Steps */}
        <div className="space-y-8 lg:space-y-12">
          {/* Logo */}
          <div className="flex justify-center">
              <Image
                src="/assets/logo.svg"
                alt="FileHub Logo"
                width={250}
                height={250}
              />
            </div>

          {/* Slogan */}
          <div className="space-y-3 lg:space-y-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-black">
              File Sharing Made Simple
            </h1>
            <p className="text-base sm:text-lg text-gray-700">
              Upload and share your files with public links that work everywhere.
            </p>
          </div>

          {/* Three Steps - Horizontal Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {/* Step 1: Sign Up */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-base font-medium text-gray-800">Sign Up</span>
            </div>

            {/* Step 2: Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-base font-medium text-gray-800">Upload</span>
            </div>

            {/* Step 3: Share */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-base font-medium text-gray-800">Share</span>
            </div>
          </div>
        </div>

        {/* Right Side - Clerk SignUp Component */}
        <div className="flex justify-center items-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
