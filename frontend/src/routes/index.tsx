// src/routes/index.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages and Routes
import MainRoutes from './MainRoutes';
import LoginPage from '../pages/LoginPage2/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage'; // 👈 เพิ่มบรรทัดนี้

// ✅ เปลี่ยนบรรทัดนี้
import AdminRoutes from './AdminRoutes';  // ← ใช้ AdminRoutes ตัวที่มี Dashboard/Requests/Reports/FAQ

const AllRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> {/* 👈 เพิ่มบรรทัดนี้ */}
      <Route path="/admin/*" element={<AdminRoutes />} />  {/* ← ตรงนี้จะไปหน้าแอดมินจริง */}
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  );
};

export default AllRoutes;