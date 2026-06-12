"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CaseListItem } from "@/components/dashboard/CaseListItem";
import { CreateCaseDialog } from "@/components/dashboard/CreateCaseDialog";
import { QueryState } from "@/components/common/QueryState";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { Button, Card, Icon, Input, Select } from "@/components/ui";
import { useCases } from "@/hooks/queries/use-cases";
import { useAuth } from "@/lib/auth/AuthProvider";
import type { CaseStatus as ApiCaseStatus } from "@/lib/api/types";
import { CASE_LEVELS, CASE_SUBJECTS, ROUTES } from "@/lib/constants";
import { mapCaseToListItem } from "@/lib/mappers/case";
import type { DashboardStat } from "@/lib/types/domain";

const STATUS_FILTER: { label: string; value: "" | ApiCaseStatus }[] = [
  { label: "All statuses", value: "" },
  { label: "Open", value: "OPEN" },
  { label: "Matched", value: "MATCHED" },
  { label: "Closed", value: "CLOSED" },
];

export function DashboardView() {
  const { user } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState<"" | ApiCaseStatus>("");
  const [createOpen, setCreateOpen] = useState(false);

  const query = useMemo(
    () => ({
      page,
      limit: 10,
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(subject ? { subject } : {}),
      ...(level ? { level } : {}),
      ...(status ? { status } : {}),
    }),
    [page, search, subject, level, status],
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useCases(query);

  const cases = data?.data.map((item, index) => mapCaseToListItem(item, index)) ?? [];
  const meta = data?.meta;
  const isParent = user?.role === "PARENT";

  const stats: DashboardStat[] = useMemo(() => {
    const open = cases.filter((c) => c.status === "Open").length;
    const matched = cases.filter((c) => c.status === "Matched").length;
    const closed = cases.filter((c) => c.status === "Closed").length;

    if (isParent) {
      return [
        { icon: "assignment", value: String(meta?.total ?? cases.length), label: "Total cases" },
        { icon: "pending_actions", value: String(open), label: "Open" },
        { icon: "handshake", value: String(matched), label: "Matched" },
      ];
    }

    return [
      { icon: "assignment", value: String(meta?.total ?? cases.length), label: "Invited cases" },
      { icon: "description", value: String(open), label: "Open" },
      { icon: "lock", value: String(closed), label: "Closed" },
    ];
  }, [cases, meta?.total, isParent]);

  const firstCaseId = cases[0]?.id;
  const sidebarCasesHref = firstCaseId ? ROUTES.case(firstCaseId) : ROUTES.dashboard;

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <PortalSidebar
        active="dashboard"
        casesHref={sidebarCasesHref}
        onPostCase={() => setCreateOpen(true)}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 md:px-16 overflow-x-hidden">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-headline-lg text-on-surface mb-1">
                {isParent ? "Parent Dashboard" : "Tutor Dashboard"}
              </h2>
              <p className="text-body-md text-on-surface-variant">
                {isParent
                  ? "Manage your tuition requests and track tutor responses."
                  : "View cases you have been invited to."}
              </p>
            </div>
            {isParent && (
              <Button shape="pill" className="md:hidden w-full" onClick={() => setCreateOpen(true)}>
                Post a Case
              </Button>
            )}
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
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <Select
                aria-label="Filter by subject"
                className="border-none bg-surface-container-low rounded-lg h-10"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Subject: All</option>
                {CASE_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
              <Select
                aria-label="Filter by level"
                className="border-none bg-surface-container-low rounded-lg h-10"
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Level: All</option>
                {CASE_LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
              <Select
                aria-label="Filter by status"
                className="border-none bg-surface-container-low rounded-lg h-10"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as "" | ApiCaseStatus);
                  setPage(1);
                }}
              >
                {STATUS_FILTER.map((opt) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
          </Card>
        </section>

        <QueryState
          isLoading={isLoading}
          isError={isError}
          error={error}
          isEmpty={!isLoading && cases.length === 0}
          emptyTitle={isParent ? "No cases yet" : "No invited cases"}
          emptyMessage={
            isParent
              ? "Post your first tuition case to start inviting tutors."
              : "When a parent invites you to a case, it will appear here."
          }
          onRetry={() => refetch()}
        >
          <section className="space-y-6 mb-16">
            {cases.map((caseItem) => (
              <CaseListItem key={caseItem.id} caseItem={caseItem} />
            ))}
          </section>
        </QueryState>

        {meta && meta.totalPages > 1 && (
          <nav className="flex items-center justify-between py-6" aria-label="Pagination">
            <Button
              variant="ghost"
              className="text-label-md"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <Icon name="arrow_back" />
              Previous
            </Button>
            <p className="text-body-sm text-on-surface-variant">
              Page {meta.page} of {meta.totalPages}
            </p>
            <Button
              variant="ghost"
              className="text-label-md"
              disabled={page >= meta.totalPages || isFetching}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <Icon name="arrow_forward" />
            </Button>
          </nav>
        )}
      </main>

      {isParent && (
        <CreateCaseDialog
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreated={(id) => router.push(ROUTES.case(id))}
        />
      )}
    </div>
  );
}
