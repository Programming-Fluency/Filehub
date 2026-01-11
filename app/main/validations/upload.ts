import { z } from "zod";

// Schema for the upload form on the client side
export const uploadFileFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .trim()
    .min(50, "Description must be at least 50 characters")
    .max(500, "Description must not exceed 500 characters"),
});

// Schema for creating a file entry in the database on the server side
export const createFileSchema = uploadFileFormSchema.extend({
  coverImageURL: z.url("Cover image must be a valid URL"),
  fileURL: z.url("File URL must be a valid URL"),
  fileName: z.string().min(1, "File name cannot be empty"),
  fileSize: z.number().positive("File size must be a positive number"),
  clerkUserId: z.string().min(1, "User ID cannot be empty"),
});

// Export types
export type UploadFileFormData = z.infer<typeof uploadFileFormSchema>;
export type CreateFileData = z.infer<typeof createFileSchema>;
