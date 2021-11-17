import { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Asset from "../portfoliosection/asset/Asset";

function TransactionComponent() {
  // State to mock assets
  const [assets, setAssets] = useState([
    {
      symbol: "BTC",
      amount: "16",
      value: "50,1254.54",
      value_change_24h: "+$10",
      price: "$10.56",
    },
    {
      symbol: "ADA",
      amount: "15,002",
      value: "45,098.27",
      value_change_24h: "-$10",
      price: "$10.56",
    },
    {
      symbol: "SOL",
      amount: "15,002",
      value: "45,098.27",
      value_change_24h: "+$157",
      price: "$0.56",
    },
  ]);

  return (
    <Col className="section mt-5">
      <h1>Transactions</h1>
      <p className="lead">27 Transactions</p>
      <div className="table-container">
        <Table striped bordered>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Amount</th>
              <th>Value</th>
              <th>Value Change (24h)</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => {
              return (
                <Asset
                  key={index}
                  symbol={asset.symbol}
                  amount={asset.amount}
                  value={asset.value}
                  value_change_24h={asset.value_change_24h}
                  price={asset.price}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
      <Button variant="secondary" size="md">
        View All
      </Button>
    </Col>
  );
}

export default TransactionComponent;
