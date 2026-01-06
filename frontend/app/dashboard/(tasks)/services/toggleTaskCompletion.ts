"use client";

import { createClient } from "@/lib/supabase/client";

export async function toggleTaskCompletion(
  taskId: string,
  isCompleted: boolean
): Promise<void> {
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
      is_completed: isCompleted,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}
