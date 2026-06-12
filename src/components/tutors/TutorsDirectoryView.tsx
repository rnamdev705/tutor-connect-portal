"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QueryState } from "@/components/common/QueryState";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { TutorCard } from "@/components/tutors/TutorCard";
import { Button, Card, Field, Input } from "@/components/ui";
import { useTutors } from "@/hooks/queries/use-tutors";
import { useAuth } from "@/lib/auth/AuthProvider";
import { BRAND_NAME, ROUTES } from "@/lib/constants";

export function TutorsDirectoryView() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isLoading, isError, error, refetch, isFetching } = useTutors({
    page,
    limit: 12,
    ...(search ? { search } : {}),
  });

  useEffect(() => {
    if (!authLoading && user?.role === "TUTOR") {
      router.replace(ROUTES.profile);
    }
  }, [authLoading, user, router]);

  if (authLoading || user?.role === "TUTOR") {
    return null;
  }

  const tutors = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <PortalHeader active="tutors" />
      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-72 shrink-0">
          <Card className="sticky top-16 shadow-sm" padding="md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-sm text-primary">Filters</h2>
              <Button
                variant="ghost"
                className="text-secondary text-label-sm h-auto px-0 hover:bg-transparent hover:underline"
                onClick={() => {
                  setKeyword("");
                  setSearch("");
                  setPage(1);
                }}
              >
                Reset All
              </Button>
            </div>
            <Field label="Keyword" htmlFor="keyword">
              <Input
                id="keyword"
                placeholder="e.g. Calculus"
                inputClassName="h-9 text-body-sm"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearch(keyword.trim());
                    setPage(1);
                  }
                }}
              />
            </Field>
            <Button
              className="mt-4 w-full"
              variant="secondary"
              onClick={() => {
                setSearch(keyword.trim());
                setPage(1);
              }}
            >
              Apply filters
            </Button>
          </Card>
        </aside>
        <section className="grow">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-headline-lg text-primary">Tutor Directory</h1>
              <p className="text-body-md text-on-surface-variant">
                Showing {meta?.total ?? tutors.length} qualified educators
              </p>
            </div>
          </div>

          <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            isEmpty={!isLoading && tutors.length === 0}
            emptyTitle="No tutors found"
            emptyMessage="Try a different search term."
            onRetry={() => refetch()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
              {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} showInvite />
              ))}
            </div>
          </QueryState>

          {meta && meta.totalPages > 1 && (
            <nav className="flex items-center justify-between py-6" aria-label="Pagination">
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
        </section>
      </main>
      <footer className="bg-surface-container-highest border-t border-outline-variant mt-16">
        <div className="w-full py-10 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-headline-sm text-primary">{BRAND_NAME}</span>
            <p className="text-body-sm text-on-surface-variant mt-1">
              © 2024 {BRAND_NAME}. Encrypted &amp; Secure.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
