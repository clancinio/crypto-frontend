import { Navigate, useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import TopSection from "../components/topsection/TopSection";
import PortfolioComponent from "../components/portfoliosection/PortfolioComponent";
import Footer from "../components/footer/Footer";
import TransactionComponent from "../components/transactionsection/TransactionComponent";
import { AccountContext } from "../cognito/Account";
import { useState, useEffect, useContext } from "react";

function HomeContainer({
  assets,
  userBalance,
  userSub,
  transactions,
  setTransactions,
  userName,
  worth,
}) {
  const [isSession, setisSession] = useState(false);
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setisSession(true);
    });
  }, []);

  if (!isSession) {
    return (
      <p>
        Please login <Link to="/login">Here</Link>
      </p>
    );
  }

  if (userBalance && transactions && assets) {
    return (
      <>
        <Container>
          <TopSection
            userBalance={userBalance}
            userName={userName}
            worth={worth}
            assets={assets}
            userSub={userSub}
          />
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
