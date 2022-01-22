import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom/";
import Modal from "react-bootstrap/Modal";
import BuyForm from "../form/buyform/BuyForm";
import SellForm from "../form/sellform/SellForm";
import { AccountContext } from "../../cognito/Account";
import "./navbar.css";

function TopNav({
  balance,
  setBalance,
  assets,
  setUserEmail,
  userEmail,
  setUserSub,
}) {
  // Buy Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Sell Modal State
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const { getSession, logout } = useContext(AccountContext);

  function logoutUser() {
    logout();
    navigate("/login");
    window.location.reload(false);
  }

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setUserEmail(session.idToken.payload.email);
      setUserSub(session.accessToken.payload.sub);
      setStatus(true);
    });
  }, []);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Brand href="#home">TRYTPO.COM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {status && (
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
                <Navbar.Text>Welcome: {userEmail} | </Navbar.Text>

                <Nav>
                  <Nav.Link to="/login" onClick={logoutUser}>
                    Logout
                  </Nav.Link>
                </Nav>
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
        <Modal.Body>
          <SellForm balance={balance} setBalance={setBalance} assets={assets} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TopNav;
