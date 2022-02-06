import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { top100 } from "../api";
import Coin from "../components/coin/Coin";
import Footer from "../components/footer/Footer";

function LeaderBoardContainer() {
  return (
    <div>
      <h1>Leader Board Page</h1>
    </div>
  );
}

export default LeaderBoardContainer;
