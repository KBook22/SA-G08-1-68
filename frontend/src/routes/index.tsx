// src/routes/index.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import AdminRoutes from './AdminRoutes';
import LoginPage from '../pages/LoginPage2/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import RegisterPageEmployer from '../pages/RegisterPage/RegisterPageEmployer';
// --- vvvv 1. Import หน้าสมัครสมาชิก Admin เข้ามา vvvv ---
import RegisterPageAdmin from '../pages/RegisterPage/RegisterPageAdmin';

const AllRoutes: React.FC = () => {
  return (
    <Routes>
      {/* === ส่วนของการยืนยันตัวตน (Authentication) === */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register/employer" element={<RegisterPageEmployer />} />
      {/* --- vvvv 2. เพิ่ม Route สำหรับหน้าสมัครสมาชิกของ Admin vvvv --- */}
      <Route path="/register/admin" element={<RegisterPageAdmin />} />

      {/* === ส่วนของ Admin Panel === */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* === ส่วนของแอปพลิเคชันหลัก === */}
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  );
};

export default AllRoutes;