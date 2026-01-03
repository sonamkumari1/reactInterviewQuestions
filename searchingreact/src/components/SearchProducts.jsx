import { useEffect, useState } from "react";

function SearchProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products once
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Live search (on typing)
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
      return;
    }

    const result = products.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(result);
  }, [searchQuery, products]);

  return (
    <div>
      <h2>E-Commerce Products</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {loading && <p>Loading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {filteredProducts.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={item.image} alt={item.title} height="100" />
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchProducts;
