import React from "react";
import News from "./Components/News";
import { FaNewspaper } from "react-icons/fa";

function App() {
  return (
    <div className=" min-h-screen bg-gradient-to-br from-neutral-300 via-indigo-200 to-neutral-400 w-full mx-auto">
      <div className=" p-3 text-center bg-gradient-to-r from-orange-200 via-indigo-400 to-orange-600 text-3xl md:text-5xl text-neutral-900 font-bold mx-auto">
        <div className="flex justify-center items-center gap-x-2 border-b-4 px-2 border-indigo-600 rounded-lg w-fit mx-auto ">
          Aco<span className=" text-neutral-600">News</span>{" "}
          <FaNewspaper className="" />{" "}
        </div>
      </div>
      <News />
    </div>
  );
}

export default App;
