import { useState } from "react";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "./portfolio.css";

function PortfolioComponent() {
  // State to mock assets
  const [state, setstate] = useState([]);

  return (
    <Col className="section mt-5">
      <h1>Portfolio</h1>
      <p className="lead">3 Assests</p>
      <div className="table-container">
        <Table striped bordered>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Amount</th>
              <th>Value</th>
              <th>Value Change (24h)</th>
            </tr>
          </thead>
          <tbody>
            {/* {coins.map((coin, index) => {
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
            })} */}
          </tbody>
        </Table>
      </div>
    </Col>
  );
}

export default PortfolioComponent;
