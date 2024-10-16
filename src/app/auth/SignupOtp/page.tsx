"use client";
import React, { useState } from "react";
import BackgroundComponent from "../../../common/BackgroundComponent";
import Link from "next/link";

const SignupOtp: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to next input if value is entered
            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    return (
        <BackgroundComponent className="flex items-center justify-center">
            <div className="w-xl">
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
                <h2 className="text-xl mb-6 text-center text-gray-800">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="otp" className="block text-gray-700 mb-2 text-sm/[14px]">
                        Enter OTP sent to your Email ID
                    </label>
                    <div className="flex border border-black rounded-xl overflow-hidden">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                className="w-20 h-12 text-center border-r border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                maxLength={1}
                            />
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300"
                    style={{ background: "#565656 0% 0% no-repeat padding-box" }}
                >
                    Next
                </button>

                <Link href="/auth/signup">
                    <p className="text-center mt-5 text-sm/[14px]">
                        Not having account? <b>sign up here</b>
                    </p>
                </Link>

            </div>
        </BackgroundComponent>
    );
};

export default SignupOtp;
