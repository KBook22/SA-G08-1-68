// สำหรับนักศึกษา/ผู้ใช้ทั่วไป
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Board from "../pages/Board/Board";
import JobDetail from "../pages/Board/JobDetail";
import ApplyJob from "../pages/ApplyJob/ApplyJob"

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Board" element={<Board />} />
      <Route path="/post-detail" element={<JobDetail />} />
      <Route path="/post-detail/:id" element={<JobDetail />} />
      <Route path="/ApplyJob" element={<ApplyJob/>} />

    </Routes>
  );
};

export default MainRoutes;
