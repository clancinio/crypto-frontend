import { Col, Row } from "react-bootstrap";
import { formatter } from "../../../helpers";
import "./totalmoney.css";

function TotalMoneyComponent({ userBalance, userEmail }) {
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
          <h2>Profile/Loss:</h2>
          <p className="lead">+{formatter.format("500.01")}</p>
        </div>
      </Col>
    </Row>
  );
}

export default TotalMoneyComponent;
