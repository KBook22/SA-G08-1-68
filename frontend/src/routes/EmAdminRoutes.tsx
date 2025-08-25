// สำหรับผู้ว่าจ้าง/แอดมิน
import React from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import FullLayout from '../layouts/FullLayout';
>>>>>>> 0c0cc26 (add fureture)
import JobPost from "../pages/JobPost/JobPost";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/Job/post-job" element={<JobPost />} />
    </Routes>
  );
};

export default AdminRoutes;
