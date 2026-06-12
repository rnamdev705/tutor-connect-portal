"use client";

import type { ReactNode } from "react";
import { Button, Card, Icon } from "@/components/ui";
import { ApiError } from "@/lib/api/errors";

type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  onRetry?: () => void;
  children: ReactNode;
};

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 403) return "You do not have permission to view this resource.";
    if (error.status === 404) return "The requested resource could not be found.";
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export function QueryState({
  isLoading,
  isError,
  error,
  isEmpty,
  emptyTitle = "Nothing here yet",
  emptyMessage = "No results match your filters.",
  onRetry,
  children,
}: QueryStateProps) {
  if (isLoading) {
    return (
      <Card variant="glass" padding="lg" className="flex items-center justify-center gap-3 text-on-surface-variant">
        <Icon name="progress_activity" className="animate-spin" />
        <span className="text-body-md">Loading…</span>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card variant="glass" padding="lg" className="text-center space-y-4">
        <Icon name="error" className="text-error text-3xl mx-auto" />
        <p className="text-body-md text-on-surface" role="alert">
          {getErrorMessage(error)}
        </p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        )}
      </Card>
    );
  }

  if (isEmpty) {
    return (
      <Card variant="glass" padding="lg" className="text-center space-y-2">
        <Icon name="inbox" className="text-outline text-3xl mx-auto" />
        <h3 className="text-headline-sm text-on-surface">{emptyTitle}</h3>
        <p className="text-body-sm text-on-surface-variant">{emptyMessage}</p>
      </Card>
    );
  }

  return <>{children}</>;
}
