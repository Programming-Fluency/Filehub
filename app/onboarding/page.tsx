import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/app/server/actions/user.actions";
import OnboardingForm from "./components/OnboardingForm";

export default async function OnboardingPage() {
  // Check if user is authenticated with Clerk
  const clerkUser = await currentUser();

  // If no clerkUserId exists, redirect to sign-up
  if (!clerkUser) {
    redirect("/sign-up");
  }

  // Get the database user
  const dbUser = await getUser(clerkUser.id);

  // If no dbUser is returned, redirect to sign-up
  if (!dbUser) {
    redirect("/sign-up");
  }

  // Check if user is already onboarded
  if (dbUser.onboarded) {
    redirect("/main");
  }

  // Render the onboarding form
  return <OnboardingForm user={dbUser} />;
}
