"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadFileForm from "./UploadFileForm";

export default function UploadFileModal() {
  return (
    <section className="min-h-full w-full px-4 py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Upload Your Files
          </h1>
          <p className="text-lg text-gray-600">
            Share your files easily with a public link
          </p>
        </div>

        {/* Dialog Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg px-8"
              size="lg"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload a New File</DialogTitle>
              <DialogDescription>
                Upload your file and share it with others using a public link.
              </DialogDescription>
            </DialogHeader>
            <UploadFileForm />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

