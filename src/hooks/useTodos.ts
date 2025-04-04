import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("/api/todos");
      return response.json();
    },
  });

  const addTodo = useMutation({
    mutationFn: async (newTodo: Omit<Todo, "id">) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    isLoading,
    addTodo,
  };
}
