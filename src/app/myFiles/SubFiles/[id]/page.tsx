'use client';

import React from 'react';
import TabNavigator from "../../../TabNavigator/page";
import SubFilecard from '../../../../common/Myfiles/SubFilecard';
import { data } from "../../data";
import { useParams } from 'next/navigation';
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoFileDirectoryFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

const MyFilesPage = () => {
    const { id } = useParams();
    const file = data.find(file => file.id === Number(id));
    return (
        <TabNavigator>
            <div className="p-4 md:p-8 bg-white h-[100rem] rounded-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div className="flex items-center space-x-4 p-4 md:p-6 border-grey border-b-[1px]">
                        <GoFileDirectoryFill size={50} color="grey" />
                        <div>
                            <h1 className="text-lg md:text-xl font-semibold text-[#565656]">{file?.fileName}</h1>
                            <p className="text-gray-600">
                                {file?.totalFiles} files
                            </p>
                        </div>
                        <BsThreeDotsVertical
                            size={20}
                            color="grey"
                            className="cursor-pointer hover:text-gray-600"
                        />
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
                        {file?.subFiles?.map(subFile => (
                            <SubFilecard
                                key={subFile.id}
                                data={subFile?.subFilename}
                                id={subFile?.id}
                                type="file"

                            />
                        ))}
                    </div>
                </div>
            </div>
        </TabNavigator>
    );
};

export default MyFilesPage;
