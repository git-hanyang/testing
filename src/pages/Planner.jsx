
import React, { useState, useEffect } from "react";
import PlannerTable from "../components/PlannerComponents/PlannerTable";
import axios from "axios";

function Planner() {
  const [plannerData, setPlannerData] = useState("");
  const [loading, setLoading] = useState(true);

  async function getUserData() {
    return await axios({
      url: "/api/planner",
      method: "get",
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getUserData().then((data) => {
      setPlannerData(data);
      setLoading(false)
    });
  }, []);

  return (
    <div className="Planner">
      <h1>Itenerary Planner</h1>
      {loading? <h2>Loading...</h2> : 
      <PlannerTable data={plannerData.data} />}
    </div>
  );
}

export default Planner;


