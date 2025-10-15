import "./../styles/App.css";
import React, { useState, useMemo } from "react";

function App() {
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const tasks = useMemo(() => {
    const list = [];
    for (let i = 1; i <= 50; i++) {
      list.push({
        id: i,
        name: `Todo ${i}`,
        completed: i <= 25,
      });
    }
    return list;
  }, []);

  const slowFunction = (task) => {
    let start = performance.now();
    while (performance.now() - start < 0.5) {}
    return task;
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "All") return true;
        if (filter === "Active") return !task.completed;
        if (filter === "Completed") return task.completed;
      })
      .map((task) => slowFunction(task));
  }, [tasks, filter]);

  return (
    <div
      style={{
        background: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
        padding: "20px",
      }}
    >
      <h2>Todo App</h2>
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setDarkMode((prev) => !prev)}>
          Toggle Dark Mode
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
