import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import TopCoinsContainer from "./containers/TopCoinsContainer";
import TopNav from "./components/navbar/TopNav";
import LoginContainer from "./containers/LoginContainer";
import { assetData } from "./api";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SignupContainer from "./containers/SignUpContainer";
import { Account } from "./cognito/Account";

function App() {
  // State for holding Total capital - temporary until the backend is ready
  const [balance, setBalance] = useState(1500);
  // User#s Assets
  const [assets, setAssets] = useState([]);
  // Is user logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // User email
  const [userEmail, setUserEmail] = useState("");
  //User Balance
  const [userBalance, setUserBalance] = useState("");

  useEffect(() => {
    async function getAssets() {
      const response = await axios.post(
        "http://localhost:8080/api/assets/all",
        {
          accountId: 1,
        }
      );

      const requestedAssets = response.data;
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
    let interval = setTimeout(() => {
      getAssets();
    }, 3000);
  }, [assets]);

  return (
    <Account>
      <Router>
        <TopNav
          balance={balance}
          assets={assets}
          setBalance={setBalance}
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<HomeContainer balance={balance} assets={assets} />}
          />
          <Route exact path="/top" element={<TopCoinsContainer />} />
          <Route
            exact
            path="/login"
            element={<LoginContainer setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route exact path="/signup" element={<SignupContainer />} />
        </Routes>
      </Router>
    </Account>
  );
}

export default App;
