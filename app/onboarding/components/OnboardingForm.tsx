"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  onboardingFormSchema,
  OnboardingFormData,
} from "@/app/onboarding/validations/onboarding";
import { onboardUser } from "@/app/server/actions/user.actions";

type OnboardingFormProps = {
  user: {
    clerkUserId: string;
    name: string;
    email: string;
    username: string;
  };
};

export default function OnboardingForm({ user }: OnboardingFormProps) {
  const router = useRouter();

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
    },
  });

  async function onSubmit(data: OnboardingFormData) {
    try {
      const result = await onboardUser(user.clerkUserId, data);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.success) {
        toast("Welcome to FileHub!", {
          description: "Your account is all set up. Let's get started!",
          position: "top-center",
          style: {
            backgroundColor: "#EFF6FF",
            border: "1px solid #3B82F6",
            color: "#1E3A8A",
          },
        });

        router.push("/main");
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Failed to complete onboarding. Please try again.",
        position: "top-center",
      });
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-8 animate-fade-in">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Fill in your details to get started with FileHub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="onboarding-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="onboarding-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="onboarding-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="onboarding-username">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="onboarding-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your username"
                      autoComplete="username"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="onboarding-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="onboarding-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="onboarding-form"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Setting up..." : "Get Started"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
