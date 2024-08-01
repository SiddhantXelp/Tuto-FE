"use client";

import Login from "../app/auth/Login/page";
import Dashboard from "./TabNavigator/page";
import MainDashboard from "./MainDashboard";
const Home: React.FC = () => {

  const token = localStorage.getItem("userInfo");

  return (
    <>
      {token ? (
        <Dashboard>
          <MainDashboard />
        </Dashboard>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
