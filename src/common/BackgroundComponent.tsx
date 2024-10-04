"use client";

import React from 'react';
import Image from 'next/image';

type BackgroundComponentProps = {
    children: React.ReactNode;
    className?: string;
};

const BackgroundComponent: React.FC<BackgroundComponentProps> = ({ children }) => {
    return (
        <div className={`flex flex-col md:flex-row  min-h-screen`}>
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
                <Image
                    src={"/tuto.jpg"}
                    alt="Profile"
                    width={500}
                    height={100}
                />
            </div>

            <div
                className="w-full md:w-2/3 flex items-center justify-center"
                style={{ backgroundColor: "#F1FDFF" }}
            >
                {children}
            </div>
        </div>
    );
};

export default BackgroundComponent;
