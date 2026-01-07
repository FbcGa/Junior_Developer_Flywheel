"use client";

import { useState, useMemo } from "react";
import { Task } from "@/dashboard/(tasks)/types/task";

export type TaskFilterType = "all" | "complete" | "incomplete";

type GroupedTasks = {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
};

const completionFilterFunctions: Record<TaskFilterType, (task: Task) => boolean> = {
    all: () => true,
    complete: (task) => task.isCompleted,
    incomplete: (task) => !task.isCompleted,
};

const matchesSearchQuery = (task: Task, query: string): boolean => {
    if (!query.trim()) return true;

    const searchTerm = query.toLowerCase().trim();
    const titleMatch = task.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = task.description?.toLowerCase().includes(searchTerm) ?? false;

    return titleMatch || descriptionMatch;
};

export function useTaskFilter(groupedTasks: GroupedTasks) {
    const [completionFilter, setCompletionFilter] = useState<TaskFilterType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredGroupedTasks = useMemo(() => {
        const applyFilters = (task: Task): boolean => {
            const matchesCompletion = completionFilterFunctions[completionFilter](task);
            const matchesSearch = matchesSearchQuery(task, searchQuery);
            return matchesCompletion && matchesSearch;
        };

        return {
            todo: groupedTasks.todo.filter(applyFilters),
            inProgress: groupedTasks.inProgress.filter(applyFilters),
            done: groupedTasks.done.filter(applyFilters),
        };
    }, [groupedTasks, completionFilter, searchQuery]);

    const totalCount = useMemo(
        () =>
            groupedTasks.todo.length +
            groupedTasks.inProgress.length +
            groupedTasks.done.length,
        [groupedTasks]
    );

    const filteredCount = useMemo(
        () =>
            filteredGroupedTasks.todo.length +
            filteredGroupedTasks.inProgress.length +
            filteredGroupedTasks.done.length,
        [filteredGroupedTasks]
    );

    return {
        completionFilter,
        setCompletionFilter,
        searchQuery,
        setSearchQuery,
        filteredGroupedTasks,
        totalCount,
        filteredCount,
    };
}

