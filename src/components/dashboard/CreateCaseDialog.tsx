"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Field, Input, Select } from "@/components/ui";
import { useCreateCase } from "@/hooks/mutations/use-case-mutations";
import { ApiError } from "@/lib/api/errors";
import { CASE_LEVELS, CASE_SUBJECTS } from "@/lib/constants";
import { createCaseSchema, type CreateCaseFormValues } from "@/lib/validations/case";

type CreateCaseDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: (caseId: string) => void;
};

export function CreateCaseDialog({ open, onClose, onCreated }: CreateCaseDialogProps) {
  const createCase = useCreateCase();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCaseFormValues>({
    resolver: zodResolver(createCaseSchema),
    defaultValues: {
      title: "",
      subject: CASE_SUBJECTS[0],
      level: CASE_LEVELS[0],
      location: "",
      budgetPerHour: 50,
    },
  });

  if (!open) return null;

  async function onSubmit(values: CreateCaseFormValues) {
    try {
      const created = await createCase.mutateAsync(values);
      reset();
      onClose();
      onCreated?.(created.id);
    } catch {
      // surfaced via createCase.error
    }
  }

  const submitError =
    createCase.error instanceof ApiError ? createCase.error.message : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-case-title"
        className="w-full max-w-lg bg-surface rounded-xl shadow-lg p-8 space-y-6"
      >
        <div>
          <h2 id="create-case-title" className="text-headline-sm text-on-surface">
            Post a tuition case
          </h2>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Describe what you need and invite tutors from the directory.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {submitError && (
            <p className="text-body-sm text-error bg-error-container px-4 py-3 rounded-lg" role="alert">
              {submitError}
            </p>
          )}
          <Field label="Title" htmlFor="title" error={errors.title?.message}>
            <Input id="title" {...register("title")} placeholder="Weekly P5 Math tuition near Bishan" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Subject" htmlFor="subject" error={errors.subject?.message}>
              <Select id="subject" {...register("subject")}>
                {CASE_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Level" htmlFor="level" error={errors.level?.message}>
              <Select id="level" {...register("level")}>
                {CASE_LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Location" htmlFor="location" error={errors.location?.message}>
            <Input id="location" {...register("location")} placeholder="Bishan / online" />
          </Field>
          <Field label="Budget per hour" htmlFor="budgetPerHour" error={errors.budgetPerHour?.message}>
            <Input
              id="budgetPerHour"
              type="number"
              min={1}
              step={1}
              {...register("budgetPerHour", { valueAsNumber: true })}
            />
          </Field>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary" fullWidth disabled={createCase.isPending}>
              {createCase.isPending ? "Creating…" : "Create case"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
