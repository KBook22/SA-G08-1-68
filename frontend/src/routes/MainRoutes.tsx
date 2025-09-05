// // src/routes/MainRoutes.tsx
// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import FullLayout from '../layouts/FullLayout';
// import MainLayout from '../layouts/MainLayout';

// // Pages imports
// import ProfilePage from '../pages/ProfilePage2/ProfilePage';
// import StudentFeedPage from '../pages/StudentFeed/StudentFeedPage';
// import Homepage from '../pages/Home/Home';
// import Board from "../pages/Board/Board";
// import JobDetail from "../pages/Board/JobDetail";
// import Chat from '../pages/Chat/Chat';
// import StudentListPage from "../pages/worklog/StudentListPage";
// import Reportpage from '../pages/Reportpage/report';
// import JobsPage from '../pages/myjob';
// import PaymentReportPage from '../pages/paymentreport';
// import Interview from '../pages/Interview/Interview';
// import ReviewPage from '../pages/review';
// import PaymentPage from '../pages/payment';
// import JobPost from "../pages/JobPost/JobPost";
// import InterviewScheduling from "../pages/InterviewScheduling/InterviewScheduling";
// import EmployerFeedPage from '../pages/Employer/EmployerFeedPage';
// import StudentPostForm from '../pages/StudentPost/StudentPostForm';
// import FAQPage from '../pages/StudentPost/FAQPage';
// import AskQuestionPage from '../pages/StudentPost/AskQuestionPage';
// import QuestionDetailPage from '../pages/StudentPost/QuestionDetailPage';
// import RequestThreadPage from '../pages/RequestThreadPage/RequestThreadPage';
// import RequestStatusPage from '../pages/RequestThreadPage/RequestStatusPage';
// import RequestSentPage from '../pages/StudentPost/RequestSentPage';
// import MyPost from '../pages/MyPost/Mypost';

// const MainRoutes: React.FC = () => {
//   return (
//     <Routes>
//       {/* FullLayout Routes */}
//       <Route path="/" element={<FullLayout />}>
//         {/* === หน้าหลักและการทำงานทั่วไป === */}
//         <Route index element={<Homepage />} />

//         {/* === ระบบงาน === */}
//         <Route path="Board" element={<Board />} />
//         <Route path="Board/:id" element={<JobDetail />} />
//         <Route path="myjob" element={<JobsPage />} />
//         <Route path="paymentreport" element={<PaymentReportPage />} />

//         {/* === ระบบการสื่อสาร === */}
//         <Route path="chat" element={<Chat />} />
//         <Route path="Interview" element={<Interview />} />
//         <Route path="interview-scheduling" element={<InterviewScheduling />} />

//         {/* === รายงานและการจัดการ === */}
//         <Route path="worklog" element={<StudentListPage />} />
//         <Route path="Reportpage" element={<Reportpage />} />

//         {/* === ระบบโปรไฟล์ === */}
//         <Route path="profile/:id" element={<ProfilePage />} />

//         {/* === ระบบรีวิว === */}
//         <Route path="review" element={<ReviewPage />} />
//         <Route path="payment" element={<PaymentPage />} />

//         {/* === สำหรับนายจ้าง === */}
//         <Route path="jobpost" element={<JobPost />} />
//         <Route path="employer-feed" element={<EmployerFeedPage />} />

//         {/* === Feed และโพสต์ === */}
//         <Route path="feed" element={<StudentFeedPage />} />
//         <Route path="my-post" element={<MyPost />} />

//         {/* === ✅ Help/FAQ ใช้ FullLayout เหมือนหน้าหลัก === */}
//         <Route path="help" element={<FAQPage />} />
//         <Route path="help/ask" element={<AskQuestionPage />} />
//         <Route path="help/question/:id" element={<QuestionDetailPage />} />
//       </Route>

//       {/* MainLayout Routes (สำหรับ Q&A System ที่ต้องการ layout พิเศษ) */}
//       <Route path="/qa" element={<MainLayout />}>
//         <Route index element={<FAQPage />} />
//         <Route path="ask" element={<AskQuestionPage />} />
//         <Route path="question/:id" element={<QuestionDetailPage />} />
//         <Route path="request-status/:id" element={<RequestStatusPage />} />
//         <Route path="thread/:id" element={<RequestThreadPage />} />
//         <Route path="sent" element={<RequestSentPage />} />
//       </Route>

//       {/* StudentPost Routes */}
//       <Route path="/StudentPost" element={<MainLayout />}>
//         <Route index element={<StudentPostForm />} />
//         <Route path="form" element={<StudentPostForm />} />
//       </Route>
//     </Routes>
//   );
// };

// export default MainRoutes;
//หลังแก้ไข ยูไอ
// src/routes/MainRoutes.tsx
// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import FullLayout from '../layouts/FullLayout';
// import MainLayout from '../layouts/MainLayout';

// // Pages imports
// import ProfilePage from '../pages/ProfilePage2/ProfilePage';
// import StudentFeedPage from '../pages/StudentFeed/StudentFeedPage';
// import CreateRequestPage from '../pages/HelpCenter/CreateRequestPage';

// import Homepage from '../pages/Home/Home';
// import Board from "../pages/Board/Board";
// import JobDetail from "../pages/Board/JobDetail";
// import Chat from '../pages/Chat/Chat';
// import StudentListPage from "../pages/worklog/StudentListPage";
// import Reportpage from '../pages/Reportpage/report';
// import JobsPage from '../pages/myjob';
// import PaymentReportPage from '../pages/paymentreport';
// import Interview from '../pages/Interview/Interview';
// import ReviewPage from '../pages/review';
// import PaymentPage from '../pages/payment';
// import JobPost from "../pages/JobPost/JobPost";
// import InterviewScheduling from "../pages/InterviewScheduling/InterviewScheduling";
// import EmployerFeedPage from '../pages/Employer/EmployerFeedPage';
// import StudentPostForm from '../pages/StudentPost/StudentPostForm';
// import FAQPage from '../pages/StudentPost/FAQPage';
// import AskQuestionPage from '../pages/StudentPost/AskQuestionPage';
// import QuestionDetailPage from '../pages/StudentPost/QuestionDetailPage';
// import RequestThreadPage from '../pages/RequestThreadPage/RequestThreadPage';
// import RequestStatusPage from '../pages/RequestThreadPage/RequestStatusPage';
// import RequestSentPage from '../pages/StudentPost/RequestSentPage';
// import MyPost from '../pages/MyPost/Mypost';

// // ✅ เพิ่ม HelpCenterPage ใหม่
// import HelpCenterPage from '../pages/HelpCenter/HelpCenterPage';

// const MainRoutes: React.FC = () => {
//   return (
//     <Routes>
//       {/* FullLayout Routes */}
//       <Route path="/" element={<FullLayout />}>
//         {/* === หน้าหลักและการทำงานทั่วไป === */}
//         <Route index element={<Homepage />} />

//         {/* === ระบบงาน === */}
//         <Route path="Board" element={<Board />} />
//         <Route path="Board/:id" element={<JobDetail />} />
//         <Route path="myjob" element={<JobsPage />} />
//         <Route path="paymentreport" element={<PaymentReportPage />} />

//         {/* === ระบบการสื่อสาร === */}
//         <Route path="chat" element={<Chat />} />
//         <Route path="Interview" element={<Interview />} />
//         <Route path="interview-scheduling" element={<InterviewScheduling />} />

//         {/* === รายงานและการจัดการ === */}
//         <Route path="worklog" element={<StudentListPage />} />
//         <Route path="Reportpage" element={<Reportpage />} />

//         {/* === ระบบโปรไฟล์ === */}
//         <Route path="profile/:id" element={<ProfilePage />} />

//         {/* === ระบบรีวิว === */}
//         <Route path="review" element={<ReviewPage />} />
//         <Route path="payment" element={<PaymentPage />} />

//         {/* === สำหรับนายจ้าง === */}
//         <Route path="jobpost" element={<JobPost />} />
//         <Route path="employer-feed" element={<EmployerFeedPage />} /> 

//         {/* === Feed และโพสต์ === */}
//         <Route path="feed" element={<StudentFeedPage />} />
//         <Route path="my-post" element={<MyPost />} />

//         {/* === ✅ ศูนย์ช่วยเหลือใหม่ (Help Center) === */}
//         <Route path="help" element={<HelpCenterPage />} />
//         <Route path="help/status/:id" element={<RequestStatusPage />} />
//         <Route path="/help/ask" element={<CreateRequestPage />} />
        
//         {/* === ✅ FAQ และ Q&A เดิม (สำหรับ backward compatibility) === */}
//         <Route path="faq" element={<FAQPage />} />
//         <Route path="faq/ask" element={<AskQuestionPage />} />
//         <Route path="faq/question/:id" element={<QuestionDetailPage />} />
//       </Route>

//       {/* MainLayout Routes (สำหรับ Q&A System ที่ต้องการ layout พิเศษ) */}
//       <Route path="/qa" element={<MainLayout />}>
//         <Route index element={<FAQPage />} />
//         <Route path="ask" element={<AskQuestionPage />} />
//         <Route path="question/:id" element={<QuestionDetailPage />} />
//         <Route path="request-status/:id" element={<RequestStatusPage />} />
//         <Route path="thread/:id" element={<RequestThreadPage />} />
//         <Route path="sent" element={<RequestSentPage />} />
//       </Route>

//       {/* StudentPost Routes */}
//       <Route path="/StudentPost" element={<MainLayout />}>
//         <Route index element={<StudentPostForm />} />
//         <Route path="form" element={<StudentPostForm />} />
//       </Route>
//     </Routes>
//   );
// };

// export default MainRoutes;

// src/routes/MainRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Import Layouts
import AdminLayout from '../layouts/AdminLayout';
import FullLayout from '../layouts/FullLayout';
import MainLayout from '../layouts/MainLayout';

// Import Pages - General
import Homepage from '../pages/Home/Home';
import ProfilePage from '../pages/ProfilePage2/ProfilePage';
import StudentFeedPage from '../pages/StudentFeed/StudentFeedPage';
import Board from "../pages/Board/Board";
import JobDetail from "../pages/Board/JobDetail";
import Chat from '../pages/Chat/Chat';
import StudentListPage from "../pages/worklog/StudentListPage";
import Reportpage from '../pages/Reportpage/report';
import JobsPage from '../pages/myjob';
import PaymentReportPage from '../pages/paymentreport';
import Interview from '../pages/Interview/Interview';
import ReviewPage from '../pages/review';
import PaymentPage from '../pages/payment';
import InterviewScheduling from "../pages/InterviewScheduling/InterviewScheduling";
//import EmployerFeedPage from '../pages/Employer/EmployerFeedPage';
import MyPost from '../pages/MyPost/Mypost';

// ✅ Import Pages - Q&A System (เฉพาะที่ใช้งานจริง)
import HelpCenterPage from '../pages/HelpCenter/HelpCenterPage';
import CreateRequestPage from '../pages/HelpCenter/CreateRequestPage';
import RequestStatusPage from '../pages/RequestThreadPage/RequestStatusPage';
import RequestThreadPage from '../pages/RequestThreadPage/RequestThreadPage';

// ✅ Import Pages - Student Posts (เฉพาะที่ใช้งานจริง)
import StudentPostForm from '../pages/StudentPost/StudentPostForm';

import WorklogPage from "../pages/worklog/worklog";


// Import Pages - Admin
import DashboardPage from '../pages/Admin2/DashboardPage';
import RequestsPage from '../pages/Admin2/RequestsPage';
import ReportsPage from '../pages/Admin2/ReportsPage';
import ManageFaqPage from '../pages/Admin2/ManageFaqPage';
import UserManagementPage from '../pages/Admin2/UserManagementPage';

// Import Pages - Employer
import JobPost from "../pages/JobPost/JobPost";

const MainRoutes: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  // ตรวจสอบบทบาทผู้ใช้
  const isAdmin = user?.role === 'admin';
  const isEmployer = user?.role === 'employer';
  const isStudent = user?.role === 'student' || user?.role === 'stu';

  return (
    <Routes>
      {/* ========== MAIN USER ROUTES (FullLayout) ========== */}
      <Route element={<FullLayout />}>
        {/* หน้าหลักและการทำงานทั่วไป */}
        <Route path="/" element={<Homepage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* ระบบการสื่อสาร */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/scheduling" element={<InterviewScheduling />} />
        
        {/* รายงานและการจัดการ */}
        <Route path="/report" element={<Reportpage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/payment-report" element={<PaymentReportPage />} />
        <Route path="/worklog" element={<StudentListPage />} />
        
        {/* ระบบรีวิว */}
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/payment" element={<PaymentPage />} />

         {/* === ระบบโปรไฟล์ === */}
         <Route path="profile/:id" element={<ProfilePage />} />
        
        {/* Feed และโพสต์ - ตามบทบาท */}
        {isStudent && (
          <>
            <Route path="/feed" element={<StudentFeedPage />} />
            <Route path="/my-posts" element={<MyPost />} />
            <Route path="/student-post" element={<StudentPostForm />} />
          </>
        )}
        
        {/* {isEmployer && (
          <>
            <Route path="/employer-feed" element={<EmployerFeedPage />} />
            <Route path="/post-job" element={<JobPost />} />
          </>
        )} */}
        
        {/* ✅ ระบบ Q&A - เฉพาะที่ใช้งานจริง */}
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/help/ask" element={<CreateRequestPage />} />
        <Route path="/help/request/:id" element={<RequestStatusPage />} />
      </Route>

      {/* ========== ADMIN ROUTES (AdminLayout) ========== */}
      {isAuthenticated && isAdmin && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="faq" element={<ManageFaqPage />} />
          <Route path="users" element={<UserManagementPage />} />
        </Route>
      )}

      {/* ========== SPECIAL Q&A ROUTES (MainLayout) ========== */}
      <Route element={<MainLayout />}>
        <Route path="/request-thread/:id" element={<RequestThreadPage />} />
      </Route>

      {/* ========== 404 FALLBACK ========== */}
      <Route 
        path="*" 
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
    </Routes>
  );
};

export default MainRoutes;
