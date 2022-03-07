import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { top100 } from "../api";
import Coin from "../components/coin/Coin";
import Footer from "../components/footer/Footer";

function TopCoinsContainer() {
  // State to hold and set the top 100 coins
  const [coins, setCoins] = useState([]);

  // This hood will call the api once on render
  useEffect(() => {
    document.title = "Top Cryptocurrencies | Trypto";

    axios
      .get(top100)
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => console.log(error.response.data.error));
  }, []);

  return (
    <>
      <Container>
        {/* <h1>Top 100 Coins</h1> */}

        <Table className="table-dark mt-5" striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Volume (24h)</th>
              <th>Price Change (24h)</th>
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
                  priceChange={coin.price_change_percentage_24h}
                />
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}

export default TopCoinsContainer;
