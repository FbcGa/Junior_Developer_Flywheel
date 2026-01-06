"use client";

import { createClient } from "@/lib/supabase/client";
import { TaskStatus } from "@/dashboard/(tasks)/types/task";
import { mapStatusToDb } from "@/dashboard/(tasks)/helpers/mapStatusToDb";

interface UpdateTaskInput {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  startDate?: string;
  dueDate?: string;
}

export async function updateTask(input: UpdateTaskInput): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to update tasks");
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      title: input.title,
      description: input.description,
      status: mapStatusToDb(input.status),
      start_date: input.startDate,
      due_date: input.dueDate,
    })
    .eq("id", input.id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}
