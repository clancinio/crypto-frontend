import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div className="footer-basic mt-5">
      <footer>
        <div className="container">
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/">Home</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/top">Top 100</Link>
            </li>
          </ul>
          <p className="copyright">Company Name © 2018</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
