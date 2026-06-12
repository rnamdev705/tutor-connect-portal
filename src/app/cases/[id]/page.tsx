import { CaseWorkspaceClient } from "@/components/cases/CaseWorkspaceClient";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ id: string }> };

export const metadata = createPageMetadata("Case Workspace", "Secure case workspace for parents and invited tutors");

export default async function CaseWorkspacePage({ params }: Props) {
  const { id } = await params;
  return <CaseWorkspaceClient caseId={id} />;
}
