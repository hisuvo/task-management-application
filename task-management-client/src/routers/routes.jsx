import { createBrowserRouter } from "react-router-dom";
import Error from "../page/Error/Error/Error";
import MainLayout from "../Layouts/MainLayout";
import Home from "../page/Home/Home/Home";
import About from "../page/About/About/About";
import Contact from "../page/Contact/Contact/Contact";
import Dashbord from "../page/Dashbord/Dashbord/Dashbord";
import SignIn from "../components/SingIn/SignIn";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/dashbord",
        element: <Dashbord />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);

export default routes;
