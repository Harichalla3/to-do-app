import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editInput, setEditInput] = useState("");

  // Add a new task
  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle completion status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Enable edit mode
  const startEditing = (task) => {
    setEditTaskId(task.id);
    setEditInput(task.text);
  };

  // Save the edited task
  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editInput } : task
      )
    );
    setEditTaskId(null);
    setEditInput("");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          To-Do App
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center px-4 py-2 rounded mb-2 ${
                task.completed ? "bg-green-200" : "bg-gray-200"
              }`}
            >
              {editTaskId === task.id ? (
                // Edit Mode
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              ) : (
                // Normal Mode
                <span
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.text}
                </span>
              )}

              <div className="flex gap-2">
                {editTaskId === task.id ? (
                  <button
                    onClick={saveEdit}
                    className="text-green-600 hover:text-green-800"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(task)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
