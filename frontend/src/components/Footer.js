// src/components/Footer.js
function Footer() {
  return (
    <footer
      className="text-white text-center py-3 mt-auto"
      style={{ backgroundColor: "#003865" }}
    >
      <div className="container">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Hospital IT Knowledge Base
        </p>
        <p className="mb-0">
          Contact us at 61301 —{" "}
          <a
            href="mailto:support@hospital.org"
            className="text-white text-decoration-underline"
          >
            support@hospital.org
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
