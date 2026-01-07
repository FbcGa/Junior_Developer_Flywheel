import { TaskBoardContent } from "@/dashboard/(tasks)/components/task-board-content";
import { getGroupedTasks } from "@/dashboard/(tasks)/services/getAllTasks";

export default async function TasksPage() {
  const { todo, inProgress, done } = await getGroupedTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <TaskBoardContent todo={todo} inProgress={inProgress} done={done} />
      </div>
    </div>
  );
}
