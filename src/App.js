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
  //User sub (cognito ID)
  const [userSub, setUserSub] = useState("");
  // Username
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  //User Balance
  const [userBalance, setUserBalance] = useState();
  // State to hold transactions
  const [transactions, setTransactions] = useState([]);
  // All users for leaderboard
  const [users, setUsers] = useState([]);
  const [usersInPlay, setUsersInPlay] = useState([]);

  useEffect(() => {
    async function getAssets() {
      const response = await axios.get(
        `http://localhost:8080/api/assets/getAll/${userSub}`
      );

      const requestedAssets = response.data;

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
          setUserName(response.data.Username);
          setUserRole(response.data.Role);
        });
    }

    async function getUsers() {
      await axios
        .get("http://localhost:8080/api/account/")
        .then((response) => {
          var sorted = response.data.sort((a, b) => b.Balance - a.Balance);
          setUsers(sorted);

          const inPlay = users.filter((u) => u.HasInvested === 1);
          setUsersInPlay(inPlay);
        })
        .catch((error) => console.log(error.response.data.error));
    }

    async function fetchTransactions() {
      //setLoading(true);
      await axios
        .get(`http://localhost:8080/api/transaction/${userSub}`)
        .then((response) => {
          setTransactions(response.data);
        });
    }

    setTimeout(() => {
      getUsers();
      fetchTransactions();
      getAssets();
      getBalance();
    }, 3000);
  }, [userSub, userBalance, users]);

  return (
    <Account>
      <Router>
        <TopNav
          userBalance={userBalance}
          role={userRole}
          assets={assets}
          setUserBalance={setUserBalance}
          isLoggedIn={isLoggedIn}
          userName={userName}
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
                userSub={userSub}
                transactions={transactions}
                setTransactions={setTransactions}
                userName={userName}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route exact path="/top" element={<TopCoinsContainer />} />
          <Route
            exact
            path="/leader"
            element={
              <LeaderBoardContainer
                users={users}
                usersInPlay={usersInPlay}
                userName={userName}
              />
            }
          />
          <Route
            exact
            path="/login"
            element={
              <LoginContainer setIsLoggedIn={setIsLoggedIn} userSub={userSub} />
            }
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
