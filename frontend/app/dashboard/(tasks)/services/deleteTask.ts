"use client";

import { createClient } from "@/lib/supabase/client";

export async function deleteTask(taskId: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", user!.id);

  if (error) {
    throw new Error(error.message);
  }
}
