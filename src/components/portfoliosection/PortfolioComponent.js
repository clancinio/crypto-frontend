import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "./portfolio.css";
import Asset from "./asset/Asset";

function PortfolioComponent({ assets }) {
  return (
    <Col className="section mt-5">
      <h1>Portfolio</h1>
      <p className="lead">{assets.length} Assets</p>
      {assets.length > 0 ? (
        <div className="table-container">
          <Table className="table-dark" striped bordered>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Symbol</th>
                <th>Quantity</th>
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
                    price={asset.price}
                    image={asset.Image}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <h1 className="text-center display-4">
          You have no assets in your portfolio
        </h1>
      )}
    </Col>
  );
}

export default PortfolioComponent;
