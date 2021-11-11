import { Row } from "react-bootstrap";
import TotalMoneyComponent from "./moneytotal/TotalMoneyComponent";
import ProgressGraph from "./progressgraph/ProgressGraph";

function TopSection() {
  return (
    <Row className="mt-5">
      <TotalMoneyComponent />
      <ProgressGraph />
    </Row>
  );
}

export default TopSection;
