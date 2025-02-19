import React from "react";
import { Link } from "react-router-dom";

function PageNot() {
  return (
    <div className="flex h-[67vh] w-full flex-col items-center items-center justify-center gap-y-10">
      <p className="space-x-1 text-8xl font-bold">404 not Found!!</p>
      <p>Your visited page not found. You may go home page.</p>
      <button className="rounded-md bg-red-500 p-3 pl-4 pr-4 text-white">
        <Link to={"/"}>Back To Homepage</Link>
      </button>
    </div>
  );
}

export default PageNot;
