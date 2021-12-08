import { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "./portfolio.css";
import Asset from "./asset/Asset";
import { assetData } from "../../api";

function PortfolioComponent() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAssets() {
      const response = await axios.get("http://localhost:8080/api/assets");
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
    <Col className="section mt-5">
      <h1>Portfolio</h1>
      <p className="lead">{assets.length} Assests</p>
      {assets.length > 0 ? (
        <div className="table-container">
          <Table striped bordered>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Symbol</th>
                <th>Amount</th>
                <th>Value</th>
                {/* <th>Value Change (24h)</th> */}
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => {
                return (
                  <Asset
                    key={index}
                    name={asset.AssetName}
                    symbol={asset.AssetSymbol}
                    amount={asset.Amount}
                    value={asset.value}
                    value_change_24h={asset.value_change_24h}
                    price={asset.price}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <h1>You have no assets in your portfolio</h1>
      )}
    </Col>
  );
}

export default PortfolioComponent;
