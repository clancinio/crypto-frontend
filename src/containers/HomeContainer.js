import { useState } from "react";
import Container from "react-bootstrap/Container";
import TopNav from "../components/navbar/TopNav";
import TopSection from "../components/topsection/TopSection";
import PortfolioComponent from "../components/portfoliosection/PortfolioComponent";
import Footer from "../components/footer/Footer";
import TransactionComponent from "../components/transactionsection/TransactionComponent";

function HomeContainer({ balance }) {
  return (
    <>
      <Container>
        <TopSection balance={balance} />
        <PortfolioComponent />
        <TransactionComponent />
      </Container>
      <Footer />
    </>
  );
}

export default HomeContainer;
