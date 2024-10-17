'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Spinner from '../common/Spinner';
import Cookies from 'js-cookie';

const Middleware = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        const storedUserInfo = Cookies.get('user');
        setIsLoading(false);

        if (!storedUserInfo) {
            console.log("Redirecting to /auth/login");
            setTimeout(() => {
                router.push('/auth/login');
            }, 100);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [pathname]);

    if (isLoading) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Middleware;
