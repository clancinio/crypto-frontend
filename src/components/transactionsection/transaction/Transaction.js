function Transaction({ symbol, amount, buy_sell, price, date }) {
  return (
    <tr>
      <td>{symbol.toUpperCase()}</td>
      <td>{buy_sell}</td>
      <td>{amount}</td>
      <td>{price}</td>
      <td>{date}</td>
    </tr>
  );
}

export default Transaction;
