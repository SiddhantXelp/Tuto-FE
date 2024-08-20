'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from "../common/Spinner";

const Middleware = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("user") || localStorage.getItem("userInfo");

            if (!token) {
                router.push("/auth/Login");
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return <Spinner />;
    }
    return <>{children}</>;
};

export default Middleware;
