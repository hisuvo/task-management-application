import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../../assets/error.gif";

const Error = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center text-center items-center gap-2">
      <figure>
        <img src={errorImg} alt="" width="250px" />
      </figure>
      <h2 className="text-2xl md:text-3xl font-semibold">
        Oops! Something went wrong...
      </h2>
      <p>
        It looks like there’s been a bit of a mix-up. Don’t worry, we’re on it!
      </p>
      <p>
        Back to the{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          Task Clr
        </Link>{" "}
        to start over.
      </p>
    </div>
  );
};

export default Error;
