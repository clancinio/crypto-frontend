import { formatter } from "../../../helpers";

function Asset({ name, symbol, amount, value, value_change_24h, price }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{symbol.toUpperCase()}</td>
      <td>{amount}</td>
      <td>{formatter.format(value)}</td>
      {/* <td>{value_change_24h}</td> */}
      <td>{formatter.format(price)}</td>
    </tr>
  );
}

export default Asset;
