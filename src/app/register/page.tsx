import { RegisterForm } from "@/components/auth/RegisterForm";
import { BRAND_NAME } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Create Account",
  `Join ${BRAND_NAME} as a parent or tutor`,
);

export default function RegisterPage() {
  return <RegisterForm />;
}
