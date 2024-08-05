"use client";
import React, { useState, useEffect } from 'react';
import BackgroundComponent from '../../../common/BackgroundComponent';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { getSignup, setSignup } from "../../store/actions/auth";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import Spinner from "../../../common/Spinner"

const Signup: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();


  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const memberAuthToken = " andbWBAEKHWDAJASMNDJSKHEOUIWELKMNWADjaskihdyuawoekjwa,mdnkjADHIUAJWKDS";
  const responsesignup = useAppSelector((state: { auth: any }) => state.auth.signupData);
  const isLoading = useAppSelector(state => state.auth.loading);

  console.log(">>>>>>>>>>>>>>>>>>>>.responsesignup", responsesignup);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user") || localStorage.getItem("userInfo");


    if (storedUserInfo) {
      router.push('/');
    }
  }, [router]);



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

  const handleSubmit = () => {

    if (confirmPassword !== password) {
      alert("Password Not Matched");
      return;
    }

    const data = {
      username: username,
      email: email,
      phoneNumber: 1234567890,
      password: password,
      roleId: "046294f6-0555-4f87-9562-da798b09ec23"
    }

    dispatch(getSignup(memberAuthToken, data));


  };


  useEffect(() => {
    if (responsesignup) {
      const userData = {
        responsesignup
      };

      localStorage.setItem('user', JSON.stringify(userData));

      router.push('/');
      dispatch(setSignup(null));

    }
  }, [responsesignup]);

  return (
    <BackgroundComponent className="flex items-center justify-center">
      {
        isLoading ? <Spinner/> : ""
      }
      <div className="w-full max-w-md">
        <h2
          className="mb-6 text-center font-semibold"
          style={{
            fontSize: '32px',
            lineHeight: '43px',
            color: '#B404C8',
            opacity: 1,
          }}
        >
          TutorNow
        </h2>
        <h2 className="text-xl mb-6 text-center text-gray-800">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 mb-2 text-sm/[14px]">
            Email ID or Mobile Number
          </label>
          <input
            type="text"
            id="contact"
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2 text-sm/[14px]">
            Create Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2 text-sm/[14px]">
            Create Your Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 text-sm/[14px]">
            Re-Enter Your Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="w-full text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300"
          style={{ background: "#565656 0% 0% no-repeat padding-box" }}
          onClick={handleSubmit}
        >
          Next
        </button>

        <p className='text-center mt-5 text-sm/[14px]'>or sign up with</p>

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
            Apple Id
          </button>
        </div>

        <Link href="/auth/Login">
          <p className='text-center mt-5 text-sm/[14px]'>Already having account?  <b> Login here</b></p>
        </Link>
      </div>
    </BackgroundComponent>
  );
};

export default Signup;
