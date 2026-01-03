import React, { useEffect, useState } from "react";

function Practice1() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // CREATE
  const addTodo = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // START EDIT
  const startEdit = (todo) => {
    if (todo.completed) return;
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  // UPDATE
  const updateTodo = (id) => {
    if (!editTitle.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editTitle } : todo
      )
    );

    setEditId(null);
    setEditTitle("");
  };

  // DELETE
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
   <div style={{ padding: "20px" }}>
      <h2>Todo CRUD (No API)</h2>

      {/* CREATE */}
      <form onSubmit={addTodo}>
        <input
          value={title}
          placeholder="Add todo"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* READ */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            {editId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => updateTodo(todo.id)}>
                  Update
                </button>
                <button onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />

                <span
                  style={{
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    margin: "0 10px",
                    color: todo.completed ? "gray" : "black",
                  }}
                >
                  {todo.title}
                </span>

                <button
                  onClick={() => startEdit(todo)}
                  disabled={todo.completed}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  disabled={todo.completed}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Practice1;
