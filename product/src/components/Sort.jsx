export default function Sort({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Sort by price</option>
      <option value="low">Low to High</option>
      <option value="high">High to Low</option>
    </select>
  );
}
