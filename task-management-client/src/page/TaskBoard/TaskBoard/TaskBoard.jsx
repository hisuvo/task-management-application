import { useState } from "react";

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: ["Task 1", "Task 2"],
    inProgress: ["Task 3"],
    done: ["Task 4"],
  });

  const handleDragStart = (e, task, category) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("fromCategory", category);
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const task = e.dataTransfer.getData("task");
    const fromCategory = e.dataTransfer.getData("fromCategory");

    if (fromCategory !== category) {
      setTasks((prev) => {
        const updatedTasks = { ...prev };
        updatedTasks[fromCategory] = updatedTasks[fromCategory].filter(
          (t) => t !== task
        );
        updatedTasks[category] = [...updatedTasks[category], task];
        return updatedTasks;
      });
    }
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="flex gap-4 p-6 bg-gray-100 min-h-screen justify-center">
      {["todo", "inProgress", "done"].map((category) => (
        <div
          key={category}
          className="w-64 p-4 bg-white rounded-lg shadow-lg"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, category)}
        >
          <h2 className="text-lg text-gray-950 font-bold text-center mb-3 capitalize">
            {category.replace("inProgress", "In Progress")}
          </h2>
          <div className="space-y-2">
            {tasks[category].map((task) => (
              <div
                key={task}
                className="p-3 bg-blue-500 text-white rounded cursor-pointer shadow-md"
                draggable
                onDragStart={(e) => handleDragStart(e, task, category)}
              >
                {task}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
