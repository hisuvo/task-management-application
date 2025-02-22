import { useState } from "react";
import useAxiosPublice from "../../hooks/useAxiosPublice";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskList from "../TaskList/TaskList";
import useTask from "../../hooks/useTask";

const TaskBoard = () => {
  const [tasks, refetch] = useTask();
  const [categories, setCategories] = useState([
    "To-Do",
    "In Progress",
    "Done",
  ]);
  const axiosPublice = useAxiosPublice();

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.category = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    // If the category doesn't exist, add it
    if (!categories.includes(destination.droppableId)) {
      setCategories([...categories, destination.droppableId]);
      await axiosPublice.post("/categories", {
        category: destination.droppableId,
      });
    }

    // Update task category in backend
    axiosPublice
      .patch(`/tasks/${movedTask._id}`, { category: movedTask.category })
      .catch((error) => console.log(error.code));
    refetch();
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
