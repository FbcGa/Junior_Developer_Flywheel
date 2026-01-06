import { TaskListCard } from "@/dashboard/(tasks)/components/task-list-card";
import { TASK_STATUS } from "@/dashboard/(tasks)/types/task";
import { getGroupedTasks } from "@/dashboard/(tasks)/services/getAllTasks";

export default async function TasksPage() {
  const { todo, inProgress, done } = await getGroupedTasks();

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-zinc-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 lg:px-8">
        <div className="mb-8 space-y-4 sm:mb-10 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <h1 className="bg-linear-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-clip-text text-3xl font-black tracking-tight text-transparent dark:from-white dark:via-zinc-100 dark:to-white sm:text-4xl md:text-5xl lg:text-6xl">
              Task Board
            </h1>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:ml-0 sm:text-lg md:ml-20">
            Organize and track your tasks efficiently across different stages of
            completion
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:gap-4 sm:text-sm md:ml-20 md:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-blue-500/20 sm:h-3 sm:w-3" />
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                To Do
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-purple-500 ring-2 ring-purple-500/20 sm:h-3 sm:w-3" />
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                In Progress
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-green-500/20 sm:h-3 sm:w-3" />
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                Done
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TaskListCard title="To Do" status={TASK_STATUS.TODO} tasks={todo} />
          <TaskListCard
            title="In Progress"
            status={TASK_STATUS.IN_PROGRESS}
            tasks={inProgress}
          />
          <TaskListCard title="Done" status={TASK_STATUS.DONE} tasks={done} />
        </div>
      </div>
    </div>
  );
}
