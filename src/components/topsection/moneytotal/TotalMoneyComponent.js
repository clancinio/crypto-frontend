import { Col } from "react-bootstrap";
import "./totalmoney.css";

function TotalMoneyComponent() {
  return (
    <Col md={6}>
      <div className="total-money">
        <h1>Total Capital</h1>
        <p className="lead">€950.65</p>
      </div>
    </Col>
  );
}

export default TotalMoneyComponent;
