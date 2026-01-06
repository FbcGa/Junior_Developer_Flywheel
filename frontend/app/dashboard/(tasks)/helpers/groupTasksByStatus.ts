import { Task, TASK_STATUS } from "../types/task";

export interface GroupedTasks {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

export function groupTasksByStatus(tasks: Task[]): GroupedTasks {
  return {
    todo: tasks.filter((task) => task.status === TASK_STATUS.TODO),
    inProgress: tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS),
    done: tasks.filter((task) => task.status === TASK_STATUS.DONE),
  };
}
