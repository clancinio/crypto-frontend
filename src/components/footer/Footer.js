import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div class="footer-basic mt-5">
      <footer>
        <div className="container">
          <ul class="list-inline">
            <li class="list-inline-item">
              <Link to="/">Home</Link>
            </li>
            <li class="list-inline-item">
              <Link to="/top">Top 100</Link>
            </li>
          </ul>
          <p class="copyright">Company Name © 2018</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
