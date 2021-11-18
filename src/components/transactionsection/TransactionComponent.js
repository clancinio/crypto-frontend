import { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Transaction from "./transaction/Transaction";

function TransactionComponent() {
  // State to mock assets
  const [transactions, setTransactions] = useState([
    {
      symbol: "BTC",
      buy_sell: "B",
      amount: "2",
      price: "$10",
      date: "27/09/2021",
    },
    {
      symbol: "ETH",
      buy_sell: "S",
      amount: "25",
      price: "$250.06",
      date: "27/09/2021",
    },
    {
      symbol: "ADA",
      buy_sell: "B",
      amount: "987",
      price: "$10.56",
      date: "27/09/2021",
    },
    {
      symbol: "SOL",
      buy_sell: "S",
      amount: "1,005",
      price: "$1.58",
      date: "27/09/2021",
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
              <th>Buy/Sell</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <Transaction
                  key={index}
                  symbol={transaction.symbol}
                  buy_sell={transaction.buy_sell}
                  amount={transaction.amount}
                  price={transaction.price}
                  date={transaction.date}
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
