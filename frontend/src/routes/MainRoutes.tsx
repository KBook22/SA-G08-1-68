// สำหรับนักศึกษา/ผู้ใช้ทั่วไป
import React from "react";
import { Routes, Route } from "react-router-dom";

import Board from "../pages/Board/Board";
import Home from "../pages/Home/Home";
import JobDetail from "../pages/Board/JobDetail";
import ApplyJob from "../pages/ApplyJob/ApplyJob";
import SelectPage from "../pages/SelectPage/SelectPage";
import Interview from '../pages/Interview/Interview';
import Chat from '../pages/Chat/Chat';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SelectPage />} />
      
      <Route path="/Home" element={<Home />} />
      <Route path="/Board" element={<Board />} />
      <Route path="/post-detail" element={<JobDetail />} />
      <Route path="/post-detail/:id" element={<JobDetail />} />
      <Route path="/ApplyJob" element={<ApplyJob/>} />

      <Route path="/interview" element={<Interview />} />
      <Route path="/chat" element={<Chat />} />

    </Routes>
  );
};

export default MainRoutes;
