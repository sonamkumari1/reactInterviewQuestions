import React, { useEffect, useState } from "react";

function TodoAgai() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = async (id, completed) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !completed }),
      headers: { "Content-Type": "application/json" },
    });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };

  const saveTodo = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: editingText }),
      headers: { "Content-Type": "application/json" },
    });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editingText } : todo
      )
    );
    setEditingId(null)
    setEditingText("")
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button type="button" onClick={() => saveTodo(todo.id)}>
                save
              </button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id, todo.completed)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button onClick={()=>startEditing(todo.id, todo.title)}>edit</button>
              <button onClick={() => deleteTodo(todo.id)}>delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoAgai;
