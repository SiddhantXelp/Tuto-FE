"use client";

import React, { useEffect } from 'react';
import TabNavigator from "../TabNavigator/page";
import Card from '../../common/Myfiles/filecard';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getMyFiles } from '@/app/store/actions/assignment';
import Spinner from "@/common/Spinner";

const MyFilesPage = () => {
  const dispatch = useAppDispatch();
  const memberAuthToken = "njdkfhsdkjfhsdkjfsdhdfkjsdkhfsjkdfhsdkjf";
  const myFiles = useAppSelector((state: { assignment: any }) => state.assignment.setMyFiles?.folders);

  useEffect(() => {
    dispatch(getMyFiles(memberAuthToken));
    console.log("API Calling");
  }, [dispatch, memberAuthToken]);

  const isLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);

  // Filter files with parent_id !== null
  const filteredFiles = myFiles ? myFiles.filter((item: any) => item.parent_id === null) : [];

  return (
    <TabNavigator>
      {isLoading && <Spinner />}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFiles.map((item: any) => (
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
