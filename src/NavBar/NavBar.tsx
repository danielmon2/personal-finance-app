import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useUserContext } from "../context";

function NavBar() {
  const [URL, setURL] = useState(window.location.pathname);
  const isMobileWidth = useUserContext();
  const paths = [
    "overview",
    "transactions",
    "budgets",
    "pots",
    "recurring-bills",
  ];

  return (
    <nav className="navbar navbar--primary">
      {paths.map((path, index) => {
        let activeIcon = "";
        let activeClass = "";
        let linkName = " navbar__link__name--primary";
        if (URL === "/" + path) {
          activeIcon = "-active";
          activeClass = " navbar__link--active";
          if (!isMobileWidth) {
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
            <img src={`./images/icon-nav-${path}${activeIcon}.svg`} />
            {!isMobileWidth && (
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
