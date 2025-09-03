// // src/routes/ProtectedRoute.tsx
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // import useAuth ที่เราสร้างไว้

// const ProtectedRoute: React.FC = () => {
//   const { isAuthenticated } = useAuth(); // ดึงสถานะการ login จาก AuthContext

//   if (!isAuthenticated) {
//     // ถ้ายังไม่ได้ login ให้ redirect ไปที่หน้า /login
//     return <Navigate to="/login" replace />;
//   }

//   // ถ้า login แล้ว ให้แสดง Component ลูก (หน้าที่เราต้องการจะไป)
//   return <Outlet />;
// };

// export default ProtectedRoute;