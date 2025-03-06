import "./App.css";
import { type Todo, getTodos } from "./components/todos";
import { useState, useEffect } from "react";
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

  return (
    <>
      <TodoList todoList={todoList} />
      <input type="text" value={title} onChange={handleTitleChange} />
      <button onClick={handleAddTodo}>입력</button>
    </>
  );
}
type TodoListProps = { todoList: Todo[] };

function TodoList({ todoList }: TodoListProps) {
  return (
    <>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </>
  );
}

type TodoItemProps = Todo;

function TodoItem({ id, title, completed,onDeleteClick }: TodoItemProps) {
  return (
    <div>
      <br></br>
      <div>id:{id}</div>
      <div>title:{title}</div>
      <div>completed:{completed}</div>
      <button onClick={handleDeleteTodo}>삭제</button>
      <br></br>
    </div>
  );
}

export default App;
