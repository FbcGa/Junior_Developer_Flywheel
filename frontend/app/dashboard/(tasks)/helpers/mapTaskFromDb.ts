import { Task, TASK_STATUS, TASK_STATUS_DB, TaskStatus } from "@/dashboard/(tasks)/types/task";
import type { Tables } from "@/lib/supabase/database.types";

type TaskDb = Tables<"tasks">;

const STATUS_MAP: Record<string, TaskStatus> = {
  [TASK_STATUS_DB.TODO]: TASK_STATUS.TODO,
  [TASK_STATUS_DB.IN_PROGRESS]: TASK_STATUS.IN_PROGRESS,
  [TASK_STATUS_DB.DONE]: TASK_STATUS.DONE,
} as const;

function mapStatus(status: string): TaskStatus {
  return STATUS_MAP[status] ?? TASK_STATUS.TODO;
}

export function mapTaskFromDb(task: TaskDb[]): Task[] {
    return task.map((task): Task => ({
      id: task.id,
      title: task.title,
      description: task.description ?? undefined,
      status: mapStatus(task.status),
      startDate: task.start_date ?? undefined,
      dueDate: task.due_date ?? undefined,
      isCompleted: task.is_completed,
      createdAt: task.created_at ?? new Date().toISOString(),
    }));
  }
  