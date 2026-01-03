import { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let data = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "low") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [products, search, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <Sort value={sortOrder} onChange={setSortOrder} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {paginatedProducts.map(product => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: 10 }}>
            <img src={product.image} alt={product.title} width="80" />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
