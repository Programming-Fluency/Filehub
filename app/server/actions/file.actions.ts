"use server";

import prisma from "@/lib/prisma";
import { getUser } from "./user.actions";
import {
  createFileSchema,
  CreateFileData,
} from "@/app/main/validations/upload";

export async function createFile(data: CreateFileData) {
  try {
    // Validate the input data
    const validatedData = createFileSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0].message,
      };
    }

    // Get the database user
    const dbUser = await getUser(validatedData.data.clerkUserId);

    if (!dbUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Create the file in the database
    const file = await prisma.file.create({
      data: {
        title: validatedData.data.title,
        description: validatedData.data.description,
        coverImageURL: validatedData.data.coverImageURL,
        fileURL: validatedData.data.fileURL,
        userId: dbUser.id,
      },
    });

    return {
      success: true,
      file,
    };
  } catch (error) {
    console.error("Error creating file:", error);
    return {
      success: false,
      error: "Failed to create file. Please try again.",
    };
  }
}
