import { formatter } from "../../helpers";

function User({
  position,
  username,
  balance,
}) {
  return (
    <tr>
      <td>{position + 1}</td>
      <td>{username}</td>
      <td>{balance}</td>
    </tr>
  );
}

export default User;
