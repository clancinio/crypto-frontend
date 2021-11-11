import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Nav() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Trading Simulator</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Nav;
