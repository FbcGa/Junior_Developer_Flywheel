"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { Button } from "@/shared/components/ui/button";
import { Task, TaskStatus } from "@/dashboard/(tasks)/types/task";
import { getStatusColor } from "@/dashboard/(tasks)/helpers/getStatusColor";
import { useIsMobile } from "@/dashboard/(tasks)/hooks/use-is-mobile";
import { TaskCard } from "@/dashboard/(tasks)/components/task-card";
import { TaskForm } from "@/dashboard/(tasks)/components/task-form";
import { createTask } from "@/dashboard/(tasks)/services/createTask";
import { updateTask } from "@/dashboard/(tasks)/services/updateTask";
import { deleteTask } from "@/dashboard/(tasks)/services/deleteTask";
import { toggleTaskCompletion } from "@/dashboard/(tasks)/services/toggleTaskCompletion";
import { cn } from "@/lib/utils";

interface TaskListCardProps {
  title: string;
  status: TaskStatus;
  tasks?: Task[];
}

export function TaskListCard({ title, status, tasks = [] }: TaskListCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);
  const router = useRouter();
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;

  // Update local tasks when server tasks change
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const showCollapsible = useMemo(() => {
    return isDesktop ? true : isOpen;
  }, [isDesktop, isOpen]);

  const handleCreateTask = async (values: {
    title: string;
    description?: string;
    startDate?: string;
    dueDate?: string;
  }) => {
    await createTask({
      ...values,
      status,
    });
    router.refresh();
  };

  const handleUpdateTask = async (values: {
    title: string;
    description?: string;
    startDate?: string;
    dueDate?: string;
  }) => {
    if (!editingTask) return;

    await updateTask({
      id: editingTask.id,
      ...values,
      status: editingTask.status,
    });
    router.refresh();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleToggleComplete = async (taskId: string, isCompleted: boolean) => {
    // Optimistic update: Update UI immediately
    const previousTasks = [...localTasks];
    setLocalTasks(
      localTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted } : task
      )
    );

    try {
      await toggleTaskCompletion(taskId, isCompleted);
      toast.success(
        isCompleted ? "Task marked as complete!" : "Task marked as incomplete!"
      );
      router.refresh();
    } catch (error) {
      setLocalTasks(previousTasks);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update task";
      toast.error(errorMessage);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete task";
      toast.error(errorMessage);
    }
  };

  return (
    <Collapsible
      open={showCollapsible}
      onOpenChange={(open) => {
        if (!isMobile) {
          return;
        }
        setIsOpen(open);
      }}
      className="h-full"
    >
      <Card
        className={cn(
          "flex h-full flex-col border-l-4",
          getStatusColor(status)
        )}
      >
        <CardHeader className="cursor-pointer select-none transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 md:cursor-default md:hover:bg-transparent">
          <CardTitle className="flex items-center justify-between">
            <CollapsibleTrigger
              asChild
              disabled={isDesktop}
              className="md:pointer-events-none flex-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base">{title}</span>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowForm(true);
                    }}
                    className="size-8"
                  >
                    <Plus className="size-4" />
                  </Button>
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200 md:hidden",
                      showCollapsible && "rotate-180"
                    )}
                  />
                </div>
              </div>
            </CollapsibleTrigger>
          </CardTitle>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="flex-1 space-y-2">
            {localTasks.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No tasks yet
                </p>
              </div>
            ) : (
              localTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              ))
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
      {showForm && (
        <TaskForm
          onClose={handleCloseForm}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          taskId={editingTask?.id}
          initialValues={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description,
                  startDate: editingTask.startDate,
                  dueDate: editingTask.dueDate,
                }
              : undefined
          }
        />
      )}
    </Collapsible>
  );
}
