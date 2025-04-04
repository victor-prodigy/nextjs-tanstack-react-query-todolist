"use client";

import { useTodos } from "@/lib/todos";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { data: todos, isLoading, isError } = useTodos();

  if (isLoading) {
    return <div className="mt-4">Carregando tarefas...</div>;
  }

  if (isError) {
    return <div className="mt-4 text-red-500">Erro ao carregar tarefas</div>;
  }

  if (!todos || todos.length === 0) {
    return <div className="mt-4 text-gray-500">Nenhuma tarefa encontrada</div>;
  }

  return (
    <div className="mt-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Suas tarefas</h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}; 