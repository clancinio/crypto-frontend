import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Footer from "../components/footer/Footer";
import User from "../components/user/User";

function LeaderBoardContainer() {
  const [users, setUsers] = useState([]);
  const [leader, setLeader] = useState();

  // This hood will call the api once on render to fetch all users
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/account/")
      .then((response) => {
        var sorted = response.data.sort((a, b) => b.Balance - a.Balance);
        setUsers(sorted);
      })
      .catch((error) => console.log(error.response.data.error));
  }, []);

  return (
    <>
      <Container>
        <Col className="section mt-3">
          <div className="d-flex justify-content-around">
            <Button variant="success">
              <h2>Your rank: 7</h2>
            </Button>
            <Button variant="success">
              <h2>Leader: {leader} </h2>
            </Button>
            <Button variant="success">
              <h2>Total members: {users.length}</h2>
            </Button>
          </div>
        </Col>

        <Table className="table-dark mt-2" striped bordered>
          <thead>
            <tr>
              <th className="text-center">Rank</th>
              <th>UserName</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <User
                  key={index}
                  position={index}
                  username={user.Username}
                  balance={user.Balance}
                  setLeader={setLeader}
                />
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default LeaderBoardContainer;
