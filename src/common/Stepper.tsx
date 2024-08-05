"use client";
import React from 'react';

type Step = {
  label: string;
  content: React.ReactNode;
};

interface StepperProps {
  steps: Step[];
  activeStep: number;
  onStepChange: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep, onStepChange }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-4 h-4 text-xs rounded-full mb-2 ${
                index === activeStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-500 text-white'
              } cursor-pointer`}
              onClick={() => onStepChange(index)}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-px h-8 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
      <div className="ml-4">
        {steps[activeStep].content}
      </div>
    </div>
  );
};

export default Stepper;
