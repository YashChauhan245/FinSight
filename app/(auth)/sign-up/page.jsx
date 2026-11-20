import AuthForm from "@/components/auth-form";
import { signInProviders } from "@/auth.config";
import { getWorkspaceRedirect } from "@/lib/auth-redirect";

export default async function SignUpPage({ searchParams }) {
  const { callbackUrl } = await searchParams;
  return <AuthForm mode="sign-up" callbackUrl={getWorkspaceRedirect(callbackUrl)} providers={signInProviders} />;
}
