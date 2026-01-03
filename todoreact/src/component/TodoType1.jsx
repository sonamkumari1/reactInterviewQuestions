import React, { useEffect, useState } from "react";

function TodoType1() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodos = async (e) => {
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
    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  // Toggle completed via checkbox
  const toggleComplete = async (id, completed) => {
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

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const updateTodo = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: editTitle }),
      headers: { "Content-Type": "application/json" },
    });

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editTitle } : todo
      )
    );

    setEditId(null);
    setEditTitle("");
  };

  const deleteCompleted = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todos CRUD (Checkbox for Completed)</h2>

      <form onSubmit={addTodos}>
        <input
          value={title}
          placeholder="Add todo"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            {editId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => updateTodo(todo.id)} disabled={todo.completed}>Update</button>
                <button onClick={() => setEditId(null)} disabled={todo.completed}>Cancel</button>
              </>
            ) : (
              <>
                {/* ✅ Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleComplete(todo.id, todo.completed)
                  }
                />

                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    margin: "0 10px",
                  }}
                >
                  {todo.title}
                </span>

                <button onClick={() => startEdit(todo)} disabled={todo.completed}>Edit</button>
                <button onClick={() => deleteCompleted(todo.id)} disabled={todo.completed}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoType1;
