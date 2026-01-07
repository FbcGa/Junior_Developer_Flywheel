import { createClient } from "@/lib/supabase/server";
import { Task } from "@/dashboard/(tasks)/types/task";
import { mapTaskFromDb } from "@/dashboard/(tasks)/helpers/taskMappers";
import { groupTasksByStatus, GroupedTasks } from "@/dashboard/(tasks)/helpers/groupTasksByStatus";

async function getTasks(): Promise<Task[]> {
  const supabase = await createClient();

  const { data: tasks } = await supabase.from("tasks").select("*");

  if (!tasks) {
    return [];
  }

  return mapTaskFromDb(tasks);
}

export async function getGroupedTasks(): Promise<GroupedTasks> {
  const tasks = await getTasks();
  return groupTasksByStatus(tasks);
}
