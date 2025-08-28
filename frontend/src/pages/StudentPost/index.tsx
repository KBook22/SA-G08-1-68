// // src/pages/StudentPost/index.tsx

// import { useState, useEffect } from 'react';
// import { uploadFile } from '../../lib/firebase';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { message } from 'antd';
// import type { Post, Comment, Question, Answer, Report } from '../../types';

// const StudentPostManager: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initialPosts = [
//         {
//           id: 1,
//           author: 'จอมมาร',
//           authorId: 'johndoe',
//           content: 'หางาน Part-time ครับ อายุ 18-19',
//           skills: ['Customer Service', 'Barista'],
//           likes: 10,
//           isLiked: false,
//           comments: [
//             { id: 101, author: 'สมหญิง', authorId: 'jane', text: 'ร้านกาแฟเราสนใจนะคะ', createdAt: Date.now() - 10 * 60 * 1000, replies: [
//               { id: 103, author: 'จอมมาร', authorId: 'johndoe', text: 'ติดต่อกลับทางไหนได้บ้างครับ?', parentId: 101, createdAt: Date.now() - 5 * 60 * 1000, replies: [] }
//             ]}
//           ],
//           createdAt: Date.now() - 12 * 60 * 1000,
//           privacy: 'public' as const,
//         },
//         {
//           id: 2,
//           author: 'สมหญิง ยืนงง',
//           authorId: 'jane',
//           content: 'หาคนขับรถได้ มีใบขับขี่',
//           skills: ['Driving'],
//           likes: 5,
//           isLiked: true,
//           comments: [
//             { id: 102, author: 'สมชาย', authorId: 'somchai', text: 'สนใจครับ', createdAt: Date.now() - 60 * 1000, replies: [] },
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
//     skills: string[],
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
//       const newPost: Post = {
//         id: now,
//         author: 'จอมมาร',
//         authorId: 'johndoe',
//         content,
//         skills,
//         fileUrl: fileRes?.url,
//         fileName: fileRes?.originalName,
//         imageUrl: imgRes?.url,
//         imageName: imgRes?.originalName,
//         location,
//         likes: 0,
//         isLiked: false,
//         comments: [],
//         createdAt: now,
//         privacy: privacy
//       };
//       setPosts(prev => [newPost, ...prev]);
//     } catch (err) {
//       console.error('Upload failed:', err);
//     }
//   };

//     // ✅ เพิ่มฟังก์ชันสำหรับแก้ไขโพสต์
//     const handleEditPost = (postId: number, newContent: string, newSkills: string[]) => {
//         setPosts(prevPosts =>
//             prevPosts.map(post =>
//                 post.id === postId
//                     ? { ...post, content: newContent, skills: newSkills }
//                     : post
//             )
//         );
//     };


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

//     const newComment: Comment = {
//       id: now,
//       author: 'จอมมาร',
//       authorId: 'johndoe',
//       text: text.trim(),
//       createdAt: now,
//       imageUrl,
//       parentId,
//       replies: []
//     };

//     const addReplyRecursively = (comments: Comment[]): Comment[] => {
//       return comments.map(comment => {
//         if (comment.id === parentId) {
//           return { ...comment, replies: [...(comment.replies || []), newComment] };
//         }
//         if (comment.replies && comment.replies.length > 0) {
//           return { ...comment, replies: addReplyRecursively(comment.replies) };
//         }
//         return comment;
//       });
//     };

//     setPosts(prevPosts =>
//       prevPosts.map(post => {
//         if (post.id === postId) {
//           const updatedComments = parentId
//             ? addReplyRecursively(post.comments)
//             : [...post.comments, newComment];
//           return { ...post, comments: updatedComments };
//         }
//         return post;
//       })
//     );
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

//   const outletContext = {
//     posts,
//     questions,
//     faqQuestions: questions.filter(q => q.isFAQ),
//     myRequests: questions.filter(q => !q.isFAQ && q.author === 'จอมมาร'),
//     handleDeletePost,
//     handleLikePost,
//     handleAddComment,
//     handleAddPost,
//     handleAddReport,
//     handleEditPost, // ✅ ส่งฟังก์ชันใหม่ผ่าน context
//     // ... (context อื่นๆ เหมือนเดิม) ...
//   };

//   return <Outlet context={outletContext} />;
// };

// export default StudentPostManager;


// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx

// src/pages/StudentPost/index.tsx
import { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import type { Post, Comment, FAQ, Report } from '../../types';

const API_URL = 'http://localhost:8080/api';

const StudentPostManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      // ✨ แก้ไข Endpoint จาก /posts -> /student-profile-posts
      const [postsRes, faqsRes] = await Promise.all([
        fetch(`${API_URL}/student-profile-posts`),
        fetch(`${API_URL}/faqs`),
      ]);
      
      if (!postsRes.ok || !faqsRes.ok) {
          throw new Error('Network response was not ok');
      }

      const postsData = await postsRes.json();
      const faqsData = await faqsRes.json();
      
      setPosts(postsData || []);
      setFaqs(faqsData || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      message.error("ไม่สามารถเชื่อมต่อหรือดึงข้อมูลจากเซิร์ฟเวอร์ได้");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRequestSubmit = async (values: { subject: string; initialMessage: string; }) => {
    try {
        const response = await fetch(`${API_URL}/tickets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to submit request');
        }
        
        navigate(`/help/request-sent`);

    } catch (error) {
        console.error("Error submitting request:", error);
        message.error('เกิดข้อผิดพลาดในการส่งคำร้อง');
        throw error;
    }
  };

  const handleAddPost = async (content: string, privacy: Post['privacy'], skills: string[]) => { message.info("ฟังก์ชันยังไม่ได้เชื่อมต่อกับ API"); };
  const handleEditPost = async (postId: number, newContent: string, newSkills: string[]) => { message.info("ฟังก์ชันยังไม่ได้เชื่อมต่อกับ API"); };
  const handleAddComment = async (postId: number, text: string) => { message.info("ฟังก์ชันยังไม่ได้เชื่อมต่อกับ API"); };
  const handleLikePost = (id: number) => { message.info("ฟังก์ชันยังไม่ได้เชื่อมต่อกับ API"); };
  const handleLikeComment = (postId: number, commentId: number) => { message.info("ฟังก์ชันยังไม่ได้เชื่อมต่อกับ API"); };
  const handleDeletePost = (id: number) => { message.info("ฟังก์ชันยังไม่ได้เชื่อมต่อกับ API"); };
  const onAddReport = (post: Post, reason: string, details: string) => { message.success("ขอบคุณสำหรับรายงาน"); };

  const outletContext = {
    posts,
    faqs,
    myRequests: [],
    handleAddPost,
    handleEditPost,
    handleAddComment,
    handleDeletePost,
    handleLikePost,
    onAddReport,
    handleLikeComment,
    handleRequestSubmit,
  };

  return <Outlet context={outletContext} />;
};

export default StudentPostManager;