import React from 'react';
import TabNavigator from "../TabNavigator/page";

const MessagesPage = () => {
  return (
    <TabNavigator>
      <span className="font-bold text-4xl">Messages</span>

      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
    </TabNavigator>
  );
};

export default MessagesPage;
