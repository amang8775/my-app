import React, { useState, useRef, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";

function Stopwatch() {
  const { time, setTime, isRunning, setIsRunning, isCompleted , token} =
    useContext(AppContext);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isCompleted) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    else{
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }
  }, [isCompleted , token ]);

 
  

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="timer">{formatTime(time)}</div>
    </div>
  );
}

export default Stopwatch;
