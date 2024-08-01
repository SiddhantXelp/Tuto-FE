import React from 'react';
import TabNavigator from "../TabNavigator/page";

const MyFilesPage = () => {
  return (
    <TabNavigator>
      <span className="font-bold text-4xl">MyFilesPage</span>

      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
    </TabNavigator>
  );
};

export default MyFilesPage;
