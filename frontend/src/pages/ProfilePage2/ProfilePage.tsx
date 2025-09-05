// // src/pages/ProfilePage2/ProfilePage.tsx

// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import {
//   Avatar, Button, Card, Tabs, List, Rate, Typography, Progress, Divider, Flex, Modal, Form, Input, message, Space, Tag
// } from 'antd';
// import {
//   EditOutlined, UserOutlined, HomeOutlined, BookOutlined, StarOutlined, MessageOutlined, LinkOutlined, CodeOutlined, InfoCircleOutlined
// } from '@ant-design/icons';
// import PostCard from '../../components/QA/PostCard';
// import PostCreator from '../../components/QA/PostCreator';
// import type { Post } from '../../types';
// import './ProfilePage.css';
// import { mockProfileData } from '../profile/index';

// const { Text, Title } = Typography;
// // --- vvvv ไม่ต้อง import TabPane แล้ว vvvv ---
// // const { TabPane } = Tabs;
// // --- ^^^^ สิ้นสุดการแก้ไข ^^^^ ---

// const allUsers = {
//     'johndoe': {
//         name: 'จอมมาร',
//         friendCount: 123,
//         avatarUrl: '',
//         coverUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop',
//         bio: 'Frontend Developer ที่รักในการเรียนรู้เทคโนโลยีใหม่ๆ',
//         location: 'นครราชสีมา',
//         education: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
//         skills: ['React', 'TypeScript', 'Ant Design', 'Node.js', 'Figma'],
//         portfolio: [
//             { title: 'เว็บแอปพลิเคชันสำหรับจัดการสต็อก', url: 'https://github.com' },
//             { title: 'ออกแบบ UI/UX สำหรับแอปมือถือ', url: 'https://behance.net' },
//         ]
//     },
//     'jane': {
//         name: 'สมหญิง ยืนงง',
//         friendCount: 45,
//         avatarUrl: '',
//         coverUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1950&auto=format&fit=crop',
//         bio: 'รักการถ่ายภาพและเดินทาง',
//         location: 'กรุงเทพมหานคร',
//         education: 'มหาวิทยาลัยเกษตรศาสตร์',
//         skills: ['Photography', 'Lightroom', 'Content Writing'],
//         portfolio: []
//     }
// }

// interface ProfilePageProps {
//   posts: Post[];
//   onEdit: (id: number, newContent: string, newSkills: string[]) => void;
//   handleAddPost: (content: string, privacy: Post['privacy'], skills: string[], file?: File, image?: File, location?: { lat: number, lng: number }) => void;
//   handleDeletePost: (id: number) => void;
//   handleLikePost: (id: number) => void;
//   handleAddComment: (postId: number, text: string, image?: File, parentId?: number) => void;
//   onAddReport: (post: Post, reason: string, details: string) => void;
//   onLikeComment: (postId: number, commentId: number) => void;
// }

// const ProfilePage: React.FC<ProfilePageProps> = ({
//   posts,
//   handleAddPost,
//   handleDeletePost,
//   handleLikePost,
//   handleAddComment,
//   onAddReport,
//   onEdit,
//   onLikeComment
// }) => {
//   const { userId } = useParams<{ userId: string }>();
//   const [form] = Form.useForm();
//   const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);

//   const loggedInUserId = 'johndoe';
//   const profileUserId = userId || loggedInUserId;
//   const isMyProfile = profileUserId === loggedInUserId;

//   const [profileData, setProfileData] = React.useState(allUsers[profileUserId as keyof typeof allUsers]);

//   React.useEffect(() => {
//     setProfileData(allUsers[profileUserId as keyof typeof allUsers]);
//   }, [profileUserId]);

//   const userPosts = posts.filter(p => p.authorId === profileUserId);

//   const showEditModal = () => {
//     form.setFieldsValue({
//         bio: profileData.bio,
//         location: profileData.location,
//         education: profileData.education,
//         skills: profileData.skills.join(', '),
//         portfolio_title: profileData.portfolio[0]?.title,
//         portfolio_url: profileData.portfolio[0]?.url,
//     });
//     setIsEditModalVisible(true);
//   };

//   const handleSave = (values: any) => {
//     const newSkills = values.skills ? values.skills.split(',').map((s: string) => s.trim()) : [];
//     const newPortfolio = values.portfolio_title && values.portfolio_url
//         ? [{ title: values.portfolio_title, url: values.portfolio_url }]
//         : [];

//     setProfileData(prev => ({
//         ...prev,
//         bio: values.bio,
//         location: values.location,
//         education: values.education,
//         skills: newSkills,
//         portfolio: newPortfolio,
//     }));
//     message.success('บันทึกข้อมูลโปรไฟล์สำเร็จ!');
//     setIsEditModalVisible(false);
//   };

//   const handleCancel = () => setIsEditModalVisible(false);

//   const AboutTab = () => (
//     <Card variant="borderless">
//         <p><HomeOutlined /> อาศัยอยู่ที่ <strong>{profileData.location}</strong></p>
//         <p><BookOutlined /> กำลังศึกษาที่ <strong>{profileData.education}</strong></p>
//         <Divider />
//         <Title level={5}>ทักษะ</Title>
//         <div className="skills-container">
//             {profileData.skills.map(skill => <Tag color="blue" key={skill}>{skill}</Tag>)}
//         </div>
//     </Card>
//   );

//   const ReviewsTab = () => (
//     <List
//       itemLayout="horizontal"
//       dataSource={mockProfileData.reviews.sort((a, b) => b.id - a.id)}
//       renderItem={(item) => (
//         <List.Item>
//           <List.Item.Meta
//             avatar={<Avatar shape="square" icon={<UserOutlined />} />}
//             title={
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div>
//                   <Text style={{ fontSize: "14px" }}>{item.reviewer}</Text>
//                   <Text type="secondary" style={{ fontSize: "12px", marginLeft: '8px' }}>{item.date}</Text>
//                 </div>
//                 <Rate disabled allowHalf defaultValue={item.rating} />
//               </div>
//             }
//             description={ item.comment ? <Text>{item.comment}</Text> : null }
//           />
//         </List.Item>
//       )}
//     />
//   );

//   const PortfolioTab = () => (
//       profileData.portfolio.length > 0 ? (
//         <List
//             dataSource={profileData.portfolio}
//             renderItem={item => (
//                 <List.Item>
//                     <List.Item.Meta
//                         avatar={<LinkOutlined />}
//                         title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
//                         description={item.url}
//                     />
//                 </List.Item>
//             )}
//         />
//       ) : <Text type="secondary">ยังไม่มีผลงานที่แสดง</Text>
//   );
  
//   // --- vvvv สร้าง items array สำหรับ Tabs vvvv ---
//   const tabItems = [
//     {
//       key: '1',
//       label: <span><InfoCircleOutlined /> เกี่ยวกับ</span>,
//       children: <AboutTab />,
//     },
//     {
//       key: '2',
//       label: 'โพสต์',
//       children: (
//         <>
//           {isMyProfile && <PostCreator onAddPost={handleAddPost} />}
//           <Space direction="vertical" size="large" style={{ display: 'flex', marginTop: '24px' }}>
//               {userPosts.length > 0 ? (
//                   userPosts.map((post) => (
//                       <PostCard key={post.id} post={post} onDelete={handleDeletePost} onLike={handleLikePost} onAddComment={handleAddComment} onAddReport={onAddReport} onEdit={onEdit} onLikeComment={onLikeComment} />
//                   ))
//               ) : (
//                   <Card><p>ยังไม่มีโพสต์...</p></Card>
//               )}
//           </Space>
//         </>
//       ),
//     },
//     {
//       key: '3',
//       label: <span><CodeOutlined /> ผลงาน</span>,
//       children: <PortfolioTab />,
//     },
//     {
//       key: '4',
//       label: <span><StarOutlined /> รีวิว</span>,
//       children: <ReviewsTab />,
//     },
//   ];
//   // --- ^^^^ สิ้นสุดการสร้าง items array ^^^^ ---

//   if (!profileData) {
//       return <Card>กำลังโหลดข้อมูลโปรไฟล์...</Card>
//   }

//   return (
//     <>
//       <div className="profile-page">
//         <div className="profile-header">
//           <div
//             className="cover-photo"
//             style={{ backgroundImage: `url(${profileData.coverUrl})` }}
//           ></div>
//           <div className="profile-info-bar">
//             <div className="profile-avatar-container">
//                 <Avatar
//                     shape="square"
//                     size={168}
//                     icon={<UserOutlined />}
//                     src={profileData.avatarUrl}
//                     className="profile-avatar"
//                 />
//             </div>
//             <div className="profile-name-bio">
//               <h2>{profileData.name}</h2>
//               <p>{profileData.friendCount} เพื่อน</p>
//               <Text type="secondary">{profileData.bio}</Text>
              
//               <div className="profile-rating-bar">
//                   <Progress percent={(mockProfileData.rating / 5) * 100} showInfo={false} strokeColor="#0088FF" size="small" />
//                   <Flex justify="space-between">
//                       <Text strong>ระดับคะแนน: {mockProfileData.rating.toFixed(1)}/5.0</Text>
//                       <Text type="secondary">จาก {mockProfileData.reviews.length} รีวิว</Text>
//                   </Flex>
//               </div>

//             </div>
//             <div className="profile-actions">
//               <Space>
//                 {isMyProfile ? (
//                   <Button type="primary" icon={<EditOutlined />} onClick={showEditModal}>แก้ไขโปรไฟล์</Button>
//                 ) : (
//                   <Link to="/chat">
//                     <Button type="primary" icon={<MessageOutlined />}>แชท</Button>
//                   </Link>
//                 )}
//               </Space>
//             </div>
//           </div>
//         </div>

//         <div className="profile-content-single-column">
//             <Card>
//                 {/* --- vvvv แก้ไข Tabs ให้ใช้ items prop vvvv --- */}
//                 <Tabs defaultActiveKey="1" items={tabItems} />
//                 {/* --- ^^^^ สิ้นสุดการแก้ไข ^^^^ --- */}
//             </Card>
//         </div>
//       </div>

//       <Modal
//         title="แก้ไขโปรไฟล์"
//         open={isEditModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>ยกเลิก</Button>,
//           <Button key="submit" type="primary" onClick={() => form.submit()}>บันทึก</Button>,
//         ]}
//       >
//         <Form form={form} layout="vertical" onFinish={handleSave}>
//           <Form.Item name="bio" label="คำอธิบายตัวตน">
//             <Input.TextArea rows={3} placeholder="บอกเล่าเกี่ยวกับตัวคุณ..." />
//           </Form.Item>
//           <Form.Item name="location" label="อาศัยอยู่ที่">
//             <Input placeholder="เช่น นครราชสีมา" />
//           </Form.Item>
//           <Form.Item name="education" label="กำลังศึกษาที่">
//             <Input placeholder="เช่น มหาวิทยาลัยเทคโนโลยีสุรนารี" />
//           </Form.Item>
//           <Divider />
//           <Form.Item name="skills" label="ทักษะ" extra="ใส่ทักษะโดยคั่นด้วยเครื่องหมายจุลภาค (comma), เช่น React, Figma">
//             <Input placeholder="React, Figma, Content Writing" />
//           </Form.Item>
//           <Title level={5}>ผลงาน (แสดง 1 ชิ้น)</Title>
//           <Form.Item name="portfolio_title" label="ชื่อผลงาน">
//             <Input placeholder="เช่น เว็บไซต์ E-commerce" />
//           </Form.Item>
//           <Form.Item name="portfolio_url" label="ลิงก์ผลงาน (URL)">
//             <Input placeholder="https://github.com/your-repo" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default ProfilePage;


// src/pages/ProfilePage2/ProfilePage.tsx

// // src/pages/ProfilePage2/ProfilePage.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Avatar, Button, Card, Rate, Typography, Divider, Modal, Form, Input, message, Space, Tag, Row, Col, Spin, Alert
// } from 'antd';
// import {
//   EditOutlined, UserOutlined, BookOutlined, MailOutlined, PhoneOutlined, PlusOutlined
// } from '@ant-design/icons';
// import './ProfilePage.css';
// import { getMyProfile } from '../../services/profileService';
// import type { ProfileResponse, StudentProfilePost } from '../../types';
// import StudentPostForm from '../StudentPost/StudentPostForm';

// const { Title, Text } = Typography;

// const ProfilePage: React.FC = () => {
//   const [form] = Form.useForm();
  
//   const [profile, setProfile] = useState<ProfileResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [isPostModalVisible, setIsPostModalVisible] = useState(false);

//   const loadProfile = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await getMyProfile();
//       setProfile(data);
//     } catch (err) {
//       setError('ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);
  
//   useEffect(() => {
//     loadProfile();
//   }, [loadProfile]);

//   const showEditModal = () => {
//     if (profile) {
//       form.setFieldsValue({
//           skills: profile.student.skills,
//       });
//       setIsEditModalVisible(true);
//     }
//   };
//   const handleSaveEdit = (values: any) => {
//     message.success('บันทึกข้อมูลโปรไฟล์สำเร็จ! (ยังไม่เชื่อม API)');
//     setIsEditModalVisible(false);
//   };
//   const handleCancelEdit = () => setIsEditModalVisible(false);

//   const showPostModal = () => setIsPostModalVisible(true);
//   const handleCancelPostModal = () => setIsPostModalVisible(false);
//   const handlePostSuccess = () => {
//     setIsPostModalVisible(false);
//     message.success('สร้างโพสต์ใหม่สำเร็จ!');
//     loadProfile();
//   };

//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
//   }

//   if (error) {
//     return <Alert message="เกิดข้อผิดพลาด" description={error} type="error" showIcon />;
//   }

//   if (!profile) {
//     return <Alert message="ไม่พบข้อมูล" description="ไม่พบข้อมูลโปรไฟล์สำหรับผู้ใช้นี้" type="warning" showIcon />;
//   }
  
//   const { student, posts } = profile;

//   return (
//     <>
//       <div className="profile-page-v2">
//         <Row gutter={[24, 24]}>
//             <Col xs={24} md={8}>
//               <Card className="profile-sidebar-card">
//                   <div style={{ textAlign: 'center', marginBottom: 24 }}>
//                       <Avatar size={128} icon={<UserOutlined />} />
//                       <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
//                         {student.first_name} {student.last_name}
//                       </Title>
//                       <Rate disabled defaultValue={4.5} style={{ fontSize: 16 }}/>
//                   </div>
//                   <Divider />
//                   <Space direction="vertical" style={{ width: '100%' }}>
//                       <Text><MailOutlined /> {student.email}</Text>
//                       <Text><PhoneOutlined /> {student.phone}</Text>
//                       <Text><BookOutlined /> {student.faculty} (ปี {student.year})</Text>
//                   </Space>
//                   <Divider />
//                   <Title level={5}>ทักษะ</Title>
//                   <div className="skills-container">
//                       {(student.skills?.split(',') || []).map(skill => <Tag key={skill}>{skill.trim()}</Tag>)}
//                   </div>
//                   <Button type="primary" icon={<EditOutlined />} block style={{marginTop: 24}} onClick={showEditModal}>
//                       แก้ไขโปรไฟล์
//                   </Button>
//               </Card>
//             </Col>
//             <Col xs={24} md={16}>
//               <Space direction="vertical" size="large" style={{ display: 'flex' }}>
//                   <div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                           <Title level={4} style={{ margin: 0 }}>โพสต์ของฉัน ({posts.length})</Title>
//                           <Button type="primary" icon={<PlusOutlined />} onClick={showPostModal}>
//                               สร้างโพสต์ใหม่
//                           </Button>
//                       </div>
//                       {posts.length > 0 ? (
//                         posts.map((post: StudentProfilePost) => (
//                           <Card key={post.ID} style={{ marginBottom: 16 }}>
//                             <p><strong>ประเภทงาน:</strong> <Tag color="blue">{post.job_type}</Tag></p>
//                             <p><strong>แนะนำตัว:</strong> {post.introduction}</p>
//                             <p><strong>ทักษะ:</strong> {post.skills}</p>
//                           </Card>
//                         ))
//                       ) : (
//                         <Card><Text type="secondary">คุณยังไม่มีโพสต์...</Text></Card>
//                       )}
//                   </div>
                  
//                   <Divider />
//                   <div>
//                       <Title level={4}>รีวิวจากผู้ว่าจ้าง</Title>
//                       <Card><Text type="secondary">ยังไม่มีรีวิว...</Text></Card>
//                   </div>

//               </Space>
//             </Col>
//         </Row>
//       </div>

//       <Modal
//         title="แก้ไขโปรไฟล์"
//         open={isEditModalVisible}
//         onCancel={handleCancelEdit}
//         footer={[
//           <Button key="back" onClick={handleCancelEdit}>ยกเลิก</Button>,
//           <Button key="submit" type="primary" onClick={() => form.submit()}>บันทึก</Button>,
//         ]}
//       >
//         <Form form={form} layout="vertical" onFinish={handleSaveEdit}>
//           <Form.Item name="skills" label="ทักษะ" extra="คั่นด้วยเครื่องหมายจุลภาค (,)">
//             <Input.TextArea rows={3} />
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title="สร้างโพสต์หางานใหม่"
//         open={isPostModalVisible}
//         onCancel={handleCancelPostModal}
//         footer={null}
//         width={800}
//         destroyOnClose
//       >
//         <StudentPostForm onSuccess={handlePostSuccess} />
//       </Modal>
//     </>
//   );
// };

// export default ProfilePage;


// src/pages/ProfilePage2/ProfilePage.tsx

// // src/pages/ProfilePage2/ProfilePage.tsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { api } from "../../services/https";
// import type { Student } from "../../interfaces/student";
// import type { Review } from "../../interfaces/review";
// import type { StudentProfilePost } from "../../interfaces/studentProfilePost";
// import defaultAvatar from "../../assets/react.svg";
// import "./ProfilePage.css";
// import { Spin, Alert, Descriptions, Card, List, Typography } from "antd";

// const { Title, Text } = Typography;

// const ProfilePage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();

//   const [student, setStudent] = useState<Student | null>(null);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [posts, setPosts] = useState<StudentProfilePost[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) {
//       setError("No profile ID provided.");
//       setLoading(false);
//       return;
//     }

//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // ✅ โหลดข้อมูลนักศึกษา
//         const studentData = await api.getStudentProfile(parseInt(id, 10));

//         if (studentData && studentData.ID) {
//           setStudent(studentData);

//           // ✅ โหลดโพสต์ของ student คนนี้
//           const postsRes = await api.get(`/api/student-profile-posts`);
//           if (Array.isArray(postsRes?.data)) {
//             setPosts(postsRes.data.filter((p: any) => p.student_id === studentData.ID));
//           }

//           // ✅ โหลดรีวิวของ student คนนี้
//           const reviewsRes = await api.get(`/api/reviews`);
//           if (Array.isArray(reviewsRes?.data)) {
//             setReviews(reviewsRes.data.filter((r: any) => r.student_id === studentData.ID));
//           }
//         } else {
//           throw new Error("Profile not found or invalid data returned.");
//         }
//       } catch (err: any) {
//         console.error("Failed to fetch profile:", err);
//         setError(err.message || "An unknown error occurred while fetching the profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [id]);

//   // Loading
//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//         <Spin size="large" tip="Loading Profile..." />
//       </div>
//     );
//   }

//   // Error
//   if (error) {
//     return (
//       <div style={{ padding: "50px" }}>
//         <Alert message="Error" description={error} type="error" showIcon />
//       </div>
//     );
//   }

//   // Not Found
//   if (!student) {
//     return (
//       <div style={{ padding: "50px" }}>
//         <Alert
//           message="Profile not found"
//           description="The requested profile could not be found."
//           type="warning"
//           showIcon
//         />
//       </div>
//     );
//   }

//   // ✅ Main UI
//   return (
//     <div className="profile-page" style={{ padding: "24px", maxWidth: "900px", margin: "auto" }}>
//       {/* Card: Student Info */}
//       <Card>
//         <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
//           <img
//             src={student.User?.ProfileImageURL || defaultAvatar}
//             alt="Profile"
//             style={{
//               width: 100,
//               height: 100,
//               borderRadius: "50%",
//               marginRight: "24px",
//               objectFit: "cover",
//             }}
//           />
//           <div>
//             <Title level={2}>{student.User?.Name || "N/A"}</Title>
//             <Text type="secondary">{student.User?.Email || "No email provided"}</Text>
//           </div>
//         </div>
//         <Descriptions bordered column={1}>
//           <Descriptions.Item label="Student ID">{student.ID}</Descriptions.Item>
//         </Descriptions>
//       </Card>

//       {/* Card: Posts */}
//       <Card title="My Posts" style={{ marginTop: "24px" }}>
//         <List
//           dataSource={posts}
//           renderItem={(item) => (
//             <List.Item>
//               <List.Item.Meta
//                 title={`ประเภทงาน: ${item.job_type}`}
//                 description={
//                   <>
//                     <p><b>แนะนำตัว:</b> {item.introduction}</p>
//                     <p><b>ทักษะ:</b> {item.skills}</p>
//                     {item.portfolio_url && (
//                       <p>
//                         <b>ผลงาน:</b>{" "}
//                         <a href={item.portfolio_url} target="_blank" rel="noreferrer">
//                           {item.portfolio_url}
//                         </a>
//                       </p>
//                     )}
//                   </>
//                 }
//               />
//             </List.Item>
//           )}
//           locale={{ emptyText: "No posts to display." }}
//         />
//       </Card>

//       {/* Card: Reviews */}
//       <Card title="My Reviews" style={{ marginTop: "24px" }}>
//         <List
//           dataSource={reviews}
//           renderItem={(item) => (
//             <List.Item>
//               <List.Item.Meta
//                 title={`Rating: ${item.ratingscore_id || "N/A"}`}
//                 description={item.comment || "No comment"}
//               />
//             </List.Item>
//           )}
//           locale={{ emptyText: "No reviews to display." }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default ProfilePage;
// src/pages/ProfilePage2/ProfilePage.tsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   Row, 
//   Col,
//   Card, 
//   Avatar, 
//   Typography, 
//   Button, 
//   Tag, 
//   Space, 
//   Spin, 
//   message,
//   Empty,
//   Rate,
//   Statistic,
//   Divider
// } from 'antd';
// import { 
//   UserOutlined, 
//   EditOutlined, 
//   PhoneOutlined, 
//   MailOutlined,
//   EnvironmentOutlined,
//   BookOutlined,
//   StarOutlined,
//   TrophyOutlined,
//   CalendarOutlined,
//   TeamOutlined
// } from '@ant-design/icons';
// import { useAuth } from '../../context/AuthContext';
// import { getMyProfile, getStudentProfileById } from '../../services/profileService';
// import { getStudentProfilePosts } from '../../services/studentPostService';
// import './ProfilePage.css';

// const { Title, Text, Paragraph } = Typography;

// interface Student {
//   ID: number;
//   id?: number;
//   first_name: string;
//   last_name: string;
//   email?: string;
//   phone?: string;
//   profile_image_url?: string;
//   faculty: string;
//   year?: number;
//   gpa?: number;
//   skills?: string;
//   user_id: number;
// }

// interface StudentProfilePost {
//   ID: number;
//   CreatedAt: string;
//   introduction: string;
//   job_type: string;
//   portfolio_url?: string;
//   skills: string;
//   year?: number;
//   phone?: string;
//   email?: string;
//   student_id?: number;
//   student?: Student;
// }

// interface ProfileData {
//   student: Student;
//   posts: StudentProfilePost[];
// }

// const ProfilePage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [profileData, setProfileData] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   console.log('🔍 URL Params ID:', id);
//   console.log('🔍 Current User:', user);

//   // ตรวจสอบว่าเป็นโปรไฟล์ของตัวเอง
//   const isOwnProfile = user && user.id && user.id.toString() === id;

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       console.log('🚀 Starting fetchProfileData...');
//       console.log('📍 ID from params:', id);

//       if (!id || id === 'undefined' || id === 'null') {
//         console.error('❌ Invalid profile ID:', id);
//         setError('ไม่พบหมายเลขโปรไฟล์ในที่อยู่เว็บ กรุณาตรวจสอบ URL');
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null);

//         console.log('🔑 Current user:', user);
//         console.log('🔍 Is own profile:', isOwnProfile);

//         let profileResponse: ProfileData;

//         if (isOwnProfile) {
//           console.log('📱 Fetching own profile...');
//           // ดึงข้อมูลโปรไฟล์ตัวเอง จาก API
//           const myProfileResponse = await getMyProfile();
//           console.log('✅ Own profile response:', myProfileResponse);

//           profileResponse = {
//             student: myProfileResponse.student,
//             posts: myProfileResponse.posts || []
//           };
//         } else {
//           console.log('👤 Fetching other user profile for ID:', id);
//           // ดึงข้อมูลโปรไฟล์คนอื่น
//           try {
//             const otherProfileResponse = await getStudentProfileById(parseInt(id));
//             console.log('✅ Other profile response:', otherProfileResponse);

//             profileResponse = {
//               student: otherProfileResponse,
//               posts: []
//             };

//             // ดึงโพสต์ของคนนั้นด้วย
//             try {
//               const allPosts = await getStudentProfilePosts();
//               const postsData = allPosts?.data || allPosts || [];
//               const userPosts = Array.isArray(postsData) 
//                 ? postsData.filter(post => {
//                     const postStudentId = post.student_id || post.student?.ID || post.student?.id;
//                     return postStudentId && postStudentId.toString() === id;
//                   })
//                 : [];
//               profileResponse.posts = userPosts;
//               console.log('📄 User posts:', userPosts);
//             } catch (postsError) {
//               console.warn('⚠️ Could not fetch posts for user:', postsError);
//               // ไม่ให้ error หาก posts ไม่โหลดได้
//             }
//           } catch (profileError: any) {
//             console.error('❌ Error fetching other profile:', profileError);
//             setError(`ไม่พบโปรไฟล์ผู้ใช้ ID: ${id}`);
//             setLoading(false);
//             return;
//           }
//         }

//         console.log('✅ Final profile data:', profileResponse);
//         setProfileData(profileResponse);

//       } catch (err: any) {
//         console.error('❌ Error fetching profile:', err);
//         if (err.message?.includes('Authentication failed')) {
//           setError('กรุณาเข้าสู่ระบบใหม่');
//           // Redirect to login after a short delay
//           setTimeout(() => navigate('/login'), 2000);
//         } else {
//           setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
//         }
//         message.error('ไม่สามารถโหลดข้อมูลโปรไฟล์ได้');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [id, isOwnProfile, user, navigate]);

//   // Loading State
//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '50vh',
//         background: '#f0f2f5',
//         flexDirection: 'column'
//       }}>
//         <Spin size="large" />
//         <Text style={{ marginTop: '16px', color: '#666' }}>
//           กำลังโหลดข้อมูลโปรไฟล์...
//         </Text>
//       </div>
//     );
//   }

//   // Error State
//   if (error || !profileData) {
//     return (
//       <div style={{ 
//         textAlign: 'center', 
//         padding: '60px 20px',
//         background: '#f0f2f5',
//         minHeight: '50vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         <Empty 
//           description={
//             <div>
//               <Text type="secondary" style={{ fontSize: '16px' }}>
//                 {error || "ไม่พบข้อมูลโปรไฟล์"}
//               </Text>
//               <br />
//               <Text type="secondary" style={{ fontSize: '14px' }}>
//                 ID: {id || 'ไม่ระบุ'}
//               </Text>
//             </div>
//           }
//           image={Empty.PRESENTED_IMAGE_SIMPLE}
//         >
//           <Space>
//             <Button type="primary" onClick={() => navigate('/')}>
//               กลับหน้าหลัก
//             </Button>
//             <Button onClick={() => window.location.reload()}>
//               โหลดใหม่
//             </Button>
//             {!isOwnProfile && user?.id && (
//               <Button onClick={() => navigate(`/profile/${user.id}`)}>
//                 โปรไฟล์ของฉัน
//               </Button>
//             )}
//           </Space>
//         </Empty>
//       </div>
//     );
//   }

//   // เตรียมข้อมูลสำหรับแสดงผล
//   const student = profileData.student;
//   const posts = profileData.posts || [];

//   const fullName = `${student.first_name || ''} ${student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ';
//   const facultyName = student.faculty || 'ไม่ระบุคณะ';

//   // สำหรับคำนวณสถิติ
//   const completedJobs = posts.length;
//   const averageRating = student.gpa ? (student.gpa / 4.0) * 5 : 4.0; // Convert GPA to 5-star rating
//   const reviewCount = Math.floor(Math.random() * 20) + 5; // Mock reviews

//   return (
//     <div className="profile-page-v2" style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
//       <Row gutter={[24, 24]}>
//         {/* Sidebar - ข้อมูลโปรไฟล์ */}
//         <Col xs={24} lg={8}>
//           <Card className="profile-sidebar-card" style={{ marginBottom: '24px' }}>
//             {/* Profile Header */}
//             <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//               <Avatar
//                 size={120}
//                 src={student.profile_image_url}
//                 icon={<UserOutlined />}
//                 style={{ 
//                   marginBottom: '16px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                   border: '4px solid white'
//                 }}
//               />
//               <Title level={3} style={{ margin: '0 0 8px 0', color: '#262626' }}>
//                 {fullName}
//               </Title>
//               <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>
//                 {facultyName}
//               </Text>
//               <Text type="secondary" style={{ fontSize: '14px', display: 'block' }}>
//                 ปีที่ {student.year || 'ไม่ระบุ'}
//               </Text>

//               {/* Rating */}
//               <div style={{ marginTop: '16px' }}>
//                 <Rate 
//                   disabled 
//                   defaultValue={averageRating} 
//                   allowHalf 
//                   style={{ fontSize: '18px' }}
//                 />
//                 <Text style={{ 
//                   marginLeft: '8px', 
//                   color: '#faad14', 
//                   fontWeight: 500,
//                   fontSize: '14px'
//                 }}>
//                   {averageRating.toFixed(1)}/5.0
//                 </Text>
//               </div>

//               {/* Actions */}
//               <div style={{ marginTop: '24px' }}>
//                 {isOwnProfile ? (
//                   <Button 
//                     type="primary" 
//                     icon={<EditOutlined />}
//                     size="large"
//                     onClick={() => message.info('คุณสมบัตินี้จะเปิดให้ใช้งานเร็วๆ นี้')}
//                     style={{ width: '100%' }}
//                   >
//                     แก้ไขโปรไฟล์
//                   </Button>
//                 ) : (
//                   <Space style={{ width: '100%' }} direction="vertical" size="middle">
//                     <Button 
//                       type="primary" 
//                       size="large" 
//                       style={{ width: '100%' }}
//                       onClick={() => message.info('คุณสมบัตินี้จะเปิดให้ใช้งานเร็วๆ นี้')}
//                     >
//                       ติดต่อ
//                     </Button>
//                     <Button 
//                       size="large" 
//                       style={{ width: '100%' }}
//                       onClick={() => navigate('/chat')}
//                     >
//                       แชท
//                     </Button>
//                   </Space>
//                 )}
//               </div>
//             </div>

//             <Divider />

//             {/* Stats */}
//             <div className="profile-stats">
//               <Title level={5} style={{ marginBottom: '16px' }}>สถิติ</Title>
//               <div className="stat-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
//                 <Space>
//                   <TrophyOutlined style={{ color: '#faad14' }} />
//                   <Text>โพสต์หางาน</Text>
//                 </Space>
//                 <Text strong style={{ color: '#52c41a' }}>
//                   {completedJobs}
//                 </Text>
//               </div>
//               <div className="stat-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
//                 <Space>
//                   <StarOutlined style={{ color: '#faad14' }} />
//                   <Text>รีวิว</Text>
//                 </Space>
//                 <Text strong style={{ color: '#1890ff' }}>
//                   {reviewCount}
//                 </Text>
//               </div>
//               <div className="stat-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
//                 <Space>
//                   <TeamOutlined style={{ color: '#722ed1' }} />
//                   <Text>การเชื่อมต่อ</Text>
//                 </Space>
//                 <Text strong style={{ color: '#722ed1' }}>
//                   {Math.floor(Math.random() * 50) + 10}
//                 </Text>
//               </div>
//             </div>

//             <Divider />

//             {/* Contact Info */}
//             <div>
//               <Title level={5} style={{ marginBottom: '16px' }}>ข้อมูลติดต่อ</Title>
//               {student.email ? (
//                 <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
//                   <MailOutlined style={{ marginRight: '12px', color: '#1890ff', fontSize: '16px' }} />
//                   <Text copyable style={{ fontSize: '14px' }}>
//                     {student.email}
//                   </Text>
//                 </div>
//               ) : (
//                 <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
//                   <MailOutlined style={{ marginRight: '12px', color: '#d9d9d9', fontSize: '16px' }} />
//                   <Text type="secondary" style={{ fontSize: '14px' }}>
//                     ไม่มีข้อมูลอีเมล
//                   </Text>
//                 </div>
//               )}

//               {student.phone ? (
//                 <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
//                   <PhoneOutlined style={{ marginRight: '12px', color: '#52c41a', fontSize: '16px' }} />
//                   <Text copyable style={{ fontSize: '14px' }}>
//                     {student.phone}
//                   </Text>
//                 </div>
//               ) : (
//                 <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
//                   <PhoneOutlined style={{ marginRight: '12px', color: '#d9d9d9', fontSize: '16px' }} />
//                   <Text type="secondary" style={{ fontSize: '14px' }}>
//                     ไม่มีข้อมูลเบอร์โทร
//                   </Text>
//                 </div>
//               )}

//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <EnvironmentOutlined style={{ marginRight: '12px', color: '#fa541c', fontSize: '16px' }} />
//                 <Text style={{ fontSize: '14px', color: '#666' }}>
//                   มหาวิทยาลัยเทคโนโลยีสุรนารี
//                 </Text>
//               </div>
//             </div>
//           </Card>
//         </Col>

//         {/* Main Content - โพสต์และข้อมูล */}
//         <Col xs={24} lg={16}>
//           {/* Posts Card */}
//           <Card 
//             title={
//               <Space>
//                 <BookOutlined />
//                 <span>โพสต์หางาน</span>
//                 <Tag color="blue">{posts.length} โพสต์</Tag>
//               </Space>
//             } 
//             style={{ marginBottom: '24px' }}
//             extra={
//               isOwnProfile && (
//                 <Button 
//                   type="primary" 
//                   size="small"
//                   onClick={() => navigate('/feed')}
//                 >
//                   สร้างโพสต์ใหม่
//                 </Button>
//               )
//             }
//           >
//             {posts && posts.length > 0 ? (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                 {posts.map((post) => (
//                   <Card 
//                     key={post.ID} 
//                     size="small" 
//                     style={{ 
//                       border: '1px solid #f0f0f0',
//                       borderRadius: '8px',
//                       boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
//                     }}
//                     hoverable
//                   >
//                     <div>
//                       <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Tag color="blue" style={{ marginBottom: 0 }}>
//                           {post.job_type || 'ไม่ระบุประเภทงาน'}
//                         </Tag>
//                         <Space>
//                           <CalendarOutlined style={{ color: '#999', fontSize: '12px' }} />
//                           <Text type="secondary" style={{ fontSize: '12px' }}>
//                             {new Date(post.CreatedAt).toLocaleDateString('th-TH', {
//                               year: 'numeric',
//                               month: 'short',
//                               day: 'numeric'
//                             })}
//                           </Text>
//                         </Space>
//                       </div>

//                       <Paragraph 
//                         style={{ marginBottom: '12px', fontSize: '14px', lineHeight: '1.6' }}
//                         ellipsis={{ rows: 3, expandable: true, symbol: 'อ่านเพิ่มเติม' }}
//                       >
//                         <Text strong style={{ color: '#262626' }}>แนะนำตัว:</Text> {post.introduction || 'ไม่มีข้อมูลแนะนำตัว'}
//                       </Paragraph>

//                       {post.skills && (
//                         <div style={{ marginBottom: '12px' }}>
//                           <Text strong style={{ color: '#262626', fontSize: '14px' }}>ทักษะ:</Text>
//                           <div style={{ marginTop: '8px' }}>
//                             {post.skills.split(',').map((skill, index) => (
//                               <Tag key={index} color="geekblue" style={{ marginBottom: '4px' }}>
//                                 {skill.trim()}
//                               </Tag>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {post.portfolio_url && (
//                         <div>
//                           <Text strong style={{ color: '#262626', fontSize: '14px' }}>ผลงาน:</Text>{" "}
//                           <a 
//                             href={post.portfolio_url} 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             style={{ color: '#1890ff' }}
//                           >
//                             ดูผลงาน
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <Empty 
//                 description={
//                   isOwnProfile ? "คุณยังไม่มีโพสต์หางาน" : "ผู้ใช้รายนี้ยังไม่มีโพสต์หางาน"
//                 } 
//                 image={Empty.PRESENTED_IMAGE_SIMPLE}
//               >
//                 {isOwnProfile && (
//                   <Button 
//                     type="primary" 
//                     onClick={() => navigate('/feed')}
//                   >
//                     สร้างโพสต์แรก
//                   </Button>
//                 )}
//               </Empty>
//             )}
//           </Card>

//           {/* Additional Info Card */}
//           <Card 
//             title={
//               <Space>
//                 <StarOutlined />
//                 <span>ข้อมูลเพิ่มเติม</span>
//               </Space>
//             }
//           >
//             <Row gutter={[16, 16]}>
//               <Col xs={24} sm={8}>
//                 <Statistic
//                   title="ปีการศึกษา"
//                   value={student.year || 'ไม่ระบุ'}
//                   prefix={<BookOutlined style={{ color: '#1890ff' }} />}
//                   valueStyle={{ color: '#262626', fontSize: '24px' }}
//                 />
//               </Col>
//               <Col xs={24} sm={8}>
//                 <Statistic
//                   title="คะแนนเฉลี่ย"
//                   value={averageRating}
//                   precision={1}
//                   suffix="/ 5.0"
//                   prefix={<StarOutlined style={{ color: '#faad14' }} />}
//                   valueStyle={{ color: '#faad14', fontSize: '24px' }}
//                 />
//               </Col>
//               <Col xs={24} sm={8}>
//                 <Statistic
//                   title="GPA"
//                   value={student.gpa || 'ไม่ระบุ'}
//                   precision={2}
//                   prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
//                   valueStyle={{ color: '#52c41a', fontSize: '24px' }}
//                 />
//               </Col>
//             </Row>

//             {/* Skills Section */}
//             {student.skills && (
//               <>
//                 <Divider />
//                 <div>
//                   <Title level={5}>ทักษะทั่วไป</Title>
//                   <div style={{ marginTop: '8px' }}>
//                     {student.skills.split(',').map((skill, index) => (
//                       <Tag key={index} color="cyan" style={{ marginBottom: '4px' }}>
//                         {skill.trim()}
//                       </Tag>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* User Description/Bio */}
//             <Divider />
//             <div>
//               <Title level={5}>เกี่ยวกับ{isOwnProfile ? 'ฉัน' : 'นักศึกษาคนนี้'}</Title>
//               <Paragraph style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
//                 {isOwnProfile 
//                   ? `ฉันเป็นนักศึกษาปีที่ ${student.year || 'N/A'} ที่ ${facultyName} กำลังมองหาโอกาสในการทำงานและพัฒนาทักษะ` 
//                   : `นักศึกษาปีที่ ${student.year || 'N/A'} ที่ ${facultyName} ที่มีความสนใจในการทำงานและพัฒนาทักษะต่างๆ`
//                 }
//               </Paragraph>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ProfilePage;

// src/pages/ProfilePage2/ProfilePage.tsx
// src/pages/ProfilePage2/ProfilePage.tsx
// src/pages/ProfilePage2/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col,
  Card, 
  Avatar, 
  Typography, 
  Button, 
  Tag, 
  Space, 
  Spin, 
  message,
  Empty,
  Rate,
  Statistic,
  Divider
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  PhoneOutlined, 
  MailOutlined,
  EnvironmentOutlined,
  BookOutlined,
  StarOutlined,
  TrophyOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  LikeOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { getMyProfile, getStudentProfileById } from '../../services/profileService';
import { getStudentProfilePosts } from '../../services/studentPostService';
import './ProfilePage.css';

const { Title, Text, Paragraph } = Typography;

interface Student {
  ID: number;
  id?: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  profile_image_url?: string;
  faculty: string;
  year?: number;
  gpa?: number;
  skills?: string;
  user_id: number;
}

interface StudentProfilePost {
  ID: number;
  CreatedAt: string;
  introduction: string;
  job_type: string;
  portfolio_url?: string;
  skills: string;
  year?: number;
  phone?: string;
  email?: string;
  student_id?: number;
  student?: Student;
}

interface ProfileData {
  student: Student;
  posts: StudentProfilePost[];
}

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock data for statistics
  const [statistics, setStatistics] = useState({
    questions: 0,
    reviews: 0,
    replies: 0
  });

  // ตรวจสอบว่าเป็นโปรไฟล์ของตัวเอง
  const isOwnProfile = user && user.id && user.id.toString() === id;

  // ใช้ useEffect แบบง่ายๆ เพื่อป้องกัน infinite loop
  useEffect(() => {
    let isMounted = true; // flag เพื่อป้องกันการ set state หลังจาก component unmount
    
    const fetchData = async () => {
      console.log('🚀 Fetching profile data for ID:', id);
      
      if (!id || id === 'undefined' || id === 'null') {
        console.error('❌ Invalid profile ID:', id);
        if (isMounted) {
          setError('ไม่พบหมายเลขโปรไฟล์ในที่อยู่เว็บ กรุณาตรวจสอบ URL');
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        let response: ProfileData;

        if (isOwnProfile) {
          console.log('📱 Fetching own profile...');
          const myProfileResponse = await getMyProfile();
          console.log('✅ Own profile response:', myProfileResponse);
          
          response = {
            student: myProfileResponse.student,
            posts: myProfileResponse.posts || []
          };
        } else {
          console.log('👤 Fetching other user profile for ID:', id);
          
          // ดึงข้อมูล student profile
          const studentProfile = await getStudentProfileById(parseInt(id));
          console.log('✅ Student profile response:', studentProfile);
          
          // ดึง posts ทั้งหมดและ filter
          const allPostsResponse = await getStudentProfilePosts();
          const allPosts = allPostsResponse?.data || allPostsResponse || [];
          
          // Filter posts สำหรับ student นี้
          const userPosts = Array.isArray(allPosts) 
            ? allPosts.filter(post => {
                const postStudentId = post.student_id || post.student?.ID || post.student?.id;
                return postStudentId && postStudentId.toString() === id;
              })
            : [];
          
          console.log('📄 Filtered user posts:', userPosts);
          
          response = {
            student: studentProfile,
            posts: userPosts
          };
        }

        if (isMounted) {
          console.log('✅ Setting profile data:', response);
          setProfileData(response);
          
          // อัปเดต statistics
          setStatistics({
            questions: response.posts.length,
            reviews: 0,
            replies: 0
          });
          
          setLoading(false);
        }

      } catch (err: any) {
        console.error('❌ Error fetching profile:', err);
        
        if (isMounted) {
          if (err.message?.includes('Authentication failed')) {
            setError('กรุณาเข้าสู่ระบบใหม่');
            setTimeout(() => navigate('/login'), 2000);
          } else {
            setError(`ไม่พบโปรไฟล์ผู้ใช้ ID: ${id}`);
          }
          message.error('ไม่สามารถโหลดข้อมูลโปรไฟล์ได้');
          setLoading(false);
        }
      }
    };

    // เรียกใช้ function
    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id, user?.id]); // ขึ้นอยู่กับ id และ user.id เท่านั้น

  // Loading State
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        background: '#f0f2f5',
        flexDirection: 'column'
      }}>
        <Spin size="large" />
        <Text style={{ marginTop: '16px', color: '#666' }}>
          กำลังโหลดข้อมูลโปรไฟล์...
        </Text>
      </div>
    );
  }

  // Error State
  if (error || !profileData) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        background: '#f0f2f5',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Empty 
          description={
            <div>
              <Text type="secondary" style={{ fontSize: '16px' }}>
                {error || "ไม่พบข้อมูลโปรไฟล์"}
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: '14px' }}>
                ID: {id || 'ไม่ระบุ'}
              </Text>
            </div>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Space>
            <Button type="primary" onClick={() => navigate('/')}>
              กลับหน้าหลัก
            </Button>
            <Button onClick={() => window.location.reload()}>
              โหลดใหม่
            </Button>
            {!isOwnProfile && user?.id && (
              <Button onClick={() => navigate(`/profile/${user.id}`)}>
                โปรไฟล์ของฉัน
              </Button>
            )}
          </Space>
        </Empty>
      </div>
    );
  }

  // เตรียมข้อมูลสำหรับแสดงผล
  const student = profileData.student;
  const posts = profileData.posts || [];
  
  const fullName = `${student.first_name || ''} ${student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ';
  const facultyName = student.faculty || 'ไม่ระบุคณะ';
  
  // คำนวณ rating จาก GPA
  const averageRating = student.gpa ? Math.min((student.gpa / 4.0) * 5, 5) : 0;
  const hasReviews = averageRating > 0;

  console.log('🎨 Rendering profile for:', fullName, 'Posts:', posts.length);

  return (
    <div className="profile-page-v2" style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        {/* Sidebar - ข้อมูลโปรไฟล์ */}
        <Col xs={24} lg={8}>
          <Card className="profile-sidebar-card" style={{ marginBottom: '24px' }}>
            {/* Profile Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Avatar
                size={120}
                src={student.profile_image_url}
                icon={<UserOutlined />}
                style={{ 
                  marginBottom: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: '4px solid white'
                }}
              />
              <Title level={3} style={{ margin: '0 0 8px 0', color: '#262626' }}>
                {fullName}
              </Title>
              <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>
                {facultyName}
              </Text>
              <Text type="secondary" style={{ fontSize: '14px', display: 'block' }}>
                ปีที่ {student.year || 'ไม่ระบุ'}
              </Text>
              
              {/* Rating */}
              <div style={{ marginTop: '16px' }}>
                <Rate 
                  disabled 
                  value={averageRating} 
                  allowHalf 
                  style={{ fontSize: '18px' }}
                />
                <br />
                <Text style={{ 
                  color: hasReviews ? '#faad14' : '#999', 
                  fontWeight: 500,
                  fontSize: '14px'
                }}>
                  {hasReviews ? `${averageRating.toFixed(1)}/5.0` : 'ยังไม่มีคะแนน'}
                </Text>
              </div>

              {/* Actions */}
              <div style={{ marginTop: '24px' }}>
                {isOwnProfile ? (
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />}
                    size="large"
                    onClick={() => message.info('คุณสมบัตินี้จะเปิดให้ใช้งานเร็วๆ นี้')}
                    style={{ width: '100%' }}
                  >
                    แก้ไขโปรไฟล์
                  </Button>
                ) : (
                  <Space style={{ width: '100%' }} direction="vertical" size="middle">
                    <Button 
                      type="primary" 
                      size="large" 
                      style={{ width: '100%' }}
                      onClick={() => message.info('คุณสมบัตินี้จะเปิดให้ใช้งานเร็วๆ นี้')}
                    >
                      ติดต่อ
                    </Button>
                    <Button 
                      size="large" 
                      style={{ width: '100%' }}
                      onClick={() => navigate('/chat')}
                    >
                      แชท
                    </Button>
                  </Space>
                )}
              </div>
            </div>

            <Divider />

            {/* สถิติ */}
            <div style={{ marginBottom: '24px' }}>
              <Title level={5} style={{ marginBottom: '16px', textAlign: 'center' }}>สถิติ</Title>
              
              {/* โพสต์คำถาม */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '12px',
                padding: '8px 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <QuestionCircleOutlined style={{ 
                    marginRight: '12px', 
                    color: '#faad14', 
                    fontSize: '16px' 
                  }} />
                  <Text>โพสต์คำถาม</Text>
                </div>
                <Text strong style={{ color: '#faad14', fontSize: '16px' }}>
                  {statistics.questions}
                </Text>
              </div>

              {/* รีวิว */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '12px',
                padding: '8px 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <StarOutlined style={{ 
                    marginRight: '12px', 
                    color: '#1890ff', 
                    fontSize: '16px' 
                  }} />
                  <Text>รีวิว</Text>
                </div>
                <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>
                  {statistics.reviews}
                </Text>
              </div>

              {/* การตอบกลับ */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '8px 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MessageOutlined style={{ 
                    marginRight: '12px', 
                    color: '#722ed1', 
                    fontSize: '16px' 
                  }} />
                  <Text>การตอบกลับ</Text>
                </div>
                <Text strong style={{ color: '#722ed1', fontSize: '16px' }}>
                  {statistics.replies}
                </Text>
              </div>
            </div>

            <Divider />

            {/* Contact Info */}
            <div>
              <Title level={5} style={{ marginBottom: '16px' }}>ข้อมูลติดต่อ</Title>
              
              {/* Email */}
              {student.email ? (
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <MailOutlined style={{ marginRight: '12px', color: '#1890ff', fontSize: '16px' }} />
                  <Text copyable style={{ fontSize: '14px' }}>
                    {student.email}
                  </Text>
                </div>
              ) : (
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <MailOutlined style={{ marginRight: '12px', color: '#d9d9d9', fontSize: '16px' }} />
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    ไม่มีข้อมูลอีเมล
                  </Text>
                </div>
              )}
              
              {/* Phone */}
              {student.phone ? (
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <PhoneOutlined style={{ marginRight: '12px', color: '#52c41a', fontSize: '16px' }} />
                  <Text copyable style={{ fontSize: '14px' }}>
                    {student.phone}
                  </Text>
                </div>
              ) : (
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <PhoneOutlined style={{ marginRight: '12px', color: '#d9d9d9', fontSize: '16px' }} />
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    ไม่มีข้อมูลเบอร์โทร
                  </Text>
                </div>
              )}
              
              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <EnvironmentOutlined style={{ marginRight: '12px', color: '#fa541c', fontSize: '16px' }} />
                <Text style={{ fontSize: '14px', color: '#666' }}>
                  มหาวิทยาลัยเทคโนโลยีสุรนารี
                </Text>
              </div>
            </div>
          </Card>
        </Col>

        {/* Main Content - โพสต์และข้อมูล */}
        <Col xs={24} lg={16}>
          {/* Posts Card */}
          <Card 
            title={
              <Space>
                <BookOutlined />
                <span>โพสต์หางาน</span>
                <Tag color="blue">{posts.length} โพสต์</Tag>
              </Space>
            } 
            style={{ marginBottom: '24px' }}
            extra={
              isOwnProfile && (
                <Button 
                  type="primary" 
                  size="small"
                  onClick={() => navigate('/feed')}
                >
                  สร้างโพสต์ใหม่
                </Button>
              )
            }
          >
            {posts && posts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {posts.map((post) => (
                  <Card 
                    key={post.ID} 
                    size="small" 
                    style={{ 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                    }}
                    hoverable
                  >
                    <div>
                      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Tag color="blue" style={{ marginBottom: 0 }}>
                          {post.job_type || 'ไม่ระบุประเภทงาน'}
                        </Tag>
                        <Space>
                          <CalendarOutlined style={{ color: '#999', fontSize: '12px' }} />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {new Date(post.CreatedAt).toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Text>
                        </Space>
                      </div>
                      
                      <Paragraph 
                        style={{ marginBottom: '12px', fontSize: '14px', lineHeight: '1.6' }}
                        ellipsis={{ rows: 3, expandable: true, symbol: 'อ่านเพิ่มเติม' }}
                      >
                        <Text strong style={{ color: '#262626' }}>แนะนำตัว:</Text> {post.introduction || 'ไม่มีข้อมูลแนะนำตัว'}
                      </Paragraph>
                      
                      {post.skills && (
                        <div style={{ marginBottom: '12px' }}>
                          <Text strong style={{ color: '#262626', fontSize: '14px' }}>ทักษะ:</Text>
                          <div style={{ marginTop: '8px' }}>
                            {post.skills.split(',').map((skill, index) => (
                              <Tag key={index} color="geekblue" style={{ marginBottom: '4px' }}>
                                {skill.trim()}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      {post.portfolio_url && (
                        <div>
                          <Text strong style={{ color: '#262626', fontSize: '14px' }}>ผลงาน:</Text>{" "}
                          <a 
                            href={post.portfolio_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#1890ff' }}
                          >
                            ดูผลงาน
                          </a>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Empty 
                description={
                  isOwnProfile ? "คุณยังไม่มีโพสต์หางาน" : "ผู้ใช้รายนี้ยังไม่มีโพสต์หางาน"
                } 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                {isOwnProfile && (
                  <Button 
                    type="primary" 
                    onClick={() => navigate('/feed')}
                  >
                    สร้างโพสต์แรก
                  </Button>
                )}
              </Empty>
            )}
          </Card>

          {/* Additional Info Card */}
          <Card 
            title={
              <Space>
                <StarOutlined />
                <span>ข้อมูลเพิ่มเติม</span>
              </Space>
            }
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="ปีการศึกษา"
                  value={student.year || 'ไม่ระบุ'}
                  prefix={<BookOutlined style={{ color: '#1890ff' }} />}
                  valueStyle={{ color: '#262626', fontSize: '24px' }}
                />
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#8c8c8c', fontSize: '14px', marginBottom: '8px' }}>
                    คะแนนเฉลี่ย
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Rate 
                      disabled 
                      value={averageRating}
                      allowHalf 
                      style={{ fontSize: '20px' }}
                    />
                  </div>
                  <div style={{ 
                    color: hasReviews ? '#faad14' : '#999', 
                    fontSize: '20px', 
                    fontWeight: 'bold' 
                  }}>
                    {hasReviews ? `${averageRating.toFixed(1)}/5.0` : 'ไม่ระบุ'}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="GPA"
                  value={student.gpa ? student.gpa.toFixed(2) : 'ไม่ระบุ'}
                  prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
                  valueStyle={{ color: '#52c41a', fontSize: '24px' }}
                />
              </Col>
            </Row>

            {/* Skills Section */}
            {student.skills && (
              <>
                <Divider />
                <div>
                  <Title level={5}>ทักษะทั่วไป</Title>
                  <div style={{ marginTop: '8px' }}>
                    {student.skills.split(',').map((skill, index) => (
                      <Tag key={index} color="cyan" style={{ marginBottom: '4px' }}>
                        {skill.trim()}
                      </Tag>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* User Description/Bio */}
            <Divider />
            <div>
              <Title level={5}>เกี่ยวกับ{isOwnProfile ? 'ฉัน' : 'นักศึกษาคนนี้'}</Title>
              <Paragraph style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                {isOwnProfile 
                  ? `ฉันเป็นนักศึกษาปีที่ ${student.year || 'N/A'} ที่ ${facultyName} กำลังมองหาโอกาสในการทำงานและพัฒนาทักษะ` 
                  : `นักศึกษาปีที่ ${student.year || 'N/A'} ที่ ${facultyName} ที่มีความสนใจในการทำงานและพัฒนาทักษะต่างๆ`
                }
              </Paragraph>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;