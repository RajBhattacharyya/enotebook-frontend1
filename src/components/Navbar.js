import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  let location = useLocation();
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link
            style={{ color: "white", textDecorationLine: "none" }}
            className="nav-brand"
            to="/"
          >
            E-NoteBook
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}
              to="/about"
            >
              About
            </Link>
          </Nav>
          <Form className="d-flex">
          {!localStorage.getItem('token')?<>
            <Link className="btn btn-outline-light mx-1" to="/login">Login</Link>
            <Link className="btn btn-outline-light mx-1" to="/signup">Signup</Link>
          </>:
            <Button variant="outline-light" className="mx-1" onClick={handleLogout}>Logout</Button>
          }
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
