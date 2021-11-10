import { useState, useEffect } from "react";
import axios from "axios";
import { top100 } from "../api";

function TopCoinsContainer() {
  // State to hold and set the top 100 coins
  const [coins, setCoins] = useState([]);

  // This hood will call the api once on render
  useEffect(() => {
    axios
      .get(top100)
      .then((response) => {
        setCoins(response.data);
        console.log(coins);
      })
      .catch((error) => console.log(error.response.data.error));
  }, [coins]);

  return (
    <div className="container">
      <h1>Top Coins</h1>
    </div>
  );
}

export default TopCoinsContainer;
