"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getMyFiles, setCreateFolder } from '@/app/store/actions/myFiles';
import AddFolderModel from "@/common/Myfiles/AddFolderModel";
import dynamic from 'next/dynamic';
import Spinner from '@/common/Spinner';

const TabNavigator = dynamic(() => import("../TabNavigator/page"), {
  loading: () => <Spinner />,
  ssr: false,
});

const Card = dynamic(() => import("../../common/Myfiles/filecard"), {
  loading: () => <Spinner />,
  ssr: false,
});

const MyFilesPage = () => {
  const [openFolder, setOpenFolder] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: { auth: any }) => state.auth.login?.token);

  const isLoading = useAppSelector(state => state.myFiles.loading);
  const myFiles = useAppSelector(state => state.myFiles.setMyFiles?.folders);
  const createFolder = useAppSelector(state => state.myFiles.setCreateFolder);
  const deleteFolderResponse = useAppSelector(state => state.myFiles.setDeleteFolders);

  useEffect(() => {
    if (token) {
      dispatch(getMyFiles(token))
    }

  }, [dispatch, token]);

  useEffect(() => {
    if (createFolder || deleteFolderResponse) {
      dispatch(getMyFiles(token));
      dispatch(setCreateFolder(null));

    }
  }, [createFolder, dispatch, token, deleteFolderResponse]);

  const filteredFiles = myFiles?.filter((item: any) => item.parent_id === null) || [];

  const handleDropdownToggle = () => setOpenDropdown(prev => !prev);

  return (
    <TabNavigator>
      {isLoading && <Spinner />}
      <div className="relative min-h-screen md:h-[400px]">
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
        <div className="fixed bottom-10 right-4">
          {openDropdown && (
            <div className="absolute bottom-14 right-0 w-48 bg-gray-200 shadow-lg rounded-lg border border-gray-200 mb-2">
              <ul className="text-gray-700">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setOpenDropdown(false);
                      setOpenFolder(true);
                    }}
                  >
                    New Folder
                  </button>
                </li>
              </ul>
            </div>
          )}
          <button
            className="w-48 bg-gray-500 text-center p-4 border-t cursor-pointer rounded-xl text-white hover:bg-gray-600 transition duration-200"
            onClick={handleDropdownToggle}
          >
            New +
          </button>
        </div>
      </div>
      {
        openFolder && <AddFolderModel
          isOpen={openFolder}
          onClose={() => setOpenFolder(false)}
          isFolder={true}
          isFile={false}
          folderId=""
        />
      }


    </TabNavigator>
  );
};

export default MyFilesPage;
