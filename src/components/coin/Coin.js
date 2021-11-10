import "./coin.css";

function Coin({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  position,
  priceChange,
}) {
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
          <h4>{name}</h4>
        </div>
      </td>
      <td>{symbol.toUpperCase()}</td>
      <td>{formatter.format(price)}</td>
      <td>{formatter.format(volume)}</td>
      <td>{formatter.format(marketcap)}</td>
      {priceChange < 0 ? (
        <td className="text-danger">{priceChange.toFixed(2)}%</td>
      ) : (
        <td className="text-success">{priceChange.toFixed(2)}%</td>
      )}
    </tr>
  );
}

export default Coin;
