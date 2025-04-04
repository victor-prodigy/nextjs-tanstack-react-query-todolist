import { CreateTodo } from "@/components/CreateTodo";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Lista de Tarefas</h1>
      <CreateTodo />
      <TodoList />
    </div>
  );
}
