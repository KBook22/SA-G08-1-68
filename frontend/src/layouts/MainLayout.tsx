// // src/layout/MainLayout.tsx

// import { useState, useEffect } from 'react';
// import { uploadFile } from '../lib/firebase';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { Layout } from 'antd';
// import Header from '../components/QA/Header';
// import QAHeader from '../components/QA/QAHeader';
// import type { Post, Comment, Question, Answer, Report } from '../types';

// const { Content } = Layout;

// const MainLayout: React.FC = () => {
//   // --- นำ State และ Logic ทั้งหมดกลับมาไว้ที่นี่ ---
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [newQuestion, setNewQuestion] = useState<Question | null>(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const initialPosts = [
//         {
//           id: 1,
//           author: 'จอมมาร',
//           content: 'หางาน Part-time ครับ อายุ 18-19',
//           likes: 10,
//           isLiked: false,
//           comments: [],
//           createdAt: Date.now() - 12 * 60 * 1000,
//           privacy: 'public' as const,
//         },
//         {
//           id: 2,
//           author: 'จอมมาร2',
//           content: 'หาคนขับรถได้ มีใบขับขี่',
//           likes: 5,
//           isLiked: true,
//           comments: [
//             { id: 1, author: 'สมชาย', text: 'สนใจครับ', createdAt: Date.now() - 60 * 1000, replies: [] },
//           ],
//           createdAt: Date.now() - 3 * 60 * 60 * 1000,
//           privacy: 'private' as const,
//         },
//       ];
//     setPosts(initialPosts);
    
//     const allQuestions = JSON.parse(localStorage.getItem('allQuestions') || '[]');
//     setQuestions(allQuestions);
//   }, []);

//   const handleAddPost = async (
//     content: string,
//     privacy: Post['privacy'],
//     file?: File,
//     image?: File,
//     location?: { lat: number; lng: number }
//   ) => {
//     const now = Date.now();
//     try {
//       const [fileRes, imgRes] = await Promise.all([
//         file ? uploadFile(file, 'files') : Promise.resolve(null),
//         image ? uploadFile(image, 'images') : Promise.resolve(null),
//       ]);
//       const newPost: Post = { id: now, author: 'จอมมาร', content, fileUrl: fileRes?.url, fileName: fileRes?.originalName, imageUrl: imgRes?.url, imageName: imgRes?.originalName, location, likes: 0, isLiked: false, comments: [], createdAt: now, privacy: privacy };
//       setPosts(prev => [newPost, ...prev]);
//       navigate('/');
//     } catch (err) {
//       console.error('Upload failed:', err);
//     }
//   };

//   const handleDeletePost = (id: number) => {
//     setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
//   };

//   const handleLikePost = (id: number) => {
//     setPosts(prevPosts =>
//       prevPosts.map(post =>
//         post.id === id ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked } : post
//       )
//     );
//   };

//   const handleAddComment = async (
//     postId: number,
//     text: string,
//     image?: File,
//     parentId?: number
//   ) => {
//     const now = Date.now();
//     let imageUrl: string | undefined;
//     if (image) {
//       try {
//         const res = await uploadFile(image, 'comment-images');
//         imageUrl = res?.url;
//       } catch (e) { console.error('upload comment image failed', e); }
//     }
//     const newComment: Comment = { id: now, author: 'จอมมาร', text: text.trim(), createdAt: now, imageUrl, replies: [] };
//     const addReplyRecursively = (comments: Comment[]): Comment[] =>
//       comments.map((c) => {
//         if (c.id === parentId) { return { ...c, replies: [...(c.replies || []), newComment] }; }
//         if (c.replies?.length) { return { ...c, replies: addReplyRecursively(c.replies) }; }
//         return c;
//       });
//     setPosts((prev) =>
//       prev.map((p) => {
//         if (p.id !== postId) return p;
//         if (!parentId) { return { ...p, comments: [...p.comments, newComment] }; }
//         return { ...p, comments: addReplyRecursively(p.comments) };
//       })
//     );
//   };

//   const handleAddQuestion = (values: any) => {
//     const createdAt = Date.now();
//     const newQ: Question = {
//       id: createdAt,
//       title: values.title,
//       author: `${values.name} ${values.lastname}`,
//       likes: 0,
//       answerCount: 1, 
//       answers: [
//         { id: createdAt, author: `${values.name} ${values.lastname}`, text: `รายละเอียดที่ส่ง:\n- เบอร์โทร: ${values.phone}\n- อีเมล: ${values.email}\n- ติดต่อในนาม: ${values.contact_type}\n\n${values.details}`, isStaff: false, createdAt: createdAt },
//       ],
//       isFAQ: false,
//     };

//     const allQuestions = [newQ, ...questions];
//     localStorage.setItem('allQuestions', JSON.stringify(allQuestions));
//     setQuestions(allQuestions);

//     const userRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
//     localStorage.setItem('userRequests', JSON.stringify([newQ, ...userRequests]));
    
//     setNewQuestion(newQ);
//     navigate(`/qa/request-status/${newQ.id}`);
//   };

//   const handleLikeQuestion = (id: number) => {
//     const updatedQuestions = questions.map(q => q.id === id ? { ...q, likes: q.likes + 1 } : q);
//     localStorage.setItem('allQuestions', JSON.stringify(updatedQuestions));
//     setQuestions(updatedQuestions);
//     if (newQuestion?.id === id) {
//       setNewQuestion(prev => (prev ? { ...prev, likes: prev.likes + 1 } : null));
//     }
//   };

//   const handleAddAnswer = (
//     questionId: number,
//     answerText: string,
//     author = 'ผู้ใช้งาน',
//     parentId?: number,
//     replyTo?: Answer
//   ) => {
//     const updatedQuestions = questions.map(q => {
//         if (q.id === questionId) {
//             const newAnswer: Answer = { id: Date.now(), author, text: answerText, isStaff: author === 'แอดมิน', parentId, createdAt: Date.now(), replyTo };
//             return { ...q, answers: [...q.answers, newAnswer], answerCount: q.answerCount + 1 };
//         }
//         return q;
//     });
//     localStorage.setItem('allQuestions', JSON.stringify(updatedQuestions));

//     const updatedRequests = JSON.parse(localStorage.getItem('userRequests') || '[]').map((q: Question) => {
//         if (q.id === questionId) {
//             const newAnswer: Answer = { id: Date.now(), author, text: answerText, isStaff: author === 'แอดมิน', parentId, createdAt: Date.now(), replyTo };
//             return { ...q, answers: [...q.answers, newAnswer], answerCount: q.answerCount + 1 };
//         }
//         return q;
//     });
//     localStorage.setItem('userRequests', JSON.stringify(updatedRequests));

//     setQuestions(updatedQuestions);
//   };
  
//   const handleAddReport = (post: Post, reason: string, details: string) => {
//     const newReport: Report = {
//         id: Date.now(),
//         postId: post.id,
//         postAuthor: post.author,
//         postContent: post.content,
//         reason: reason,
//         details: details,
//         reportedBy: 'จอมมาร',
//         timestamp: Date.now(),
//     };
//     const existingReports = JSON.parse(localStorage.getItem('postReports') || '[]');
//     localStorage.setItem('postReports', JSON.stringify([newReport, ...existingReports]));
//   };

//   const handleEditAnswer = (questionId: number, answerId: number, newText: string) => {
//     // โค้ดส่วนนี้ไม่ได้ถูกใช้งานใน Helper Components ของ MainRoutes.tsx
//     // แต่เก็บไว้เผื่อมีการใช้งานในอนาคต
//   };

//   const handleDeleteAnswer = (questionId: number, answerId: number) => {
//     // โค้ดส่วนนี้ไม่ได้ถูกใช้งานใน Helper Components ของ MainRoutes.tsx
//     // แต่เก็บไว้เผื่อมีการใช้งานในอนาคต
//   };

//   const isQASection = location.pathname.startsWith('/qa');
//   const faqQuestions = questions.filter(q => q.isFAQ);

//   const outletContext = {
//     posts,
//     questions,
//     faqQuestions,
//     newQuestion,
//     handleDeletePost,
//     handleLikePost,
//     handleAddComment,
//     handleAddPost,
//     handleAddQuestion,
//     handleLikeQuestion,
//     handleAddAnswer,
//     handleAddReport,
//     handleEditAnswer,
//     handleDeleteAnswer,
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       {isQASection ? <QAHeader newQuestionId={newQuestion?.id} /> : <Header />}
//       <Content style={{ padding: '24px' }}>
//         <Outlet context={outletContext} />
//       </Content>
//     </Layout>
//   );
// };

// export default MainLayout;


// src/layout/MainLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../components/QA/Header';
import QAHeader from '../components/QA/QAHeader';

const { Content } = Layout;

//เเก้ไขโดยพรศิริ: ลบ State และ Logic ทั้งหมดออก
const MainLayout: React.FC = () => {
  const location = useLocation();
  // ตรวจสอบว่าเป็นส่วนของ Q&A หรือไม่ เพื่อเลือก Header ที่เหมาะสม
  const isQASection = location.pathname.startsWith('/qa') || location.pathname.startsWith('/help');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isQASection ? <QAHeader newQuestionId={undefined} /> : <Header />}
      <Content style={{ padding: '24px' }}>
        {/* Outlet จะ render component ลูกโดยตรง โดยไม่มีการส่ง context จาก Layout นี้ */}
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;