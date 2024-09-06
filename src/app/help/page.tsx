"use client"
import React from 'react';
import TabNavigator from "../TabNavigator/page";

const HelpPage = () => {
  return (
    <TabNavigator>
      <div className='m-5'>
        <span className="font-bold text-4xl">Help</span>

        <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg mt-2 mb-2"></div>
        <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      </div>

    </TabNavigator>
  );
};

export default HelpPage;
