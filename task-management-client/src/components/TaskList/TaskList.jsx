import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "../TaskCard/TaskCard";

const TaskList = ({ category, tasks }) => {
  return (
    <Droppable droppableId={category}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-100 p-4 rounded shadow"
        >
          <h2 className="text-lg font-bold mb-2 text-center">{category}</h2>
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
