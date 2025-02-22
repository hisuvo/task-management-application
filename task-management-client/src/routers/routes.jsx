import { createBrowserRouter } from "react-router-dom";
import Error from "../page/Error/Error/Error";
import MainLayout from "../Layouts/MainLayout";
import Home from "../page/Home/Home/Home";
import SignIn from "../components/SingIn/SignIn";
import TaskManagement from "../page/TaskManagement/TaskManagement/TaskManagement";
import AddTask from "../page/TaskManagement/AddTask/AddTask";
import UpdateTask from "../page/TaskManagement/UpdateTask/UpdateTask";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-tasks",
        element: <AddTask />,
      },
      {
        path: "/update-tasks/:id",
        element: <UpdateTask />,
      },
      {
        path: "/task-management",
        element: <TaskManagement />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);

export default routes;
