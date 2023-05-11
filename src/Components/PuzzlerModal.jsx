import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
export default function PuzzlerModal() {
  const {
    poster,
    setPoster,
    isPosterSolved,
    setIsPosterSolved,
    time,
    prevTime,
    setPrevTime,
    token,
  } = useContext(AppContext);

  const [statement, setStatement] = useState(
    "Hmm, I can't seem to read this note."
  );
  const [dataItem, setDataItem] = useState();
  const [dragId, setDragId] = useState();
  useEffect(() => {
    if (isPosterSolved) {
      setStatement("You solved it!");
    }
  }, [isPosterSolved]);
  useEffect(() => {
    if (poster) {
      var puzzlerModal = document.getElementById("puzzlerModal");
      puzzlerModal.style.display = "grid";
    } else {
      var puzzlerModal = document.getElementById("puzzlerModal");
      puzzlerModal.style.display = "none";
    }
  }, [poster]);

  var ansID = ["0", "6", "8", "1", "2", "7", "4", "3", "5"];
  const droppedID = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const handleOnDrag = (e) => {
    var newDataItem = e.target;
    var newId = e.target.getAttribute("id");
    setDragId(newId);
    setDataItem(newDataItem);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    e.target.appendChild(dataItem);
    var ind = e.target.getAttribute("index");

    droppedID.current[ind] = dragId;

    setDragId();
    setDataItem();
  };

  const handleSubmit = () => {
    if (droppedID.current.toString() === ansID.toString()) {
      setIsPosterSolved(true);
      setStatement("You solved it!");
      const solvedTime = time - prevTime;
      //  make call to backend and update the solved time
      const fun = async () => {
        await axios.post(
          "https://aman-escape-game-backend.onrender.com/update",
          {
            puzzleName: "puzzlerModalPuzzle",
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
    } else {
      setStatement("Try Again");
    }
  };
  const handleRevealText = (e) => {
    e.target.style.backgroundColor = "transparent";
  };
  return (
    <div>
      <div id="puzzlerModal" className="modal">
        <div className="modal-content">
          <span
            className="close close-puzzler"
            onClick={() => {
              setPoster(false);
            }}
          >
            &times;
          </span>

          <div id="puzzler-container">
            <div className="content">
              <div>
                <p id="alert">{statement}</p>
              </div>
            </div>
            <p className="quote">
              "The person who masters himself through self-control and
              discipline is truly undefeatable." -Buddha
            </p>
            <br />
            <p className="quote">
              Directions: Solve the riddle of the runes: the tiles are all out
              of order. <br />
              Can you figure out their correct order?
              <br />
              Drag and drop the tiles into the empty boxes in the correct order.{" "}
              <br /> Hint: When placing a tile, do not hover over boxes you've
              already filled or are going to fill! <br />
              <span className="bighint">Bigger Hint: </span>
              <span
                className="revealtext"
                onClick={(e) => {
                  handleRevealText(e);
                }}
              >
                Use the console to watch for changes in the array!
              </span>{" "}
            </p>

            <div id="btn-container">
              <button onClick={handleSubmit}>Submit Answer</button>
            </div>
            <div className="outerflex">
              <div className="topContainer">
                <div className="outerBorder">
                  <div
                    className="tile"
                    id="1"
                    draggable
                    onDrag={(e) => {
                      handleOnDrag(e);
                    }}
                  >
                    <img
                      src="https://assets.codepen.io/108463/tile1.png"
                      alt=""
                      id="1"
                    />
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="tile"
                    draggable
                    onDrag={(e) => {
                      handleOnDrag(e);
                    }}
                  >
                    <img
                      src="https://assets.codepen.io/108463/tile2.png"
                      alt=""
                      id="2"
                    />
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="tile"
                    draggable
                    onDrag={(e) => {
                      handleOnDrag(e);
                    }}
                  >
                    <img
                      src="https://assets.codepen.io/108463/tile3.png"
                      alt=""
                      id="3"
                    />
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="tile"
                    draggable
                    onDrag={(e) => {
                      handleOnDrag(e);
                    }}
                  >
                    <img
                      src="https://assets.codepen.io/108463/tile4.png"
                      id="4"
                      alt=""
                    />
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="tile"
                    draggable
                    onDrag={(e) => {
                      handleOnDrag(e);
                    }}
                  >
                    <img
                      src="https://assets.codepen.io/108463/tile5.png"
                      id="5"
                      alt=""
                    />
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="tile"
                    draggable
                    onDrag={(e) => {
                      handleOnDrag(e);
                    }}
                  >
                    <img
                      src="https://assets.codepen.io/108463/tile6.png"
                      id="6"
                      alt=""
                    />
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="tile"
                    draggable
                    onDrag={(e) => {
                      handleOnDrag(e);
                    }}
                  >
                    <img
                      src="https://assets.codepen.io/108463/tile7.png"
                      id="7"
                      alt=""
                    />
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="tile"
                    draggable
                    onDrag={(e) => {
                      handleOnDrag(e);
                    }}
                  >
                    <img
                      src="https://assets.codepen.io/108463/tile8.png"
                      id="8"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="bottomContainer">
                <div className="outerBorder">
                  <div
                    className="blank"
                    index="1"
                    onDrop={(e) => {
                      handleOnDrop(e);
                    }}
                    onDragOver={(e) => {
                      handleOnDragOver(e);
                    }}
                  >
                    {" "}
                  </div>
                </div>

                <div className="outerBorder">
                  <div
                    className="blank"
                    index="2"
                    onDrop={(e) => {
                      handleOnDrop(e);
                    }}
                    onDragOver={(e) => {
                      handleOnDragOver(e);
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="blank"
                    index="3"
                    onDrop={(e) => {
                      handleOnDrop(e);
                    }}
                    onDragOver={(e) => {
                      handleOnDragOver(e);
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="blank"
                    index="4"
                    onDrop={(e) => {
                      handleOnDrop(e);
                    }}
                    onDragOver={(e) => {
                      handleOnDragOver(e);
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="blank"
                    index="5"
                    onDrop={(e) => {
                      handleOnDrop(e);
                    }}
                    onDragOver={(e) => {
                      handleOnDragOver(e);
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="blank"
                    index="6"
                    onDrop={(e) => {
                      handleOnDrop(e);
                    }}
                    onDragOver={(e) => {
                      handleOnDragOver(e);
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="blank"
                    index="7"
                    onDrop={(e) => {
                      handleOnDrop(e);
                    }}
                    onDragOver={(e) => {
                      handleOnDragOver(e);
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <div className="outerBorder">
                  <div
                    className="blank"
                    index="8"
                    onDrop={(e) => {
                      handleOnDrop(e);
                    }}
                    onDragOver={(e) => {
                      handleOnDragOver(e);
                    }}
                  >
                    {" "}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
