import { ProfilePageView } from "@/components/profile/ProfilePageView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "My Profile",
  "View your account and manage your profile",
);

export default function ProfilePage() {
  return <ProfilePageView />;
}
