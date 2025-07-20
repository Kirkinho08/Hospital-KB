import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#003865" }}
    >
      <div className="container-fluid position-relative">
        {/* Logo */}
        <img src={logo} alt="SGHS Logo" style={{ width: 130, height: 70 }} />

        {/* Centered Title */}
        <span
          className="position-absolute top-50 start-50 translate-middle text-white"
          style={{ fontSize: "1.2rem", pointerEvents: "none" }}
        >
          SGHS Knowledge Base
        </span>

        {/* Offcanvas Toggler */}
        <button
          className="navbar-toggler bg-light ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Offcanvas Menu */}
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/"
                  data-bs-dismiss="offcanvas"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/admin"
                  data-bs-dismiss="offcanvas"
                >
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/dashboard"
                  data-bs-dismiss="offcanvas"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mt-3">
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
