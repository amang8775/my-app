import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'

import axios from 'axios';
export default function FlexBoxPuzzleModal() {

  
  const displayArr = ["flex"] ; 
  const flexDirectionArr = ["column" , "row" , "column-reverse" , "row-reverse"] ; 
  const justifyArr = ["flex-start" , "flex-end" , "center" , "space-between" , "space-around"] ; 
  const alignArr = ["flex-start" , "flex-end" , "center" , "baseline"] ; 

  const ansArr = [0 , 1 , 3 , 2, ] ; 
  const {box , setBox ,isBoxSolved , setIsBoxSolved , time , prevTime , setPrevTime , token , setLoading }  = useContext(AppContext) ;
  const [flexInd  , setFlexInd] = useState(0) ; 
  const [flexDirectionInd  , setFlexDirectionInd] = useState(0) ; 
  const [justifyInd  , setJustifyInd] = useState(0) ; 
  const [alignInd  , setAlignInd] = useState(0) ; 
  

  useEffect(()=>{
    if(isBoxSolved){
      setFlexInd(0) ; 
      setFlexDirectionInd(1) ; 
      setJustifyInd(3);
      setAlignInd(2) ; 
      setStatement("Well done! You've solved it!") ; 
    }
  },[isBoxSolved]) ; 

  const [statement , setStatement] = useState(`Start with turning on "Display flex"`) ;  

  
  const handleDisplayClick = (index)=>{
     
    const size = displayArr.length ; 
    let newInd = ((index+1)%size) ;
    
    var flexPuzzleContainer = document.getElementById("flexPuzzle-container") ; 
    flexPuzzleContainer.style.display = displayArr[newInd] ; 
    setFlexInd(newInd) ; 
    
  }
  const handleFlexDirectionClick = (index)=>{
     
    const size = flexDirectionArr.length ; 
    let newInd = ((index+1)%size) ;
    
    var flexPuzzleContainer = document.getElementById("flexPuzzle-container") ; 
    flexPuzzleContainer.style.flexDirection = flexDirectionArr[newInd] ; 
    setFlexDirectionInd(newInd) ; 
    
  }
  const handleJustifyArrClick = (index)=>{
     
    const size = justifyArr.length ; 
    let newInd = ((index+1)%size) ;
    
    var flexPuzzleContainer = document.getElementById("flexPuzzle-container") ; 
    flexPuzzleContainer.style.justifyContent  = justifyArr[newInd] ; 
    setJustifyInd(newInd) ; 
    
  }
  const handleAlignArrClick = (index)=>{
     
    const size = alignArr.length ; 
    let newInd = ((index+1)%size) ;
    
    var flexPuzzleContainer = document.getElementById("flexPuzzle-container") ; 
    flexPuzzleContainer.style.alignItems= alignArr[newInd] ; 
    setAlignInd(newInd) ; 
    
  }
 


   
  useEffect(()=>{
    if(box){
      var flexboxPuzzleModal = document.getElementById('flexboxPuzzleModal') ; 
      flexboxPuzzleModal.style.display = "grid" ; 
    }
    else{
      var flexboxPuzzleModal = document.getElementById('flexboxPuzzleModal') ; 
      flexboxPuzzleModal.style.display = "none" ; 
    }
  } , [box]) 

  useEffect(()=>{
    let tempArr = [flexInd , flexDirectionInd , justifyInd , alignInd] ; 
   
    if(tempArr.toString() == ansArr.toString()){
       const solvedTime = time - prevTime ; 
       const fun = async () => {

        await axios.post(
          "https://aman-escape-game-backend.onrender.com/user/update",
          {
            puzzleName: "flexboxPuzzle",
            newTime: solvedTime,
          },
          {
            headers: { Authorization: token },
          }
        );
      };
      fun();
       setPrevTime(time) ; 
       setIsBoxSolved(true) ; 
       setStatement("Well done! You've solved it!") ; 
    }
  } , [flexInd , flexDirectionInd , justifyInd , alignInd]) ; 










  return (
    <div>
      <div id="flexboxPuzzleModal" className="modal">


<div className="modal-content">
  <span className="close close-flexboxpuzzle"  onClick={()=>{setBox(false)}}>&times;</span>


  <div id="flexbox-puzzle-container">

    <div>
      <header className="heading">
        <p className="heading__rules">
          Use the buttons to rearrange the boxes and align them horizontally with proper gap !<br/>
          <br/>
        </p>
        <p className="heading__subtitle"></p>
        <div><span className="notification">{statement}</span></div>
      </header>
      <div className="flex-menu">
        <div>
          <label for="flexDisplay">Display</label>
          <button className="flex-menu__items" id="flexDisplay" onClick={()=>{handleDisplayClick(flexInd)}}>{displayArr[flexInd]}</button>
        </div>
        <div>
          <label for="flexDirectn">Flex Direction</label>
          <button className="flex-menu__items" id="flexDirectn" onClick={()=>{handleFlexDirectionClick(flexDirectionInd)}}>{flexDirectionArr[flexDirectionInd]}</button>
        </div>
        <div>
          <label for="flexJustCont">Justify-Content</label>
          <button className="flex-menu__items" id="flexJustCont" onClick={()=>{handleJustifyArrClick(justifyInd)}}>{justifyArr[justifyInd]}</button>
        </div>
        <div>
          <label for="flexAlignItems">Align-Items</label>
          <button className="flex-menu__items" id="flexAlignItems"  onClick={()=>{handleAlignArrClick(alignInd)}}>{alignArr[alignInd]}</button>
        </div>
      </div>

      <div className="flexPuzzle-container" id = "flexPuzzle-container">
        <div className="cubes cube-1">
          <div className="side top"></div>
          <div className="side bottom"></div>
          <div className="side front"></div>
          <div className="side back"></div>
          <div className="side left"></div>
          <div className="side right"></div>
        </div>
        <div className="cubes cube-2">
          <div className="side top"></div>
          <div className="side bottom"></div>
          <div className="side front"></div>
          <div className="side back"></div>
          <div className="side left"></div>
          <div className="side right"></div>
        </div>
        <div className="cubes cube-3">
          <div className="side top"></div>
          <div className="side bottom"></div>
          <div className="side front"></div>
          <div className="side back"></div>
          <div className="side left"></div>
          <div className="side right"></div>

        </div>
        <div className="cubes cube-4">
          <div className="side top"></div>
          <div className="side bottom"></div>
          <div className="side front"></div>
          <div className="side back"></div>
          <div className="side left"></div>
          <div className="side right"></div>
        </div>
        <div className="cubes cube-5">
          <div className="side top"></div>
          <div className="side bottom"></div>
          <div className="side front"></div>
          <div className="side back"></div>
          <div className="side left"></div>
          <div className="side right"></div>
        </div>
      </div>
    </div>
  </div>

</div>


</div>
    </div>
  )
}
