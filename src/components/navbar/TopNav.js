import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavLink } from "react-router-dom/";
import Modal from "react-bootstrap/Modal";
import BuyForm from "../form/buyform/BuyForm";
import "./navbar.css";

function TopNav({ balance, setBalance, isLoggedIn }) {
  // Buy Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Sell Modal State
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand>
            {/* {" "}
            <img src="./img/background.jpg" alt="logo" />{" "} */}
          </Navbar.Brand>
          <Navbar.Brand href="#home">TRYTPO.COM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {isLoggedIn && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link activeclassname="active" as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link activeclassname="active" as={NavLink} to="/top">
                  Top 100
                </Nav.Link>
              </Nav>
              <Button
                className="button"
                size="md"
                variant="outline-success"
                onClick={handleShow}
                onclick="this.blur();"
              >
                Buy
              </Button>
              <Button
                className="button"
                size="md"
                variant="outline-secondary"
                onClick={handleShow2}
              >
                Sell
              </Button>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Welcome: <a href="#login">John Doe</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      {/* Buy Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Buy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BuyForm balance={balance} setBalance={setBalance} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* Sell Modal */}
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sell</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center display-4">Coming soon!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary">Sell</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TopNav;
