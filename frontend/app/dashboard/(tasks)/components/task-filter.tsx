"use client";

import { TaskFilterType } from "@/dashboard/(tasks)/hooks/use-task-filter";
import { cn } from "@/lib/utils";

type TaskFilterProps = {
  completionFilter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
};

export function TaskFilter({
  completionFilter,
  onFilterChange,
}: TaskFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Filter
      </span>
      <div className="flex rounded-lg border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            completionFilter === "all"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          )}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("incomplete")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            completionFilter === "incomplete"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          )}
        >
          Incomplete
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("complete")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            completionFilter === "complete"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          )}
        >
          Complete
        </button>
      </div>
    </div>
  );
}
