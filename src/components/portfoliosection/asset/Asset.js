import React from "react";

function Asset({ symbol, amount, value }) {
  return (
    <tr>
      <td>{symbol.toUpperCase()}</td>
      <td>{amount}</td>
      <td>{value}</td>
    </tr>
  );
}

export default Asset;
