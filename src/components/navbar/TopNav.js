import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function TopNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Crypto Trading Sim</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link activeClassName="active" as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link activeClassName="active" as={NavLink} to="/top">
              Top 100
            </Nav.Link>
          </Nav>
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
