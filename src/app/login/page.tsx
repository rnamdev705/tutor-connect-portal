import { LoginForm } from "@/components/auth/LoginForm";
import { BRAND_NAME } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Sign In",
  `Sign in to your ${BRAND_NAME} account`,
);

export default function LoginPage() {
  return <LoginForm />;
}
