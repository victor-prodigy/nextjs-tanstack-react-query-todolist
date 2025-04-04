"use client";

import { Todo, useRemoveTodo, useToggleTodo } from "@/lib/todos";
import { Button } from "./ui/button";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const toggleMutation = useToggleTodo();
  const removeMutation = useRemoveTodo();

  const handleToggle = () => {
    toggleMutation.mutate(todo.id);
  };

  const handleRemove = () => {
    removeMutation.mutate(todo.id);
  };

  return (
    <li className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-2">
        <button 
          onClick={handleToggle}
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center",
            todo.completed ? "bg-green-500 border-green-500" : "border-gray-300"
          )}
        >
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </button>
        <span 
          className={cn(
            "text-sm", 
            todo.completed && "line-through text-gray-500"
          )}
        >
          {todo.content}
        </span>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-red-500 h-8 w-8" 
        onClick={handleRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}; 