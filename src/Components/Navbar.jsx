import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Stopwatch from "./StopWatch";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { setIsAdmin ,  setIsLogged, setToken , setTime} = useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("firstLogin");
    setIsLogged(false);
    setToken(false);
    setIsAdmin(false) ; 
    setTime(0) ; 
    navigate("/login");
  };
  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand">
          <img src="../../images/earth2.gif" className="nav-img" />
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            ESCAPE-GAME
          </div>
        </div>

        <div className="nav-time">
          <Stopwatch />
          Open The Door
        </div>

        <div
          className="nav-btn"
          onClick={handleClick}
        >
          LOG-OUT
        </div>
      </div>
    </div>
  );
}
