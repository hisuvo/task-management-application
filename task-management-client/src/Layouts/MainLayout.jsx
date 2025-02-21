import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbars/Navbars/Navbar";
import Footer from "../components/Footer/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="relative mb-[5rem]">
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
