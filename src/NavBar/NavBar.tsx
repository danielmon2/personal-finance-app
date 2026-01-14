import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useWindowWidth } from "../useWindowWidth";

function NavBar() {
  const [URL, setURL] = useState(window.location.pathname);
  const windowWidth = useWindowWidth();
  const paths = [
    "overview",
    "transactions",
    "budgets",
    "pots",
    "recurring-bills",
  ];

  return (
    <nav className="navbar navbar--primary">
      {windowWidth.desktop && (
        <img className="navbar__logo" src="./images/logo-large.svg" />
      )}
      {paths.map((path, index) => {
        let activeIcon = "";
        let activeClass = " navbar__link--primary";
        let linkName = " navbar__link__name--primary";
        if (URL === "/" + path) {
          activeIcon = "-active";
          activeClass = " navbar__link--active";
          if (!windowWidth.mobile) {
            linkName = " navbar__link__name--active";
          }
        }
        return (
          <Link
            className={"navbar__link" + activeClass}
            to={"/" + path}
            onClick={() => setURL("/" + path)}
            key={index}
          >
            <img
              className="navbar__link__icon"
              src={`./images/icon-nav-${path}${activeIcon}.svg`}
            />
            {!windowWidth.mobile && (
              <p className={"navbar__link__name font--bold" + linkName}>
                {path[0].toUpperCase() + path.slice(1)}
              </p>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavBar;
