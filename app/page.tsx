import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "./components/LandingPage";


export default async function HomePage() {

  // Check if user is authenticated with Clerk
  // const clerkUser = await currentUser();

  // if (clerkUser) {
  //   // User is authenticated, check if they exist in database
  //   const dbUser = await getUser(clerkUser.id);

  //   if (dbUser) {
  //     // Database user exists, check onboarding status
  //     if (dbUser.onboarded) {
  //       // User is onboarded, redirect to main app
  //       redirect("/main");
  //     } else {
  //       // User is not onboarded, redirect to onboarding
  //       redirect("/onboarding");
  //     }
  //   }
  // }

  // No Clerk user, show landing page
  return <LandingPage />;
}
