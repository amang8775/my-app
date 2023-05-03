import { createContext, useState ,useEffect} from "react";
import axios from "axios" ; 

export const AppContext = createContext() ; 


export default function AppContextProvider({children}){

    const [abacus , setAbacus] = useState(false) ; 
    const [computer , setComputer] = useState(false) ; 
    const [pipe , setPipe] = useState(false) ; 
    const [box , setBox] = useState(false) ; 
    const [mirror , setMirror] = useState(false) ; 
    const [poster , setPoster] = useState(false) ; 
    const [isAbacusSolved , setIsAbacusSolved] = useState(false) ; 
    const [isComputerSolved , setIsComputerSolved] = useState(false) ; 
    const [isPipeSolved , setIsPipesolved] = useState(false) ; 
    const [isBoxSolved , setIsBoxSolved] = useState(false) ; 
    const [isMirrorSolved , setIsMirrorSolved] = useState(false) ; 
    const [isPosterSolved , setIsPosterSolved] = useState(false) ; 
    const [time, setTime] = useState(0);
    const [prevTime, setPrevTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted ] = useState(false);
    const [isLogged, setIsLogged ] = useState(false);
    const [isAdmin, setIsAdmin ] = useState(false);



    const [token, setToken] = useState(false);
    const firstLogin = localStorage.getItem("firstLogin");
    useEffect(() => {
      
      if (firstLogin) {
        const refreshToken = async () => {
          console.log("panchvi call");
          console.log("hello from use");
          const res = await axios.get("https://aman-escape-game-backend.onrender.com/api/v1/user/refreshtoken");
          console.log(res.data.accesstoken);
          setToken(res.data.accesstoken);
          setIsLogged(true) ;
          const user = await axios.get("https://aman-escape-game-backend.onrender.com/api/v1/user/info" , {
            headers : {
              Authorization : res.data.accesstoken
            }
          })
          console.log(user);
          if(user.data.role === "admin"){
            setIsAdmin(true) ; 
          }
          else{
            setIsAdmin(false) ; 
          }
          setTimeout(() => {
            refreshToken();
          }, 10 * 60 * 1000);

          console.log("cahtti call ");
        };
        refreshToken();
      }
    }, [isLogged]);


    const value = {
        abacus , setAbacus , computer , setComputer , pipe , setPipe , box , setBox , mirror , setMirror , poster , setPoster,
        isAbacusSolved , setIsAbacusSolved , isPipeSolved , setIsPipesolved , isComputerSolved , setIsComputerSolved , 
        isBoxSolved , setIsBoxSolved , isMirrorSolved , setIsMirrorSolved , isPosterSolved , setIsPosterSolved , time, setTime,isRunning, setIsRunning
        ,isCompleted, setIsCompleted ,prevTime, setPrevTime , token , setToken , isLogged, setIsLogged , isAdmin} ; 


    return <AppContext.Provider value  = {value}>
        {children}
    </AppContext.Provider>



}