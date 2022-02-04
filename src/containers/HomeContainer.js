import { useState } from "react";
import Container from "react-bootstrap/Container";
import TopNav from "../components/navbar/TopNav";
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
}

export default HomeContainer;
