import { Row, Col } from "react-bootstrap";
import TotalMoneyComponent from "./moneytotal/TotalMoneyComponent";
import ProgressGraph from "./progressgraph/ProgressGraph";

function TopSection({ userBalance, userName }) {
  return (
    <Col className="mt-5 section">
      <TotalMoneyComponent userBalance={userBalance} userName={userName} />
    </Col>
  );
}

export default TopSection;
