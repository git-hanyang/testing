import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


function PlannerCards({ data }) {
  //const [plannerIDsData, setPlannerIDsData] = useContext();
  const [plannerData, setPlannerData] = useState(data);

  function renderDates() {
    const start = new Date(plannerData.travelPeriod.start);
    const end = new Date(plannerData.travelPeriod.end);

    // const dates = start date
  }
  function handleDelete(e) {
    const uuid = plannerData.uuid;
    axios({
      url: `http://localhost:3003/api/planner/${uuid}`,
      method: "delete",
    }).then(() => {
      axios({
        url: "http://localhost:3003/api/planner",
        method: "get",
      }).then((res) => {
        console.log(res)
        // setPlannerIDsData(
        //   res.data.map((planner) => {
        //     return { name: planner.name, uuid: planner.uuid };
        //   })
        // );
      });
    });
  }

  return (
    <>
      <Card className="flex-grow-0 flex-shrink-0 w-25 text-start mb-3">
        <Card.Body>
          <Card.Title>{plannerData.name}</Card.Title>
          {/* <Card.Text>
            Travel Period :
            {plannerData.travelPeriod.start +
              " - " +
              plannerData.travelPeriod.end}
            <br />
            Planner Destination : {plannerData.destination}
          </Card.Text> */}
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
            data-uuid={plannerData.uuid}
          >
            <FontAwesomeIcon icon={solid("x")} />
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default PlannerCards;