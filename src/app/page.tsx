"use client";

import Login from "../app/auth/Login/page";
import Dashboard from "./TabNavigator/page";
import MainDashboard from "./MainDashboard";
const Home: React.FC = () => {

  let token;
  token = localStorage.getItem("userInfo");
  token = localStorage.getItem("user");


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