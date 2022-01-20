import { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";

const Status = ({}) => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setStatus(true);
    });
  }, []);

  return (
    <div>
      {status ? (
        <a href="#" onClick={logout} class="link-secondary">
          Logout
        </a>
      ) : (
        "Please login"
      )}
    </div>
  );
};
export default Status;
