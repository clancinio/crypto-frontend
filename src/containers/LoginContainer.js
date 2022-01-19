import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginContainer({ setisLoggedIn }) {
  // Formik
  const onSubmit = () => {
    setisLoggedIn(true);
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
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="login-lable">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
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
        </Form>
      </div>
    </div>
  );
}
export default LoginContainer;
