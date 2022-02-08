import React from "react";
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Footer from "../components/footer/Footer";
import User from "../components/user/User";


function LeaderBoardContainer() {
  
  const [users, setUsers] = useState([
    {
      username: "bob",
      balance: 4000
    },
    {
      username: "bob",
      balance: 4000
    },
    {
      username: "bob",
      balance: 4000
    },
    {
      username: "bob",
      balance: 4000
    },
    {
      username: "bob",
      balance: 4000
    },
    {
      username: "bob",
      balance: 4000
    }
  ])
  return (

    <>
    <Container>
    <Table className="table-dark mt-5" >
      <thead>
        <tr>
    <th width = "1000" className=" text-md-right"><Button variant="success">Your rank is: 5</Button></th>
    </tr>
    </thead>
    </Table>
    </Container>

  <Container>
    <Table className="table-dark mt-2" striped bordered>
    
  <thead>
    <tr>
      <th>#</th>
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
                  username={user.username}
                  balance={user.balance}
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
