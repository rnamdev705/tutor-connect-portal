"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CaseListItem } from "@/components/dashboard/CaseListItem";
import { CreateCaseForm } from "@/components/cases/CreateCaseForm";
import { QueryState } from "@/components/common/QueryState";
import { PortalShell } from "@/components/layout/PortalShell";
import { Button, Card, Icon, Input } from "@/components/ui";
import { useUpdateCase } from "@/hooks/mutations/use-case-mutations";
import { useCases } from "@/hooks/queries/use-cases";
import { useAuth } from "@/lib/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";
import { mapCaseToListItem } from "@/lib/mappers/case";

export function CasesView() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const closeCase = useUpdateCase();

  const query = useMemo(
    () => ({
      page,
      limit: 10,
      ...(search.trim() ? { search: search.trim() } : {}),
    }),
    [page, search],
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useCases(query);

  useEffect(() => {
    if (!authLoading && user?.role !== "PARENT") {
      router.replace(ROUTES.dashboard);
    }
  }, [authLoading, user, router]);

  if (authLoading || user?.role !== "PARENT") {
    return null;
  }

  const cases = data?.data.map((item, index) => mapCaseToListItem(item, index)) ?? [];
  const meta = data?.meta;

  async function handleClose(caseId: string) {
    if (!window.confirm("Close this case? Tutors will no longer be able to respond.")) return;
    await closeCase.mutateAsync({ id: caseId, input: { status: "CLOSED" } });
  }

  return (
    <PortalShell active="cases">
      <header className="mb-6">
        <h1 className="text-headline-lg text-on-surface mb-1">My Cases</h1>
        <p className="text-body-md text-on-surface-variant">
          View your tuition requests, create new ones, or close cases you no longer need.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            size={20}
          />
          <Input
            placeholder="Search cases by title..."
            inputClassName="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <Button
          variant={showCreate ? "outline" : "secondary"}
          onClick={() => setShowCreate((v) => !v)}
          className="shrink-0"
        >
          <Icon name={showCreate ? "close" : "add"} />
          {showCreate ? "Cancel" : "Create new case"}
        </Button>
      </div>

      {showCreate && (
        <Card padding="lg" className="mb-8">
          <h2 className="text-headline-sm text-on-surface mb-4">Post a new tuition case</h2>
          <CreateCaseForm
            onCancel={() => setShowCreate(false)}
            onCreated={(id) => {
              setShowCreate(false);
              router.push(ROUTES.case(id));
            }}
          />
        </Card>
      )}

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={!isLoading && !isError && cases.length === 0}
        emptyTitle="No cases yet"
        emptyMessage='Click "Create new case" to post your first tuition request.'
        onRetry={() => refetch()}
      >
        <div className="space-y-4">
          {cases.map((caseItem) => (
            <CaseListItem
              key={caseItem.id}
              caseItem={caseItem}
              onClose={caseItem.closed ? undefined : () => handleClose(caseItem.id)}
              closePending={closeCase.isPending}
            />
          ))}
        </div>
      </QueryState>

      {meta && meta.totalPages > 1 && (
        <nav className="flex items-center justify-between py-6 mt-4" aria-label="Pagination">
          <Button
            variant="ghost"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-body-sm text-on-surface-variant">
            Page {meta.page} of {meta.totalPages}
          </span>
          <Button
            variant="ghost"
            disabled={page >= meta.totalPages || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </nav>
      )}
    </PortalShell>
  );
}
