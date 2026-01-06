export const TASK_STATUS_DB = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done",
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  startDate?: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
}
