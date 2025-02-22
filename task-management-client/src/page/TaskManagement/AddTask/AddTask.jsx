import React, { useState } from "react";
import useAxiosPublice from "../../../hooks/useAxiosPublice";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
    timestamp: new Date().toLocaleString(),
  });

  const axiosPublice = useAxiosPublice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending data to backend
    console.log("Task submitted:", task);
    axiosPublice
      .post("/add-tasks", task)
      .then((res) => {
        if (res.data.acknowledged) {
          alert("Task added successfull");
        }
      })
      .catch((error) => console.log(error.code));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            maxLength="50"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            maxLength="200"
            value={task.description}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
          />
        </div>

        {/* Timestamp (auto-generated) */}
        <div>
          <label
            htmlFor="timestamp"
            className="block text-sm font-medium text-gray-700"
          >
            Timestamp
          </label>
          <input
            id="timestamp"
            name="timestamp"
            type="text"
            value={task.timestamp}
            readOnly
            className="w-full p-3 mt-1 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Category Field */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
