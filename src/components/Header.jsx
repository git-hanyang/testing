import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar } from "react-bootstrap";
import Cookies from 'js-cookie'
import Login from "../pages/Login";

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn,setLoggedIn]=useState(false)

  useEffect(()=>{
    if(Cookies.get('access_token')){
      setLoggedIn(true)
    }
  })

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <h1 className="m-0 p-0">Traveller App</h1>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <LinkContainer to="/" onClick={() => setExpanded(false)}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/dashboard" onClick={() => setExpanded(false)}>
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/destinations" onClick={() => setExpanded(false)}>
              <Nav.Link>Destinations</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/planner" onClick={() => setExpanded(false)}>
              <Nav.Link>Planner</Nav.Link>
            </LinkContainer>



            <LinkContainer to="/signup" onClick={() => setExpanded(false)}>
              <Nav.Link>SignUp</Nav.Link>
            </LinkContainer>

            {isLoggedIn?
              <LinkContainer to="/signup" onClick={() => setExpanded(false)}>
              <Nav.Link>SignOut</Nav.Link>
            </LinkContainer>
            : <LinkContainer to="/login" onClick={() => setExpanded(false)}>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>}

            <LinkContainer to="/signup" onClick={() => setExpanded(false)}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
