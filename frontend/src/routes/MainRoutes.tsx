import React from "react";
import { Routes, Route } from "react-router-dom";
//LOOOOOOKTAO
import Board from "../pages/Board/Board";
import JobDetail from "../pages/Board/JobDetail";
import ApplyJob from "../pages/ApplyJob/ApplyJob";
//bookieee
import SelectPage from "../pages/SelectPage/SelectPage";
import Interview from '../pages/Interview/Interview';
import Chat from '../pages/Chat/Chat';
//tung tung tung sahur
import StudentListPage from "../pages/worklog/StudentListPage";
import Reportpage from '../pages/Reportpage/report'
import Worklog from '../pages/worklog/worklog'
//Plabooooooo
import FullLayout from '../layout/FullLayout';
import JobsPage from '../pages/myjob';
import PaymentReportPage from '../pages/paymentreport';
import ProfilePage from '../pages/profile';
import ReviewPage from '../pages/review';
import PaymentPage from '../pages/payment';
import Homepage from '../pages/Home/Home';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/SelectPage" element={<SelectPage />} />
      
      <Route path="/" element={<FullLayout />} >
        {/* Component want navbar */}
        <Route index element={<Homepage />} />

        <Route path="Job/post-detail" element={<JobDetail />} />
        <Route path="Job/post-detail/:id" element={<JobDetail />} />
        <Route path="Job/ApplyJob" element={<ApplyJob/>} />

        <Route path="interview" element={<Interview />} />
        <Route path="chat" element={<Chat />} />

        <Route path="students" element={<StudentListPage/>} />
        <Route path="report" element={<Reportpage/>}/>
        <Route path="worklog" element={<Worklog/>}/>
        
        <Route path="Job/Board" element={<Board/>} />
        <Route path="my-jobs" element={<JobsPage />} />
        <Route path="payment-report" element={<PaymentReportPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="help" element={<div>404 not found page</div>} />
      </Route>
      {/* Component don't want navbar */}
    </Routes>
  );
};

export default MainRoutes;
