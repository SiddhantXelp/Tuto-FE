'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";

interface CardProps {
    data: any;
    id: any;
    type: string
}

const Card: React.FC<CardProps> = ({ data, id, type }) => {
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
        // if (type === "file") {
        //     router.push(`/myFiles/Files/${id}`);
        // }

    };

    return (
        <>


            <div
                className="bg-white p-1 sm:p-6 rounded-xl h-auto flex flex-col cursor-pointer relative border border-black"
                onClick={handleCardClick}
            >
                <div className="flex items-center space-x-3">
                    {type === 'pdf' ? (
                        <FaFilePdf size={34} />
                    ) : (
                        <GoFileDirectoryFill size={40} color="grey" />
                    )}

                    <div className="min-w-0">
                        <h2 className="text-sm sm:text-sm md:text-sm font-medium text-gray-700 break-words">
                            {data}
                        </h2>
                    </div>

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
            </div>





        </>

    );
};

export default Card;
