import { formatter } from "../../../helpers";

function Transaction({
  asset,
  amount,
  buy_sell,
  price,
  date,
  cost,
  colour,
  sign,
  image,
}) {
  return (
    <tr>
      <td>
        <div className="coin d-flex align-items-centre ">
          <img src={image} alt="crypto" />
          <h5>{asset.toUpperCase()}</h5>
        </div>
      </td>
      <td>{buy_sell.toUpperCase()}</td>
      <td>{amount}</td>
      <td>{formatter.format(price)}</td>
      <td>{date}</td>
      <td className={`${colour}`}>{sign + " " + formatter.format(cost)}</td>
    </tr>
  );
}

export default Transaction;
