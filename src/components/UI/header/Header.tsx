import React from "react";
import "./styles/Header.scss";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <>
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <h3>To Do List Sandbox</h3>
        <Navigation />
      </nav>
    </>
  );
};
export default Header;
