





// "use client";
// import { useState } from "react";
// import Link from 'next/link';

// type Step = 1 | 2 | 3;

// const SplashScreen: React.FC = () => {
//   const [step, setStep] = useState<Step>(1);

//   const handleNextClick = () => {
//     if (step < 3) {
//       setStep(step + 1 as Step);
//     } else {
//       window.location.href = '/';
//     }
//   };

//   const renderContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div>
//             <h2 className="text-xl font-bold mb-6">Hello Parent</h2>
//             <p className="text-gray-700 mb-8 mt-20">
//               This splash screen idea incorporates fun and engaging illustrations to create a friendly and inviting atmosphere for your users. The bright colors and bold typography make it visually appealing and easy to read, while the illustrations help to convey the purpose and benefits of your platform.
//             </p>
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Hello Parent</h2>
//             <p className="text-gray-700 mb-8 mt-20">
//               This splash screen idea uses a short video to showcase the key features and benefits of your platform. The video should be engaging and informative, highlighting the ease of use and personalization that your platform offers. This approach is an excellent way to grab the user's attention and pique their interest.
//             </p>
//           </div>
//         );
//       case 3:
//         return (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Hello Parent</h2>
//             <p className="text-gray-700 mb-8 mt-20">
//               This splash screen idea is designed to be simple and easy to navigate, with a minimalist design that emphasizes the key features of your platform. The muted color scheme and subtle animations create a sleek and modern look, while the concise text highlights the benefits of your platform without overwhelming the user. This approach is ideal for users who want to quickly access the platform's main features.
//             </p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-blue-50 relative">
//       <div className="w-full h-10 bg-white shadow-2xl flex justify-start items-center pl-4">
//         <span className="text-[#8A70D6]">TutorNow</span> 
//       </div>
//       <div className="flex-grow flex flex-col items-center justify-center">
//         <div className="w-4/5 md:w-1/2 bg-white rounded-lg shadow-lg p-10 text-center" style={{ minHeight: '500px' }}>
//           {renderContent()}
//           <div className="flex justify-end mt-auto">
//             <button className="text-[#8A70D6]" onClick={handleNextClick}>
//               {step < 3 ? "Next" : "Finish"}
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="absolute right-4 bottom-10">
//         <Link href='/'>
//           <button className="text-[#8A70D6]">
//             Skip to dashboard
//           </button>
//         </Link>
//       </div>
//       <div className="flex flex-col items-center mb-10">
//         <div className="flex justify-center items-center space-x-2 mb-4">
//           <div className={`h-3 w-3 rounded-full ${step === 1 ? "bg-gray-800" : "bg-gray-300"}`}></div>
//           <div className={`h-3 w-3 rounded-full ${step === 2 ? "bg-gray-800" : "bg-gray-300"}`}></div>
//           <div className={`h-3 w-3 rounded-full ${step === 3 ? "bg-gray-800" : "bg-gray-300"}`}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SplashScreen;


"use client";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3;

const SplashScreen: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);

  const handleNextClick = () => {
    if (step < 3) {
      setStep(step + 1 as Step);
    } else {
      router.push("/")
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-6  flex justify-center">Hello Parent</h2>
            <p className="text-gray-700 mb-8 mt-20">
              This splash screen idea incorporates fun and engaging illustrations to create a friendly and inviting atmosphere for your users. The bright colors and bold typography make it visually appealing and easy to read, while the illustrations help to convey the purpose and benefits of your platform.
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex justify-center">Hello Parent</h2>
            <p className="text-gray-700 mb-8 mt-20">
              This splash screen idea uses a short video to showcase the key features and benefits of your platform. The video should be engaging and informative, highlighting the ease of use and personalization that your platform offers. This approach is an excellent way to grab the user's attention and pique their interest.
            </p>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex justify-center">Hello Parent</h2>
            <p className="text-gray-700 mb-8 mt-20">
              This splash screen idea is designed to be simple and easy to navigate, with a minimalist design that emphasizes the key features of your platform. The muted color scheme and subtle animations create a sleek and modern look, while the concise text highlights the benefits of your platform without overwhelming the user. This approach is ideal for users who want to quickly access the platform's main features.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 relative">
      <div className="w-full h-10 bg-white shadow-2xl flex justify-start items-center pl-4">
        <span className="text-[#8A70D6]">TutorNow</span>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-4/5 md:w-1/2 bg-white rounded-lg shadow-lg p-10 flex flex-col" style={{ minHeight: '500px' }}>
          <div className="flex-grow">
            {renderContent()}
          </div>
          <div className="flex justify-end mt-8">
            <button className="text-[#8A70D6]" onClick={handleNextClick}>
              {step < 3 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      </div>
      <div className="absolute right-4 bottom-10">
        <Link href='/'>
          <button className="text-[#8A70D6]">
            Skip to dashboard
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center mb-10">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className={`h-3 w-3 rounded-full ${step === 1 ? "bg-gray-800" : "bg-gray-300"}`}></div>
          <div className={`h-3 w-3 rounded-full ${step === 2 ? "bg-gray-800" : "bg-gray-300"}`}></div>
          <div className={`h-3 w-3 rounded-full ${step === 3 ? "bg-gray-800" : "bg-gray-300"}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;



