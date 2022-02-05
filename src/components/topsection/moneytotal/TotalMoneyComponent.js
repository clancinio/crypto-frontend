import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { formatter } from "../../../helpers";
import "./totalmoney.css";

function TotalMoneyComponent({ userBalance, userEmail }) {
  // Calculate profite/loss
  const [profitLoss, setProfitLoss] = useState(0);
  const [sign, setSign] = useState();
  const [color, setColour] = useState();

  useEffect(() => {
    if (userBalance - 1500.0 >= 0) {
      var p = userBalance - 1500.0;
      setProfitLoss(p);
      setColour("text-success");
      setSign("+");
    } else if (userBalance - 1500.0 < 0) {
      var l = userBalance - 1500.0;
      setProfitLoss(l);
      setColour("text-danger");
      setSign("-");
    }
  }, [userBalance]);

  return (
    <Row p={5}>
      <h1>Welcome, {userEmail}!</h1>
      <Col>
        <div class="sub-section" mt={3}>
          <h2>Spending Balance:</h2>
          <p className="lead">{formatter.format(userBalance)}</p>
        </div>
      </Col>
      <Col>
        <div class="sub-section" mt={3}>
          <h2>Profit/Loss:</h2>
          <p className={`lead ${color}`}>
            {sign + formatter.format(profitLoss)}
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default TotalMoneyComponent;
