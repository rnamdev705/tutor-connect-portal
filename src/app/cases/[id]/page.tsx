import Image from "next/image";
import Link from "next/link";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { Icon } from "@/components/ui/Icon";

type Props = { params: Promise<{ id: string }> };

const documents = [
  {
    name: "Sec_4_Mock_Results.pdf",
    icon: "picture_as_pdf",
    size: "1.2 MB",
    uploader: "You (Parent)",
    initials: "JD",
  },
  {
    name: "Tutor_MOE_Certificate.jpg",
    icon: "badge",
    size: "3.4 MB",
    uploader: "Dr. Marcus Lim",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAY11uolYUcer9WYKwvJDppRbs94tdXGmSwGxkq-fWRZbIBimSr5KmTegXUdVtVK8gyPz84QFw-BteIgxJGoDaGWgDGJH5bsoJVgAjWpMj64RKtS4Kz5137OzUyCNmd6E5pmC4hpcRVZp-zlL7BaclApJPXBBvJUKhF1xlKVSu-wxIYb5DRtwldXrKEPTf55ZM_KAKUYJGq87N9WlZ56EtBtwKTO94WI4T7Qc1jNXXwhTmEYAmiuMrobu47i0pe0vazxutpROjolY8",
  },
];

const invitedTutors = [
  {
    name: "Dr. Marcus Lim",
    status: "MATCHED",
    statusClass: "bg-emerald-500 text-white",
    subtitle: "Ex-RI Physics HOD • 12 yrs exp",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBGVTXs7ki3mW75PeZ551GetGYJRllCwZ0c6AIXUpUD9tKOnOo6r5pUU7K8lMtOp5bM2ZviqC9YyEwB96Pb-f62IPFM9Q9I9ccPEywmaKmrX6Pmf5YL3ElcmJoWFamu3nC9pe0-yV4eTeYkAcOYE2hHPOTIyAm05De1qe4lwkrh20RMiyrGoN_dLwlcxJcHjWG8cTDNDEBajcmtrAWwDRbSNbB55o3OcElR2PkNet7BtHzYm2RPgFXEB2JAx2PkTieug9MfrMv3oI",
    active: true,
  },
  {
    name: "Ms. Chen Wei",
    status: "Pending",
    statusClass: "bg-slate-200 text-slate-600",
    subtitle: "National University of Singapore • BSc Physics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJywwDt3IlOozAiysyLFKmZE-umfQk20oPPR34o9KzB5PBz0V9EN4tEr8oBIZCY6t9OdHapX35j0zuOurr7sPqU--k09WZ0OgCjiWCRA0xiamAgcTVaC7QKRa-t44X__0LL7r7D6jfF6dQ3-hw1ECvJufXbZAh8TrfuzoxkfBsIWvS1pkA3cMNx4OzoaVQ4l5pxTj17NfFc1GrBClgll6yQ2T8V3rMcmpXC4YVb9qfwXhCQr81ITj8hqJG86iwqYE17zmrmY8bnPk",
    grayscale: true,
  },
  {
    name: "Mr. David Tan",
    status: "Declined",
    statusClass: "bg-slate-200 text-slate-600",
    subtitle: "Full-time Professional Tutor • 8 yrs exp",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbm8y9B2uNLjXFhmvoiP9oK98xj1tC_VaE8j6P7fgACH-fL8v_mMRQN3ZSXncH3yBk7TAAlzfW2DmXZqaCROj3YQf2TeggY1KmBJWLg-6a7eOnkm4y7t5klApQ5KrUDUqpO_MgJVoG4CWCKyChDbYLsvn2E-5DLAqMtBYTjvs5xF7WJQ7ON3qd8TB_8rqKBFTr5ppVGSIc62-9rCpPmxMiZtgBCUmn1sD39guBHpxeb1szd9D6wquywrU7KoTwjKUXBCMMIyaKSHo",
    grayscale: true,
  },
];

export default async function CaseWorkspacePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <PortalHeader active="cases" />
      <div className="flex max-w-7xl mx-auto">
        <PortalSidebar active="cases" />
        <main className="flex-1 p-6 md:p-10 min-w-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-label-sm bg-primary text-on-primary px-3 py-1 rounded">
                  PARENT VIEW
                </span>
                <span className="text-label-sm bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded flex items-center gap-1">
                  <Icon name="lock" size={14} filled />
                  SECURE CASE
                </span>
              </div>
              <h1 className="text-headline-lg text-on-surface">
                Sec 4 Physics Tuition - Advanced Mechanics
              </h1>
              <p className="text-on-surface-variant text-body-sm mt-1">
                Case ID: #{id} • Created 2 days ago
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500 text-white text-label-md px-6 py-2 rounded-xl flex items-center gap-2">
                <Icon name="check_circle" size={18} filled />
                MATCHED
              </span>
              <Link
                href="/tutors"
                className="bg-primary text-on-primary text-label-md uppercase px-10 py-3 rounded-none tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
              >
                <Icon name="person_add" />
                Invite Tutor
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-[0px_4px_12px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
                  <Icon name="info" className="text-secondary" />
                  <h2 className="text-headline-sm">Case Specification</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <div>
                      <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-1">
                        Subject &amp; Level
                      </label>
                      <p className="text-headline-sm text-on-surface">Physics (O-Level/Sec 4)</p>
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-1">
                        Budget Range
                      </label>
                      <p className="text-headline-sm text-secondary">$60 - $85 / hr</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-1">
                        Location
                      </label>
                      <div className="flex items-start gap-1">
                        <Icon name="location_on" className="text-on-surface-variant" />
                        <p className="text-body-md">Bukit Timah, Singapore (In-Person)</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant uppercase tracking-widest block mb-1">
                        Schedule
                      </label>
                      <div className="flex items-start gap-1">
                        <Icon name="calendar_today" className="text-on-surface-variant" />
                        <p className="text-body-md">Sundays, 2:00 PM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 p-6 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                  <h3 className="text-label-md mb-2">Requirement Notes</h3>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Looking for a tutor specialized in Electromagnetism and Kinetic Theory of Matter.
                    Student is currently scoring B3 and aiming for A1 in the preliminary examinations.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-[0px_4px_12px_rgba(15,23,42,0.05)]">
                <div className="p-6 flex justify-between items-center border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <Icon name="shield" className="text-secondary" />
                    <h2 className="text-headline-sm">Secure Document Vault</h2>
                  </div>
                  <span className="text-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-medium">
                    256-BIT ENCRYPTION
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {["DOCUMENT NAME", "SIZE", "UPLOADED BY", "ACTION"].map((h, i) => (
                          <th
                            key={h}
                            className={`p-6 text-label-sm text-on-surface-variant ${i === 3 ? "text-right" : ""}`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {documents.map((doc) => (
                        <tr key={doc.name} className="hover:bg-slate-50 transition-colors">
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <Icon name={doc.icon} className="text-on-secondary-fixed-variant" />
                              <span className="text-body-sm font-medium">{doc.name}</span>
                            </div>
                          </td>
                          <td className="p-6 text-body-sm text-on-surface-variant">{doc.size}</td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              {doc.initials ? (
                                <div className="w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                                  {doc.initials}
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full relative overflow-hidden">
                                  <Image src={doc.image!} alt="" fill className="object-cover" />
                                </div>
                              )}
                              <span className="text-body-sm">{doc.uploader}</span>
                            </div>
                          </td>
                          <td className="p-6 text-right">
                            <button
                              type="button"
                              className="text-secondary hover:underline text-label-md"
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-16 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer group">
                    <Icon
                      name="cloud_upload"
                      className="text-slate-400 group-hover:text-secondary transition-colors text-3xl"
                    />
                    <p className="mt-2 text-label-md text-on-surface">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-1 text-on-surface-variant mt-1">
                      PDF, JPG, PNG up to 10MB (Encrypted &amp; Secure)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-[0px_4px_12px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-headline-sm">Tutor List</h2>
                  <span className="text-label-sm text-on-surface-variant">3 INVITED</span>
                </div>
                <div className="space-y-6">
                  {invitedTutors.map((tutor) => (
                    <div
                      key={tutor.name}
                      className={`p-3 rounded-xl ${
                        tutor.active
                          ? "border-2 border-secondary bg-secondary/5"
                          : "border border-slate-100 hover:border-slate-200 transition-colors"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative w-12 h-12 rounded-full border border-slate-200 overflow-hidden shrink-0">
                          <Image
                            src={tutor.image}
                            alt={tutor.name}
                            fill
                            className={`object-cover ${tutor.grayscale ? "grayscale" : ""}`}
                          />
                          {tutor.active && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-label-md text-on-surface">{tutor.name}</p>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full uppercase ${tutor.statusClass}`}
                            >
                              {tutor.status}
                            </span>
                          </div>
                          <p className="text-1 text-on-surface-variant mb-2">{tutor.subtitle}</p>
                          {tutor.active && (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                className="bg-secondary text-white text-[10px] font-bold px-3 py-1.5 uppercase rounded-none"
                              >
                                Chat
                              </button>
                              <Link
                                href="/tutors/sarah-jenkins"
                                className="border border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1.5 uppercase rounded-none"
                              >
                                View Profile
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
