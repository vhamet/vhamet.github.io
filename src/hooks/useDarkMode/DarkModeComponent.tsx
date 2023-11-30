import useDarkMode from ".";

import "./body.css";

const DarkModeComponent = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        border: `1px solid ${darkMode ? "white" : "black"}`,
        background: "none",
        color: darkMode ? "white" : "black",
      }}
    >
      Toggle Dark Mode
    </button>
  );
};

export default DarkModeComponent;
