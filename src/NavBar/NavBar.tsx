import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  const [URL, setURL] = useState(window.location.pathname);
  const paths = [
    "overview",
    "transactions",
    "budgets",
    "pots",
    "recurring-bills",
  ];

  return (
    <nav className="navbar navbar--primary">
      {paths.map((path) => {
        let active = "";
        if (URL === "/" + path) {
          active = "-active";
        }
        return (
          <Link to={"/" + path} onClick={() => setURL("/" + path)}>
            <img src={`./images/icon-nav-${path}${active}.svg`} />
          </Link>
        );
      })}
    </nav>
  );
}

export default NavBar;
