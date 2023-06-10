import React from "react";
import "./styles/Navigation.scss";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to={"/overview"} className="nav-link">
            Overview
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/calendar"} className="nav-link">
            Calendar
          </NavLink>
        </li>
      </ul>
    </>
  );
};
export default Navigation;
