import Link from "next/link";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { Badge, Button, Card, Icon, Input, Select } from "@/components/ui";
import { cases } from "@/lib/data";

const stats = [
  { icon: "pending_actions", value: "04", label: "Active Cases" },
  { icon: "person_search", value: "12", label: "Invited Tutors" },
  { icon: "verified_user", value: "02", label: "Pending Documents" },
];

const statusVariant = {
  Open: "open",
  Matched: "matched",
  Closed: "closed",
} as const;

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
            <Button shape="pill" className="md:hidden w-full">
              Post a Case
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} variant="glass" padding="lg">
                <div className="flex items-center justify-between mb-3">
                  <Icon name={stat.icon} className="text-secondary" />
                  <span className="text-secondary font-bold text-headline-sm">{stat.value}</span>
                </div>
                <p className="text-label-md text-on-surface-variant uppercase tracking-wider">
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </header>
        <section className="mb-10">
          <Card variant="glass" padding="sm" className="flex flex-col lg:flex-row items-center gap-2">
            <div className="relative w-full lg:flex-1">
              <Icon
                name="search"
                className="absolute left-6 top-1/2 -translate-y-1/2 text-outline"
              />
              <Input
                className="[&_input]:pl-16 [&_input]:border-none [&_input]:bg-surface-container-low [&_input]:rounded-lg [&_input]:h-10"
                placeholder="Search by case title..."
                type="text"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {["Subject: All", "Level: All", "Status: All"].map((opt) => (
                <Select
                  key={opt}
                  className="border-none bg-surface-container-low rounded-lg h-10"
                >
                  <option>{opt}</option>
                </Select>
              ))}
            </div>
          </Card>
        </section>
        <section className="space-y-6 mb-16">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              className={c.closed ? "opacity-70 block" : "block"}
            >
              <Card
                variant="glass"
                accent={`${c.accent} group-hover:bg-secondary`}
                padding="lg"
                className="hover:border-secondary transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
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
                    {!c.closed ? (
                      <Button variant="ghost" size="icon" shape="pill">
                        <Icon name="more_vert" />
                      </Button>
                    ) : (
                      <span className="p-3 text-outline rounded-full">
                        <Icon name="lock" />
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </section>
        <nav className="flex items-center justify-between py-6">
          <Button variant="ghost" className="text-label-md">
            <Icon name="arrow_back" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <Button shape="pill" size="icon" className="bg-secondary text-on-secondary">
              1
            </Button>
            {[2, 3].map((n) => (
              <Button key={n} variant="ghost" shape="pill" size="icon">
                {n}
              </Button>
            ))}
          </div>
          <Button variant="ghost" className="text-label-md">
            Next
            <Icon name="arrow_forward" />
          </Button>
        </nav>
      </main>
    </div>
  );
}
