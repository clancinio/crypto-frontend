import { Navigate, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import TopSection from "../components/topsection/TopSection";
import PortfolioComponent from "../components/portfoliosection/PortfolioComponent";
import Footer from "../components/footer/Footer";
import TransactionComponent from "../components/transactionsection/TransactionComponent";
import LoginContainer from "./LoginContainer";
import { AccountContext } from "../cognito/Account";
import { useState, useEffect, useContext } from "react";

function HomeContainer({
  assets,
  userBalance,
  userSub,
  transactions,
  setTransactions,
  userEmail,
}) {
  const navigate = useNavigate();

  const [isSession, setisSession] = useState(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setisSession(true);
    });
  }, []);

  if (userBalance && transactions && assets) {
    return (
      <>
        <Container>
          {!isSession && <Navigate to="/login" />}
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
