"use client";

import React, { memo, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DialogComponent from "@/common/CommonModel";
import { useDispatch } from 'react-redux';
import { getRoles, getSignup, setAuthError, setLogin } from '../store/actions/auth';
import { useAppSelector } from '../store/hooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from '@/common/Spinner';

const ScheduleModel: React.FC = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const email = searchParams.get('email');
    const phoneNumber = searchParams.get('phoneNumber');
    const password = searchParams.get('password');
    const fullName = searchParams.get('fullName');
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const responseSignUp = useAppSelector((state: { auth: any }) => state.auth.signupData);
    const roles = useAppSelector(state => state?.auth?.roles?.data);
    const [roleName, setRoleName] = useState("");
    const isError = useAppSelector((state: { auth: any }) => state.auth.error);
    const isLoading = useAppSelector(state => state.auth.loading);

    console.log(">>>>>>.roles",roles)

    useEffect(() => {

        dispatch(getRoles());

    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(isError);
            dispatch(setAuthError(null));
        }

    }, [isError])


    const handleRoleClick = (roleId: string, roleName: string) => {
        const data = {
            username,
            email,
            phoneNumber,
            password,
            roleId
        };

        dispatch(getSignup("AUTH", data));

        setRoleName(roleName)

    };


    useEffect(() => {
        if (responseSignUp) {

            localStorage.setItem('user', JSON.stringify(responseSignUp));

            dispatch(setLogin(responseSignUp));

            const role = {
                roleName
            }
            const queryString = new URLSearchParams(role as any).toString();

            router.push(`/parentDashBord?${queryString}`);
        }
    }, [responseSignUp]);


    return (
        <>
            {
                isLoading ? <Spinner /> : ""
            }
            <div className='bg-gray-100'>
                <DialogComponent open={open} setOpen={setOpen}>
                    <div className='p-5'>
                        <h1 className='text-center text-[#767676] text-2xl mb-10'>Who are You?</h1>
                        {/* {roles && roles.map((data: any, index: number) => (
                            <div key={data?.id}>
                                <button
                                    className='bg-primaryColor p-3 w-full rounded-lg text-white mb-2'
                                    onClick={() => handleRoleClick(data?.id, data?.roleName)}
                                >
                                    {data?.roleName}
                                </button>
                                {index < roles.length - 1 && (
                                    <h1 className='text-center text-[#767676] my-2'>or</h1>
                                )}
                            </div>
                        ))} */}
                        {roles && roles.filter((data: any) => data?.roleName === "Tutor").map((data: any, index: number) => (
                            <div key={data?.id}>
                                <button
                                    className='bg-primaryColor p-3 w-full rounded-lg text-white mb-2'
                                    onClick={() => handleRoleClick(data?.id, data?.roleName)}
                                >
                                    {data?.roleName}
                                </button>
                          
                            </div>
                        ))}

                    </div>
                </DialogComponent>
            </div>
            <ToastContainer />
        </>
    );
};

export default memo(ScheduleModel);
