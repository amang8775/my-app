import Chart from "../Components/Chart";

import React, { useContext, useEffect } from "react";

import PuzzlerModal from "../Components/PuzzlerModal";
import MathPuzzle from "../Components/MathPuzzle";
import FlexBoxPuzzleModal from "../Components/FlexBoxPuzzleModal";
import MirrorPuzzleModal from "../Components/MirrorPuzzleModal";
import RecurssionPuzzleModal from "../Components/RecurssionPuzzleModal";
import RoomScene from "../Components/RoomScene";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Loading from "../Components/Loading";

export default function HomePage() {
  const navigate = useNavigate();
  const { isAdmin, isLogged , loading } = useContext(AppContext);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
  
    if (isAdmin) {
      navigate("/admin"); 
    }
    if (firstLogin === null) {
      navigate("/login");
    }
  }, [isAdmin , isLogged]);

  return (
    loading ? <Loading/> : (
      <div>
      <Navbar />
      <PuzzlerModal />
      <MathPuzzle />
      <FlexBoxPuzzleModal />
      <MirrorPuzzleModal />
      <RecurssionPuzzleModal />
      <RoomScene />
    </div>
    )
   
  );
}
