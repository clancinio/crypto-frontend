import { formatter } from "../../../helpers";

function Asset({ name, symbol, amount, value, price, image }) {
  return (
    <tr>
      <td>
        <div className="coin d-flex align-items-centre ">
          <img src={image} alt="crypto" />
          <h5>{name}</h5>
        </div>
      </td>
      <td>{symbol.toUpperCase()}</td>
      <td>{amount}</td>
      <td>{formatter.format(value)}</td>
      {/* <td>{value_change_24h}</td> */}
      <td>{formatter.format(price)}</td>
    </tr>
  );
}

export default Asset;
