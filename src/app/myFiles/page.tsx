import React from 'react';
import TabNavigator from "../TabNavigator/page";
import Card from '../../common/Myfiles/filecard';
import { data } from "./data";

const MyFilesPage = () => {

  return (
    <TabNavigator>
      <div className="bg-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <Card
              key={item.id}
              data={item}
            />
          ))}
        </div>
      </div>
    </TabNavigator>
  );
};

export default MyFilesPage;
