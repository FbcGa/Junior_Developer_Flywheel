"use client";

import { TaskListCard } from "@/dashboard/(tasks)/components/task-list-card";
import { StatusLegend } from "@/dashboard/(tasks)/components/status-legend";
import { TaskFilter } from "@/dashboard/(tasks)/components/task-filter";
import { TaskSearch } from "@/dashboard/(tasks)/components/task-search";
import { TASK_STATUS, Task } from "@/dashboard/(tasks)/types/task";
import { useTaskFilter } from "@/dashboard/(tasks)/hooks/use-task-filter";

type TaskBoardContentProps = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};

export function TaskBoardContent({
  todo,
  inProgress,
  done,
}: TaskBoardContentProps) {
  const {
    completionFilter,
    setCompletionFilter,
    searchQuery,
    setSearchQuery,
    filteredGroupedTasks,
    totalCount,
    filteredCount,
  } = useTaskFilter({ todo, inProgress, done });

  return (
    <>
      <header className="mb-8 sm:mb-12">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3 pb-5">
              <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 sm:text-5xl lg:text-6xl">
                Tasky
              </h1>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30">
                {filteredCount} of {totalCount}
              </span>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base lg:text-lg">
              Turn your endless to-do list into a done-did list! 🚀
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <TaskSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <StatusLegend
            todoCount={filteredGroupedTasks.todo.length}
            inProgressCount={filteredGroupedTasks.inProgress.length}
            doneCount={filteredGroupedTasks.done.length}
          />
          <TaskFilter
            completionFilter={completionFilter}
            onFilterChange={setCompletionFilter}
          />
        </div>
      </header>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <TaskListCard
          title="To Do"
          status={TASK_STATUS.TODO}
          tasks={filteredGroupedTasks.todo}
        />
        <TaskListCard
          title="In Progress"
          status={TASK_STATUS.IN_PROGRESS}
          tasks={filteredGroupedTasks.inProgress}
        />
        <TaskListCard
          title="Done"
          status={TASK_STATUS.DONE}
          tasks={filteredGroupedTasks.done}
        />
      </div>
    </>
  );
}
