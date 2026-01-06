import { TaskStatus, TASK_STATUS, TASK_STATUS_DB } from "@/dashboard/(tasks)/types/task";

const STATUS_TO_DB_MAP: Record<TaskStatus, string> = {
  [TASK_STATUS.TODO]: TASK_STATUS_DB.TODO,
  [TASK_STATUS.IN_PROGRESS]: TASK_STATUS_DB.IN_PROGRESS,
  [TASK_STATUS.DONE]: TASK_STATUS_DB.DONE,
} as const;

export function mapStatusToDb(status: TaskStatus): string {
  return STATUS_TO_DB_MAP[status];
}
