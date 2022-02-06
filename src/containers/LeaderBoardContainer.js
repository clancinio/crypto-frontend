import React from "react";
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Footer from "../components/footer/Footer";

function LeaderBoardContainer() {
  
  return (

    <>
    <Container>
    <Table className="table-dark mt-5" >
      <thead>
        <tr>
    <th><Button href="#" variant="success">Overall</Button></th>
    <th><Button href="#" variant="success">Weekly</Button></th>
    <th><Button href="#" variant="success">Monthly</Button></th>
    <th width = "1000" className="text-center text-md-right"><Button href="#"  variant="success">Your rank is ... </Button></th>
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
      <th>% Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    
  </tbody>
</Table>
</Container>
<Footer />
</>
  );
}

export default LeaderBoardContainer;
