import { CreateCaseView } from "@/components/cases/CreateCaseView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Create Case",
  "Post a new tuition case and invite tutors",
);

export default function CreateCasePage() {
  return <CreateCaseView />;
}
