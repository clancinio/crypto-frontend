import { Col } from "react-bootstrap";
import { formatter } from "../../../helpers";
import "./totalmoney.css";

function TotalMoneyComponent({ balance }) {
  return (
    <Col md={6}>
      <div className="section">
        <h1>Balance</h1>
        <p className="lead">{formatter.format(balance)}</p>
      </div>
    </Col>
  );
}

export default TotalMoneyComponent;
