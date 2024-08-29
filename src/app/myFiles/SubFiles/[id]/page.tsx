'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TabNavigator from "../../../TabNavigator/page";
import SubFilecard from '../../../../common/Myfiles/SubFilecard';
import { data } from "../../data";
import { GoFileDirectoryFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getMyFilesByID, setCreateFolder, setCreateFiles, setDeleteFiles, setDeleteFolder } from '@/app/store/actions/assignment';
import Spinner from "@/common/Spinner";
import AddFolderModel from "@/common/Myfiles/AddFolderModel";

const MyFilesPage = () => {
    const router = useRouter();
    const { id: paramId } = useParams();
    const dispatch = useAppDispatch();
    const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);
    const myFiles = useAppSelector(state => state.assignment.setMyFilesById);
    const isLoading = useAppSelector(state => state.assignment.loading);
    const createFolder = useAppSelector(state => state.assignment.setCreateFolder);
    const createFiles = useAppSelector(state => state?.assignment?.setCreateFiles);
    const deleteFolderResponse = useAppSelector(state => state.assignment.setDeleteFolders);

    console.log(":::::::::::::myFiles", myFiles);
    const [id, setId] = useState<string | null>(null);
    const [previousId, setPreviousId] = useState<string | null>(null);
    const [openFolder, setOpenFolder] = useState(false);
    const [isFile, setIsFile] = useState(false);
    const [isFolder, setIsFolder] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        if (paramId) {
            setId(String(paramId));
        }
    }, [paramId]);

    useEffect(() => {
        if (id) {
            localStorage.setItem('previousId', previousId ?? '');
            dispatch(getMyFilesByID(memberAuthToken, id));
        }
    }, [dispatch, memberAuthToken, id]);

    useEffect(() => {
        const savedId = localStorage.getItem('previousId');
        if (savedId) setPreviousId(savedId);
    }, []);

    useEffect(() => {
        if (createFolder || createFiles || deleteFolderResponse) {
            dispatch(getMyFilesByID(memberAuthToken, id ?? ''));
            dispatch(setCreateFolder(null));
            dispatch(setCreateFiles(null));
            dispatch(setDeleteFiles(null));
            dispatch(setDeleteFolder(null));


        }
    }, [createFolder, createFiles, deleteFolderResponse]);


    const handleCardClick = (id: any) => {
        if (id) {
            localStorage.setItem('previousId', id);
            setPreviousId(id);
            router.push(`/myFiles/SubFiles/${id}`);
        }
    };

    const handleDropdownToggle = () => setOpenDropdown(prev => !prev);

    const handleNewFolder = () => {
        setOpenDropdown(false);
        setIsFolder(true);
        setIsFile(false);
        setOpenFolder(true);
    };

    const handleNewFile = () => {
        setOpenDropdown(false);
        setIsFile(true);
        setIsFolder(false);
        setOpenFolder(true);
    };

    return (
        <TabNavigator>
            {isLoading && <Spinner />}
            <div className="p-4 md:p-8 bg-white h-[100rem] rounded-xl m-2">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div className="flex items-center space-x-4 p-4 md:p-6 border-grey border-b-[1px]">
                        <GoFileDirectoryFill size={50} color="grey" />
                        <div>
                            <h1 className="text-lg md:text-xl font-semibold text-[#565656]">{myFiles?.title || ""}</h1>
                            <p className="text-gray-600">
                                {data.find(file => file.id === Number(id))?.totalFiles} files
                            </p>
                        </div>
                        {/* <BsThreeDotsVertical
                            size={20}
                            color="grey"
                            className="cursor-pointer hover:text-gray-600"
                        /> */}
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-1/3 relative">
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-full p-3 pr-10 border border-gray-300 rounded-[10rem] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center pr-3">
                            <CiSearch className="text-gray-400" size={25} />
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {myFiles?.Files?.map((subFile: any) => (
                            <SubFilecard
                                key={subFile.id}
                                data={subFile.fileName}
                                id={subFile.id}
                                type="pdf"
                            />
                        ))}

                        {myFiles?.Children?.map((subFile: any) => (
                            <SubFilecard
                                key={subFile.id}
                                data={subFile.title}
                                id={subFile.id}
                                type="folder"
                                onClick={handleCardClick}
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
                                        onClick={handleNewFolder}
                                    >
                                        New Folder
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={handleNewFile}
                                    >
                                        New File
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
            {openFolder && <AddFolderModel
                isOpen={openFolder}
                onClose={() => {
                    setOpenFolder(false);
                }}
                isFolder={isFolder}
                isFile={isFile}
                folderId={id ?? ''}
            />}
        </TabNavigator>
    );
};

export default MyFilesPage;
