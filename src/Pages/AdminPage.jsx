import Chart from "../Components/Chart";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./admin.scss";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

import Loading from "../Components/Loading";

export default function AdminPage() {
  const [list, setList] = useState([]);
  const [itemsList, setItemsList] = useState();
  const { token , loading , setLoading } = useContext(AppContext);
  useEffect(() => {
    const fun = async () => {
      setLoading(true) ; 
      const res = await axios.get("https://aman-escape-game-backend.onrender.com/user/leaderBoard", {
        headers: {
          Authorization: token,
        },
      });

      const arr = Object.entries(res.data).map(([key, value]) => {
        return { key, value };
      });
      arr.splice(0,1) ; 
      setList(arr);
      setLoading(false) ; 
    };
    fun();
  }, [token]);

  useEffect(() => {
    
    if (list.length > 0) {
      let List = list.map(( ele , index) => {
        return (
            <tr>
            <td>{index + 1}</td>
            <td>{ele.value.username}</td>
            <td>{ele.value.time}</td>
            </tr>

        );
      });


      setItemsList(List) ; 
    }
  }, [list]);

  
  return (
    loading ? <Loading/> : (
      <div>
      <Navbar />
      <div className="charts">
        <Chart />
      </div>
      <div class="leaderboard">
        <h2>LeaderBoard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{itemsList}</tbody>
        </table>
      </div>
    </div>
    )
    
  );
}
