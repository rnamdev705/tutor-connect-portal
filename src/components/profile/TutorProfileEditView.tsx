"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { QueryState } from "@/components/common/QueryState";
import { PortalShell } from "@/components/layout/PortalShell";
import { Button, Card, Field, Input } from "@/components/ui";
import { useUploadProfileDocument, useUpsertMyProfile } from "@/hooks/mutations/use-tutor-mutations";
import { useMyTutorProfile } from "@/hooks/queries/use-tutors";
import { ApiError } from "@/lib/api/errors";
import { tutorProfileSchema, type TutorProfileFormValues } from "@/lib/validations/profile";

function linesToList(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function listToLines(items: string[] | undefined) {
  return (items ?? []).join("\n");
}

export function TutorProfileEditView() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: profile, isLoading, isError, error, refetch } = useMyTutorProfile();
  const upsert = useUpsertMyProfile();
  const upload = useUploadProfileDocument();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TutorProfileFormValues>({
    resolver: zodResolver(tutorProfileSchema),
    defaultValues: {
      displayName: "",
      qualifications: "",
      experiences: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName,
        qualifications: listToLines(profile.qualifications),
        experiences: listToLines(profile.experiences),
      });
    }
  }, [profile, reset]);

  async function onSubmit(values: TutorProfileFormValues) {
    await upsert.mutateAsync({
      displayName: values.displayName,
      qualifications: linesToList(values.qualifications),
      experiences: linesToList(values.experiences),
    });
  }

  const saveError = upsert.error instanceof ApiError ? upsert.error.message : undefined;
  const isNewProfile = isError && error instanceof ApiError && error.status === 404;

  return (
    <PortalShell active="profile" mainClassName="max-w-3xl">
        <header className="mb-8">
          <h1 className="text-headline-lg text-on-surface">My tutor profile</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Parents browse this profile in the tutor directory.
          </p>
        </header>

        <QueryState
          isLoading={isLoading}
          isError={isError && !isNewProfile}
          error={error}
          onRetry={() => refetch()}
        >
          <Card padding="lg" className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              {saveError && (
                <p className="text-body-sm text-error" role="alert">
                  {saveError}
                </p>
              )}
              <Field label="Display name" htmlFor="displayName" error={errors.displayName?.message}>
                <Input id="displayName" {...register("displayName")} />
              </Field>
              <Field
                label="Qualifications (one per line)"
                htmlFor="qualifications"
                error={errors.qualifications?.message}
              >
                <textarea
                  id="qualifications"
                  rows={4}
                  className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-sm bg-surface-container-lowest"
                  {...register("qualifications")}
                />
              </Field>
              <Field
                label="Experience (one per line)"
                htmlFor="experiences"
                error={errors.experiences?.message}
              >
                <textarea
                  id="experiences"
                  rows={4}
                  className="w-full border border-outline-variant rounded-lg px-3 py-2 text-body-sm bg-surface-container-lowest"
                  {...register("experiences")}
                />
              </Field>
              <Button type="submit" variant="secondary" disabled={upsert.isPending || !isDirty}>
                {upsert.isPending ? "Saving…" : "Save profile"}
              </Button>
            </form>
          </Card>

          {profile && (
            <Card padding="lg" className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-headline-sm">Supporting documents</h2>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={upload.isPending}>
                  {upload.isPending ? "Uploading…" : "Upload document"}
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && profile) {
                    void upload.mutateAsync(file).then(() => refetch()).finally(() => {
                      e.target.value = "";
                    });
                  }
                }}
              />
              {upload.error && (
                <p className="text-body-sm text-error" role="alert">
                  {upload.error instanceof Error ? upload.error.message : "Upload failed"}
                </p>
              )}
              <p className="text-body-sm text-on-surface-variant">
                Upload degree certificates or supporting documents (PDF, DOCX, PNG, JPG — max 10MB).
              </p>
            </Card>
          )}
        </QueryState>
    </PortalShell>
  );
}
