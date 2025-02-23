import useAxiosPublice from "../../hooks/useAxiosPublice";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskList from "../TaskList/TaskList";
import useTask from "../../hooks/useTask";

const TaskBoard = () => {
  const [tasks, refetch] = useTask();
  const axiosPublice = useAxiosPublice();

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.category = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

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
          {["To-Do", "In Progress", "Done"].map((category) => (
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
