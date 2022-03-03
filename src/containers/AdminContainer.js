import Container from "react-bootstrap/Container";
import { Col, Row, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import UserPool from "../cognito/UserPool";
import Footer from "../components/footer/Footer";

function AdminContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, seterrorMessage] = useState();
  const [matchMessage, setMatchMessage] = useState("");
  const [matchColour, setMatchColour] = useState("");
  const [users, setUsers] = useState();
  const [transactions, setTransactions] = useState();

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
            Role: role,
            Username: username,
          })
          .then((response) => {
            console.log(response);
          });
      }
    });
  };

  // This hood will call the api once on render to fetch all users
  useEffect(() => {
    document.title = "Admin Dashboard | Trypto";

    axios
      .get("http://localhost:8080/api/account/")
      .then((response) => {
        setUsers(response.data.length);
      })
      .catch((error) => console.log(error.response.data.error));

    axios
      .get("http://localhost:8080/api/transaction/")
      .then((response) => {
        setTransactions(response.data.length);
      })
      .catch((error) => console.log(error.response.data.error));
  }, []);

  return (
    <>
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
                <p className={`lead`}>{users}</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="section mt-5">
          <h1 className="text-center">Add New User</h1>
          <Form className="sub-section mt-3 add-user-form">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="login-lable text-white">
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="login-lable text-white">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label className="login-lable text-white">
                Select Role
              </Form.Label>
              <Form.Select
                aria-label="Deslect role for new user"
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="login-lable text-white">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label className="login-lable text-white">
                Confirm Password
              </Form.Label>
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
            <Link to="/">
              <div className="d-grid gap-2">
                <Button
                  className="btn"
                  variant="success"
                  size="lg"
                  onClick={onSubmit}
                >
                  Submit
                </Button>{" "}
              </div>
            </Link>
            {isRegistered && (
              <Alert variant={"success mt-3"}>
                Success! A new user has been created.
              </Alert>
            )}
          </Form>
        </Col>
      </Container>
      <Footer />
    </>
  );
}

export default AdminContainer;
