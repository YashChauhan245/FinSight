"use server";

import { AuthError } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { authConfig } from "@/auth.config";
import { getWorkspaceRedirect } from "@/lib/auth-redirect";
import { registerUser } from "./signup";

export async function authenticate(mode, callbackUrl, _previousState, formData) {
  const redirectTo = getWorkspaceRedirect(callbackUrl);
  const provider = formData.get("provider");
  const isRegistration = mode === "sign-up";

  if (provider) {
    if (!authConfig.providers.some((option) => option.id === provider)) {
      return { error: "That sign-in option is unavailable." };
    }
    try {
      return await signIn(provider, { redirectTo });
    } catch (error) {
      if (!(error instanceof AuthError)) throw error;
      return { error: "Could not start sign-in. Please try again." };
    }
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Enter your email and password." };

  if (isRegistration) {
    if (password !== formData.get("confirmPassword")) {
      return { error: "Passwords do not match." };
    }
    const name = String(formData.get("name") || "").trim();
    const result = await registerUser({ name, email, password });
    if (!result.success) return { error: result.error };
  }

  try {
    await signIn("credentials", { email, password, redirectTo, redirect: false });
  } catch (error) {
    if (!(error instanceof AuthError)) throw error;
    if (isRegistration) {
      return { error: "Your account was created. Please sign in to continue." };
    }
    return {
      error: error.type === "CredentialsSignin"
        ? "Invalid email or password."
        : "Could not sign in. Please try again.",
    };
  }

  redirect(redirectTo, RedirectType.replace);
}

export async function endSession() {
  await signOut({ redirectTo: "/", redirect: false });
  redirect("/", RedirectType.replace);
}
