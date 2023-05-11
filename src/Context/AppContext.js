import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [abacus, setAbacus] = useState(false);
  const [computer, setComputer] = useState(false);
  const [pipe, setPipe] = useState(false);
  const [box, setBox] = useState(false);
  const [mirror, setMirror] = useState(false);
  const [poster, setPoster] = useState(false);
  const [isAbacusSolved, setIsAbacusSolved] = useState(false);
  const [isComputerSolved, setIsComputerSolved] = useState(false);
  const [isPipeSolved, setIsPipesolved] = useState(false);
  const [isBoxSolved, setIsBoxSolved] = useState(false);
  const [isMirrorSolved, setIsMirrorSolved] = useState(false);
  const [isPosterSolved, setIsPosterSolved] = useState(false);
  const [time, setTime] = useState(0);
  const [prevTime, setPrevTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading , setLoading] = useState(false) ; 
   
  const navigate = useNavigate() ; 

 
  const [token, setToken] = useState(false);
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const fun = async () => {
        const res = await axios.get("https://aman-escape-game-backend.onrender.com/user/info", {
          headers: {
            Authorization: firstLogin,
          },
        });
        const user = res.data ; 
       
        if (user.role === "admin") {
       
          setIsAdmin(true);
          navigate('/admin') ; 
          
        } else {
          setIsAdmin(false);
        }

        setIsLogged(true) ; 
        setToken(firstLogin);
      };
      fun();
    }
  }, [isLogged]);

  const value = {
    abacus,
    setAbacus,
    computer,
    setComputer,
    pipe,
    setPipe,
    box,
    setBox,
    mirror,
    setMirror,
    poster,
    setPoster,
    isAbacusSolved,
    setIsAbacusSolved,
    isPipeSolved,
    setIsPipesolved,
    isComputerSolved,
    setIsComputerSolved,
    isBoxSolved,
    setIsBoxSolved,
    isMirrorSolved,
    setIsMirrorSolved,
    isPosterSolved,
    setIsPosterSolved,
    time,
    setTime,
    isRunning,
    setIsRunning,
    isCompleted,
    setIsCompleted,
    prevTime,
    setPrevTime,
    token,
    setToken,
    isLogged,
    setIsLogged,
    isAdmin,
    setIsAdmin, 
    loading , 
    setLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
