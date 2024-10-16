"use client";

import React, { useEffect, useState, lazy, Suspense } from "react";
import { useRouter } from 'next/navigation';
import Spinner from "../common/Spinner"

const Dashboard = lazy(() => import('./TabNavigator/page'));
const MainDashboard = lazy(() => import('./MainDashboard'));

const Home: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user") || localStorage.getItem("userInfo");

    if (!token) {
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard>
        <MainDashboard />
      </Dashboard>
    </Suspense>
  );
};

export default Home;