
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


function PlannerCards({ data, state }) {
  const [plannerIDsData, setPlannerIDsData] = useContext();
  const [plannerData, setPlannerData] = useState(data);

  function renderDates() {
    const start = new Date(plannerData.travelPeriod.start);
    const end = new Date(plannerData.travelPeriod.end);

    // const dates = start date
  }
  function handleDelete(e) {
    const uuid = plannerData.uuid;
    axios({
      url: `/api/planner/${uuid}`,
      method: "delete",
    }).then(() => {
      state(false);
      axios({
        url: "/api/planner",
        method: "get",
      }).then((res) => {
        setPlannerIDsData(
          res.data.map((planner) => {
            return { name: planner.name, uuid: planner.uuid };
          })
        );
      });
    });
  }

  return (
    <>
      <Card className="flex-grow-0 flex-shrink-0 w-25 text-start mb-3">
        <Card.Body>
          <Card.Title>{plannerData.name}</Card.Title>
          <Card.Text>
            Travel Period :
            {plannerData.travelPeriod.start +
              " - " +
              plannerData.travelPeriod.end}
            <br />
            Planner Destination : {plannerData.destination}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          
          <Button
            variant="danger"
            onClick={handleDelete}
            data-uuid={plannerData.uuid}
          >
         
          </Button>
        </Card.Footer>
      </Card>{" "}
    </>
  );
}

export default PlannerCards;