import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Footer from "../components/footer/Footer";
import User from "../components/user/User";

function LeaderBoardContainer({ users, usersInPlay, userName }) {
  const [leader, setLeader] = useState();
  const [rank, setRank] = useState();

  function getInPlay() {}

  // This hood will call the api once on render to fetch all users
  useEffect(() => {
    setInterval(() => {
      getInPlay();
    }, 5000);
  }, []);

  return (
    <>
      <Container>
        <Col className="section mt-3">
          <Row>
            <h1>Leaderboard</h1>
            <Col>
              <div class="sub-section" mt={3} md={6} sm={12}>
                <h3>Your rank:</h3>
                {rank === "" ? (
                  <p className="lead">Not in play</p>
                ) : (
                  <p className="lead">{rank}</p>
                )}
              </div>
            </Col>
            <Col>
              <div class="sub-section" mt={3} md={6} sm={12}>
                <h3>Leader: </h3>
                <p className="lead">{leader}</p>
              </div>
            </Col>
            <Col>
              <div class="sub-section" mt={3} md={6} sm={12}>
                <h3>Total members: </h3>
                <p className="lead">{users.length}</p>
              </div>
            </Col>
            <Col>
              <div class="sub-section" mt={3} md={6} sm={12}>
                <h3>In play: </h3>
                <p className="lead">{usersInPlay.length}</p>
              </div>
            </Col>
          </Row>
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
            {usersInPlay.map((user, index) => {
              return (
                <User
                  key={index}
                  position={index}
                  username={user.Username}
                  userName={userName}
                  balance={user.Balance}
                  setLeader={setLeader}
                  setRank={setRank}
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
