import { useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import TopSection from "../components/topsection/TopSection";
import PortfolioComponent from "../components/portfoliosection/PortfolioComponent";
import Footer from "../components/footer/Footer";
import TransactionComponent from "../components/transactionsection/TransactionComponent";

function HomeContainer({
  assets,
  userBalance,
  userSub,
  transactions,
  setTransactions,
  userEmail,
}) {
  if (userBalance && transactions && assets) {
    return (
      <>
        <Container>
          <TopSection userBalance={userBalance} userEmail={userEmail} />
          <PortfolioComponent assets={assets} />
          <TransactionComponent
            userSub={userSub}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        </Container>
        <Footer />
      </>
    );
  } else {
    return (
      <Spinner class="spinner" animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
}

export default HomeContainer;
