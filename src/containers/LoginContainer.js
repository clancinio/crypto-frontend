import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AccountContext } from "../cognito/Account";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  let errorDiv;
  if (errorMessage != "") {
    errorDiv = <div className="error mb-2">{errorMessage}</div>;
  } else {
    errorDiv = "";
  }

  const navigate = useNavigate();
  const { authenticate } = useContext(AccountContext);
  const { getSession } = useContext(AccountContext);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isSession, setisSession] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      setisSession(true);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    if (email === "") {
      seterrorMessage("Please enter an email address");
    }
    if (password === "") {
      seterrorMessage("Please enter a password");
    }

    authenticate(email, password)
      .then((data) => {
        setisLoggedIn(true);
        console.log("Logged in!", data);
        navigate("/");
        window.location.reload(false);
      })
      .catch((err) => {
        console.error("Failed to login", err);
        if (err) {
          console.error(err.message);
          if (err.message === "Incorrect username or password.") {
            seterrorMessage("Incorrect email or password");
          }
          if (err.message === "Missing required parameter USERNAME") {
            seterrorMessage("Please enter your email address");
          }
        }
      });
  };

  if (!isLoggedIn) {
    return (
      <div class="container">
        {isSession && <Navigate to="/" />}
        <div className="form-container  mt-5">
          <Form className="login-form mt-3">
            <h1 className="text-center">Welcome back!</h1>
            <p className="text-muted text-center">
              Login to access your account
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
            {errorDiv}

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
  } else {
    return "";
  }
}

export default LoginContainer;
