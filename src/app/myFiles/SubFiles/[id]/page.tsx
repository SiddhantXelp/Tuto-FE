// 'use client';

// import React, { useEffect } from 'react';
// import TabNavigator from "../../../TabNavigator/page";
// import SubFilecard from '../../../../common/Myfiles/SubFilecard';
// import { data } from "../../data";
// import { useParams } from 'next/navigation';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { GoFileDirectoryFill } from "react-icons/go";
// import { CiSearch } from "react-icons/ci";
// import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
// import { getMyFilesByID } from '@/app/store/actions/assignment';
// import Spinner from "@/common/Spinner";


// const MyFilesPage = () => {
//     const { id } = useParams();
//     const file = data.find(file => file.id === Number(id));
//     const dispatch = useAppDispatch();
//     const memberAuthToken = "njdkfhsdkjfhsdkjfsdhdfkjsdkhfsjkdfhsdkjf";
//     const myFiles = useAppSelector((state: { assignment: any }) => state.assignment.setMyFilesById);
//     const isLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);

//     useEffect(() => {
//         if (id) {
//             dispatch(getMyFilesByID(memberAuthToken, String(id)))
//         }
//     }, [dispatch, memberAuthToken, id]);



//     const handleCardClick = (id: any) => {
//         if (id) {
//             dispatch(getMyFilesByID(memberAuthToken, String(id)))
//         }
//     };

//     return (
//         <TabNavigator>

//             {
//                 isLoading && <Spinner />
//             }
//             <div className="p-4 md:p-8 bg-white h-[100rem] rounded-xl">
//                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
//                     <div className="flex items-center space-x-4 p-4 md:p-6 border-grey border-b-[1px]">
//                         <GoFileDirectoryFill size={50} color="grey" />
//                         <div>
//                             <h1 className="text-lg md:text-xl font-semibold text-[#565656]">{myFiles?.title}</h1>
//                             <p className="text-gray-600">
//                                 {file?.totalFiles} files
//                             </p>
//                         </div>
//                         <BsThreeDotsVertical
//                             size={20}
//                             color="grey"
//                             className="cursor-pointer hover:text-gray-600"
//                         />
//                     </div>

//                     <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-1/3 relative">
//                         <input
//                             type="search"
//                             placeholder="Search"
//                             className="w-full p-3 pr-10 border border-gray-300 rounded-[10rem] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <div className="absolute inset-y-0 right-2 flex items-center pr-3">
//                             <CiSearch className="text-gray-400" size={25} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-4 md:p-8">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//                         {myFiles && myFiles.Files.map((subFile: any) => (
//                             <SubFilecard
//                                 key={subFile.id}
//                                 data={subFile.fileName}
//                                 id={subFile.id}
//                                 type="pdf"
//                             />
//                         ))}

//                         {myFiles && myFiles.Children.map((subFile: any) => (
//                             <SubFilecard
//                                 key={subFile.id}
//                                 data={subFile.title}
//                                 id={subFile.id}
//                                 type="folder"
//                                 onClick={handleCardClick}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </TabNavigator>
//     );
// };

// export default MyFilesPage;



'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TabNavigator from "../../../TabNavigator/page";
import SubFilecard from '../../../../common/Myfiles/SubFilecard';
import { data } from "../../data";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoFileDirectoryFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getMyFilesByID } from '@/app/store/actions/assignment';
import Spinner from "@/common/Spinner";

const MyFilesPage = () => {
    const { id } = useParams();
    const [previousId, setPreviousId] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const memberAuthToken = "njdkfhsdkjfhsdkjfsdhdfkjsdkhfsjkdfhsdkjf";
    const myFiles = useAppSelector((state: { assignment: any }) => state.assignment.setMyFilesById);
    const isLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);

    useEffect(() => {
        if (id) {
            if (previousId) {
                localStorage.setItem('previousId', previousId);
            }
            dispatch(getMyFilesByID(memberAuthToken, String(id)));
        }
    }, [dispatch, memberAuthToken, id]);

    useEffect(() => {
        const savedId = localStorage.getItem('previousId');
        if (savedId) {
            setPreviousId(savedId);
        }
    }, []);

    const handleCardClick = (id: any) => {
        if (id) {
            localStorage.setItem('previousId', id);
            setPreviousId(id);
            router.push(`/myFiles/SubFiles/${id}`);
        }
    };

    return (
        <TabNavigator>
            {isLoading && <Spinner />}
            <div className="p-4 md:p-8 bg-white h-[100rem] rounded-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div className="flex items-center space-x-4 p-4 md:p-6 border-grey border-b-[1px]">
                        <GoFileDirectoryFill size={50} color="grey" />
                        <div>
                            <h1 className="text-lg md:text-xl font-semibold text-[#565656]">{myFiles?.title}</h1>
                            <p className="text-gray-600">
                                {data.find(file => file.id === Number(id))?.totalFiles} files
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
                        {myFiles && myFiles.Files.map((subFile: any) => (
                            <SubFilecard
                                key={subFile.id}
                                data={subFile.fileName}
                                id={subFile.id}
                                type="pdf"
                            />
                        ))}

                        {myFiles && myFiles.Children.map((subFile: any) => (
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
            </div>
        </TabNavigator>
    );
};

export default MyFilesPage;
