"use client";

import React, { useState, useEffect } from 'react';
import BackgroundComponent from "../../../common/BackgroundComponent";
import Link from "next/link";
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Spinner from "../../../common/Spinner"
const Login: React.FC = () => {
    const router = useRouter();
    const [showLogin, setLogin] = useState(true);
    const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        let storedUserInfo;

        storedUserInfo = localStorage.getItem('userInfo');
        storedUserInfo = localStorage.getItem('user');

        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
            router.push('/');
        }
    }, [router]);

    const handleshowpassword = () => {
        setLogin(false);
    };

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
                        picture: profileData.picture
                    };

                    localStorage.setItem('userInfo', JSON.stringify(userData));
                    setUserInfo(userData);
                    router.push('/');
                } catch (error) {
                    console.error('Failed to fetch user profile', error);
                }
            }
        },
        onError: (error) => {
            console.error('Google login failed', error);
        },
    });

    return (

        <BackgroundComponent className="flex items-center justify-center">
            {/* <Spinner /> */}
            {
                showLogin ? (
                    <div className="w-full max-w-md">
                        <h2
                            className="mb-6 text-center font-semibold"
                            style={{
                                fontSize: "32px",
                                lineHeight: "43px",
                                color: "#B404C8",
                                opacity: 1,
                            }}
                        >
                            TutorNow
                        </h2>
                        <h2 className="text-xl mb-6 text-center text-gray-800">Login</h2>

                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 mb-2 text-sm/[14px]">
                                User name or Mobile number
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300"
                            style={{ background: "#565656 0% 0% no-repeat padding-box" }}
                            onClick={handleshowpassword}
                        >
                            Next
                        </button>

                        <p className='text-center mt-5 text-sm/[14px]'>or login with</p>

                        <div className='flex justify-between mt-5 mx-5'>
                            <button
                                className="border border-solid rounded-lg opacity-100 px-10 py-2 text-center"
                                style={{
                                    borderColor: '#101415',
                                    borderWidth: '0.6px',
                                    borderRadius: '8px',
                                    backgroundColor: 'transparent'
                                }}
                                onClick={() => login()}
                            >
                                Google
                            </button>
                            <button
                                className="border border-solid rounded-lg opacity-100 px-10 py-2 text-center"
                                style={{
                                    borderColor: '#101415',
                                    borderWidth: '0.6px',
                                    borderRadius: '8px',
                                    backgroundColor: 'transparent'
                                }}
                            >
                                Apple ID
                            </button>

                        </div>

                        <Link href="/auth/Signup">
                            <p className="text-center mt-5 text-sm/[14px]">
                                Not having account? <b>sign up here</b>
                            </p>
                        </Link>

                    </div>
                ) : (
                    <div className="w-full max-w-md">
                        <h2
                            className="mb-6 text-center font-semibold"
                            style={{
                                fontSize: "32px",
                                lineHeight: "43px",
                                color: "#B404C8",
                                opacity: 1,
                            }}
                        >
                            TutorNow
                        </h2>
                        <h2 className="text-xl mb-6 text-center text-gray-800">Welcome</h2>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2 text-sm/[14px]">
                                Enter your Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <p className='mt-2 text-sm/[14px]'>Forget password?</p>
                        <button
                            type="submit"
                            className="mt-5 w-full text-black py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 font-bold"
                            style={{
                                borderColor: '#101415',
                                borderWidth: '0.6px',
                                borderRadius: '8px',
                                backgroundColor: 'transparent'
                            }}
                        >
                            Login
                        </button>

                        <Link href="/auth/Signup">
                            <p className="text-center mt-5 text-sm/[14px]">
                                Not having account? <b>sign up here</b>
                            </p>
                        </Link>

                    </div>
                )
            }
        </BackgroundComponent>
    );
};

export default Login;
