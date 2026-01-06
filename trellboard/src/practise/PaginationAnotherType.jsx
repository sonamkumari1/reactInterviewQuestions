import "../style.css";
import React, { useEffect, useState } from "react";

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <span>{title}</span>
    </div>
  );
};

const PAGE_SIZE = 10;

function PaginationAnotherType() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=500");
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (!products.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Pagination</h1>

      <div className="pagination-container">
        <button
          disabled={currentPage === 0}
          className="page-number"
          onClick={goToPrevPage}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            className={`page-number ${n === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(n)}
          >
            {n + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages - 1}
          className="page-number"
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>

      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCard
            key={p.id}
            image={p.thumbnail}
            title={p.title}
          />
        ))}
      </div>
    </div>
  );
}

export default PaginationAnotherType;
