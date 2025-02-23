import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-blue-950 text-gray-50 rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link to={"/add-tasks"} className="link link-hover">
          Add Task
        </Link>

        <Link to={"/task-management"} className="link link-hover">
          Task Management
        </Link>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Task
          Clr
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
