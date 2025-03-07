import { TodoListProps } from "../types/todos";
import TodoItem from "./TodoItem";
export default function TodoList({
  todoList,
  onDeleteClick,
  onToggleClick,
}: TodoListProps) {
  return (
    <div className="align-center flex flex-col">
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onDeleteClick={onDeleteClick}
          onToggleClick={onToggleClick}
        />
      ))}
    </div>
  );
}
