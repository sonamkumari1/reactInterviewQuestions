import { useEffect, useRef, useState } from "react";

const LIMIT = 10;

export default function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [page]);

  async function fetchData() {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setItems(prev => [...prev, ...data]);
      setHasMore(data.length === LIMIT);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const lastItemRef = (node) => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  };

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-xl font-bold text-center mb-4">
        Infinite Scroll
      </h2>

      <ul className="space-y-3">
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <li
                ref={lastItemRef}
                key={item.id}
                className="p-4 bg-white rounded shadow"
              >
                {item.title}
              </li>
            );
          }

          return (
            <li
              key={item.id}
              className="p-4 bg-white rounded shadow"
            >
              {item.title}
            </li>
          );
        })}
      </ul>

      {loading && (
        <p className="text-center my-4 text-blue-600">
          Loading more...
        </p>
      )}

      {error && (
        <p className="text-center my-4 text-red-600">
          {error}
        </p>
      )}

      {!hasMore && !loading && (
        <p className="text-center my-4 text-gray-500">
          No more data
        </p>
      )}
    </div>
  );
}
