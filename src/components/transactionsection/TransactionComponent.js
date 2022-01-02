import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Transaction from "./transaction/Transaction";
import Pagination from "../Pagination";
import "./transation.css";
import axios from "axios";

function TransactionComponent() {
  const [loading, setLoading] = useState(false);

  // State to mock assets
  const [transactions, setTransactions] = useState([
    {
      symbol: "BTC",
      buy_sell: "B",
      amount: "2",
      price: 10,
      date: "27/09/2021",
      cost: 120.5,
    },
    {
      symbol: "ETH",
      buy_sell: "S",
      amount: "25",
      price: 250.06,
      date: "27/09/2021",
      cost: 50.0,
    },
    {
      symbol: "ADA",
      buy_sell: "B",
      amount: "987",
      price: 10.56,
      date: "27/09/2021",
      cost: 200.0,
    },
    {
      symbol: "SOL",
      buy_sell: "S",
      amount: "1,005",
      price: 1.58,
      date: "27/09/2021",
      cost: 28.0,
    },
    {
      symbol: "ADA",
      buy_sell: "B",
      amount: "987",
      price: 10.56,
      date: "27/09/2021",
      cost: 200.0,
    },
    {
      symbol: "SOL",
      buy_sell: "S",
      amount: "1,005",
      price: 1.58,
      date: "27/09/2021",
      cost: 28.0,
    },
    {
      symbol: "ADA",
      buy_sell: "B",
      amount: "987",
      price: 10.56,
      date: "27/09/2021",
      cost: 200.0,
    },
    {
      symbol: "SOL",
      buy_sell: "S",
      amount: "1,005",
      price: 1.58,
      date: "27/09/2021",
      cost: 28.0,
    },
    {
      symbol: "ADA",
      buy_sell: "B",
      amount: "987",
      price: 10.56,
      date: "27/09/2021",
      cost: 200.0,
    },
    {
      symbol: "SOL",
      buy_sell: "S",
      amount: "1,005",
      price: 1.58,
      date: "27/09/2021",
      cost: 28.0,
    },
  ]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [transPerPage] = useState(5);

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     setLoading(true);
  //     const response = await axios.get("URL");
  //     setTransactions(response.data);
  //     setLoading(false);
  //   };

  //   fetchTransactions();
  // }, []);

  // Get current transations
  const indexOfLastTrans = currentPage * transPerPage;
  const indexOfFirstTrans = indexOfLastTrans - transPerPage;
  const currentTrans = transactions.slice(indexOfFirstTrans, indexOfLastTrans);

  // Change page
  function paginate(e, pageNumber) {
    e.preventDefault();

    setCurrentPage(pageNumber);
  }

  if (loading) {
    return <h1 className="text-center display-4">Loading...</h1>;
  }
  return (
    <Col className="section mt-5">
      <h1>Transactions</h1>
      <p className="lead">{transactions.length} Transactions</p>
      <div className="table-container">
        <Table className="table-dark" striped bordered>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Buy/Sell</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Date</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {currentTrans.map((transaction, index) => {
              return (
                <Transaction
                  key={index}
                  symbol={transaction.symbol}
                  buy_sell={transaction.buy_sell}
                  amount={transaction.amount}
                  price={transaction.price}
                  date={transaction.date}
                  cost={transaction.cost}
                />
              );
            })}
          </tbody>
        </Table>
        <Pagination
          transPerPage={transPerPage}
          totalTrans={transactions.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      {/* <Button variant="secondary" size="md">
        View All
      </Button> */}
    </Col>
  );
}

export default TransactionComponent;
