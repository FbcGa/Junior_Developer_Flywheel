export interface TaskFormInput {
  title: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
}

export interface TaskFormProps {
  onClose: () => void;
  onSubmit: (values: TaskFormInput) => Promise<void>;
  initialValues?: TaskFormInput;
  taskId?: string;
}
