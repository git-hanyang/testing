import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; //no need to use .json
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Card,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import DestinationCards from "../components/DashboardComponents/DestinationCards";

import cityData from "../data/destinations";



export default function Dashboard() {

  const [destinationsData, setDestinationsData] = useState([]);
  const [destinationsLoaded, setDestinations]=useState([])


  function fetchDestinationsData() {
    const dataArray = [];
    for (const key in cityData) {
      dataArray.push(cityData[key]);
    }

    setDestinationsData(dataArray);
  
  }

  function fetchPlannerData() {
    axios({
      url: `/api/planner`,
      method: "get",
      
    }).catch((err)=>{
      console.log(err.response.status)
    })
  }


  useEffect(() => {
    //fetchPlannerData();
    fetchDestinationsData();
  }, []);

  return (
    <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-start align-items-start gap-2 p-5 position-relative"
    >
      <h2>Dashboard</h2>

      <Container
        fluid={true}
        className="d-flex flex-column justify-content-center align-items-start p-0 gap-3 my-2"
      >
        <h5>Destinations</h5>
        <Container
          fluid={true}
          className="d-flex flex-row justify-content-start align-items-center gap-3 p-2"
          style={{ overflowX: "auto" }}
        >
          {destinationsLoaded ? (
            destinationsData.map((city) => {
              return (
                <DestinationCards
                  data={city}
                  key={city.data.id}
                  className="mb-3"
                />
              );
            })
          ) : (
            <h5>Loading...</h5>
          )}
        </Container>
      </Container>

      <Container
        fluid={true}
        className="d-flex flex-column justify-content-center align-items-start p-0 gap-3 my-2"
      >
        <h5>Planner</h5>
        
      </Container>
     
    </Container>
  );
}