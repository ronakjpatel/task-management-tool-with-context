import React from "react";
import { toast } from "react-toastify";
const Home = () => {
  return (
    <>
      <div className=" h-screen flex flex-col justify-center items-center ">
       
        <h1 className="text-xl p-11 text-cyan-700">
          Welcome to the Task Management App
        </h1>
        <span className="text-lg m-3 p-2 text-orange-500">
          Start Adding Tasks ...
        </span>
      </div>
    </>
  );
};

export default Home;
