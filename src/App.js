import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import TopCoinsContainer from "./containers/TopCoinsContainer";
import TopNav from "./components/navbar/TopNav";
import LoginContainer from "./containers/LoginContainer";
import { assetData } from "./api";
import axios from "axios";
import { useState, useEffect } from "react";
import SignupContainer from "./containers/SignUpContainer";
import { Account } from "./cognito/Account";
import LeaderBoardContainer from "./containers/LeaderBoardContainer";
import AdminContainer from "./containers/AdminContainer";

function App() {
  // Users Assets
  const [assets, setAssets] = useState([]);
  // Is user logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // User email
  const [userEmail, setUserEmail] = useState("");
  //User sub (cognito ID)
  const [userSub, setUserSub] = useState("");
  //User Balance
  const [userBalance, setUserBalance] = useState();
  //const [loading, setLoading] = useState(false);
  // State to hold transactions
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getAssets() {
      const response = await axios.get(
        `http://localhost:8080/api/assets/getAll/${userSub}`
      );

      const requestedAssets = response.data;
      console.log("requestedAssets");
      console.log(requestedAssets);

      Promise.all(
        requestedAssets.map(async function (asset) {
          try {
            const response = await axios.get(assetData(asset.AssetId));
            let cp = response.data.market_data.current_price.eur;
            let value = Number(cp) * Number(asset.Amount);
            return { ...asset, value: value, price: cp };
          } catch (error) {
            console.log(error.response.data.error);
            throw error;
          }
        })
      )
        .then((newAssetArray) => {
          setAssets(newAssetArray);
          console.log(newAssetArray);
          console.log(assets);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function getBalance() {
      await axios
        .get(`http://localhost:8080/api/account/${userSub}`)
        .then((response) => {
          setUserBalance(response.data.Balance);
          console.log("Balance:" + response.data.Balance);
        });
    }

    async function fetchTransactions() {
      //setLoading(true);
      await axios
        .get(`http://localhost:8080/api/transaction/${userSub}`)
        .then((response) => {
          setTransactions(response.data);
          console.log("TRANSACTIONS" + response.data);
          //setLoading(false);
        });
    }

    let interval = setTimeout(() => {
      fetchTransactions();
      getAssets();
      getBalance();
    }, 2000);
  }, [assets, userSub, userBalance]);

  return (
    <Account>
      <Router>
        <TopNav
          userBalance={userBalance}
          assets={assets}
          setUserBalance={setUserBalance}
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userSub={userSub}
          setUserSub={setUserSub}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomeContainer
                userBalance={userBalance}
                assets={assets}
                userBalance={userBalance}
                userSub={userSub}
                transactions={transactions}
                setTransactions={setTransactions}
                userEmail={userEmail}
              />
            }
          />
          <Route exact path="/top" element={<TopCoinsContainer />} />
          <Route
            exact
            path="/login"
            element={<LoginContainer setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route exact path="/signup" element={<SignupContainer />} />
          <Route exact path="/leaderboard" element={<LeaderBoardContainer />} />
          <Route exact path="/admin" element={<AdminContainer />} />
        </Routes>
      </Router>
    </Account>
  );
}

export default App;
