export default function SearchBar({ value, onChange }) {
  return (
    <input
      placeholder="Search product..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: 8, marginRight: 10 }}
    />
  );
}
