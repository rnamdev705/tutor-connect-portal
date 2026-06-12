import { CaseListItem } from "@/components/dashboard/CaseListItem";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { Button, Card, Icon, Input, Select } from "@/components/ui";
import { cases, getDashboardStats } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Parent Dashboard",
  "Manage tuition requests and track tutor responses",
);

export default function DashboardPage() {
  const stats = getDashboardStats();

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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
              />
              <Input
                aria-label="Search by case title"
                inputClassName="pl-12 border-none bg-surface-container-low rounded-lg h-10"
                placeholder="Search by case title..."
                type="search"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {["Subject: All", "Level: All", "Status: All"].map((opt) => (
                <Select
                  key={opt}
                  aria-label={opt}
                  className="border-none bg-surface-container-low rounded-lg h-10"
                >
                  <option>{opt}</option>
                </Select>
              ))}
            </div>
          </Card>
        </section>
        <section className="space-y-6 mb-16">
          {cases.map((caseItem) => (
            <CaseListItem key={caseItem.id} caseItem={caseItem} />
          ))}
        </section>
        <nav className="flex items-center justify-between py-6" aria-label="Pagination">
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
