"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  uploadFileFormSchema,
  UploadFileFormData,
} from "@/app/main/validations/upload";
import { UploadButton } from "@/lib/uploadthing";
import { useUser } from "@clerk/nextjs";
import { createFile } from "@/app/server/actions/file.actions";

// Type for uploaded file data returned from UploadThing
type UploadedFileData = {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
};

export default function UploadFileForm() {
  const router = useRouter();
  // Get authenticated user
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<UploadedFileData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFileData | null>(
    null
  );

  // Initialize React Hook Form
  const form = useForm<UploadFileFormData>({
    resolver: zodResolver(uploadFileFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Handle form submission
  async function handleSubmit(data: UploadFileFormData) {
    // Validate cover image
    if (!coverImage) {
      toast.error("Cover image is required", {
        description: "Please upload a cover image for your file.",
        position: "top-center",
      });
      return;
    }

    // Validate uploaded file
    if (!uploadedFile) {
      toast.error("File is required", {
        description: "Please upload a file to share.",
        position: "top-center",
      });
      return;
    }

    if (!user) {
      toast.error("Authentication required", {
        description: "You must be signed in to upload files.",
        position: "top-center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the create file server action
      const result = await createFile({
        title: data.title,
        description: data.description,
        coverImageURL: coverImage.fileUrl,
        fileURL: uploadedFile.fileUrl,
        fileName: uploadedFile.fileName,
        fileSize: uploadedFile.fileSize,
        clerkUserId: user.id,
      });

      // Handle the response
      if (result.success) {
        toast.success("File uploaded successfully!", {
          description: "Your file is now available to share.",
          position: "top-center",
        });
        router.push("/main/files");
      } else {
        toast.error("Upload failed", {
          description: result.error || "Something went wrong. Please try again.",
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Upload failed", {
        description: "An unexpected error occurred. Please try again.",
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        {/* Title Field */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="upload-form-title">Title</FieldLabel>
              <Input
                {...field}
                id="upload-form-title"
                aria-invalid={fieldState.invalid}
                placeholder="Enter file title"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Description Field */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="upload-form-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="upload-form-description"
                aria-invalid={fieldState.invalid}
                placeholder="Enter file description"
                className="min-h-[100px] resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Cover Image Upload */}
        <Field>
          <FieldLabel>Cover Image</FieldLabel>
          <UploadButton
            endpoint="fileUploader"
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                setCoverImage({
                  fileUrl: res[0].serverData.fileUrl,
                  fileName: res[0].serverData.fileName,
                  fileSize: res[0].serverData.fileSize,
                  uploadedBy: res[0].serverData.uploadedBy,
                });
                toast.success("Cover image uploaded!");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload error: ${error.message}`);
            }}
          />
          {coverImage && (
            <p className="text-sm text-gray-600">
              Uploaded: {coverImage.fileName}
            </p>
          )}
        </Field>

        {/* File Upload */}
        <Field>
          <FieldLabel>File</FieldLabel>
          <UploadButton
            endpoint="fileUploader"
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                setUploadedFile({
                  fileUrl: res[0].serverData.fileUrl,
                  fileName: res[0].serverData.fileName,
                  fileSize: res[0].serverData.fileSize,
                  uploadedBy: res[0].serverData.uploadedBy,
                });
                toast.success("File uploaded!");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload error: ${error.message}`);
            }}
          />
          {uploadedFile && (
            <p className="text-sm text-gray-600">
              Uploaded: {uploadedFile.fileName}
            </p>
          )}
        </Field>
      </FieldGroup>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? "Uploading..." : "Upload File"}
        </Button>
      </div>
    </form>
  );
}
