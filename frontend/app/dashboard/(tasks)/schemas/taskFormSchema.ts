import * as yup from "yup";

export interface TaskFormValues {
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
}

export const taskFormValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(1, "Title cannot be empty")
    .max(200, "Title must be less than 200 characters"),
  description: yup
    .string()
    .trim()
    .max(1000, "Description must be less than 1000 characters"),
  startDate: yup.string().nullable(),
  dueDate: yup
    .string()
    .nullable()
    .test(
      "is-after-start",
      "Due date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return new Date(value) >= new Date(startDate);
      }
    ),
});
