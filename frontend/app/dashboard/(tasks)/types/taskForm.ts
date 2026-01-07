import { TaskStatus } from "@/dashboard/(tasks)/types/task";

export interface TaskFormInput {
  title: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  status?: TaskStatus;
}

export interface TaskFormProps {
  onClose: () => void;
  onSubmit: (values: TaskFormInput) => Promise<void>;
  initialValues?: TaskFormInput;
  taskId?: string;
}
