import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { formatter } from "../../../helpers";
import ProgressGraph from "../progressgraph/ProgressGraph";
import "./totalmoney.css";

function TotalMoneyComponent({ userBalance, userName, assets, balances }) {
  // Calculate profite/loss
  const [worth, setWorth] = useState("");

  useEffect(() => {
    let totalVal = 0.0;
    assets.map((a) => {
      totalVal += a.value;
    });
    setWorth(totalVal);
  }, [assets]);

  if (userBalance) {
    return (
      <>
        <Row p={5}>
          <h1>Welcome, {userName}!</h1>
          <Col>
            <div class="sub-section" mt={3} md={6} sm={12}>
              <h3>Spending Balance:</h3>
              <p className="lead">{formatter.format(userBalance)}</p>
            </div>
          </Col>
          <Col>
            <div class="sub-section" mt={3} md={6} sm={12}>
              <h3>Investment Worth:</h3>
              <p className={`lead`}>{formatter.format(worth)}</p>
            </div>
          </Col>
        </Row>
        <Row p={5}>
          <Col>
            <ProgressGraph balances={balances} />
          </Col>
        </Row>
      </>
    );
  } else {
    return (
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
}

export default TotalMoneyComponent;
