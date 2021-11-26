import { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "./portfolio.css";
import Asset from "./asset/Asset";
import { assetData } from "../../api";

function PortfolioComponent() {
  const [assets, setAssets] = useState([]);

  async function getAssets() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        // Do as you wish with response here
        console.log(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  // State to mock assets
  const [dummyAssets, setDummyAssets] = useState([
    {
      asset_id: "bitcoin",
      symbol: "BTC",
      amount: "16",
      value_change_24h: "+$10",
    },
    {
      asset_id: "ethereum",
      symbol: "ETH",
      amount: "15002",
      value_change_24h: "-$10",
    },
    {
      asset_id: "ripple",
      symbol: "XRP",
      amount: "15002",
      value_change_24h: "+$157",
    },
  ]);

  useEffect(() => {
    getAssets();

    Promise.all(
      dummyAssets.map(async function (asset) {
        try {
          const response = await axios.get(assetData(asset.asset_id));
          let cp = response.data.market_data.current_price.eur;
          let value = Number(cp) * Number(asset.amount);
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
        console.log(error.response.data.error);
      });
  }, [dummyAssets]);

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
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => {
              return (
                <Asset
                  key={index}
                  symbol={asset.symbol}
                  amount={asset.amount}
                  value={asset.value}
                  value_change_24h={asset.value_change_24h}
                  price={asset.price}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    </Col>
  );
}

export default PortfolioComponent;
