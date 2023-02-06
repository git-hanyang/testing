import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import React, { useState, useEffect, useContext } from "react";

import axios from "axios"; //no need to use .json
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Card,
  Button,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import DestinationCards from "../components/DashboardComponents/DestinationCards";

import PlannerCards from "../components/DashboardComponents/PlannerCards";
import cityData from "../data/destinations";



export default function Dashboard() {

  const [destinationsData, setDestinationsData] = useState([]);
  const [destinationsLoaded, setDestinations]=useState([])
  const [myPlannerData,setMyPlannerData]=useState()
  const [plannerLoaded,setPlannerLoaded]=useState(false)
  
  function logOut(){
    axios({
      url: `http://localhost:3003/api/planner`,
      method: "get",
      
    })
  }

  function fetchDestinationsData() {
    const dataArray = [];
    for (const key in cityData) {
      dataArray.push(cityData[key]);
    }

    setDestinationsData(dataArray);
  
  }

  function fetchPlannerData() {
    axios({
      url: `http://localhost:3003/api/planner`,
      method: "get",
      
    })
    .then((res)=>{
      console.log(res.data)
      setMyPlannerData(res.data)
      console.log(myPlannerData)
      setPlannerLoaded(true)
    })
    .catch((err)=>{
      console.log(err.response.status)
    })
  }


  useEffect(() => {
    fetchPlannerData();
    //fetchDestinationsData();
  }, []);

  return (
  <>
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
          
            {/* <Container
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
            </Container> */}
        </Container>

      <Container
        fluid={true}
        className="d-flex flex-column justify-content-center align-items-start p-0 gap-3 my-2"
      >
        <h5>Planner</h5>
        <Container
          fluid={true}
          className="d-flex flex-row justify-content-start align-items-center gap-3 p-2"
          style={{ overflowX: "auto" }}
        >
          {plannerLoaded ? (
            
              myPlannerData.map((planner,idx) => {
                return (
                  <PlannerCards
                    data={planner}
                    key={idx}
                    // state={setPlannerLoaded}
                  />
                );
              })
            ) : (
            <h5>Loading</h5>
          )}

          <Card className="flex-shrink-0 25 text-start p-4">
            <Card.Body>
              <LinkContainer to="/planner/create">
                <Button variant="primary" size="lg">
                
                  <FontAwesomeIcon icon={solid("circle-plus")} /> &nbsp; Create
                </Button>
              </LinkContainer>
            </Card.Body>
          </Card>

          

        </Container>
      </Container>

      <Form onSubmit={logOut}>
        <button>Logout</button>
      </Form>
      
    </Container>
     
    
  </>
  );
}