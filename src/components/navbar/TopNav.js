import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom/";
import "./navbar.css";

function TopNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Crypto Trading Sim</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link activeclassname="active" as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link activeclassname="active" as={NavLink} to="/top">
              Top 100
            </Nav.Link>
          </Nav>
          <Button className="button" size="ms" variant="outline-success">
            Buy
          </Button>
          <Button className="button" size="md" variant="outline-secondary">
            Sell
          </Button>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Welcome: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;
