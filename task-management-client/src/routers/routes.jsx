import { createBrowserRouter } from "react-router-dom";
import Error from "../page/Error/Error/Error";
import MainLayout from "../Layouts/MainLayout";
import Home from "../page/Home/Home/Home";

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
    ],
  },
]);

export default routes;
