// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import AdminLayout from '../layouts/AdminLayout';
// import DashboardPage from '../pages/Admin2/DashboardPage';
// import RequestsPage from '../pages/Admin2/RequestsPage';
// import ReportsPage from '../pages/Admin2/ReportsPage';
// import ManageFaqPage from '../pages/Admin2/ManageFaqPage';
// import UserManagementPage from '../pages/Admin2/UserManagementPage'; // Import new page

// const AdminRoutes: React.FC = () => {
//   const isAdmin = true; // Should be replaced with real auth logic

//   if (!isAdmin) {
//     return <Navigate to="/login" />;
//   }
  
//   return (
//     <Routes>
//       <Route element={<AdminLayout />}>
//         <Route path="/" element={<DashboardPage />} />
//         <Route path="/users" element={<UserManagementPage />} /> {/* Add new route */}
//         <Route path="/requests" element={<RequestsPage />} />
//         <Route path="/reports" element={<ReportsPage />} />
//         <Route path="/manage-faq" element={<ManageFaqPage />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;

