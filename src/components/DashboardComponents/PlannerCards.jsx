import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { PlannerContext } from "../../PlannerContext";


function PlannerCards(data) {
  const [plannerData,setNewPlannerData]=useContext(PlannerContext)

  
  function handleDelete(e) {
    //console.log(data.data._id)
    axios({
      url: `http://localhost:3003/api/planner/${data.data._id}`,
      method: "delete",
    }).then(() => {
      axios({
        url: "http://localhost:3003/api/planner",
        method: "get",
      }).then((res) => {
        console.log(res.data)
        setNewPlannerData(res.data)
      });
    });
  }

  return (
    <>
      <Card className="flex-grow-0 flex-shrink-0 w-25 text-start mb-3">
        <Card.Body>
        {/* {console.log(typeof data.data.travelPeriod.start.toString())} */}
          <Card.Title>{data.data.name}</Card.Title>
          
            Travel Period :
            {data.data.travelPeriod.start + " - " +data.data.travelPeriod.end}

            <br />
            Destination : {data.data.destination}
          
          
        </Card.Body>
        <Card.Footer className="text-end">
          {/* <LinkContainer to={`/planner/${plannerData.uuid}`}>
            <Button variant="primary" className="me-1">
              <FontAwesomeIcon icon={solid("eye")} />
            </Button>
          </LinkContainer> */}
          <Button
            variant="danger"
            onClick={handleDelete}
            data-uuid={data.uuid}
          >
            <FontAwesomeIcon icon={solid("x")} />
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default PlannerCards;