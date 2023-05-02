import Chart from '../Components/Chart'

import React, { useContext, useEffect } from 'react'
import Stopwatch from '../Components/StopWatch'
import PuzzlerModal from '../Components/PuzzlerModal'
import MathPuzzle from '../Components/MathPuzzle'
import FlexBoxPuzzleModal from '../Components/FlexBoxPuzzleModal'
import MirrorPuzzleModal from '../Components/MirrorPuzzleModal'
import RecurssionPuzzleModal from '../Components/RecurssionPuzzleModal'
import RoomScene from '../Components/RoomScene'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

export default function HomePage() {
  const navigate = useNavigate() ; 
  const {  isAdmin , isLogged } = useContext(AppContext) ;
  const firstLogin = localStorage.getItem("firstLogin")
  if(isAdmin){
    navigate('/admin') ; 
    return null;
  }
  if(firstLogin === false){
    navigate('/login') ; 
    return null;
  }
  return (
    <div>
       
      <Navbar/>
      <PuzzlerModal/>
      <MathPuzzle/>
      <FlexBoxPuzzleModal/>
      <MirrorPuzzleModal/>
      <RecurssionPuzzleModal/>
      <RoomScene/>
    </div>
  )
}
