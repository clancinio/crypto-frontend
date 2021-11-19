function Asset({ symbol, amount, value, value_change_24h, price }) {
  // Number formatter for euros
  var formatter = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <tr>
      <td>{symbol.toUpperCase()}</td>
      <td>{amount}</td>
      <td>{formatter.format(value)}</td>
      <td>{value_change_24h}</td>
      <td>{formatter.format(price)}</td>
    </tr>
  );
}

export default Asset;
