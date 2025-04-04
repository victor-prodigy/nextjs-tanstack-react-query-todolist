import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

// Simula um banco de dados em memória
let todos: Todo[] = [];

// Chave para o cache do React Query
export const todosQueryKey = ["todos"];

// Hook para obter a lista de tarefas
export function useTodos() {
  return useQuery({
    queryKey: todosQueryKey,
    queryFn: () => Promise.resolve(todos),
  });
}

// Hook para adicionar uma nova tarefa
export function useAddTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (content: string) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        content,
        completed: false,
      };
      todos = [...todos, newTodo];
      return Promise.resolve(newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKey });
    },
  });
}

// Hook para atualizar o status de uma tarefa
export function useToggleTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {
      todos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKey });
    },
  });
}

// Hook para remover uma tarefa
export function useRemoveTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {
      todos = todos.filter((todo) => todo.id !== id);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKey });
    },
  });
} 