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

function PaginationSecondType() {
const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=500")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const getPages = () => {
    const pages = [];
    const DOTS = "...";

    if (totalPages <= 5) {
      return [...Array(totalPages).keys()];
    }

    pages.push(0);

    if (currentPage > 3) {
      pages.push(DOTS);
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages - 2, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push(DOTS);
    }

    pages.push(totalPages - 1);

    return pages;
  };

  if (!products.length) return <h2>Loading...</h2>;

  return (
    <div className="App">
      <h1>Pagination with Dots</h1>

      <div className="pagination-container">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="page-number"
        >
          Prev
        </button>

        {getPages().map((page, index) =>
          page === "..." ? (
            <span key={index} className="dots">...</span>
          ) : (
            <button
              key={index}
              className={`page-number ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="page-number"
        >
          Next
        </button>
      </div>

      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
}


export default PaginationSecondType
