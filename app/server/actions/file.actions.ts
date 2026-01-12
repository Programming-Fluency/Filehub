"use server";

import prisma from "@/lib/prisma";
import { getUser } from "./user.actions";
import {
  createFileSchema,
  CreateFileData,
} from "@/app/main/validations/upload";
import { revalidatePath } from "next/cache";

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

export async function getFiles(clerkUserId: string) {
  try {
    // Get the database user
    const dbUser = await getUser(clerkUserId);

    if (!dbUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Query the database to retrieve all files belonging to this user
    const files = await prisma.file.findMany({
      where: {
        userId: dbUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      files,
    };
  } catch (error) {
    console.error("Error fetching files:", error);
    return {
      success: false,
      error: "Failed to fetch files. Please try again.",
    };
  }
}

export async function deleteFile(fileId: string) {
  try {
    // Check if the file exists
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      return {
        success: false,
        error: "File not found",
      };
    }

    // Delete the file from the database
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });
    revalidatePath('/main/files')
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      success: false,
      error: "Failed to delete file. Please try again.",
    };
  }
}

export async function getFile(fileId: string) {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      return {
        success: false,
        error: "File not found",
      };
    }

    return {
      success: true,
      file,
    };
  } catch (error) {
    console.error("Error fetching file:", error);
    return {
      success: false,
      error: "Failed to fetch file. Please try again.",
    };
  }
}

export async function incrementDownload(fileId: string) {
  try {
    await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: `Failed to increment download: ${errorMessage}`,
    };
  }
}
