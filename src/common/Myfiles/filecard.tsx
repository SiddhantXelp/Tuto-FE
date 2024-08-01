'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoFileDirectoryFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

interface CardProps {
    data: any;
}

const Card: React.FC<CardProps> = ({ data }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const handleToggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleCopyLink = () => {
        alert(data.fileLink);
        setIsDropdownOpen(false);
    };
    const handleCardClick = () => {
        router.push(`/myFiles/SubFiles/${data.id}`);
    };


    return (
        <div
            className="bg-white p-6 rounded-xl shadow-md h-[12rem] flex flex-col cursor-pointer relative"
            onClick={handleCardClick}
        >
            <div className="flex items-center">
                <GoFileDirectoryFill size={40} color="grey" />
                <div className="relative ml-auto">
                    <BsThreeDotsVertical
                        size={24}
                        color="black"
                        onClick={handleToggleDropdown}
                        id="dropdownDividerButton"
                    />
                    {isDropdownOpen && (
                        <div
                            id="dropdownDivider"
                            className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-10"
                        >
                            <ul
                                className="py-2 text-sm text-gray-700"
                                aria-labelledby="dropdownDividerButton"
                            >
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log('Share clicked')}
                                    >
                                        Share
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={handleCopyLink}
                                    >
                                        Copy link
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log('Rename clicked')}
                                    >
                                        Rename
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log('Download clicked')}
                                    >
                                        Download
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => console.log('Delete clicked')}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-auto">
                <h2 className="text-lg font-normal text-[#565656]">{data.fileName}</h2>
                <p className="mt-2 text-sm text-[#565656]">{data.totalFiles} files</p>
            </div>
        </div>
    );
};

export default Card;
