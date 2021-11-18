function Asset({ symbol, amount, value, value_change_24h, price }) {
  return (
    <tr>
      <td>{symbol.toUpperCase()}</td>
      <td>{amount}</td>
      <td>{value}</td>
      <td>{value_change_24h}</td>
      <td>{price}</td>
    </tr>
  );
}

export default Asset;
