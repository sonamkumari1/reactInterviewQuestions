import { useTheme } from "./ThemeContext";

export default function Toggle() {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
