import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import UserPool from "../cognito/UserPool";
import { AccountContext } from "../cognito/Account";

const SignUpContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, seterrorMessage] = useState();
  const [matchMessage, setMatchMessage] = useState("");
  const [matchColour, setMatchColour] = useState("");

  let errorDiv;
  if (errorMessage != "") {
    errorDiv = <div className="error mb-2">{errorMessage}</div>;
  } else {
    errorDiv = "";
  }

  let matchDiv;
  if (matchMessage != "") {
    matchDiv = (
      <div className={`${matchColour}  error mb-2`}>{matchMessage}</div>
    );
  } else {
    matchDiv = "";
  }

  const [isSession, setisSession] = useState(false);
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    document.title = "Sign Up | Trypto";

    getSession().then((session) => {
      setisSession(true);
    });
  }, []);

  const validatePassword = () => {
    if (password === confirm_password) {
      setMatchMessage("Passwords match!");
      setMatchColour("text-success");
    }

    if (password !== confirm_password) {
      setMatchMessage("Passwords don't match!");
      setMatchColour("text-danger");
    }
  };

  function resetMessage() {
    seterrorMessage("");
    setMatchMessage("");
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (username === "") {
      seterrorMessage("Please enter a username");
      return;
    }
    if (username.length < 4) {
      seterrorMessage("Username must be at least 4 characters long");
      return;
    }
    if (email === "") {
      seterrorMessage("Please enter an email address");
      return;
    }
    if (password === "") {
      seterrorMessage("Please enter a password");
      return;
    }
    if (password != confirm_password) {
      seterrorMessage("Passwords do not match");
      return;
    }

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err.message);
        if (err.message === "An account with the given email already exists.") {
          seterrorMessage(err.message);
        }
        if (
          err.message ===
          "Password did not conform with policy: Password not long enough"
        ) {
          seterrorMessage("Password not long enough");
        }
        if (
          err.message ===
          "Password did not conform with policy: Password must have uppercase characters"
        ) {
          seterrorMessage("Password must have uppercase characterss");
        }
        if (
          err.message ===
          "Password did not conform with policy: Password must have numeric characters"
        ) {
          seterrorMessage("Password must have numeric characters");
        }
        if (err.message === "Username should be an email.") {
          seterrorMessage("Please enter a valid email address");
        }
      } else {
        setIsRegistered(true);
        seterrorMessage("");
        axios
          .post("http://localhost:8080/api/account/create", {
            AccountId: data.userSub,
            Email: email,
            Balance: 1500.0,
            Role: "user",
            Username: username,
            HasInvested: 0,
          })
          .then((response) => {
            console.log(response);
          });
      }
    });
  };

  return (
    <div class="container">
      {isSession && <Navigate to="/" />}
      <div className="form-container mt-5">
        <Form className="login-form mt-3 section">
          <h2 className="text-center">Hello. It's nice to meet you.</h2>
          <p className="text-muted text-center">
            Please create an account to gain access to Trypto.com
          </p>
          <hr />
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className="login-lable">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onFocus={() => resetMessage()}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="login-lable">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => resetMessage()}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="login-lable">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => resetMessage()}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label className="login-lable">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-type password"
              value={confirm_password}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              onKeyUp={(event) => {
                validatePassword(event.target.value);
              }}
            />
          </Form.Group>
          {errorDiv}
          {matchDiv}
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
              Success! Click <Link to="/login">here</Link> to login to your
              account.
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
