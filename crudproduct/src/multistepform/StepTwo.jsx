export default function StepTwo({ data, onChange, onNext, onBack }) {
  const handleNext = () => {
    if (!data.city || !data.country) {
      alert("Please fill all fields");
      return;
    }
    onNext();
  };

  return (
    <>
      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="City"
        value={data.city}
        onChange={e => onChange("city", e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Country"
        value={data.country}
        onChange={e => onChange("country", e.target.value)}
      />

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}
