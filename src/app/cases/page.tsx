import { CasesView } from "@/components/cases/CasesView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "My Cases",
  "View and manage your tuition cases",
);

export default function CasesPage() {
  return <CasesView />;
}
