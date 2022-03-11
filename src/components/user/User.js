import { formatter } from "../../helpers";

function User({ position, username, balance, setLeader, userName, setRank }) {
  if (position + 1 === 1) {
    setLeader(username);
  }

  if (username === userName) {
    setRank(position + 1);
  }

  return (
    <tr>
      <td className="text-center">{position + 1}</td>
      <td>{username}</td>
      <td>{formatter.format(balance)}</td>
    </tr>
  );
}

export default User;
