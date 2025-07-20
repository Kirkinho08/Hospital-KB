// src/components/ThemeToggle.js
function ThemeToggle() {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      className="btn btn-outline-light ms-3"
      onClick={toggleDarkMode}
      title="Toggle Dark Mode"
    >
      🌓
    </button>
  );
}

export default ThemeToggle;
