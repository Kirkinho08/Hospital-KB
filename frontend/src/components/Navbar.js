import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle"; // ✅ Import the toggle component

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#003865" }}
    >
      <div className="container-fluid d-flex align-items-center position-relative">
        {/* Logo */}
        <img src={logo} alt="SGHS Logo" style={{ width: 130, height: 70 }} />

        {/* Centered Title */}
        <span
          className="position-absolute top-50 start-50 translate-middle text-white"
          style={{ fontSize: "1.2rem", pointerEvents: "none" }}
        >
          SGHS Knowledge Base
        </span>

        {/* Nav Buttons and Dark Mode Toggle */}
        <div className="d-flex ms-auto align-items-center">
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse ms-2" id="mainNav">
            <ul className="navbar-nav">
              <li className="nav-item me-3">
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

          {/* ✅ Dark Mode Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
