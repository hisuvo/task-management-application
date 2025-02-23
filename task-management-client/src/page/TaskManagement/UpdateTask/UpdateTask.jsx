import React, { useEffect, useState } from "react";
import useAxiosPublice from "../../../hooks/useAxiosPublice";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const axiosPublice = useAxiosPublice();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch specific task
  const {
    data: updateTask,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["update-task", id],
    queryFn: async () => {
      const res = await axiosPublice.get(`/task/${id}`);
      return res.data;
    },
  });

  // Set task data when updateTask is fetched
  useEffect(() => {
    if (updateTask) {
      setTask({
        title: updateTask.title || "",
        description: updateTask.description || "",
        category: updateTask.category || "To-Do",
        timestamp: new Date().toLocaleString(),
      });
    }
  }, [updateTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosPublice
      .put(`/tasks/${id}`, task)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Update your task",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          navigate("/task-management");
        }
      })
      .catch((error) => console.log("Error updating task:", error));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-6 bg-white border-2 border-blue-950 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Update Task</h2>
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
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
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
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
            placeholder="Enter task description"
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
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
