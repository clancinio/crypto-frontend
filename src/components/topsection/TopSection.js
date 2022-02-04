import { Row, Col } from "react-bootstrap";
import TotalMoneyComponent from "./moneytotal/TotalMoneyComponent";
import ProgressGraph from "./progressgraph/ProgressGraph";

function TopSection({ userBalance, userEmail }) {
  return (
    <Col className="mt-5 section">
      <TotalMoneyComponent userBalance={userBalance} userEmail={userEmail} />
    </Col>
  );
}

export default TopSection;
