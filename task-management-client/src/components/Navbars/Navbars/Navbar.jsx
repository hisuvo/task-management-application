import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { AuthContext } from "../../../auth/AuthProvider";
import SignIn from "../../SingIn/SignIn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const hanldeLogOut = () => {
    logOut();
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Task Clr
        </Link>

        {user ? (
          <>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Navbar Links */}
            <ul
              className={`md:flex md:items-center md:gap-6 absolute md:static bg-gray-900 w-full md:w-auto left-0 top-16 md:top-auto transition-all duration-300 ease-in-out p-4 md:p-0 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <NavLink
                  to="/add-tasks"
                  className="block py-2 px-4 hover:text-gray-400"
                >
                  Add Task
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/task-management"
                  className="block py-2 px-4 hover:text-gray-400"
                >
                  Task Management
                </NavLink>
              </li>
              <li>
                <p
                  className=" py-2 flex gap-2 px-4 hover:text-gray-400"
                  onClick={hanldeLogOut}
                >
                  <LogOut /> LogOut
                </p>
              </li>
            </ul>
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
