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
    <div className="flex h-full">
      <div className="flex flex-col items-center mr-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-7 h-7 text-sm rounded-full mb-2 ${
                index === activeStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-400 text-white'
              } cursor-pointer transition-colors duration-300 ease-in-out`}
              onClick={() => onStepChange(index)}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-px h-10 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-1">
        {steps[activeStep].content}
      </div>
    </div>
  );
};

export default Stepper;
