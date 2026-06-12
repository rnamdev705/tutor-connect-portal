import { DashboardView } from "@/components/dashboard/DashboardView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Dashboard",
  "Manage tuition requests and track tutor responses",
);

export default function DashboardPage() {
  return <DashboardView />;
}
