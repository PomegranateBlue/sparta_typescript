import { Todo, ToggleTodo } from "../types/todos";

type TodoItemProps = Todo & {
  onDeleteClick: (id: Todo["id"]) => void;
  onToggleClick: (toggleTodo: ToggleTodo) => void;
};

export default function TodoItem({
  id,
  title,
  completed,
  onDeleteClick,
  onToggleClick,
}: TodoItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex gap-2">
        <button
          className="rounded-md border-[1px] border-white"
          onClick={() => onToggleClick({ id, completed })}
        >
          {completed ? "취소" : "완료"}
        </button>
        <button
          className="rounded-md border-[1px] border-white"
          onClick={() => onDeleteClick(id)}
        >
          삭제
        </button>
      </div>
      <div
        className={`font-medium ${completed ? "text-white line-through" : "text-white"}`}
      >
        {title}
      </div>
    </div>
  );
}
