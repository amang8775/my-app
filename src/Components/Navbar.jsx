import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Stopwatch from "./StopWatch";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Navbar() {

  const {token , isLogged , setIsLogged} = useContext(AppContext) ; 
  const navigate = useNavigate() ; 
  const handleClick = async (e) => {
    e.preventDefault() ; 
    {
      try {
        console.log("pehlli call");
        await axios.get("/user/logout");
        setIsLogged(false) ; 
        localStorage.setItem("firstLogin",false);
        console.log("doosri call");

        navigate('/login')
      } catch (error) {
        alert(error.response.data);
      }
    } 
  };

  const [user,setUser] = useState() ; 
  useEffect(()=>{
    const fun = async(req,res)=>{
      if(token){
        try {
          const data = await axios.get('https://aman-escape-game-backend.onrender.com/api/v1/user/info' , {
            headers : {
              Authorization : token
            }
          })
          console.log(data);
          setUser(data) ; 
        } catch (error) {
          console.log("eror in fetching user navbar" , error);
        }
      }
    }

    fun() ; 
  },[token] )
  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand">
          <img src="../../images/earth2.gif" className="nav-img" />
          <div onClick={()=>{navigate("/")}}>ESCAPE-GAME</div>
        </div>

        <div className="nav-time">
          Open the Door
          <Stopwatch />
        </div>

        
        
        <div className="nav-btn" onClick={handleClick}>LOG-OUT</div>
      </div>
    </div>
  );
}
