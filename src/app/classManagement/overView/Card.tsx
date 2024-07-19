// OverviewTabContent.tsx

import React from 'react';
import { OverviewCard, overviewData } from './data';
import { Icon } from '@iconify/react';
import Table from './Table';

const Card: React.FC = () => {
  return (
    <div >
            <div className="my-2">
        <span className="text-xxs text-buttonGray font-semibold">Recent classes</span>
        </div>
      <div className="flex justify-between">
        {overviewData.map((card: OverviewCard, index: number) => (
          <div key={index} className="w-[16%] h-32 bg-gray-200 rounded-lg p-4 flex flex-col gap-y-1.5">
<div className="flex items-center space-x-2">
      <Icon icon="mdi:clock" width="16" height="16" className="text-black" />
      <p className="text-xxs text-black">{card.time}</p>
    </div>
    <div className="flex items-center space-x-2">
      <Icon icon="carbon:document-subject" width="12" height="12" className="text-black" />
      <p className="text-xxxs text-black">{card.sub}</p>
    </div>
    <div className="flex items-center space-x-2">
      <Icon icon="uis:calender" width="12" height="12" className="text-black" />
      <p className="text-xxxs text-black">{card.date}</p>
    </div>
    <div className="flex items-center space-x-2">
      <Icon icon="ph:student-bold" width="12" height="12" className="text-black" />
      <p className="text-xxxs text-black">{card.count} student</p>
    </div>
            <div key={index} className="bg-buttonGray rounded-full flex items-center justify-center">
  <p className="flex justify-between text-xxxs my-1 text-white">{card.status}</p>
</div>


          </div>
          
        ))}
<div className="w-[12%] h-32 bg-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
  <Icon icon="mingcute:add-line" width="40" height="35" color='black'/>
  <h3 className="text-xs mt-2">Create</h3>
  <span className="text-xs">New Class</span>
</div>


      </div>
      <div>
        <div className="my-3">
        <span className="text-xxs text-buttonGray font-semibold">Schedule</span>
        </div>
      <Table/>
      </div>

    </div>
  );
};

export default Card;
