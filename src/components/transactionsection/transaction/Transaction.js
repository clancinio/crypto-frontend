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
}) {
  return (
    <tr>
      <td>{asset.toUpperCase()}</td>
      <td>{buy_sell.toUpperCase()}</td>
      <td>{amount}</td>
      <td>{formatter.format(price)}</td>
      <td>{date}</td>
      <td className={`${colour}`}>{sign + " " + formatter.format(cost)}</td>
    </tr>
  );
}

export default Transaction;
