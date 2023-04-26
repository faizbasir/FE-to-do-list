import React from "react";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <>
      <div className="flex justify-between bg-secondary px-8 py-4">
        <h1 className="text-primary text-xl">To Do List Sandbox</h1>
        <Navigation />
      </div>
    </>
  );
};
export default Header;
