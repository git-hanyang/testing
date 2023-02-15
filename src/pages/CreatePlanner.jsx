import React, { useState, useEffect, useContext, useRef } from "react";
import cityData from "../data/destinations";
import axios from "axios";
import {
  Container,
  Form,
  FloatingLabel,
  FormSelect,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";


export default function CreatePlanner() {

    const [plannerDate,setPlannerDate]=useState({
        travelPeriod: {
                        start: "",
                        end: "",
                    }
                })

  const [destinationsData, setDestinationsData] = useState([]);
  const navigate = useNavigate();
  
  const plannerName=useRef('')
  const planDestination=useRef('')
  
  const addPlannerData={
    name: plannerName.current.value,
    travelPeriod: {
      start: plannerDate.travelPeriod.start,
      end: plannerDate.travelPeriod.end,
    },
    destination: planDestination.current.value,
  };
//   data variable names have to match with database variables

  

  function fetchDestinationsData() {
    const dataArray = [];
    for (const key in cityData) {
      dataArray.push(cityData[key]);
    }
    setDestinationsData(dataArray);
    // console.log(dataArray);
  }

  useEffect(() => {
    
    fetchDestinationsData();
    
  },[]);

  useEffect(()=>{
    console.log(destinationsData)
  })

//   function handleChange(e) {
//     setNewPlannerData((prevState) => {
//       return { ...prevState, [e.target.id]: e.target.value };
//     });
//   }

  function handleDates(e) {
    setPlannerDate((prevState) => {
      return {
        ...prevState,
        travelPeriod: {
          ...prevState.travelPeriod,
          [e.target.id]: e.target.value,
        },
      };
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
    const token = Cookies.get('jwt')
    axios({
      url: "http://localhost:3003/api/planner",
      method: "post",
      data: addPlannerData,
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then(() => {
        navigate('/dashboard')
      })      
//       // .then(() => {
//       //   navigate(`/destination/${newPlannerData.destination}`);
//       // })
//       .catch((err) => {
//         const statusCode = err.response.status;
//         if (statusCode === 401) {
//           navigate("/login");
//         } else if (statusCode === 404) {
//           console.log(err);
//         } else {
//           console.log(err.response.data.error);
//         }
//       });
   }

  return (
    <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-center align-items-center"
    >
      <h4 className="my-3">Create a Planner</h4>
      <Form
        onSubmit={handleSubmit}
        className="w-50 d-flex flex-column justify-content-center align-content-center gap-3 mx-auto"
      >
        <FloatingLabel controlId="name" label="Planner Name">
          <Form.Control
            type="text"
            ref={plannerName}
          />
        </FloatingLabel>

        <InputGroup>
          <Form.Control
            type="date"
            id="start"
            value={plannerDate.travelPeriod.start}
            onChange={handleDates}
            placeholder="Select Date"
          />
          <Form.Control
            type="date"
            id="end"
            value={plannerDate.travelPeriod.end}
            onChange={handleDates}
            placeholder="Select Date"
          />
        </InputGroup>

        <FormSelect 
        //onChange={handleChange} 
        ref={planDestination} 
        id="destination">
          <option>Choose Destination</option>
          {destinationsData.map((city,idx) => {
            return (
              // <>
              <option value={city.data.attributes.slug} key={idx}>
                {city.data.attributes.name}
              </option>
              // </>
            );
          })}
        </FormSelect>

        <Button
          className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
          type="submit"
        >
          Create
        </Button>
      </Form>
    </Container>
  );
}

