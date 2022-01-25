import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Transaction from "./transaction/Transaction";
import Pagination from "../Pagination";
import "./transation.css";
import axios from "axios";

function TransactionComponent({ userSub, transactions, setTransactions }) {
  const [loading, setLoading] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [transPerPage] = useState(5);

  // useEffect(() => {
  //   async function fetchTransactions() {
  //     //setLoading(true);
  //     await axios
  //       .get(`http://localhost:8080/api/transaction/${userSub}`)
  //       .then((response) => {
  //         setTransactions(response.data);
  //         console.log("TRANSACTIONS" + response.data);
  //         //setLoading(false);
  //       });
  //   }

  //   let interval = setTimeout(() => {
  //     fetchTransactions();
  //   }, 3000);
  // }, [transactions]);

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
      {transactions.length > 0 ? (
        <div className="table-container">
          <Table className="table-dark" striped bordered>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Buy/Sell</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Date</th>
                <th>Buy/Sell Price</th>
              </tr>
            </thead>
            <tbody>
              {currentTrans.map((transaction, index) => {
                var colour = "text-success";
                var sign = "+";
                if (transaction.BuySell === "B") {
                  colour = "text-danger";
                  sign = "-";
                }
                return (
                  <Transaction
                    key={index}
                    asset={transaction.AssetId}
                    buy_sell={transaction.BuySell}
                    amount={transaction.Amount}
                    price={transaction.Price}
                    date={transaction.Date}
                    cost={transaction.Cost}
                    colour={colour}
                    sign={sign}
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
      ) : (
        <h1 className="text-center display-4">
          You have not made any transactions
        </h1>
      )}
    </Col>
  );
}

export default TransactionComponent;
