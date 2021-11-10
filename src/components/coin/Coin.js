import "./coin.css";

function Coin({ name, price, symbol, marketcap, volume, image, position }) {
  // Create our number formatter.
  var formatter = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <tr>
      <td>{position + 1}</td>
      <td>
        <div className="coin d-flex align-items-centre ">
          <img src={image} alt="crypto" />
          <h3>{name}</h3>
        </div>
      </td>
      <td>{symbol.toUpperCase()}</td>
      <td>{formatter.format(price)}</td>
      <td>{formatter.format(price)}</td>
      <td>{formatter.format(marketcap)}</td>
    </tr>
  );
}

export default Coin;
