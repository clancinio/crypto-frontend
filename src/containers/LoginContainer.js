import React, { useState, useContext, useHistory } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../cognito/Account";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("Logged in!", data);

        navigate("/");
        window.location.reload(false);
      })
      .catch((err) => {
        console.error("Failed to login", err);
      });
  };

  return (
    <div class="container">
      <div className="form-container  mt-5">
        <Form className="login-form mt-3">
          <h1 className="text-center">Welcome back!</h1>
          <p className="text-muted text-center">Login to access your account</p>
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

          <Link to="/">
            <div className="d-grid gap-2">
              <Button
                className="btn"
                variant="success"
                size="lg"
                onClick={onSubmit}
              >
                Login
              </Button>{" "}
            </div>
          </Link>
          <p className="text-muted text-center mt-2">
            Don't have an account? <Link to="/signup">Sign up </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
export default LoginContainer;
