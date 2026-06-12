import Link from "next/link";
import { buttonClassName } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <h1 className="text-headline-lg text-on-surface">Page not found</h1>
      <p className="text-body-md text-on-surface-variant max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href={ROUTES.dashboard} className={buttonClassName({ variant: "secondary" })}>
        Back to Dashboard
      </Link>
    </main>
  );
}
