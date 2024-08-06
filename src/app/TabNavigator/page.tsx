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
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    className="mt-20"
                    style={{ marginTop: '50px', position: 'absolute', right: '0' }}
                />
            </main>
        </div>
    );
};

export default Dashboard;
