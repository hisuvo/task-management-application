import { useEffect, useState } from "react";
import useAxiosPublice from "../../hooks/useAxiosPublice";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskList from "../TaskList/TaskList";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([
    "To-Do",
    "In Progress",
    "Done",
  ]);
  const axiosPublice = useAxiosPublice();

  useEffect(() => {
    // Fetch tasks from the backend
    axiosPublice
      .get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((error) => console.log(error.code));
  }, []);

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    // If no destination, return
    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.category = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    // If the category doesn't exist, add it
    if (!categories.includes(destination.droppableId)) {
      // Add the new category to the list
      setCategories((prevCategories) => [
        ...prevCategories,
        destination.droppableId,
      ]);

      // Send the new category to the backend to save it
      await axiosPublice.post("/categories", {
        category: destination.droppableId,
      });
    }

    // Update task category in the backend
    axiosPublice
      .patch(`/tasks/${movedTask._id}`, {
        category: movedTask.category,
      })
      .catch((error) => console.log(error.code));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {categories.map((category) => (
            <TaskList
              key={category}
              category={category}
              tasks={tasks.filter((task) => task.category === category)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
