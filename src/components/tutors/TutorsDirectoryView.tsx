"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QueryState } from "@/components/common/QueryState";
import { PortalShell } from "@/components/layout/PortalShell";
import { TutorCard } from "@/components/tutors/TutorCard";
import { Button, Icon, Input } from "@/components/ui";
import { useTutors } from "@/hooks/queries/use-tutors";
import { useAuth } from "@/lib/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";

export function TutorsDirectoryView() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error, refetch, isFetching } = useTutors({
    page,
    limit: 24,
    ...(search ? { search } : {}),
  });

  useEffect(() => {
    if (!authLoading && user?.role === "TUTOR") {
      router.replace(ROUTES.profile);
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  if (authLoading || user?.role === "TUTOR") {
    return null;
  }

  const tutors = data?.data ?? [];
  const meta = data?.meta;

  return (
    <PortalShell active="tutors">
      <header className="mb-6">
        <h1 className="text-headline-lg text-on-surface mb-1">Tutor Directory</h1>
        <p className="text-body-md text-on-surface-variant">
          Browse all tutors. Search by name, subject, qualification, experience, or location.
        </p>
      </header>

      <div className="relative mb-6 max-w-xl">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          size={20}
        />
        <Input
          placeholder="Search tutors by name, subject, location..."
          inputClassName="pl-10"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <p className="text-body-sm text-on-surface-variant mb-4">
        {meta?.total ?? tutors.length} tutor{(meta?.total ?? tutors.length) === 1 ? "" : "s"} found
      </p>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={!isLoading && !isError && tutors.length === 0}
        emptyTitle="No tutors found"
        emptyMessage="Try a different search term or clear the search to see all tutors."
        onRetry={() => refetch()}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} showInvite />
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
