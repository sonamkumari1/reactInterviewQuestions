import { useEffect, useState } from "react";

function PriceFilterProducts() {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [priceRange]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      if (priceRange === "ALL") {
        setProducts(data);
        return;
      }

      const [min, max] = priceRange.split("-").map(Number);

      const filtered = data.filter(
        (item) => item.price >= min && item.price <= max
      );

      setProducts(filtered);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Products</h2>

      {/* PRICE FILTER */}
      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
        <option value="ALL">All Prices</option>
        <option value="0-50">₹0 - ₹50</option>
        <option value="50-100">₹50 - ₹100</option>
        <option value="100-500">₹100 - ₹500</option>
      </select>

      {loading && <p>Loading...</p>}

      {/* PRODUCT LIST */}
      <div style={{ marginTop: "20px" }}>
        {products.map((item) => (
          <div key={item.id}>
            {item.title} - ₹{item.price}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceFilterProducts;
