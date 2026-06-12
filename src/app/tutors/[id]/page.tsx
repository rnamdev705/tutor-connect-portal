import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { Badge, Button, Card, Icon, Tag } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { getTutor } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ id: string }> };

const tabs = ["Overview", "Experience & History", "Shared Documents (3)", "Reviews"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tutor = getTutor(id);

  if (!tutor) {
    return createPageMetadata("Tutor Not Found");
  }

  return createPageMetadata(tutor.name, tutor.title);
}

export default async function TutorProfilePage({ params }: Props) {
  const { id } = await params;
  const tutor = getTutor(id);
  if (!tutor) notFound();

  const credentials = tutor.credentials ?? [];
  const languages = tutor.languages ?? ["English (Native)"];
  const quickDetails = tutor.quickDetails ?? [
    { label: "Experience", value: tutor.experience },
    { label: "Rating", value: `${tutor.rating} / 5` },
    { label: "Reviews", value: String(tutor.reviews) },
    { label: "Rate", value: tutor.rate },
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <PortalHeader active="tutors" />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Card
          variant="profile"
          padding="lg"
          className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-10 relative overflow-hidden"
        >
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface shadow-sm relative">
              <Image src={tutor.image} alt={tutor.name} fill className="object-cover" priority />
            </div>
            {tutor.verified && (
              <Badge
                variant="verified"
                icon="verified"
                filledIcon
                className="absolute bottom-2 right-2 p-1 border-2 border-surface"
                aria-label="Verified professional"
              />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-headline-lg text-on-surface">{tutor.name}</h1>
              {tutor.degree && <Badge variant="parent">{tutor.degree}</Badge>}
            </div>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              {tutor.bio ??
                `Specializing in ${tutor.subjects.join(", ")} with ${tutor.experience}.`}
            </p>
            <div className="flex flex-wrap gap-6 text-on-surface-variant">
              {tutor.location && (
                <div className="flex items-center gap-1">
                  <Icon name="location_on" className="text-secondary" />
                  <span className="text-label-md">{tutor.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Icon name="star" className="text-secondary" />
                <span className="text-label-md">
                  {tutor.rating} ({tutor.reviews} Reviews)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="payments" className="text-secondary" />
                <span className="text-label-md">{tutor.rate}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button variant="secondary" uppercase className="py-6 px-10 shadow-md">
              <Icon name="send" />
              INVITE TO CASE
            </Button>
            <Button variant="outline-neutral" uppercase className="py-6 px-10 bg-surface-container-lowest">
              <Icon name="mail" />
              MESSAGE
            </Button>
          </div>
        </Card>

        <div
          className="flex border-b border-outline-variant mb-10 overflow-x-auto"
          role="tablist"
          aria-label="Tutor profile sections"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={i === 0}
              className={`px-10 py-6 text-label-md transition-all whitespace-nowrap ${
                i === 0
                  ? "border-b-2 border-secondary text-secondary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <Card variant="profile" padding="lg">
              <h2 className="text-headline-sm text-on-surface mb-6">Professional Summary</h2>
              <p className="text-body-md text-on-surface-variant">{tutor.bio ?? tutor.title}</p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant">
                  <h3 className="text-label-md text-primary mb-1">Primary Subjects</h3>
                  <div className="flex flex-wrap gap-1">
                    {tutor.subjects.map((s) => (
                      <Tag key={s} className="bg-surface-container-lowest border border-outline-variant">
                        {s}
                      </Tag>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant">
                  <h3 className="text-label-md text-primary mb-1">Languages</h3>
                  <div className="flex flex-wrap gap-1">
                    {languages.map((lang) => (
                      <Tag key={lang} className="bg-surface-container-lowest border border-outline-variant">
                        {lang}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {credentials.length > 0 && (
              <Card variant="profile" padding="lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-headline-sm text-on-surface">Verified Credentials</h2>
                  <Badge variant="verified" icon="lock" filledIcon>
                    Encrypted &amp; Secure
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {credentials.map((doc) => (
                    <div
                      key={doc.title}
                      className="flex items-center p-6 border border-outline-variant rounded-xl hover:border-secondary transition-all cursor-pointer bg-surface-container-lowest group"
                    >
                      <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mr-6 shrink-0">
                        <Icon name={doc.icon} className="text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-label-md text-on-surface">{doc.title}</p>
                        <p className="text-label-sm text-on-surface-variant">{doc.meta}</p>
                      </div>
                      <Icon name="visibility" className="text-outline-variant group-hover:text-secondary shrink-0" />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-10">
            <Card className="bg-primary-container text-white shadow-lg" padding="lg">
              <h3 className="text-label-md text-on-primary-container mb-6 uppercase tracking-wider">
                Quick Details
              </h3>
              <dl className="space-y-6">
                {quickDetails.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-b border-on-primary-container/20 pb-2 last:border-0"
                  >
                    <dt className="text-body-sm text-on-primary-container">{label}</dt>
                    <dd className="text-label-md">{value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Link
              href={ROUTES.tutors}
              className="block text-center text-secondary text-label-md hover:underline"
            >
              ← Back to Directory
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
