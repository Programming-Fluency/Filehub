"use server";

import prisma from "@/lib/prisma";
import { onboardingFormSchema } from "@/app/onboarding/validations/onboarding";

// Type representing the data we get from Clerk when a user is created or updated via a webhook
export type ClerkUserWebhookData = {
  id: string;
  email_addresses: { email_address: string }[];
  first_name?: string;
  last_name?: string;
  username?: string;
};

// Type representing the data submitted during user onboarding
export type OnboardingData = {
  name: string;
  email: string;
  username: string;
};

export async function createOrUpdateUser(data: ClerkUserWebhookData) {
  try {
    // Destructure the data from Clerk webhook
    const {
      id: clerkUserId,
      email_addresses,
      first_name,
      last_name,
      username: clerkUsername,
    } = data;

    // Get the primary email address
    const email = email_addresses[0]?.email_address;

    if (!email) {
      throw new Error("No email address provided");
    }

    // Construct name: combine first and last name, fallback to username or email local part
    const name =
      first_name && last_name
        ? `${first_name} ${last_name}`
        : first_name || last_name || clerkUsername || email.split("@")[0];

    // Determine username: use Clerk username, or email local part
    const username = clerkUsername || email.split("@")[0];

    // Upsert user: update if exists, create if not
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {
        email,
        name,
        username,
      },
      create: {
        clerkUserId,
        email,
        name,
        username,
      },
    });

    return user;
  } catch (error) {
    throw new Error(
      `Failed to create or update user: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function deleteUser(clerkUserId: string) {
  try {
    const user = await prisma.user.delete({
      where: { clerkUserId },
    });

    return user;
  } catch (error) {
    throw new Error(
      `Failed to delete user: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function getUser(clerkUserId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    return user;
  } catch (error) {
    throw new Error(
      `Failed to get user: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function onboardUser(clerkUserId: string, data: OnboardingData) {
  try {
    // Validate the incoming data against the onboarding Zod schema
    const validation = onboardingFormSchema.safeParse(data);

    // If validation fails, return failure response with first error message
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message,
      };
    }

    // Update the user in the database
    const user = await prisma.user.update({
      where: { clerkUserId },
      data: {
        name: validation.data.name,
        email: validation.data.email,
        username: validation.data.username,
        onboarded: true,
      },
    });

    // Return success response with updated user
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    // Return failure response with error message
    return {
      success: false,
      error: `Failed to onboard user: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
