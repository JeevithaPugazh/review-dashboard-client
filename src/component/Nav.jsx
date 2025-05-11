import React from "react";
import { getUserName, logout } from "../utilities/api-util";
import { useNavigate } from "react-router-dom";

function Nav() {
  const nav = useNavigate();
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-bold flex">
        <span className="mr-2  material-symbols-outlined">
          account_circle
        </span>{" "}
        Welcome, {getUserName()}!
      </h2>
      <h1 className="text-xl font-bold"> ⭐Revuhub</h1>
      <h1
        className="text-xl font-bold"
        onClick={() => {
          logout();
          nav("/");
        }}
      >
        <span className="mr-2  material-symbols-outlined">
          logout
        </span>
      </h1>
    </nav>
  );
}

export default Nav;
