import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/app/server/actions/user.actions";
import UploadFileModal from "./components/UploadFileModal";

export default async function MainPage() {
  // Check if user is authenticated with Clerk
  const clerkUser = await currentUser();

  // If no Clerk user exists, redirect to sign-in
  if (!clerkUser) {
    redirect("/sign-in");
  }

  // Get the database user using the Clerk user ID
  const dbUser = await getUser(clerkUser.id);

  // If no database user is found, redirect to sign-in as a safety fallback
  if (!dbUser) {
    redirect("/sign-in");
  }

  // If the user exists but is not onboarded, redirect to onboarding
  if (!dbUser.onboarded) {
    redirect("/onboarding");
  }

  // User is authenticated, exists in database, and is onboarded - render the main content
  return <UploadFileModal />;
}
