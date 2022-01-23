import { formatter } from "../../../helpers";

function Transaction({ asset, amount, buy_sell, price, date, cost }) {
  return (
    <tr>
      <td>{asset.toUpperCase()}</td>
      <td>{buy_sell.toUpperCase()}</td>
      <td>{amount}</td>
      <td>{formatter.format(price)}</td>
      <td>{date}</td>
      <td>{formatter.format(cost)}</td>
    </tr>
  );
}

export default Transaction;
