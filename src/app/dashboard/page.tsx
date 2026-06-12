import Link from "next/link";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { Icon } from "@/components/ui/Icon";
import { cases } from "@/lib/data";

const stats = [
  { icon: "pending_actions", value: "04", label: "Active Cases" },
  { icon: "person_search", value: "12", label: "Invited Tutors" },
  { icon: "verified_user", value: "02", label: "Pending Documents" },
];

const statusStyles: Record<string, string> = {
  Open: "bg-surface-container text-on-surface-variant",
  Matched: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  Closed: "bg-surface-container-high text-on-surface-variant",
};

export default function DashboardPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <PortalSidebar active="dashboard" />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 md:px-16 overflow-x-hidden">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-headline-lg text-on-surface mb-1">Parent Dashboard</h2>
              <p className="text-body-md text-on-surface-variant">
                Manage your tuition requests and track tutor responses.
              </p>
            </div>
            <button
              type="button"
              className="md:hidden w-full py-3 px-6 bg-secondary text-on-secondary text-label-md rounded-full"
            >
              Post a Case
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-10 rounded-xl flex flex-col justify-between shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon name={stat.icon} className="text-secondary" />
                  <span className="text-secondary font-bold text-headline-sm">{stat.value}</span>
                </div>
                <p className="text-label-md text-on-surface-variant uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </header>
        <section className="mb-10">
          <div className="glass-card p-3 rounded-xl flex flex-col lg:flex-row items-center gap-2">
            <div className="relative w-full lg:flex-1">
              <Icon
                name="search"
                className="absolute left-6 top-1/2 -translate-y-1/2 text-outline"
              />
              <input
                className="w-full pl-16 pr-6 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary/20 text-body-sm outline-none"
                placeholder="Search by case title..."
                type="text"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {["Subject: All", "Level: All", "Status: All"].map((opt) => (
                <select
                  key={opt}
                  className="bg-surface-container-low border-none rounded-lg text-label-sm px-6 py-3 focus:ring-2 focus:ring-secondary/20"
                >
                  <option>{opt}</option>
                </select>
              ))}
            </div>
          </div>
        </section>
        <section className="space-y-6 mb-16">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              className={`glass-card hover:border-secondary transition-colors group overflow-hidden flex flex-col md:flex-row rounded-xl shadow-sm ${
                c.closed ? "opacity-70" : ""
              }`}
            >
              <div className={`w-2 ${c.accent} group-hover:bg-secondary`} />
              <div className="flex-1 p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`px-3 py-1 text-label-sm rounded-full ${statusStyles[c.status]}`}
                    >
                      {c.status}
                    </span>
                    <span className="text-label-sm text-outline">ID: {c.caseId}</span>
                  </div>
                  <h3 className="text-headline-sm text-on-surface">{c.title}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-on-surface-variant">
                    <div className="flex items-center gap-1">
                      <Icon name="school" size={18} />
                      <span className="text-body-sm">{c.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="book" size={18} />
                      <span className="text-body-sm">{c.subject}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="location_on" size={18} />
                      <span className="text-body-sm">{c.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-1">
                  <p className="text-headline-sm text-primary">{c.rate}</p>
                  {!c.closed && (
                    <button
                      type="button"
                      className="p-3 text-secondary hover:bg-secondary/10 rounded-full transition-colors"
                    >
                      <Icon name="more_vert" />
                    </button>
                  )}
                  {c.closed && (
                    <span className="p-3 text-outline rounded-full">
                      <Icon name="lock" />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </section>
        <nav className="flex items-center justify-between py-6">
          <button
            type="button"
            className="flex items-center gap-1 text-on-surface-variant hover:text-secondary text-label-md transition-colors"
          >
            <Icon name="arrow_back" />
            Previous
          </button>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-secondary text-on-secondary text-label-md"
            >
              1
            </button>
            {[2, 3].map((n) => (
              <button
                key={n}
                type="button"
                className="w-10 h-10 rounded-full hover:bg-surface-variant text-on-surface-variant text-label-md"
              >
                {n}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-on-surface-variant hover:text-secondary text-label-md transition-colors"
          >
            Next
            <Icon name="arrow_forward" />
          </button>
        </nav>
      </main>
    </div>
  );
}
