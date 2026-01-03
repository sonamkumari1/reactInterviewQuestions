import TodoItem from "./TodoItem";

export default function TodoList({ todos, ...actions }) {
  if (!todos.length) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No todos found
      </p>
    );
  }

  return (
    <ul className="space-y-2 mt-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...actions} />
      ))}
    </ul>
  );
}
