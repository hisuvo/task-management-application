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
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col justify-center items-center -mt-[4rem]">
      <div className="max-w-2xl mx-auto text-center bg-blue-50 rounded-2xl border shadow-lg p-4 md:p-8 space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Sign In to Continue
        </h2>
        <p>
          Oops! It looks like you're not signed in. Please log in or create an
          account to access your tasks, collaborate with your team, and stay
          organized.
        </p>
        <SignIn />
      </div>
    </div>
  );
};

export default PrivateRoute;
