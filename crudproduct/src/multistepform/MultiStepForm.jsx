import { useState } from "react";
import Stepper from "./Stepper";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const steps = ["Personal", "Address", "Review"];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    country: "",
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
      <Stepper steps={steps} currentStep={currentStep} />

      {currentStep === 0 && (
        <StepOne
          data={formData}
          onChange={updateForm}
          onNext={nextStep}
        />
      )}

      {currentStep === 1 && (
        <StepTwo
          data={formData}
          onChange={updateForm}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {currentStep === 2 && (
        <StepThree
          data={formData}
          onBack={prevStep}
        />
      )}
    </div>
  );
}
