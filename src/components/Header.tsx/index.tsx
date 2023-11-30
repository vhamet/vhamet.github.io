import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">RT</Link>
      </div>
    </header>
  );
};

export default Header;
