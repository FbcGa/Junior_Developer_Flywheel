"use client";

import { Pencil, Trash2, Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Task } from "@/dashboard/(tasks)/types/task";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string, isCompleted: boolean) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700",
        task.isCompleted && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(task.id, !task.isCompleted);
            }}
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2 transition-all",
              task.isCompleted
                ? "border-green-500 bg-green-500 text-white"
                : "border-zinc-300 hover:border-green-500 dark:border-zinc-600 dark:hover:border-green-500"
            )}
            aria-label={
              task.isCompleted ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {task.isCompleted && <Check className="size-3.5" strokeWidth={3} />}
          </button>
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-semibold text-zinc-900 dark:text-zinc-100 wrap-break-words",
                task.isCompleted && "line-through"
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={cn(
                  "mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 wrap-break-words",
                  task.isCompleted && "line-through"
                )}
              >
                {task.description}
              </p>
            )}
            {(task.startDate || task.dueDate) && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                {task.startDate && (
                  <span>
                    Start: {new Date(task.startDate).toLocaleDateString()}
                  </span>
                )}
                {task.dueDate && (
                  <span>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="h-7 w-7 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Edit task"
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="h-7 w-7 text-zinc-600 hover:text-red-600 hover:bg-red-50 dark:text-zinc-400 dark:hover:text-red-400 dark:hover:bg-red-950/20"
            aria-label="Delete task"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
