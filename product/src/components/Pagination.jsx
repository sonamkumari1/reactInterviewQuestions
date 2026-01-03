export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div style={{ marginTop: 20 }}>
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>
      <span style={{ margin: "0 10px" }}>
        {page} / {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
