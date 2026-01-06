"use client";

import { createClient } from "@/lib/supabase/client";
import { TaskStatus } from "@/dashboard/(tasks)/types/task";
import { mapStatusToDb } from "@/dashboard/(tasks)/helpers/mapStatusToDb";

interface CreateTaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
  startDate?: string;
  dueDate?: string;
}

export async function createTask(input: CreateTaskInput): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("tasks").insert({
    title: input.title,
    description: input.description,
    status: mapStatusToDb(input.status),
    start_date: input.startDate,
    due_date: input.dueDate,
    is_completed: false,
    user_id: user!.id,
  });

  if (error) {
    throw new Error(error.message);
  }
}
