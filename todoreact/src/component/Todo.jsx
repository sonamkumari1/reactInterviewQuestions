import React, { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({ name: title }),
        headers: { "Content-Type": "application/json" },
      });

      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save Edit
  const saveEdit = async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({ name: editingText }),
          headers: { "Content-Type": "application/json" },
        }
      );

      let updated = await res.json();

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, name: updated.name } : todo
        )
      );

      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("PUT Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App (Using API + Async/Await)</h1>

      {/* Add Todo */}
      <form onSubmit={addTodo}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new todo..."
        />
        <button type="submit">Add</button>
      </form>

      {/* Todo List */}
      <ul style={{ marginTop: "20px" }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            {editingId === todo.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                {todo.name}
                <button onClick={() => startEdit(todo.id, todo.name)}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
