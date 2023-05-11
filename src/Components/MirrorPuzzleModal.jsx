import React, { useContext, useEffect , useState} from "react";
import { AppContext } from "../Context/AppContext";
import axios from 'axios';
export default function MirrorPuzzleModal() {
  const { mirror, setMirror , isMirrorSolved , setIsMirrorSolved , time , prevTime , setPrevTime , token } = useContext(AppContext);
  const [statement , setStatement] = useState("Hmm, I can't seem to read this note.") ;


  useEffect(()=>{
    if(isMirrorSolved){
      var text = document.getElementById('note-text') ; 
      text.style.transform = "scaleX(1)"; 
      setStatement("Ah, there we go. Interesting.")
    }
  }, [])
  useEffect(() => {
    if (mirror) {
      var mirrorPuzzleModal = document.getElementById("mirrorPuzzleModal");
      mirrorPuzzleModal.style.display = "grid";
    } else {
      var mirrorPuzzleModal = document.getElementById("mirrorPuzzleModal");
      mirrorPuzzleModal.style.display = "none";
    }
  }, [mirror]);

  
    const handleDragOver = (e)=>{
    e.preventDefault() ; 
  }

  const handleDrop = (e)=>{
   
    var text = document.getElementById('note-text') ; 
    text.style.transform = "scaleX(1)"; 
    setIsMirrorSolved(true)  ; 
    setStatement("Ah, there we go. Interesting.") ; 


    const solvedTime = time - prevTime ; 
          //  make call to backend and update the solved time 
    
          // 
          const fun = async () => {
            
            await axios.post(
              "https://aman-escape-game-backend.onrender.com/user/update",
              {
                puzzleName: "mirrorPuzzle",
                newTime: solvedTime,
              },
              {
                headers: { Authorization: token },
              }
            );
          };
          fun();
           setPrevTime(time) ; 
    
  }
  return (
    <div>
      <div id="mirrorPuzzleModal" className="modal">
        <div className="modal-content">
          <span
            className="close close-mirrorpuzzle"
            onClick={() => {
              setMirror((mirror) => !mirror);
            }}
          >
            &times;
          </span>
          \
          <div id="mirror-puzzle-container">
            <p id="mirror-clue">{statement}</p>
            <div id="note" draggable >
              <p
                id="note-text"
                className="mirror-text"
                
                
              >
                "Scraps of code drifting around the network can congeal into
                pools of data. within this primordial soup the code breaks,
                re-assembles, mutates. Evolves"
              </p>
            </div>
            <div id="mmirror" onDrop={(e)=>{handleDrop(e)}} onDragOver={(e)=>{handleDragOver(e)}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
