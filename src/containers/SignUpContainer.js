import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import axios from "axios";
import UserPool from "../cognito/UserPool";

const SignUpContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        console.log("Email: " + email);
        setIsRegistered(true);
        axios
          .post("http://localhost:8080/api/account/create", {
            AccountId: data.userSub,
            Email: email,
            Balance: 1500.0,
            Role: "user",
          })
          .then((response) => {
            console.log(response);
          });
      }
    });
  };

  return (
    <div class="container">
      <div className="form-container  mt-5">
        <Form className="login-form mt-3 section">
          <h1 className="text-center">Hello. It's nice to meet you.</h1>
          <p className="text-muted text-center">
            Please create an account to gain access to Trypto.com
          </p>
          <hr />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="login-lable">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="login-lable">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              className="btn"
              variant="success"
              size="lg"
              onClick={onSubmit}
            >
              Sign Up
            </Button>{" "}
          </div>
          {isRegistered && (
            <Alert variant={"success mt-3"}>
              Success! Please check your email to verify your account.
            </Alert>
          )}
          <p className="text-muted text-center mt-2">
            Have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUpContainer;
