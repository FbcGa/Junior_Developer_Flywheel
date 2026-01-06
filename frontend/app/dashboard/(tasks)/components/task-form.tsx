"use client";

import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Spinner } from "@/shared/components/ui/spinner";
import { TaskFormProps } from "@/dashboard/(tasks)/types/taskForm";
import {
  TaskFormValues,
  taskFormValidationSchema,
} from "@/dashboard/(tasks)/schemas/taskFormSchema";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function TaskForm({
  onClose,
  onSubmit,
  initialValues,
  taskId,
}: TaskFormProps) {
  const isEditMode = !!initialValues && !!taskId;

  const formik = useFormik<TaskFormValues>({
    initialValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      startDate: initialValues?.startDate ?? "",
      dueDate: initialValues?.dueDate ?? "",
    },
    validationSchema: taskFormValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await onSubmit({
          title: values.title.trim(),
          description: values.description.trim() || undefined,
          startDate: values.startDate || undefined,
          dueDate: values.dueDate || undefined,
        });
        toast.success(
          isEditMode
            ? "Task updated successfully!"
            : "Task created successfully!"
        );
        resetForm();
        onClose();
      } catch (error) {
        let errorMessage: string;
        if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = isEditMode
            ? "Failed to update task"
            : "Failed to create task";
        }
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <button
        type="button"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
        className="fixed inset-0 bg-black/50"
        aria-label="Close dialog"
      />
      <div
        className="relative z-10 w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        role="document"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </button>

        <h2
          id="task-form-title"
          className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100"
        >
          {isEditMode ? "Edit Task" : "Create New Task"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                formik.touched.title && formik.errors.title && "border-red-500"
              )}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-sm text-red-500">{formik.errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Enter task description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formik.values.dueDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex-1"
            >
              {formik.isSubmitting ? (
                <>
                  <Spinner className="size-4" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditMode ? "Update Task" : "Create Task"}</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
