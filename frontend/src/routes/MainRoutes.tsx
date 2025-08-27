// // // src/routes/MainRoutes.tsx

// // import React from 'react';
// // import { Route, Routes, useOutletContext } from 'react-router-dom';

// // import FullLayout from '../layouts/FullLayout';
// // import StudentPostManager from '../pages/StudentPost';
// // import FeedPage from '../components/QA/FeedPage';
// // import PostCreator from '../components/QA/PostCreator';
// // import ProfilePageV2 from '../pages/ProfilePage2/ProfilePage';
// // import FAQPage from '../pages/StudentPost/FAQPage';
// // import AskQuestionPage from '../pages/StudentPost/AskQuestionPage';
// // import QuestionDetailPage from '../pages/StudentPost/QuestionDetailPage';
// // import RequestThreadPage from '../pages/RequestThreadPage/RequestThreadPage';
// // import RequestStatusPage from '../pages/RequestThreadPage/RequestStatusPage';
// // import Homepage from '../pages/Home/Home';
// // import Board from "../pages/Board/Board";
// // import JobDetail from "../pages/Board/JobDetail";
// // import ApplyJob from "../pages/ApplyJob/ApplyJob";
// // import Interview from '../pages/Interview/Interview';
// // import Chat from '../pages/Chat/Chat';
// // import StudentListPage from "../pages/StudentListpage/StudentListPage";
// // import Reportpage from '../pages/Reportpage/report';
// // import JobsPage from '../pages/myjob';
// // import PaymentReportPage from '../pages/paymentreport';
// // import JobPost from "../pages/JobPost/JobPost";
// // import PaymentPage from '../pages/payment';
// // import ReviewPage from '../pages/review';
// // import ProfilePageV1 from '../pages/profile';


// // const FeedPageRoute = () => {
// //     const context: any = useOutletContext();
// //     return <FeedPage
// //               posts={context.posts}
// //               onDelete={context.handleDeletePost}
// //               onLike={context.handleLikePost}
// //               onAddComment={context.handleAddComment}
// //               onAddReport={context.onAddReport}
// //               onAddPost={context.handleAddPost}
// //               onEdit={context.handleEditPost}
// //               onLikeComment={context.handleLikeComment}
// //            />;
// // };

// // const ProfilePageV2Route = () => {
// //   const context: any = useOutletContext();
// //   if (!context) {
// //     return <div>Loading profile...</div>;
// //   }
// //   return <ProfilePageV2
// //       posts={context.posts}
// //       handleAddPost={context.handleAddPost}
// //       handleDeletePost={context.handleDeletePost}
// //       handleLikePost={context.handleLikePost}
// //       handleAddComment={context.handleAddComment}
// //       onAddReport={context.onAddReport}
// //       onEdit={context.handleEditPost}
// //       onLikeComment={context.handleLikeComment}
// //     />;
// // }

// // const FAQPageRoute = () => {
// //     const { faqQuestions, myRequests, handleLikeQuestion }: any = useOutletContext();
// //     return <FAQPage
// //         questions={faqQuestions}
// //         myRequests={myRequests}
// //         onLike={handleLikeQuestion}
// //     />;
// // };

// // const AskQuestionPageRoute = () => {
// //     const { handleAddQuestion }: any = useOutletContext();
// //     return <AskQuestionPage onFormSubmit={handleAddQuestion} />;
// // };

// // const QuestionDetailPageRoute = () => {
// //     const context: any = useOutletContext();
// //     return <QuestionDetailPage
// //               questions={context.questions}
// //               onAddAnswer={context.handleAddAnswer}
// //            />;
// // };

// // const RequestStatusPageRoute = () => {
// //     const { questions }: any = useOutletContext();
// //     return <RequestStatusPage questions={questions} />;
// // };


// // const MainRoutes: React.FC = () => {
// //     const context: any = useOutletContext();
// //     return (
// //       <Routes>
// //         <Route element={<FullLayout />}>
// //             {/* --- ส่วนของผู้ประกอบการ/ทั่วไป --- */}
// //             <Route path="/" element={<Homepage />} />
// //             <Route path="/home" element={<Homepage />} />
// //             <Route path="/Job/Board" element={<Board />} />
// //             <Route path="/Job/post-detail/:id" element={<JobDetail />} />
// //             <Route path="/Job/ApplyJob" element={<ApplyJob />} />
// //             <Route path="/Job/post-job" element={<JobPost />} />
// //             <Route path="/interview" element={<Interview />} />
// //             <Route path="/chat" element={<Chat />} />
// //             <Route path="/students" element={<StudentListPage />} />
// //             <Route path="/report" element={<Reportpage />} />
// //             <Route path="/my-jobs" element={<JobsPage />} />
// //             <Route path="/payment-report" element={<PaymentReportPage />} />
// //             <Route path="/payment" element={<PaymentPage />} />
// //             <Route path="/review" element={<ReviewPage />} />
// //             <Route path="/profile-v1" element={<ProfilePageV1 />} />
// //             <Route path="/review-page" element={<ReviewPage />} />

// //             {/* --- ส่วนของนักศึกษา (จะถูกจัดการ State โดย StudentPostManager) --- */}
// //             <Route element={<StudentPostManager />}>
// //               <Route path="/feed" element={<FeedPageRoute />} />
// //               <Route path="/create" element={<PostCreator onAddPost={context?.handleAddPost} />} />
// //               <Route path="/profile/:userId" element={<ProfilePageV2Route />} />
// //               <Route path="/profile" element={<ProfilePageV2Route />} />
// //               <Route path="/help" element={<FAQPageRoute />} />
// //               <Route path="/help/ask" element={<AskQuestionPageRoute />} />
// //               <Route path="/help/question/:id" element={<QuestionDetailPageRoute />} />
// //               <Route path="/help/request-status/:id" element={<RequestStatusPageRoute />} />
// //               <Route path="/help/request/:id" element={<RequestThreadPage />} />
// //             </Route>
// //         </Route>
// //       </Routes>
// //     );

// // };

// // export default MainRoutes;

// // src/routes/MainRoutes.tsx

// // src/routes/MainRoutes.tsx

// import React from 'react';
// import { Route, Routes, useOutletContext } from 'react-router-dom';

// import FullLayout from '../layouts/FullLayout';
// import StudentPostManager from '../pages/StudentPost';
// import FeedPage from '../components/QA/FeedPage';
// import ProfilePageV2 from '../pages/ProfilePage2/ProfilePage';
// import FAQPage from '../pages/StudentPost/FAQPage';
// import AskQuestionPage from '../pages/StudentPost/AskQuestionPage';
// import QuestionDetailPage from '../pages/StudentPost/QuestionDetailPage';
// import RequestThreadPage from '../pages/RequestThreadPage/RequestThreadPage';
// import RequestStatusPage from '../pages/RequestThreadPage/RequestStatusPage';
// import RequestSentPage from '../pages/StudentPost/RequestSentPage'; // <-- เพิ่ม: import หน้าใหม่
// import Homepage from '../pages/Home/Home';
// import Board from "../pages/Board/Board";
// import JobDetail from "../pages/Board/JobDetail";
// import ApplyJob from "../pages/ApplyJob/ApplyJob";
// import Interview from '../pages/Interview/Interview';
// import Chat from '../pages/Chat/Chat';
// import StudentListPage from "../pages/StudentListpage/StudentListPage";
// import Reportpage from '../pages/Reportpage/report';
// import JobsPage from '../pages/myjob';
// import PaymentReportPage from '../pages/paymentreport';
// import JobPost from "../pages/JobPost/JobPost";
// import PaymentPage from '../pages/payment';
// import ReviewPage from '../pages/review';
// import ProfilePageV1 from '../pages/profile';


// const FeedPageRoute = () => {
//     const context: any = useOutletContext();
//     return <FeedPage
//               posts={context.posts}
//               onDelete={context.handleDeletePost}
//               onLike={context.handleLikePost}
//               onAddComment={context.handleAddComment}
//               onAddReport={context.onAddReport}
//               onAddPost={context.handleAddPost}
//               onEdit={context.handleEditPost}
//               onLikeComment={context.handleLikeComment}
//            />;
// };

// const ProfilePageV2Route = () => {
//   const context: any = useOutletContext();
//   return <ProfilePageV2
//       posts={context.posts}
//       handleAddPost={context.handleAddPost}
//       handleDeletePost={context.handleDeletePost}
//       handleLikePost={context.handleLikePost}
//       handleAddComment={context.handleAddComment}
//       onAddReport={context.onAddReport}
//       onEdit={context.handleEditPost}
//       onLikeComment={context.handleLikeComment}
//     />;
// }

// const FAQPageRoute = () => {
//     const { faqQuestions, myRequests }: any = useOutletContext();
//     return <FAQPage
//         questions={faqQuestions}
//         myRequests={myRequests}
//     />;
// };

// const AskQuestionPageRoute = () => {
//     const { handleRequestSubmit }: any = useOutletContext();
//     return <AskQuestionPage onFormSubmit={handleRequestSubmit} />;
// };

// const QuestionDetailPageRoute = () => {
//     const context: any = useOutletContext();
//     return <QuestionDetailPage
//               questions={context.questions}
//               onAddAnswer={() => console.log("onAddAnswer not implemented yet")}
//            />;
// };

// const RequestStatusPageRoute = () => {
//     const { questions }: any = useOutletContext();
//     return <RequestStatusPage questions={questions} />;
// };


// const MainRoutes: React.FC = () => {
//     return (
//       <Routes>
//         <Route element={<FullLayout />}>
//             {/* --- General/Employer Routes --- */}
//             <Route path="/" element={<Homepage />} />
//             <Route path="/home" element={<Homepage />} />
//             <Route path="/Job/Board" element={<Board />} />
//             <Route path="/Job/post-detail/:id" element={<JobDetail />} />
//             <Route path="/Job/ApplyJob" element={<ApplyJob />} />
//             <Route path="/Job/post-job" element={<JobPost />} />
//             <Route path="/interview" element={<Interview />} />
//             <Route path="/chat" element={<Chat />} />
//             <Route path="/students" element={<StudentListPage />} />
//             <Route path="/report" element={<Reportpage />} />
//             <Route path="/my-jobs" element={<JobsPage />} />
//             <Route path="/payment-report" element={<PaymentReportPage />} />
//             <Route path="/payment" element={<PaymentPage />} />
//             <Route path="/review" element={<ReviewPage />} />
//             <Route path="/profile-v1" element={<ProfilePageV1 />} />
//             <Route path="/review-page" element={<ReviewPage />} />

//             {/* --- Student-focused Routes (State managed by StudentPostManager) --- */}
//             <Route element={<StudentPostManager />}>
//               <Route path="/feed" element={<FeedPageRoute />} />
//               <Route path="/profile/:userId" element={<ProfilePageV2Route />} />
//               <Route path="/profile" element={<ProfilePageV2Route />} />
//               {/* Help & Support Section */}
//               <Route path="/help" element={<FAQPageRoute />} />
//               <Route path="/help/ask" element={<AskQuestionPageRoute />} />
//               <Route path="/help/request-sent" element={<RequestSentPage />} /> {/* <-- เพิ่ม: Route ใหม่ */}
//               <Route path="/help/question/:id" element={<QuestionDetailPageRoute />} />
//               <Route path="/help/request-status/:id" element={<RequestStatusPageRoute />} />
//               <Route path="/help/request/:id" element={<RequestThreadPage />} />
//             </Route>
//         </Route>
//       </Routes>
//     );

// };

// export default MainRoutes;


// src/routes/MainRoutes.tsx

// src/routes/MainRoutes.tsx

// src/routes/MainRoutes.tsx

// src/routes/MainRoutes.tsx
import React from 'react';
import { Route, Routes, useOutletContext, Navigate } from 'react-router-dom';
import FullLayout from '../layouts/FullLayout';
import StudentPostManager from '../pages/StudentPost';
import FeedPage from '../components/QA/FeedPage';
import ProfilePageV2 from '../pages/ProfilePage2/ProfilePage';
import FAQPage from '../pages/StudentPost/FAQPage';
import AskQuestionPage from '../pages/StudentPost/AskQuestionPage';
import QuestionDetailPage from '../pages/StudentPost/QuestionDetailPage';
import RequestThreadPage from '../pages/RequestThreadPage/RequestThreadPage';
import RequestStatusPage from '../pages/RequestThreadPage/RequestStatusPage'; // Import directly
import RequestSentPage from '../pages/StudentPost/RequestSentPage';
import Homepage from '../pages/Home/Home';
import Board from "../pages/Board/Board";
import JobDetail from "../pages/Board/JobDetail";
import ApplyJob from "../pages/ApplyJob/ApplyJob";
import Interview from '../pages/Interview/Interview';
import Chat from '../pages/Chat/Chat';
import StudentListPage from "../pages/StudentListpage/StudentListPage";
import Reportpage from '../pages/Reportpage/report';
import JobsPage from '../pages/myjob';
import PaymentReportPage from '../pages/paymentreport';
import JobPost from "../pages/JobPost/JobPost";
import PaymentPage from '../pages/payment';
import ReviewPage from '../pages/review';
import ProfilePageV1 from '../pages/profile';
import StudentPostForm from '../pages/StudentPost/StudentPostForm';
import EmployerFeedPage from '../pages/Employer/EmployerFeedPage'; 

const FeedPageRoute = () => {
    const context: any = useOutletContext();
    // เพิ่มการตรวจสอบ context
    if (!context) return null;
    return <FeedPage
              posts={context.posts}
              onDelete={context.handleDeletePost}
              onLike={context.handleLikePost}
              onAddComment={context.handleAddComment}
              onAddReport={context.onAddReport}
              onAddPost={context.handleAddPost}
              onEdit={context.handleEditPost}
              onLikeComment={context.handleLikeComment}
           />;
};

const ProfilePageV2Route = () => {
  const context: any = useOutletContext();
  // เพิ่มการตรวจสอบ context
  if (!context) return <div>Loading profile...</div>;
  return <ProfilePageV2
      posts={context.posts}
      handleAddPost={context.handleAddPost}
      handleDeletePost={context.handleDeletePost}
      handleLikePost={context.handleLikePost}
      handleAddComment={context.handleAddComment}
      onAddReport={context.onAddReport}
      onEdit={context.handleEditPost}
      onLikeComment={context.handleLikeComment}
    />;
}

const FAQPageRoute = () => {
    const context: any = useOutletContext();
    if (!context) return null;
    return <FAQPage
        questions={context.faqs || []} // ปรับแก้ให้รองรับ faqs
        myRequests={context.myRequests || []}
    />;
};

const AskQuestionPageRoute = () => {
    const context: any = useOutletContext();
    if (!context) return null;
    return <AskQuestionPage onFormSubmit={context.handleRequestSubmit} />;
};

const QuestionDetailPageRoute = () => {
    const context: any = useOutletContext();
    if (!context) return null;
    return <QuestionDetailPage
              questions={context.questions}
              onAddAnswer={() => console.log("onAddAnswer not implemented yet")}
           />;
};

const MainRoutes: React.FC = () => {
    return (
      <Routes>
        <Route element={<FullLayout />}>
            {/* --- General/Employer Routes --- */}
            <Route path="/" element={<Homepage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/Job/Board" element={<Board />} />
            <Route path="/Job/post-detail/:id" element={<JobDetail />} />
            <Route path="/Job/ApplyJob" element={<ApplyJob />} />
            <Route path="/Job/post-job" element={<JobPost />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/students" element={<StudentListPage />} />
            <Route path="/report" element={<Reportpage />} />
            <Route path="/my-jobs" element={<JobsPage />} />
            <Route path="/payment-report" element={<PaymentReportPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/profile-v1" element={<ProfilePageV1 />} />
            <Route path="/review-page" element={<ReviewPage />} />
            
            <Route path="/employer" element={<Navigate to="/employer/feed" />} />
            <Route path="/employer/feed" element={<EmployerFeedPage />} />

            {/* --- Student-focused Routes (State managed by StudentPostManager) --- */}
            <Route element={<StudentPostManager />}>
              <Route path="/feed" element={<StudentPostForm />} />
              <Route path="/profile/:userId" element={<ProfilePageV2Route />} />
              <Route path="/profile" element={<ProfilePageV2Route />} />
              {/* Help & Support Section */}
              <Route path="/help" element={<FAQPageRoute />} />
              <Route path="/help/ask" element={<AskQuestionPageRoute />} />
              <Route path="/help/request-sent" element={<RequestSentPage />} />
              <Route path="/help/question/:id" element={<QuestionDetailPageRoute />} />
              {/* 👇 แก้ไขตรงนี้: เรียกใช้ Component โดยตรง 👇 */}
              <Route path="/help/request-status/:id" element={<RequestStatusPage />} />
              <Route path="/help/request/:id" element={<RequestThreadPage />} />
            </Route>
        </Route>
      </Routes>
    );

};

export default MainRoutes;