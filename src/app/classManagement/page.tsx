// import React from 'react';

// const ClassManagementPage = () => {
//   return (
//     <>
//       <span className="font-bold text-4xl">ClassManagementPage</span>

//       <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
//       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
//     </>
//   );
// };

// export default ClassManagementPage;
// components/ScreenSwitcher.tsx
"use client";

// components/ScreenSwitcher.tsx

import { useState } from 'react';

const ScreenSwitcher = () => {
  const [selectedOption, setSelectedOption] = useState<string>('home');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'home':
        return <div>Welcome to the Home Screen</div>;
      case 'about':
        return <div>About Us</div>;
      case 'contact':
        return <div>Contact Us</div>;
      default:
        return <div>Welcome to the Home Screen</div>;
    }
  };

  return (
    <div>
      <div
        onClick={() => handleOptionClick('home')}
        style={{ cursor: 'pointer', padding: '10px', backgroundColor: selectedOption === 'home' ? 'lightgray' : 'white' }}
      >
        Home
      </div>
      <div
        onClick={() => handleOptionClick('about')}
        style={{ cursor: 'pointer', padding: '10px', backgroundColor: selectedOption === 'about' ? 'lightgray' : 'white' }}
      >
        About
      </div>
      <div
        onClick={() => handleOptionClick('contact')}
        style={{ cursor: 'pointer', padding: '10px', backgroundColor: selectedOption === 'contact' ? 'lightgray' : 'white' }}
      >
        Contact
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ScreenSwitcher;

