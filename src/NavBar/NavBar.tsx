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
        let activeIcon = "";
        let activeClass = "";
        if (URL === "/" + path) {
          activeIcon = "-active";
          activeClass = " navbar__link--active";
        }
        return (
          <Link
            className={"navbar__link" + activeClass}
            to={"/" + path}
            onClick={() => setURL("/" + path)}
          >
            <img src={`./images/icon-nav-${path}${activeIcon}.svg`} />
          </Link>
        );
      })}
    </nav>
  );
}

export default NavBar;
