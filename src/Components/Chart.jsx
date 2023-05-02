import { useContext, useEffect, useState } from "react";
import BarChart from "./BarChart";
import { UserData } from "./data";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import PieChart from "./PieChart";

function Chart() {
  const { token } = useContext(AppContext);
  const [graphData, setGraphData] = useState();
  const [plotData, setPlotData] = useState();
  useEffect(() => {
    const fun = async () => {
      try {
        console.log("hello from chart ", token);
        const res = await axios.get("https://aman-escape-game-backend.onrender.com/api/v1/user/getAverageTime", {
          headers: {
            Authorization: token,
          },
        });

        const arr = Object.entries(res.data[0]).map(([key, value]) => {
          return { key, value };
        });
        arr.splice(0, 1);
        console.log(arr);
        setGraphData(arr);
      } catch (error) {
        console.log("not fetch average time", error);
      }
    };
    fun();
  }, [token]);

  useEffect(() => {
    console.log(graphData);
    if (graphData) {
      const temp = {
        labels: graphData.map((data) => data.key),
        datasets: [
          {
            label: "Average time taken ",
            data: graphData.map((data) => data.value),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "white",
            borderWidth: 2,
          },
        ],
      };
      console.log("temp", temp);
      setPlotData(temp);
    }
  }, [graphData]);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT
  if (!plotData) {
    return <div>...Loading</div>;
  }
  return (
    <div className="App">
      <div style={{ width: 600 }}>
        <BarChart chartData={plotData} />
        <PieChart chartData={plotData} />
      </div>
    </div>
  );
}

export default Chart;