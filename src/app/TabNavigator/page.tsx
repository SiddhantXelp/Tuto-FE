"use client";

import React from "react";
import Header from '@/components/header';
import HeaderMobile from '@/components/header-mobile';
import MarginWidthWrapper from '@/components/margin-width-wrapper';
import SideNav from '@/components/side-nav';
import '../../styles/globals.css';
import PageWrapper from '@/components/page-wrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Middleware from "@/app/middleware"


interface TabNavigatorProps {
    children?: React.ReactNode;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ children }) => {
    return (
        <Middleware>
            <div className="flex">
                <SideNav />
                <main className="flex-1">
                    <MarginWidthWrapper>
                        <Header />
                        <HeaderMobile />
                        <PageWrapper>
                            {children}
                        </PageWrapper>
                    </MarginWidthWrapper>
                    <ToastContainer className="mt-20" />
                </main>
            </div>
        </Middleware>

    );
};

export default TabNavigator;
