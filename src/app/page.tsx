"use client";

import React, { useState, useEffect } from "react";
import Login from "../app/auth/Login/page";
import Dashboard from "../app/Dashboard/page";
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
