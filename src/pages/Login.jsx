import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, Redirect } from "react-router-dom";
import {
  Container,
  Card,
  Toast,
  ToastContainer,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import $ from "jquery";



const Login = () => {
  const [currentUser, setCurrentUser] = useState();
  const [plannerIDsData, setPlannerIDsData] = useState();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
 

  function handleChange(e) {
    setUserData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  }


  function handleLogin(e) {
    e.preventDefault();

    const user={
        username:userData.username,
        password:userData.password
    }

    console.log(userData)
    axios.post("http://localhost:3003/api/session/verify",user)
      .then(
        (res) => {
        //console.log(res.data)
        //setCurrentUser(res.data);
      })
      .then(()=>{
        navigate('/dashboard')
      })
    //   .then(() => {
    //     axios({
    //       url: "/api/planner",
    //       method: "get",
    //     }).then((res) => {
    //       console.log(res);
    //       setPlannerIDsData(
    //         res.data.map((planner) => {
    //           return {
    //             name: planner.name,
    //             uuid: planner.uuid,
    //             destination: planner.destination,
    //           };
    //         })
    //       );
    //     });
    //   })
    //   .then(() => {
    //     console.log(plannerIDsData);
    //     toggleShowSuccess();
    //     setTimeout(() => {
    //       navigate("/dashboard");
    //     }, 3000);
    //  })
      .catch((err) => {
        const status = err.response.status;
        console.log(err)
        console.log(status);
      });
  }

  return (
    <>
    <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-center align-items-center position-relative"
    >
        <Card className="w-75 h-50">
            <Card.Body className="h-100 d-flex flex-column justify-content-center align-items-center gap-4">
            <h4>Sign In</h4>
            <Form
                onSubmit={handleLogin}
                className="w-75 d-flex flex-column justify-content-center align-content-center gap-3"
            >
                <FloatingLabel controlId="username" label="Username">
                <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    value={userData.username}
                    autoComplete="username"
                    required
                />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Password">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={userData.password}
                    autoComplete="current-password"
                    required
                />
                </FloatingLabel>

                <Button
                className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
                type="submit"
                >
                Sign In
                </Button>
            </Form>
            <p>
                Don't have an account? <Link to="/register">Sign Up</Link> instead.
            </p>
            </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;