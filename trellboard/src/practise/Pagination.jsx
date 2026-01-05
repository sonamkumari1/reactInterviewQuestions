import { useEffect, useState } from "react";

const LIMIT = 3;

function Pagination() {
 const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(products.length / LIMIT);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (page - 1) * LIMIT;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + LIMIT
  );

  return (
    <div>
      <h2>E-Commerce Products</h2>

      {loading && <p>Loading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {paginatedProducts.map((item) => (
          <div
            key={item.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <img src={item.image} alt={item.title} height="100" />
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>

  )}

export default Pagination
