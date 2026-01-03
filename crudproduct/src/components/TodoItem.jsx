import { useState } from "react";

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, text);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center gap-2 border p-2 rounded">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <input
          className="flex-1 border px-2 py-1 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-green-600 text-sm"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 text-sm"
        >
          Edit
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-600 text-sm"
      >
        Delete
      </button>
    </li>
  );
}
