import { TASK_STATUS, TaskStatus } from "@/dashboard/(tasks)/types/task";

const STATUS_COLOR_MAP: Record<TaskStatus, string> = {
  [TASK_STATUS.TODO]: "border-l-blue-500",
  [TASK_STATUS.IN_PROGRESS]: "border-l-yellow-500",
  [TASK_STATUS.DONE]: "border-l-green-500",
} as const;

export function getStatusColor(status: TaskStatus): string {
  return STATUS_COLOR_MAP[status] ?? "border-l-zinc-500";
}
