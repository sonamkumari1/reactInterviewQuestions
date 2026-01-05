import React from "react";
import { useState, useEffect } from "react";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    setTodo(data);
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
    setTodo([newTodo, ...todo]);
  };

  const deleteTodo = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    setTodo(todo.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = async (id, completed) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !completed }),
      headers: { "Content-Type": "application/json" },
    });

    setTodo(
      todo.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const startEdit = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };

  const saveEdit = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: editingText }),
      headers: { "Content-Type": "application/json" },
    });

    setTodo(todo.map((t) => (t.id === id ? { ...t, title: editingText } : t)));

    setEditingId(null);
    setEditingText("");
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">add</button>
      </form>
      <ul>
        {todo.map((todo) => (
          <li key={todo.id}>
            {todo.id === editingId ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button type="button" onClick={() => saveEdit(todo.id)}>
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
                    margin: "0 10px",
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => startEdit(todo.id, todo.title)}>
                  edit
                </button>
                <button onClick={() => deleteTodo(todo.id)}>delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
