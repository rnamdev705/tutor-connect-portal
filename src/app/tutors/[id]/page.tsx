import { TutorProfileDetailView } from "@/components/tutors/TutorProfileDetailView";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ id: string }> };

export const metadata = createPageMetadata("Tutor Profile", "View tutor qualifications and experience");

export default async function TutorProfilePage({ params }: Props) {
  const { id } = await params;
  return <TutorProfileDetailView profileId={id} />;
}
