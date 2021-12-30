import { formatter } from "../../../helpers";

function Transaction({ index, symbol, amount, buy_sell, price, date, cost }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{symbol.toUpperCase()}</td>
      <td>{buy_sell}</td>
      <td>{amount}</td>
      <td>{formatter.format(price)}</td>
      <td>{date}</td>
      <td>{formatter.format(cost)}</td>
    </tr>
  );
}

export default Transaction;
