import Chart from "../Components/Chart";

import React, { useContext, useEffect } from "react";
import Stopwatch from "../Components/StopWatch";
import PuzzlerModal from "../Components/PuzzlerModal";
import MathPuzzle from "../Components/MathPuzzle";
import FlexBoxPuzzleModal from "../Components/FlexBoxPuzzleModal";
import MirrorPuzzleModal from "../Components/MirrorPuzzleModal";
import RecurssionPuzzleModal from "../Components/RecurssionPuzzleModal";
import RoomScene from "../Components/RoomScene";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { isAdmin, isLogged } = useContext(AppContext);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    console.log("firstLogin", firstLogin);
    console.log("admin" , isAdmin);
    if (isAdmin) {
      navigate("/admin");
    }
    if (firstLogin === null) {
      navigate("/login");
    }
  }, [isAdmin , isLogged]);

  return (
    <div>
      <Navbar />
      <PuzzlerModal />
      <MathPuzzle />
      <FlexBoxPuzzleModal />
      <MirrorPuzzleModal />
      <RecurssionPuzzleModal />
      <RoomScene />
    </div>
  );
}
