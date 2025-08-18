// สำหรับผู้ว่าจ้าง/แอดมิน
import React from "react";
import { Routes, Route } from "react-router-dom";
import FullLayout from '../layout/FullLayout';
import JobPost from "../pages/JobPost/JobPost";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FullLayout />} >
      <Route path="Job/post-job" element={<JobPost />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
