import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { top100 } from "../api";
import Coin from "../components/coin/Coin";

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
    <Container>
      <h1>Top 100 Coins</h1>

      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => {
            return (
              <Coin
                key={coin.id}
                position={index}
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                marketcap={coin.total_volume}
                volume={coin.market_cap}
                image={coin.image}
              />
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default TopCoinsContainer;
