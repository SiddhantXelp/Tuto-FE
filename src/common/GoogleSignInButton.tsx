'use client';

import React, { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

const GoogleSignInButton: React.FC = () => {
    const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            const accessToken = response?.access_token;

            if (accessToken) {
                try {
                    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    const profileData = await profileResponse.json();
                    const userData = {
                        name: profileData.name,
                        email: profileData.email,
                    };

                    localStorage.setItem('userInfo', JSON.stringify(userData));
                    setUserInfo(userData);
                } catch (error) {
                    console.error('Failed to fetch user profile', error);
                }
            }
        },
        onError: (error) => {
            // console.error('Google login failed', error);
        },
    });

    const handleSignOut = () => {
        googleLogout();
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    };

    return (
        <div>
            {!userInfo ? (
                <button onClick={() => login()}>Sign in with Google 🚀</button>
            ) : (
                <div>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            )}
        </div>
    );
};

export default GoogleSignInButton;
