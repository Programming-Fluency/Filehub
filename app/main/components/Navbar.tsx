import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Upload, FolderOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 border-b bg-white shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">
          {/* Left side - Logo */}
          <Link href="/main" className="hover:scale-125 transition-transform h-full py-4">
            <Image
              src="/assets/logo.svg"
              alt="FileHub Logo"
              width={160}
              height={64}
              className="h-full w-auto object-contain"
            />
          </Link>

          {/* Center - Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/main"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:scale-125 transition-all"
            >
              <Upload className="h-5 w-5" />
              <span className="font-bold text-2xl">Add File</span>
            </Link>
            <Link
              href="/main/files"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:scale-125  transition-all"
            >
              <FolderOpen className="h-5 w-5" />
              <span className="font-bold text-2xl">My Files</span>
            </Link>
          </div>

          {/* Right side - User Button */}
          <div className="hover:scale-125  transition-transform">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: '3rem',
                    height: '3rem',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
