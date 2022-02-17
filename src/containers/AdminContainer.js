import React from "react";
import Container from "react-bootstrap/Container";
import { Col, Row, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminContainer() {

  const [users, setUsers] = useState();
  const [transactions, setTransactions] = useState();

  // This hood will call the api once on render to fetch all users
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/account/")
      .then((response) => {
        setUsers((response.data).length);
      })
      .catch((error) => console.log(error.response.data.error));

      axios
      .get("http://localhost:8080/api/transaction/")
      .then((response) => {
        setTransactions((response.data).length);
      })
      .catch((error) => console.log(error.response.data.error));
  }, []);

  return (
    <Container>
      <Col className={"mt-5 section"}>
      <Row p={5}>
        <h1>Admin</h1>
        <Col>
          <div class="sub-section" mt={3} md={6} sm={12}>
            <h2>Totals transactions</h2>
            <p className="lead">{transactions}</p>
          </div>
        </Col>
        <Col>
          <div class="sub-section" mt={3} md={6} sm={12}>
            <h2>Total Users</h2>
            <p className={`lead`}>
              {users}
            </p>
          </div>
        </Col>
      </Row>
      </Col>
      <Col className="section mt-5">

      <h1>Add New User</h1>
      <Form className="sub-section mt-3">
      <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="login-lable text-white">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="login-lable text-white">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="login-lable text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label className="login-lable text-white">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-type password"
            />
          </Form.Group>
            <Link to="/">
              <div className="d-grid gap-2">
                <Button
                  className="btn"
                  variant="success"
                  size="lg"
                >
                  Submit
                </Button>{" "}
              </div>
            </Link>
          </Form>
      </Col>

    </Container>
  );
}

export default AdminContainer;
