// src/routes/index.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages and Routes
import MainRoutes from './MainRoutes';
import LoginPage from '../pages/LoginPage2/LoginPage'; 
import AdminRoutes from './EmAdminRoutes'; 

const AllRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  );
};

export default AllRoutes;