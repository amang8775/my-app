import React, { useContext } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

import { useRef } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import Loading from "./Loading";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { isLogged, setIsLogged, token, setToken, setLoading , loading  } =
    useContext(AppContext);
  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    
      const res = await axios.post(
        "https://aman-escape-game-backend.onrender.com/user/login",
        { email: email.current.value, password: password.current.value }
      );
      localStorage.setItem("firstLogin", res.data.accesstoken);
      setToken(res.data.accesstoken);
      setIsLogged(true);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.response.data);
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="login-a">
      <div className="login-container">
        <h1 className="login-head">login</h1>
        <input
          className="login-inp"
          type="email"
          placeholder="Email"
          ref={email}
          required
        />
        <input
          className=" login-inp"
          type="Password"
          placeholder="Password"
          ref={password}
          required
        />
        <button className="submit-btn" onClick={handleLoginClick}>
          Submit
        </button>
        <div className="btn">
          <button className="btn-a">
            <Link to="/login">login</Link>
          </button>
          <button className="btn-b">
            <Link to="/register">register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
