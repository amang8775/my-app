import React, { useContext } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef  } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import Loading from "./Loading";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate() ; 

  const {setIsLogged,setToken , loading , setLoading} = useContext(AppContext) ; 
  const handleSubmitClick = async(e)=>{
     e.preventDefault();
     const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      setLoading(true) ; 
      const res =  await axios.post('https://aman-escape-game-backend.onrender.com/user/register',user );
 
      localStorage.setItem('firstLogin',res.data.accesstoken);
      setToken(res.data.accesstoken) ; 
      setIsLogged(true) ; 
      setLoading(false) ; 
      navigate('/') ; 
      
    } catch (error) {
      console.log("error in registtration" , error);
    } 
  }
  return (
    loading ?  <Loading/> : (
      <div className="login-a">
      <div className="login-container">
        <h1 className="login-head">register</h1>
        <input
          className="login-inp"
          type="text"
          placeholder="Name"
          required
          ref={username}
        />
        <input
          className="login-inp"
          type="email"
          placeholder="Email"
          required
          ref={email}
        />
        <input
          className=" login-inp"
          type="Password"
          placeholder="Password"
          ref={password}
          required
        />
        <button className="submit-btn" onClick={handleSubmitClick} required>
          Submit
        </button>
        <div className="btn">
          <button className="btn-a">
            <Link to="/register">register</Link>
          </button>
          <button className="btn-b">
            <Link to="/login">login</Link>
          </button>
        </div>
      </div>
    </div>
    )
   
  );
}