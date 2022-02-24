import Col from "react-bootstrap/Col";
import TotalMoneyComponent from "./moneytotal/TotalMoneyComponent";

function TopSection({ userBalance, userName, assets, balances}) {
  return (
    <Col className="mt-5 section">
      <TotalMoneyComponent
        userBalance={userBalance}
        userName={userName}
        assets={assets}
        balances={balances}
      />
    </Col>
  );
}

export default TopSection;
