import { TutorsDirectoryView } from "@/components/tutors/TutorsDirectoryView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Tutor Directory",
  "Browse verified tutors by subject, level, and availability",
);

export default function TutorsPage() {
  return <TutorsDirectoryView />;
}
