import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50 -mt-[4rem]">
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold">
          Streamline Your Tasks, Boost Your Productivity!
        </h1>
        <p>
          Manage your tasks efficiently with our intuitive task management
          system. Stay organized, collaborate with your team, and get things
          done faster—all in one place!
        </p>
        <button className="btn bg-blue-950 text-gray-50">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
