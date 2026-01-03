export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`flex-1 text-center pb-2 border-b-2
            ${index <= currentStep
              ? "border-blue-600 font-semibold"
              : "border-gray-300"
            }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
