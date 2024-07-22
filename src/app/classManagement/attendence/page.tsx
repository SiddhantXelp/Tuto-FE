import React from 'react';

const Attendance: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap space-x-5">
        <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
          <h4 className="text-xxs font-bold text-gray-600 mb-1">Least attendance</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600 mr-4">99. Suresh</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">98. Mathew</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">96. Lily</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">96. Lily</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4">
          <h4 className="text-xxs font-bold text-gray-600 mb-1">Performance</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600 mr-4">99. Suresh</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">98. Mathew</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">96. Lily</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">96. Lily</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
          <h4 className="text-xxs font-bold text-gray-600 mb-1">Groups</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600 mr-4">Group A</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">Group A</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">Group A</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">Group A</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
