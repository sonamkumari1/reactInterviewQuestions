export default function StepThree({ data, onBack }) {
  const handleSubmit = () => {
    console.log("Submitted Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <>
      <div className="mb-4 text-sm">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>City:</strong> {data.city}</p>
        <p><strong>Country:</strong> {data.country}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </>
  );
}
