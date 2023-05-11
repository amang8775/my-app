import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
export default function MathPuzzle() {
  const {
    abacus,
    setAbacus,
    isAbacusSolved,
    setIsAbacusSolved,
    time,
    prevTime,
    setPrevTime,
    token,
    setLoading
  } = useContext(AppContext);

  useEffect(() => {
    if (isAbacusSolved) {
      setStatement("Yay, you've solved this one!");
    }
  }, [isAbacusSolved]);
  useEffect(() => {
    if (abacus) {
      var mathPuzzleModal = document.getElementById("mathPuzzleModal");
      mathPuzzleModal.style.display = "grid";
    } else {
      var mathPuzzleModal = document.getElementById("mathPuzzleModal");
      mathPuzzleModal.style.display = "none";
    }
  }, [abacus]);

  const [arr, setArr] = useState([]);
  const [sign, setSign] = useState([]);

  const [statement, setStatement] = useState("Make the sum add up!");

  const [index, setIndex] = useState(0);

  const reset = () => {
    setArr([]);
    setSign([]);
    setIndex(0);
  };

  const pushNumber = (number) => {
    let sum = 0;
    if (index === 5) {
      if (sign[0] == "+") {
        sum += arr[0];
        sum += arr[1];
      } else {
        sum += arr[0];
        sum -= arr[1];
      }
      if (sign[1] == "+") {
        sum += arr[2];
      } else {
        sum -= arr[2];
      }

      if (number === sum) {
        setArr(() => {
          return [...arr, number];
        });
        
        const solvedTime = time - prevTime;
       
        //  make call to backend and update the solved time


        const fun = async () => {
          
          await axios.post(
            "https://aman-escape-game-backend.onrender.com/user/update",
            {
              puzzleName: "mathPuzzle",
              newTime: solvedTime,
            },
            {
              headers: { Authorization: token },
            }
          );
          
        };
        fun();
        //
        setPrevTime(time);

        setStatement("Yay, you've solved this one!");
        setIsAbacusSolved(true);
      } else {
        setStatement("Oh no, you got it wrong, better try again!");
        reset();
      }
    } else if (index % 2 === 0) {
      setArr(() => {
        return [...arr, number];
      });
      setIndex((index) => index + 1);
    } else {
      setStatement("Invalid Option Selected ");
    }
  };
  const pushSign = (opr) => {
    if (index % 2 === 1) {
      setSign(() => {
        return [...sign, opr];
      });
      setIndex((index) => index + 1);
    } else {
      setStatement("Invalid Option Selected ");
    }
  };

  const handleClose = () => {
    setAbacus(false);
  };
  return (
    <div>
      <div id="mathPuzzleModal" className="modal">
        <div className="modal-content">
          <span className="close close-mathpuzzle" onClick={handleClose}>
            &times;
          </span>

          <div id="math-puzzle-container">
            <div id="math-puzzle-main">
              <div id="math-puzzle-keypad">
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-one"
                  onClick={() => pushNumber(1)}
                >
                  1
                </button>
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-two"
                  onClick={() => pushNumber(2)}
                >
                  2
                </button>
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-three"
                  onClick={() => pushNumber(3)}
                >
                  3
                </button>
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-four"
                  onClick={() => pushNumber(4)}
                >
                  4
                </button>
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-five"
                  onClick={() => pushNumber(5)}
                >
                  5
                </button>
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-six"
                  onClick={() => pushNumber(6)}
                >
                  6
                </button>
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-seven"
                  onClick={() => pushNumber(7)}
                >
                  7
                </button>
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-eight"
                  onClick={() => pushNumber(8)}
                >
                  8
                </button>
                <button
                  type="button"
                  className="math-puzzle-numberButton"
                  id="math-puzzle-nine"
                  onClick={() => pushNumber(9)}
                >
                  9
                </button>
                <button
                  type="button"
                  className="math-puzzle-zeroButton"
                  id="math-puzzle-zero"
                  onClick={() => pushNumber(0)}
                >
                  0
                </button>
                <button
                  type="button"
                  className="math-puzzle-signButton"
                  id="math-puzzle-plus"
                  onClick={() => pushSign("+")}
                >
                  +
                </button>
                <button
                  type="button"
                  className="math-puzzle-signButton"
                  id="math-puzzle-minus"
                  onClick={() => pushSign("-")}
                >
                  -
                </button>
              </div>
              <div id="math-puzzle-sum">
                <div className="math-puzzle-position" id="math-puzzle-message">
                  {statement}
                </div>
                <div className="math-puzzle-position" id="math-puzzle-a">
                  {arr[0] ? arr[0] : "Number"}
                </div>
                <div className="math-puzzle-position" id="math-puzzle-b">
                  {sign[0] ? sign[0] : "Sign"}
                </div>
                <div className="math-puzzle-position" id="math-puzzle-c">
                  {arr[1] ? arr[1] : "Number"}
                </div>
                <div className="math-puzzle-position" id="math-puzzle-d">
                  {sign[1] ? sign[1] : "Sign"}
                </div>
                <div className="math-puzzle-position" id="math-puzzle-e">
                  {arr[2] ? arr[2] : "Number"}
                </div>
                <div className="math-puzzle-position" id="math-puzzle-f">
                  =
                </div>
                <div className="math-puzzle-position" id="math-puzzle-g">
                  {arr[3] ? arr[3] : "Number"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
