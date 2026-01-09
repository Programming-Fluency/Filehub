import Link from "next/link";
import Image from "next/image";
import { UserPlus, Upload, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side - Slogan and Steps */}
        <div className="lg:col-span-5 space-y-8 lg:space-y-12">
          {/* Slogan */}
          <div className="space-y-3 lg:space-y-4 text-center">
            <h1 className="text-3xl font-bold text-black">
              File Sharing Made Simple
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700">
              Upload and share your files with public links that work everywhere.
            </p>
          </div>

          {/* Three Steps - Horizontal Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {/* Step 1: Sign Up */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <span className="text-base sm:text-lg font-medium text-gray-800">Sign Up</span>
            </div>

            {/* Step 2: Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <span className="text-base sm:text-lg font-medium text-gray-800">Upload</span>
            </div>

            {/* Step 3: Share */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <span className="text-base sm:text-lg font-medium text-gray-800">Share</span>
            </div>
          </div>
        </div>

        {/* Right Side - Logo and Buttons */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-8 lg:space-y-10">
          {/* Logo */}
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <Image
              src="/assets/logo.svg"
              alt="FileHub Logo"
              width={400}
              height={400}
            />
          </div>

          {/* Auth Buttons */}
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md space-y-4">
            {/* Sign In Button - Pure Blue */}
            <Link href="/sign-in" className="block w-full">
              <Button
                className="cursor-pointer w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                size="lg"
              >
                Sign In
              </Button>
            </Link>

            {/* Sign Up Button - Pure White */}
            <Link href="/sign-up" className="block w-full">
              <Button
                className="cursor-pointer  w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 rounded-lg"
                variant="outline"
                size="lg"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
