// import { useState } from 'react';
// import { uploadFile } from '../../lib/firebase';
// import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import { Layout } from 'antd';
// import Header from '../../components/Header';
// import QAHeader from '../../components/QAHeader';
// import PostCreator from '../../components/PostCreator';
// import FeedPage from '../../components/FeedPage';
// import type { Post, Comment } from '../../components/PostCard';

// import FAQPage from './FAQPage';
// import AskQuestionPage from './AskQuestionPage';
// import QuestionDetailPage from './QuestionDetailPage';
// import type { Question, Answer } from '../../types';
// import './StudentPost.css';

// const { Content } = Layout;

// function StudentPost() {
//   const [posts, setPosts] = useState<Post[]>([
//     {
//       id: 1,
//       author: 'จอมมาร',
//       content: 'หางาน Part-time ครับ อายุ 18-19',
//       likes: 10,
//       isLiked: false,
//       comments: [],
//       createdAt: Date.now() - 12 * 60 * 1000,
//     },
//     {
//       id: 2,
//       author: 'จอมมาร2',
//       content: 'หาคนขับรถได้ มีใบขับขี่',
//       likes: 5,
//       isLiked: true,
//       comments: [{ id: 1, author: 'สมชาย', text: 'สนใจครับ' }],
//       createdAt: Date.now() - 3 * 60 * 60 * 1000,
//     },
//   ]);

//   const [questions, setQuestions] = useState<Question[]>([
//     {
//       id: 1,
//       title: 'ประกาศงานวันนี้หมดอายุหรือไม่?',
//       author: 'จอนนี่',
//       likes: 5,
//       answerCount: 2,
//       answers: [
//         { id: 1, author: 'เจ้าหน้าที่', text: 'หมดอายุตอนเที่ยงคืนครับ', isStaff: true },
//         { id: 2, author: 'สมชาย', text: 'ใช่ครับ, หมดอายุแล้ว', isStaff: false },
//       ],
//       isFAQ: true,
//     },
//     { id: 2, title: 'พบปัญหางานใช้งานระบบควรทำอย่างไร?', author: 'สมศรี', likes: 12, answerCount: 4, answers: [], isFAQ: true },
//     { id: 3, title: 'ระบบปลอดภัยในการเก็บข้อมูลหรือไม่?', author: 'วิชัย', likes: 8, answerCount: 0, answers: [], isFAQ: true },
//   ]);
//   const [newQuestion, setNewQuestion] = useState<Question | null>(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleAddPost = async (content: string, file?: File, image?: File, location?: { lat: number; lng: number }) => {
//     const now = Date.now();
//     try {
//       const [fileRes, imgRes] = await Promise.all([
//         file ? uploadFile(file, 'files') : Promise.resolve(null),
//         image ? uploadFile(image, 'images') : Promise.resolve(null),
//       ]);
  
//       const newPost: Post = {
//         id: now,
//         author: 'จอมมาร',
//         content,
//         fileUrl: fileRes?.url,
//         fileName: fileRes?.originalName,
//         imageUrl: imgRes?.url,
//         imageName: imgRes?.originalName,
//         location,
//         likes: 0,
//         isLiked: false,
//         comments: [],
//         createdAt: now,
//       };
  
//       setPosts(prev => [newPost, ...prev]);
//       navigate('/');
//     } catch (err) {
//       console.error('Upload failed:', err);
//       // TODO: แจ้งเตือนผู้ใช้ด้วย notification ของ antd ก็ได้
//     }
//   };
  

//   const handleDeletePost = (id: number) => {
//     setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
//   };

//   const handleLikePost = (id: number) => {
//     setPosts(prevPosts =>
//       prevPosts.map(post =>
//         post.id === id
//           ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
//           : post
//       )
//     );
//   };

//   const handleAddComment = (id: number, text: string) => {
//     const newComment: Comment = {
//       id: Date.now(),
//       author: 'จอมมาร',
//       text,
//     };
//     setPosts(prevPosts =>
//       prevPosts.map(post =>
//         post.id === id ? { ...post, comments: [...post.comments, newComment] } : post
//       )
//     );
//   };

//   const handleAddQuestion = (values: any) => {
//     const createdAt = Date.now();
//     const newQ: Question = {
//       id: createdAt,
//       title: values.title,
//       author: values.name,
//       likes: 0,
//       answerCount: 1,
//       answers: [
//         { id: createdAt, author: values.name, text: `รายละเอียดที่ส่ง:\n- เบอร์โทร: ${values.phone}\n- อีเมล: ${values.email}\n- ติดต่อในนาม: ${values.contact_type}\n\n${values.details}`, isStaff: false },
//         { id: createdAt + 1, author: 'ระบบ', text: 'ได้รับคำร้องของคุณแล้ว', isStaff: true },
//       ],
//       isFAQ: false,
//     };
//     setQuestions(prev => [newQ, ...prev]);
//     setNewQuestion(newQ);
//     navigate(`/qa/question/${newQ.id}`);
//   };

//   const handleLikeQuestion = (id: number) => {
//     setQuestions(prev => prev.map(q => (q.id === id ? { ...q, likes: q.likes + 1 } : q)));
//     if (newQuestion?.id === id) {
//       setNewQuestion(prev => (prev ? { ...prev, likes: prev.likes + 1 } : null));
//     }
//   };

//   const handleAddAnswer = (questionId: number, answerText: string, author = 'ผู้ใช้งาน') => {
//     setQuestions(prev =>
//       prev.map(q => {
//         if (q.id === questionId) {
//           const newAnswer: Answer = { id: Date.now(), author, text: answerText, isStaff: false };
//           return { ...q, answers: [...q.answers, newAnswer], answerCount: q.answerCount + 1 };
//         }
//         return q;
//       })
//     );
//     if (newQuestion?.id === questionId) {
//       const newAnswer: Answer = { id: Date.now(), author, text: answerText, isStaff: false };
//       setNewQuestion(prev => prev ? { ...prev, answers: [...prev.answers, newAnswer], answerCount: prev.answerCount + 1 } : null);
//     }
//   };

//   const isQASection = location.pathname.startsWith('/qa');
//   const currentUser = 'จอมมาร';
//   const myQuestions = questions.filter(q => !q.isFAQ && q.author === currentUser);
//   const faqQuestions = questions.filter(q => q.isFAQ);

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       {isQASection ? <QAHeader newQuestionId={newQuestion?.id} /> : <Header />}
//       <Content style={{ padding: '24px' }}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <FeedPage
//                 posts={posts}
//                 onDelete={handleDeletePost}
//                 onLike={handleLikePost}
//                 onAddComment={handleAddComment}
//               />
//             }
//           />
//           <Route path="/create" element={<PostCreator onAddPost={handleAddPost} />} />

//           <Route
//             path="/qa"
//             element={<FAQPage questions={faqQuestions} onLike={handleLikeQuestion} />}
//           />
//           <Route path="/qa/ask" element={<AskQuestionPage onFormSubmit={handleAddQuestion} />} />
//           <Route
//             path="/qa/question/:id"
//             element={
//               <QuestionDetailPage
//                 questions={questions}
//                 onAddAnswer={handleAddAnswer}
//               />
//             }
//           />
//         </Routes>
//       </Content>
//     </Layout>
//   );
// }

// export default StudentPost;
