import React, {  useRef, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";

function Stopwatch() {
  const { time, setTime, isLogged , token  } = useContext(AppContext);
  const intervalRef = useRef(null);

  useEffect(() => {
 
    if (isLogged) {
      intervalRef.current = setInterval(() => {
        setTime((temp) => temp + 1);
      }, 1000);
    } else {
   
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTime(0);
    }
  }, [isLogged , token ]);

  const formatTime = (time) => {
    let temp = time ; 
    const minutes = Math.floor(temp / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (temp % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="timer">{formatTime(time)}</div>
    </div>
  );
}

export default Stopwatch;