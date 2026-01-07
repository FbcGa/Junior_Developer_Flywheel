"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TaskSearchProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export function TaskSearch({ searchQuery, onSearchChange }: TaskSearchProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="size-4 text-zinc-400 dark:text-zinc-500" />
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={cn(
          "w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-10 text-sm text-zinc-900 shadow-sm outline-none transition-all",
          "placeholder:text-zinc-500",
          "focus:border-zinc-400 focus:ring-[3px] focus:ring-zinc-200",
          "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500",
          "dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
        )}
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
