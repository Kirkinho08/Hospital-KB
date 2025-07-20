import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#003865" }}
    >
      <div className="container-fluid flex-column align-items-center text-center">
        {/* Top Row: Logo + ThemeToggle */}
        <div className="d-flex w-100 justify-content-between align-items-center">
          <img src={logo} alt="SGHS Logo" style={{ width: 130, height: 70 }} />

          <ThemeToggle />
        </div>

        {/* Title */}

        {/* Nav Links Below Title */}
        <div className="d-flex justify-content-center">
          <ul className="navbar-nav flex-row gap-4">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin">
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
