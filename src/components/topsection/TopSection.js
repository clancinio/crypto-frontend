import { Row } from "react-bootstrap";
import TotalMoneyComponent from "./moneytotal/TotalMoneyComponent";
import ProgressGraph from "./progressgraph/ProgressGraph";

function TopSection({ balance, userBalance }) {
  return (
    <Row className="mt-5">
      <TotalMoneyComponent userBalance={userBalance} />
      <ProgressGraph />
    </Row>
  );
}

export default TopSection;
