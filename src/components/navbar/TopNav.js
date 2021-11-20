import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavLink } from "react-router-dom/";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import "./navbar.css";

function TopNav() {
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
                Welcome: <a href="#login">Mark Otto</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Asset</Form.Label>
              <Form.Select aria-label="Deslect asser to buy">
                <option value=""></option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="binancecoin">Binance Coin</option>
                <option value="tether">Tether </option>
                <option value="solana">Solana </option>
                <option value="binancecoin">Cardano</option>
                <option value="ripple">Ripple</option>
                <option value="polkadot">Polkadot</option>
                <option value="dogecoin">Dogecoin </option>
                <option value="avalanche-2">Avalanche</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <InputGroup className="mb-2">
                <InputGroup.Text>€</InputGroup.Text>
                <FormControl
                  type="number"
                  min="1"
                  step="any"
                  pattern="^\d*(\.\d{0,2})?$"
                />
              </InputGroup>
              <Form.Text id="" muted>
                Amount you wish to buy in Euros
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Buy</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sell</Modal.Title>
        </Modal.Header>
        <Modal.Body>Form for selling cryto goes here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary">Sell</Button>
        </Modal.Footer>
      </Modal>
      );
    </>
  );
}

export default TopNav;
