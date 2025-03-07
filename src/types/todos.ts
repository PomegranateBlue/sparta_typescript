export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
export type ToggleTodo = Omit<Todo, "title">;

export type TodoListProps = {
  todoList: Todo[];
  onDeleteClick: (id: Todo["id"]) => void;
  onToggleClick: (toggleTodo: ToggleTodo) => void;
};

export async function getTodos() {
  const response = await fetch("http://localhost:5000/todos");
  const data: Todo[] = await response.json();
  return data;
}

getTodos().then((response) => console.log(response[0]));
