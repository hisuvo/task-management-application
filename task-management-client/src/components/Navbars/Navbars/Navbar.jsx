import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../../auth/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Task Clr
        </Link>

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
            <NavLink to="/" className="block py-2 px-4 hover:text-gray-400">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="block py-2 px-4 hover:text-gray-400"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="block py-2 px-4 hover:text-gray-400"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className="block py-2 px-4 hover:text-gray-400"
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
        <div>
          {user ? (
            <div className="flex justify-center items-center">
              <img
                className="w-12 h-12 rounded-full border-2 border-white"
                src={user?.photoURL}
                alt="user image"
              />
              {/* <p>Logout</p> */}
            </div>
          ) : (
            <Link
              to="/signin"
              className="block py-2 px-4 bg-gray-50 text-gray-950"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
