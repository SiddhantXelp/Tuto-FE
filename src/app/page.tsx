"use client";

import React, { useEffect, useState, lazy, Suspense } from "react";
import { useRouter } from 'next/navigation';
import Spineer from "../common/Spinner"

const Dashboard = lazy(() => import('./TabNavigator/page'));
const MainDashboard = lazy(() => import('./MainDashboard'));

const Home: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user") || localStorage.getItem("userInfo");

    if (!token) {
      router.push("/auth/Login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <Spineer />;
  }

  return (
    <Suspense fallback={<Spineer />}>
      <Dashboard>
        <MainDashboard />
      </Dashboard>
    </Suspense>
  );
};

export default Home;