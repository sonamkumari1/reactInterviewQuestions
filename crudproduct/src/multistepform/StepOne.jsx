export default function StepOne({ data, onChange, onNext }) {
  const handleNext = () => {
    if (!data.name || !data.email) {
      alert("Please fill all fields");
      return;
    }
    onNext();
  };

  return (
    <>
      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Name"
        value={data.name}
        onChange={e => onChange("name", e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Email"
        value={data.email}
        onChange={e => onChange("email", e.target.value)}
      />

      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </>
  );
}
