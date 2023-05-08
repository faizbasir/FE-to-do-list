import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="flex">
        <p className="px-4 text-primary">
          <NavLink to={"/overview"}>Overview</NavLink>
        </p>
        <p className="px-2 text-primary">|</p>
        <p className="px-4 text-primary">Calendar</p>
      </div>
    </>
  );
};
export default Navigation;
