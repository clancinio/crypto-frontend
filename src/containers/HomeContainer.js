import { useState } from "react";
import Container from "react-bootstrap/Container";
import TopNav from "../components/navbar/TopNav";
import TopSection from "../components/topsection/TopSection";
import PortfolioComponent from "../components/portfoliosection/PortfolioComponent";
import Footer from "../components/footer/Footer";
import TransactionComponent from "../components/transactionsection/TransactionComponent";

function HomeContainer() {
  // State for holding Total capital - temporary until the backend is ready
  const [balance, setBalance] = useState(1500);

  return (
    <>
      <TopNav balance={balance} setBalance={setBalance} />
      <Container>
        <TopSection balance={balance} setBalance={setBalance} />
        <PortfolioComponent />
        <TransactionComponent />
      </Container>
      <Footer />
    </>
  );
}

export default HomeContainer;
