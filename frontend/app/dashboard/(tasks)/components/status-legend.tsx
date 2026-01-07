type StatusLegendProps = {
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
};

export function StatusLegend({
  todoCount,
  inProgressCount,
  doneCount,
}: StatusLegendProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-5">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Status
        </span>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="group flex items-center gap-2 transition-all hover:scale-105">
            <div className="relative">
              <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              <div className="absolute inset-0 h-3 w-3 rounded-full bg-blue-500 opacity-75 group-hover:animate-ping" />
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              To Do
              <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-500">
                ({todoCount})
              </span>
            </span>
          </div>
          <div className="group flex items-center gap-2 transition-all hover:scale-105">
            <div className="relative">
              <div className="h-3 w-3 animate-pulse rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
              <div className="absolute inset-0 h-3 w-3 rounded-full bg-purple-500 opacity-75 group-hover:animate-ping" />
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              In Progress
              <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-500">
                ({inProgressCount})
              </span>
            </span>
          </div>
          <div className="group flex items-center gap-2 transition-all hover:scale-105">
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
              <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 opacity-75 group-hover:animate-ping" />
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Done
              <span className="ml-1.5 text-xs text-zinc-500 dark:text-zinc-500">
                ({doneCount})
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
