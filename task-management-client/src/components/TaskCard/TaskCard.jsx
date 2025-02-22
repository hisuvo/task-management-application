import { FilePenLine, Trash2 } from "lucide-react";
import useAxiosPublice from "../../hooks/useAxiosPublice";
import useTask from "../../hooks/useTask";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TaskCard = ({ task }) => {
  const axiosPunlice = useAxiosPublice();
  const [tasks, refetch] = useTask();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this task",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPunlice
          .delete(`/tasks/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "your task Deleted",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch((error) => console.log(error.code));
      }
    });
  };

  return (
    <div className="bg-white border-2 border-blue-950 p-4 rounded-lg shadow mb-2">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-gray-600 text-sm">{task.description}</p>
      <p className="text-xs text-gray-400">
        {new Date(task.timestamp).toLocaleString()}
      </p>

      <div className="flex gap-2 mt-2">
        <Link to={`/update-tasks/${task._id}`}>
          <button className="btn bg-blue-950 text-gray-50">
            <FilePenLine size={15} />
          </button>
        </Link>

        <button
          onClick={() => handleDelete(task._id)}
          className="btn bg-blue-950 text-gray-50"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
