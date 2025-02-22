import { createBrowserRouter } from "react-router-dom";
import Error from "../page/Error/Error/Error";
import MainLayout from "../Layouts/MainLayout";
import Home from "../page/Home/Home/Home";
import SignIn from "../components/SingIn/SignIn";
import TaskManagement from "../page/TaskManagement/TaskManagement/TaskManagement";
import AddTask from "../page/TaskManagement/AddTask/AddTask";
import UpdateTask from "../page/TaskManagement/UpdateTask/UpdateTask";
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-tasks/:id",
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/task-management",
        element: (
          <PrivateRoute>
            <TaskManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);

export default routes;
