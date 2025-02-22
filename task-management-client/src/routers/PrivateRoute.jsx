import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import SignIn from "../components/SingIn/SignIn";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (user) {
    return children;
  }
  return (
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold text-center">
        Before Sing With Google
      </h2>
    </div>
  );
};

export default PrivateRoute;
