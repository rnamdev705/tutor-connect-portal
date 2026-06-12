"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Card, Field, Input, Select } from "@/components/ui";
import { useCreateCase } from "@/hooks/mutations/use-case-mutations";
import { ApiError } from "@/lib/api/errors";
import { CASE_LEVELS, CASE_SUBJECTS } from "@/lib/constants";
import { createCaseSchema, type CreateCaseFormValues } from "@/lib/validations/case";

type CreateCaseFormProps = {
  onCreated?: (caseId: string) => void;
  onCancel?: () => void;
};

export function CreateCaseForm({ onCreated, onCancel }: CreateCaseFormProps) {
  const createCase = useCreateCase();
  const {
    register,
    handleSubmit,
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

  async function onSubmit(values: CreateCaseFormValues) {
    try {
      const created = await createCase.mutateAsync(values);
      onCreated?.(created.id);
    } catch {
      // surfaced via createCase.error
    }
  }

  const submitError =
    createCase.error instanceof ApiError ? createCase.error.message : undefined;

  return (
    <Card padding="lg" className="max-w-2xl">
      <header className="mb-8">
        <h1 className="text-headline-lg text-on-surface mb-1">Post a tuition case</h1>
        <p className="text-body-md text-on-surface-variant">
          Describe what you need. After creating the case, invite tutors from the directory.
        </p>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        {submitError && (
          <p className="text-body-sm text-error bg-error-container px-4 py-3 rounded-lg" role="alert">
            {submitError}
          </p>
        )}
        <Field label="Title" htmlFor="title" error={errors.title?.message}>
          <Input id="title" {...register("title")} placeholder="Weekly P5 Math tuition near Bishan" />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <Field label="Budget per hour (SGD)" htmlFor="budgetPerHour" error={errors.budgetPerHour?.message}>
          <Input
            id="budgetPerHour"
            type="number"
            min={1}
            step={1}
            {...register("budgetPerHour", { valueAsNumber: true })}
          />
        </Field>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {onCancel && (
            <Button type="button" variant="ghost" fullWidth onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="secondary" fullWidth disabled={createCase.isPending}>
            {createCase.isPending ? "Creating…" : "Create case"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
