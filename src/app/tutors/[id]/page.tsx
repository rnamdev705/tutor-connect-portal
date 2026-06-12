import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { Icon } from "@/components/ui/Icon";
import { getTutor } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export default async function TutorProfilePage({ params }: Props) {
  const { id } = await params;
  const tutor = getTutor(id);
  if (!tutor) notFound();

  const tabs = ["Overview", "Experience & History", "Shared Documents (3)", "Reviews"];
  const credentials = [
    { icon: "description", title: "Imperial College PhD Certificate", meta: "Verified on Sep 12, 2023" },
    { icon: "verified_user", title: "Enhanced DBS Check", meta: "Valid until Oct 2025" },
    { icon: "workspace_premium", title: "Higher Education Teaching Cert", meta: "Verified Institutional" },
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <PortalHeader active="tutors" />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-surface-container-lowest profile-card rounded-xl p-10 mb-10 flex flex-col md:flex-row items-start md:items-center gap-10 relative overflow-hidden">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface shadow-sm relative">
              <Image src={tutor.image} alt={tutor.name} fill className="object-cover" />
            </div>
            {tutor.verified && (
              <div
                className="absolute bottom-2 right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white flex items-center justify-center"
                title="Verified Professional"
              >
                <Icon name="verified" size={16} filled />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-headline-lg text-on-surface">{tutor.name}</h1>
              {tutor.degree && (
                <span className="inline-flex items-center px-3 py-1 bg-primary-container text-on-primary-container text-label-sm rounded-full">
                  {tutor.degree}
                </span>
              )}
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
            <button
              type="button"
              className="bg-secondary text-white text-label-md py-6 px-10 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-md"
            >
              <Icon name="send" />
              INVITE TO CASE
            </button>
            <button
              type="button"
              className="bg-white border border-outline text-on-surface-variant text-label-md py-6 px-10 rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-3"
            >
              <Icon name="mail" />
              MESSAGE
            </button>
          </div>
        </div>
        <div className="flex border-b border-outline-variant mb-10 overflow-x-auto whitespace-nowrap">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`px-10 py-6 text-label-md transition-all ${
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
            <section className="bg-surface-container-lowest profile-card rounded-xl p-10">
              <h2 className="text-headline-sm text-on-surface mb-6">Professional Summary</h2>
              <div className="text-body-md text-on-surface-variant space-y-6">
                <p>
                  With a doctorate from Imperial College London, I have spent the last decade bridging
                  the gap between theoretical mathematics and practical student achievement.
                </p>
                <p>
                  I have successfully guided over 200 students through competitive entrance exams for
                  Oxbridge and Ivy League institutions.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant">
                  <h3 className="text-label-md text-primary mb-1">Primary Subjects</h3>
                  <div className="flex flex-wrap gap-1">
                    {tutor.subjects.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 bg-white border border-outline-variant rounded text-label-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant">
                  <h3 className="text-label-md text-primary mb-1">Languages</h3>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-white border border-outline-variant rounded text-label-sm">
                      English (Native)
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-surface-container-lowest profile-card rounded-xl p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-headline-sm text-on-surface">Verified Credentials</h2>
                <span className="text-on-tertiary-container bg-tertiary-fixed px-3 py-1 rounded-full text-label-sm flex items-center gap-1">
                  <Icon name="lock" size={14} filled />
                  Encrypted &amp; Secure
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {credentials.map((doc) => (
                  <div
                    key={doc.title}
                    className="flex items-center p-6 border border-outline-variant rounded-xl hover:border-secondary transition-all cursor-pointer bg-white group"
                  >
                    <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mr-6">
                      <Icon name={doc.icon} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-label-md text-on-surface">{doc.title}</p>
                      <p className="text-label-sm text-on-surface-variant">{doc.meta}</p>
                    </div>
                    <Icon name="visibility" className="text-outline-variant group-hover:text-secondary" />
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="space-y-10">
            <div className="bg-primary-container text-white rounded-xl p-10 shadow-lg">
              <h3 className="text-label-md text-on-primary-container mb-6 uppercase tracking-wider">
                Quick Details
              </h3>
              <div className="space-y-6">
                {[
                  ["Availability", "3 Slots Left"],
                  ["Response Time", "~ 2 hours"],
                  ["Total Lessons", "1,450+"],
                  ["Education", "PhD, Imperial"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-b border-on-primary-container/20 pb-2 last:border-0"
                  >
                    <span className="text-body-sm text-on-primary-container">{label}</span>
                    <span className="text-label-md">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/tutors"
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
