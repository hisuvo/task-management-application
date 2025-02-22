import React from "react";

const TaskCard = ({ task }) => {
  console.log(task, "task card here");

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-2">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-gray-600 text-sm">{task.description}</p>
      <p className="text-xs text-gray-400">
        {new Date(task.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskCard;
