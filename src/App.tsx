import "./App.css";
import { Todo, getTodos, ToggleTodo } from "./types/todos";
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    getTodos().then((data) => setTodoList(data));
  }, []);

  const [title, setTitle] = useState("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleAddTodo = async () => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });

    setTodoList((prev) => [...prev, newTodo]);
    setTitle("");
  };

  const handleDeleteTodo = async (id: Todo["id"]) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = async ({ id, completed }: ToggleTodo) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: !completed }),
    });
    setTodoList((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !completed,
          };
        }
        return todo;
      }),
    );
  };

  return (
    <div>
      <input
        className="rounded-md border-[3px] border-white"
        type="text"
        value={title}
        onChange={handleTitleChange}
      />
      <button onClick={handleAddTodo}>입력</button>
      <TodoList
        todoList={todoList}
        onDeleteClick={handleDeleteTodo}
        onToggleClick={handleToggleTodo}
      />
    </div>
  );
}

export default App;
