import React, { useState } from "react";

const categories = ["Todo", "In Progress", "Done"];

export default function TrellBoard() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // ADD TASK
  const addTask = () => {
    if (!taskText.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), title: taskText, category: "Todo" },
    ]);
    setTaskText("");
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // START EDIT
  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.title);
  };

  // SAVE EDIT
  const saveEdit = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: editText } : t
      )
    );
    setEditId(null);
    setEditText("");
  };

  // CHANGE CATEGORY
  const changeCategory = (id, category) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, category } : t
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Trello Board</h2>

      <input
        placeholder="Add new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {categories.map((category) => (
          <div
            key={category}
            style={{ border: "1px solid #ccc", padding: 10, width: 260 }}
          >
            <h3>{category}</h3>

            {tasks
              .filter((t) => t.category === category)
              .map((task) => (
                <div key={task.id} style={{ marginBottom: 10 }}>
                  {editId === task.id ? (
                    <>
                      <input
                        value={editText}
                        onChange={(e) =>
                          setEditText(e.target.value)
                        }
                      />
                      <button onClick={() => saveEdit(task.id)}>
                        Save
                      </button>
                      <button onClick={() => setEditId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{task.title}</span>
                      <button onClick={() => startEdit(task)}>
                        Edit
                      </button>
                    </>
                  )}

                  <br />

                  <select
                    value={task.category}
                    onChange={(e) =>
                      changeCategory(task.id, e.target.value)
                    }
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <button onClick={() => deleteTask(task.id)}>
                    ❌
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
