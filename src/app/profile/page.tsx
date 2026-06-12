import { TutorProfileEditView } from "@/components/profile/TutorProfileEditView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "My Profile",
  "Manage your tutor profile and supporting documents",
);

export default function ProfilePage() {
  return <TutorProfileEditView />;
}
