"use client";

import React from "react";
import Header from '@/components/header';
import HeaderMobile from '@/components/header-mobile';
import MarginWidthWrapper from '@/components/margin-width-wrapper';
import SideNav from '@/components/side-nav';
import '../../styles/globals.css';
import PageWrapper from '@/components/page-wrapper';

interface DashboardProps {
    children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
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
            </main>
        </div>
    );
};

export default Dashboard;
