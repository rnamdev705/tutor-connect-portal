import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseWorkspaceView } from "@/components/cases/CaseWorkspaceView";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { getCase } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const caseDetail = getCase(id);

  if (!caseDetail) {
    return createPageMetadata("Case Not Found");
  }

  return createPageMetadata(caseDetail.title, `Case ${caseDetail.caseId} workspace`);
}

export default async function CaseWorkspacePage({ params }: Props) {
  const { id } = await params;
  const caseDetail = getCase(id);

  if (!caseDetail) {
    notFound();
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <PortalHeader active="cases" />
      <div className="flex max-w-7xl mx-auto">
        <PortalSidebar active="cases" />
        <main className="flex-1 p-6 md:p-10 min-w-0">
          <CaseWorkspaceView caseDetail={caseDetail} />
        </main>
      </div>
    </div>
  );
}
