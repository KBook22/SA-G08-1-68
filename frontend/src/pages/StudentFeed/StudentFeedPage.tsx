// // src/pages/StudentFeed/StudentFeedPage.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Card,
//   Col,
//   Row,
//   Typography,
//   Tag,
//   Avatar,
//   Button,
//   Input,
//   Space,
//   Modal,
//   Spin,
//   message,
//   Empty,
//   Divider,
//   Pagination
// } from 'antd';
// import {
//   UserOutlined,
//   SearchOutlined,
//   EyeOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   BookOutlined,
//   StarOutlined
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { getStudentProfilePosts } from '../../services/studentPostService';

// const { Title, Text, Paragraph } = Typography;
// const { Search } = Input;

// // Interface สำหรับ StudentProfilePost
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
// }

// interface Faculty {
//   ID: number;
//   Name: string;
// }

// interface Department {
//   ID: number;
//   Name: string;
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
//   faculty_id?: number;
//   faculty?: Faculty;
//   department_id?: number;
//   department?: Department;
// }

// const StudentFeedPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState<StudentProfilePost[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<StudentProfilePost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(12);

//   // ดึงข้อมูลโพสต์จาก API
//   const fetchPosts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await getStudentProfilePosts();
//       console.log('📄 Student posts response:', response);

//       // ตรวจสอบโครงสร้างข้อมูลที่ได้รับ
//       const postsData = response?.data || response || [];

//       if (Array.isArray(postsData)) {
//         setPosts(postsData);
//         setFilteredPosts(postsData);
//       } else {
//         console.error('Invalid posts data structure:', response);
//         setPosts([]);
//         setFilteredPosts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching student posts:', error);
//       message.error('ไม่สามารถโหลดข้อมูลโพสต์ได้');
//       setPosts([]);
//       setFilteredPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   // ฟังก์ชันค้นหา
//   const handleSearch = useCallback((value: string) => {
//     setSearchTerm(value);
//     setCurrentPage(1);

//     if (!value.trim()) {
//       setFilteredPosts(posts);
//       return;
//     }

//     const searchLower = value.toLowerCase();
//     const filtered = posts.filter(post => {
//       const studentName = post.student ?
//         `${post.student.first_name || ''} ${post.student.last_name || ''}`.toLowerCase() : '';
//       const facultyName = post.faculty?.Name?.toLowerCase() || post.student?.faculty?.toLowerCase() || '';
//       const departmentName = post.department?.Name?.toLowerCase() || '';
//       const skills = post.skills?.toLowerCase() || '';
//       const introduction = post.introduction?.toLowerCase() || '';
//       const jobType = post.job_type?.toLowerCase() || '';

//       return (
//         studentName.includes(searchLower) ||
//         facultyName.includes(searchLower) ||
//         departmentName.includes(searchLower) ||
//         skills.includes(searchLower) ||
//         introduction.includes(searchLower) ||
//         jobType.includes(searchLower)
//       );
//     });

//     setFilteredPosts(filtered);
//   }, [posts]);

//   // แสดง Modal รายละเอียด
//   const showPostDetail = (post: StudentProfilePost) => {
//     setSelectedPost(post);
//     setIsModalVisible(true);
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//     setSelectedPost(null);
//   };

//   // ไปหน้าโปรไฟล์
//   const goToProfile = (studentId: number) => {
//     navigate(`/profile/${studentId}`);
//   };

//   // คำนวณข้อมูลสำหรับ Pagination
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentPosts = filteredPosts.slice(startIndex, endIndex);

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '50vh'
//       }}>
//         <Spin size="large" />
//         <Text style={{ marginLeft: '16px' }}>กำลังโหลดข้อมูลโพสต์...</Text>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//         {/* Header */}
//         <div style={{ marginBottom: '24px', textAlign: 'center' }}>
//           <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
//             <BookOutlined /> โพสต์หางานของนักศึกษา
//           </Title>
//           <Text type="secondary" style={{ fontSize: '16px' }}>
//             ค้นหานักศึกษาที่เหมาะสมสำหรับงานของคุณ
//           </Text>
//         </div>

//         {/* Search Bar */}
//         <Card style={{ marginBottom: '24px' }}>
//           <Search
//             placeholder="ค้นหาตามชื่อ, คณะ, สาขา, ทักษะ, หรือประเภทงาน..."
//             allowClear
//             enterButton={<SearchOutlined />}
//             size="large"
//             onSearch={handleSearch}
//             onChange={(e) => !e.target.value && handleSearch('')}
//             style={{ maxWidth: '600px', display: 'block', margin: '0 auto' }}
//           />

//           <div style={{ marginTop: '16px', textAlign: 'center' }}>
//             <Text type="secondary">
//               พบ {filteredPosts.length} โพสต์{searchTerm && ` จาก "${searchTerm}"`}
//             </Text>
//           </div>
//         </Card>

//         {/* Posts Grid */}
//         {currentPosts.length > 0 ? (
//           <>
//             <Row gutter={[16, 16]}>
//               {currentPosts.map((post) => {
//                 const studentName = post.student ?
//                   `${post.student.first_name || ''} ${post.student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ'
//                   : 'ไม่ระบุชื่อ';

//                 const facultyName = post.faculty?.Name || post.student?.faculty || 'ไม่ระบุคณะ';
//                 const departmentName = post.department?.Name || 'ไม่ระบุสาขา';
//                 const skillsArray = post.skills ? post.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

//                 return (
//                   <Col xs={24} sm={12} lg={8} xl={6} key={post.ID}>
//                     <Card
//                       hoverable
//                       style={{
//                         height: '100%',
//                         borderRadius: '12px',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                       }}
//                       cover={
//                         <div style={{
//                           height: '120px',
//                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           position: 'relative'
//                         }}>
//                           <Avatar
//                             size={64}
//                             src={post.student?.profile_image_url}
//                             icon={<UserOutlined />}
//                             style={{ border: '3px solid white' }}
//                           />
//                           <Tag
//                             color="blue"
//                             style={{
//                               position: 'absolute',
//                               top: '12px',
//                               right: '12px',
//                               borderRadius: '12px'
//                             }}
//                           >
//                             {post.job_type || 'ไม่ระบุ'}
//                           </Tag>
//                         </div>
//                       }
//                       actions={[
//                         <Button
//                           type="text"
//                           icon={<EyeOutlined />}
//                           onClick={() => showPostDetail(post)}
//                         >
//                           ดูรายละเอียด
//                         </Button>,
//                         <Button
//                           type="text"
//                           icon={<UserOutlined />}
//                           onClick={() => goToProfile(post.student?.ID || post.student?.id || post.student_id || 0)}
//                         >
//                           ดูโปรไฟล์
//                         </Button>
//                       ]}
//                     >
//                       <div style={{ padding: '0 8px' }}>
//                         <Title level={5} style={{ margin: '0 0 8px 0', textAlign: 'center' }}>
//                           {studentName}
//                         </Title>

//                         <div style={{ textAlign: 'center', marginBottom: '12px' }}>
//                           <Text type="secondary" style={{ fontSize: '13px' }}>
//                             {facultyName}
//                           </Text>
//                           <br />
//                           <Text type="secondary" style={{ fontSize: '12px' }}>
//                             {departmentName} • ปีที่ {post.year || post.student?.year || 'N/A'}
//                           </Text>
//                         </div>

//                         <Paragraph
//                           ellipsis={{ rows: 2 }}
//                           style={{
//                             fontSize: '13px',
//                             marginBottom: '12px',
//                             minHeight: '36px'
//                           }}
//                         >
//                           {post.introduction || 'ไม่มีการแนะนำตัว'}
//                         </Paragraph>

//                         <div>
//                           <Text strong style={{ fontSize: '12px', color: '#666' }}>ทักษะ:</Text>
//                           <div style={{ marginTop: '4px' }}>
//                             {skillsArray.length > 0 ? (
//                               skillsArray.slice(0, 2).map((skill, index) => (
//                                 <Tag key={index} size="small" style={{ fontSize: '11px', marginBottom: '2px' }}>
//                                   {skill}
//                                 </Tag>
//                               ))
//                             ) : (
//                               <Text type="secondary" style={{ fontSize: '11px' }}>ไม่มีทักษะระบุ</Text>
//                             )}
//                             {skillsArray.length > 2 && (
//                               <Tag size="small" style={{ fontSize: '11px' }}>
//                                 +{skillsArray.length - 2} อื่นๆ
//                               </Tag>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Card>
//                   </Col>
//                 );
//               })}
//             </Row>

//             {/* Pagination */}
//             <div style={{ textAlign: 'center', marginTop: '32px' }}>
//               <Pagination
//                 current={currentPage}
//                 total={filteredPosts.length}
//                 pageSize={pageSize}
//                 onChange={(page) => setCurrentPage(page)}
//                 showSizeChanger={false}
//                 showQuickJumper
//                 showTotal={(total, range) =>
//                   `${range[0]}-${range[1]} จาก ${total} โพสต์`
//                 }
//               />
//             </div>
//           </>
//         ) : (
//           <Empty
//             description={
//               searchTerm
//                 ? `ไม่พบโพสต์ที่ตรงกับ "${searchTerm}"`
//                 : "ยังไม่มีโพสต์หางานจากนักศึกษา"
//             }
//             style={{ padding: '60px 20px' }}
//           />
//         )}

//         {/* Detail Modal */}
//         <Modal
//           title={
//             <div style={{ textAlign: 'center' }}>
//               <Title level={4} style={{ margin: 0 }}>
//                 รายละเอียดโพสต์หางาน
//               </Title>
//             </div>
//           }
//           open={isModalVisible}
//           onCancel={closeModal}
//           footer={[
//             <Button key="profile" type="primary" onClick={() => {
//               if (selectedPost) {
//                 closeModal();
//                 goToProfile(selectedPost.student?.ID || selectedPost.student?.id || selectedPost.student_id || 0);
//               }
//             }}>
//               ดูโปรไฟล์เต็ม
//             </Button>,
//             <Button key="close" onClick={closeModal}>
//               ปิด
//             </Button>
//           ]}
//           width={600}
//           centered
//         >
//           {selectedPost && (
//             <div>
//               {/* Student Info */}
//               <Card size="small" style={{ marginBottom: '16px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                   <Avatar
//                     size={64}
//                     src={selectedPost.student?.profile_image_url}
//                     icon={<UserOutlined />}
//                   />
//                   <div>
//                     <Title level={5} style={{ margin: 0 }}>
//                       {selectedPost.student ?
//                         `${selectedPost.student.first_name || ''} ${selectedPost.student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ'
//                         : 'ไม่ระบุชื่อ'
//                       }
//                     </Title>
//                     <Text type="secondary">
//                       คณะ/สาขา: {selectedPost.faculty?.Name || selectedPost.student?.faculty || 'ไม่ระบุ'} / {selectedPost.department?.Name || 'ไม่ระบุ'}
//                     </Text>
//                     <br />
//                     <Text type="secondary">
//                       ชั้นปี: {selectedPost.year || selectedPost.student?.year || 'ไม่ระบุ'}
//                     </Text>
//                   </div>
//                 </div>
//               </Card>

//               {/* Job Type */}
//               <div style={{ marginBottom: '16px' }}>
//                 <Text strong>ประเภทงานที่ต้องการ:</Text>
//                 <div style={{ marginTop: '4px' }}>
//                   <Tag color="blue" style={{ borderRadius: '12px' }}>
//                     {selectedPost.job_type || 'ไม่ระบุ'}
//                   </Tag>
//                 </div>
//               </div>

//               {/* Introduction */}
//               <div style={{ marginBottom: '16px' }}>
//                 <Text strong>แนะนำตัว:</Text>
//                 <Paragraph style={{ marginTop: '8px', background: '#f9f9f9', padding: '12px', borderRadius: '6px' }}>
//                   {selectedPost.introduction || 'ไม่มีการแนะนำตัว'}
//                 </Paragraph>
//               </div>

//               {/* Skills */}
//               <div style={{ marginBottom: '16px' }}>
//                 <Text strong>ทักษะ:</Text>
//                 <div style={{ marginTop: '8px' }}>
//                   {selectedPost.skills ? (
//                     selectedPost.skills.split(',').map((skill, index) => (
//                       <Tag key={index} color="geekblue" style={{ marginBottom: '4px' }}>
//                         {skill.trim()}
//                       </Tag>
//                     ))
//                   ) : (
//                     <Text type="secondary">ไม่มีทักษะระบุ</Text>
//                   )}
//                 </div>
//               </div>

//               {/* Portfolio */}
//               {selectedPost.portfolio_url && (
//                 <div style={{ marginBottom: '16px' }}>
//                   <Text strong>ผลงาน:</Text>
//                   <div style={{ marginTop: '4px' }}>
//                     <a
//                       href={selectedPost.portfolio_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{ color: '#1890ff' }}
//                     >
//                       ดูผลงาน
//                     </a>
//                   </div>
//                 </div>
//               )}

//               {/* Contact Info */}
//               <Divider />
//               <div>
//                 <Text strong>ข้อมูลติดต่อ:</Text>
//                 <div style={{ marginTop: '8px' }}>
//                   {selectedPost.email && (
//                     <div style={{ marginBottom: '4px' }}>
//                       <MailOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
//                       <Text copyable>{selectedPost.email}</Text>
//                     </div>
//                   )}
//                   {selectedPost.phone && (
//                     <div>
//                       <PhoneOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
//                       <Text copyable>{selectedPost.phone}</Text>
//                     </div>
//                   )}
//                   {!selectedPost.email && !selectedPost.phone && (
//                     <Text type="secondary">ไม่มีข้อมูลติดต่อในโพสต์นี้</Text>
//                   )}
//                 </div>
//               </div>

//               {/* Created Date */}
//               <div style={{ marginTop: '16px', textAlign: 'right' }}>
//                 <Text type="secondary" style={{ fontSize: '12px' }}>
//                   โพสต์เมื่อ: {new Date(selectedPost.CreatedAt).toLocaleDateString('th-TH', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </Text>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default StudentFeedPage;

// // src/pages/StudentFeed/StudentFeedPage.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Card,
//   Col,
//   Row,
//   Typography,
//   Tag,
//   Avatar,
//   Button,
//   Input,
//   Space,
//   Modal,
//   Spin,
//   message,
//   Empty,
//   Divider,
//   Pagination
// } from 'antd';
// import {
//   UserOutlined,
//   SearchOutlined,
//   EyeOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   BookOutlined,
//   StarOutlined,
//   PlusOutlined // เพิ่มนี้
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext'; // เพิ่มนี้
// import { getStudentProfilePosts } from '../../services/studentPostService';

// const { Title, Text, Paragraph } = Typography;
// const { Search } = Input;

// // Interface สำหรับ StudentProfilePost
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
// }

// interface Faculty {
//   ID: number;
//   Name: string;
// }

// interface Department {
//   ID: number;
//   Name: string;
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
//   faculty_id?: number;
//   faculty?: Faculty;
//   department_id?: number;
//   department?: Department;
// }

// const StudentFeedPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth(); // เพิ่มนี้
//   const [posts, setPosts] = useState<StudentProfilePost[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<StudentProfilePost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(12);

//   // ตรวจสอบว่าเป็นนักศึกษาหรือไม่ - เพิ่มนี้
//   const isStudent = user && (user.role === 'student' || user.role === 'stu');

//   // ดึงข้อมูลโพสต์จาก API
//   const fetchPosts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await getStudentProfilePosts();
//       console.log('📄 Student posts response:', response);

//       // ตรวจสอบโครงสร้างข้อมูลที่ได้รับ
//       const postsData = response?.data || response || [];

//       if (Array.isArray(postsData)) {
//         setPosts(postsData);
//         setFilteredPosts(postsData);
//       } else {
//         console.error('Invalid posts data structure:', response);
//         setPosts([]);
//         setFilteredPosts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching student posts:', error);
//       message.error('ไม่สามารถโหลดข้อมูลโพสต์ได้');
//       setPosts([]);
//       setFilteredPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   // ฟังก์ชันค้นหา
//   const handleSearch = useCallback((value: string) => {
//     setSearchTerm(value);
//     setCurrentPage(1);

//     if (!value.trim()) {
//       setFilteredPosts(posts);
//       return;
//     }

//     const searchLower = value.toLowerCase();
//     const filtered = posts.filter(post => {
//       const studentName = post.student ?
//         `${post.student.first_name || ''} ${post.student.last_name || ''}`.toLowerCase() : '';
//       const facultyName = post.faculty?.Name?.toLowerCase() || post.student?.faculty?.toLowerCase() || '';
//       const departmentName = post.department?.Name?.toLowerCase() || '';
//       const skills = post.skills?.toLowerCase() || '';
//       const introduction = post.introduction?.toLowerCase() || '';
//       const jobType = post.job_type?.toLowerCase() || '';

//       return (
//         studentName.includes(searchLower) ||
//         facultyName.includes(searchLower) ||
//         departmentName.includes(searchLower) ||
//         skills.includes(searchLower) ||
//         introduction.includes(searchLower) ||
//         jobType.includes(searchLower)
//       );
//     });

//     setFilteredPosts(filtered);
//   }, [posts]);

//   // แสดง Modal รายละเอียด
//   const showPostDetail = (post: StudentProfilePost) => {
//     setSelectedPost(post);
//     setIsModalVisible(true);
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//     setSelectedPost(null);
//   };

//   // ไปหน้าโปรไฟล์
//   const goToProfile = (studentId: number) => {
//     navigate(`/profile/${studentId}`);
//   };

//   // ไปหน้าสร้างโพสต์ - เพิ่มนี้
//   const goToCreatePost = () => {
//     navigate('/feed');
//   };

//   // คำนวณข้อมูลสำหรับ Pagination
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentPosts = filteredPosts.slice(startIndex, endIndex);

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '50vh'
//       }}>
//         <Spin size="large" />
//         <Text style={{ marginLeft: '16px' }}>กำลังโหลดข้อมูลโพสต์...</Text>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//         {/* Header - แก้ไขให้มีปุ่มโพสต์ */}
//         <div style={{ marginBottom: '24px' }}>
//           <Row justify="space-between" align="middle">
//             <Col>
//               <div style={{ textAlign: 'center' }}>
//                 <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
//                   <BookOutlined /> โพสต์หางานของนักศึกษา
//                 </Title>
//                 <Text type="secondary" style={{ fontSize: '16px' }}>
//                   ค้นหานักศึกษาที่เหมาะสมสำหรับงานของคุณ
//                 </Text>
//               </div>
//             </Col>

//             {/* ปุ่มโพสต์ - แสดงเฉพาะนักศึกษา */}
//             {isStudent && (
//               <Col>
//                 <Button
//                   type="primary"
//                   size="large"
//                   icon={<PlusOutlined />}
//                   onClick={goToCreatePost}
//                   style={{
//                     borderRadius: '8px',
//                     fontWeight: '500'
//                   }}
//                 >
//                   สร้างโพสต์หางาน
//                 </Button>
//               </Col>
//             )}
//           </Row>
//         </div>

//         {/* Search Bar */}
//         <Card style={{ marginBottom: '24px' }}>
//           <Search
//             placeholder="ค้นหาตามชื่อ, คณะ, สาขา, ทักษะ, หรือประเภทงาน..."
//             allowClear
//             enterButton={<SearchOutlined />}
//             size="large"
//             onSearch={handleSearch}
//             onChange={(e) => !e.target.value && handleSearch('')}
//             style={{ maxWidth: '600px', display: 'block', margin: '0 auto' }}
//           />

//           <div style={{ marginTop: '16px', textAlign: 'center' }}>
//             <Text type="secondary">
//               พบ {filteredPosts.length} โพสต์{searchTerm && ` จาก "${searchTerm}"`}
//             </Text>
//           </div>
//         </Card>

//         {/* Posts Grid */}
//         {currentPosts.length > 0 ? (
//           <>
//             <Row gutter={[16, 16]}>
//               {currentPosts.map((post) => {
//                 const studentName = post.student ?
//                   `${post.student.first_name || ''} ${post.student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ'
//                   : 'ไม่ระบุชื่อ';

//                 const facultyName = post.faculty?.Name || post.student?.faculty || 'ไม่ระบุคณะ';
//                 const departmentName = post.department?.Name || 'ไม่ระบุสาขา';
//                 const skillsArray = post.skills ? post.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

//                 return (
//                   <Col xs={24} sm={12} lg={8} xl={6} key={post.ID}>
//                     <Card
//                       hoverable
//                       style={{
//                         height: '100%',
//                         borderRadius: '12px',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                       }}
//                       cover={
//                         <div style={{
//                           height: '120px',
//                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           position: 'relative'
//                         }}>
//                           <Avatar
//                             size={64}
//                             src={post.student?.profile_image_url}
//                             icon={<UserOutlined />}
//                             style={{ border: '3px solid white' }}
//                           />
//                           <Tag
//                             color="blue"
//                             style={{
//                               position: 'absolute',
//                               top: '12px',
//                               right: '12px',
//                               borderRadius: '12px'
//                             }}
//                           >
//                             {post.job_type || 'ไม่ระบุ'}
//                           </Tag>
//                         </div>
//                       }
//                       actions={[
//                         <Button
//                           type="text"
//                           icon={<EyeOutlined />}
//                           onClick={() => showPostDetail(post)}
//                         >
//                           ดูรายละเอียด
//                         </Button>,
//                         <Button
//                           type="text"
//                           icon={<UserOutlined />}
//                           onClick={() => goToProfile(post.student?.ID || post.student?.id || post.student_id || 0)}
//                         >
//                           ดูโปรไฟล์
//                         </Button>
//                       ]}
//                     >
//                       <div style={{ padding: '0 8px' }}>
//                         <Title level={5} style={{ margin: '0 0 8px 0', textAlign: 'center' }}>
//                           {studentName}
//                         </Title>

//                         <div style={{ textAlign: 'center', marginBottom: '12px' }}>
//                           <Text type="secondary" style={{ fontSize: '13px' }}>
//                             {facultyName}
//                           </Text>
//                           <br />
//                           <Text type="secondary" style={{ fontSize: '12px' }}>
//                             {departmentName} • ปีที่ {post.year || post.student?.year || 'N/A'}
//                           </Text>
//                         </div>

//                         <Paragraph
//                           ellipsis={{ rows: 2 }}
//                           style={{
//                             fontSize: '13px',
//                             marginBottom: '12px',
//                             minHeight: '36px'
//                           }}
//                         >
//                           {post.introduction || 'ไม่มีการแนะนำตัว'}
//                         </Paragraph>

//                         <div>
//                           <Text strong style={{ fontSize: '12px', color: '#666' }}>ทักษะ:</Text>
//                           <div style={{ marginTop: '4px' }}>
//                             {skillsArray.length > 0 ? (
//                               skillsArray.slice(0, 2).map((skill, index) => (
//                                 <Tag key={index} size="small" style={{ fontSize: '11px', marginBottom: '2px' }}>
//                                   {skill}
//                                 </Tag>
//                               ))
//                             ) : (
//                               <Text type="secondary" style={{ fontSize: '11px' }}>ไม่มีทักษะระบุ</Text>
//                             )}
//                             {skillsArray.length > 2 && (
//                               <Tag size="small" style={{ fontSize: '11px' }}>
//                                 +{skillsArray.length - 2} อื่นๆ
//                               </Tag>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </Card>
//                   </Col>
//                 );
//               })}
//             </Row>

//             {/* Pagination */}
//             <div style={{ textAlign: 'center', marginTop: '32px' }}>
//               <Pagination
//                 current={currentPage}
//                 total={filteredPosts.length}
//                 pageSize={pageSize}
//                 onChange={(page) => setCurrentPage(page)}
//                 showSizeChanger={false}
//                 showQuickJumper
//                 showTotal={(total, range) =>
//                   `${range[0]}-${range[1]} จาก ${total} โพสต์`
//                 }
//               />
//             </div>
//           </>
//         ) : (
//           <Empty
//             description={
//               searchTerm
//                 ? `ไม่พบโพสต์ที่ตรงกับ "${searchTerm}"`
//                 : "ยังไม่มีโพสต์หางานจากนักศึกษา"
//             }
//             style={{ padding: '60px 20px' }}
//           >
//             {/* ปุ่มสร้างโพสต์ใน Empty State */}
//             {isStudent && !searchTerm && (
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={goToCreatePost}
//                 size="large"
//               >
//                 สร้างโพสต์หางานแรกของคุณ
//               </Button>
//             )}
//           </Empty>
//         )}

//         {/* Detail Modal */}
//         <Modal
//           title={
//             <div style={{ textAlign: 'center' }}>
//               <Title level={4} style={{ margin: 0 }}>
//                 รายละเอียดโพสต์หางาน
//               </Title>
//             </div>
//           }
//           open={isModalVisible}
//           onCancel={closeModal}
//           footer={[
//             <Button key="profile" type="primary" onClick={() => {
//               if (selectedPost) {
//                 closeModal();
//                 goToProfile(selectedPost.student?.ID || selectedPost.student?.id || selectedPost.student_id || 0);
//               }
//             }}>
//               ดูโปรไฟล์เต็ม
//             </Button>,
//             <Button key="close" onClick={closeModal}>
//               ปิด
//             </Button>
//           ]}
//           width={600}
//           centered
//         >
//           {selectedPost && (
//             <div>
//               {/* Student Info */}
//               <Card size="small" style={{ marginBottom: '16px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                   <Avatar
//                     size={64}
//                     src={selectedPost.student?.profile_image_url}
//                     icon={<UserOutlined />}
//                   />
//                   <div>
//                     <Title level={5} style={{ margin: 0 }}>
//                       {selectedPost.student ?
//                         `${selectedPost.student.first_name || ''} ${selectedPost.student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ'
//                         : 'ไม่ระบุชื่อ'
//                       }
//                     </Title>
//                     <Text type="secondary">
//                       คณะ/สาขา: {selectedPost.faculty?.Name || selectedPost.student?.faculty || 'ไม่ระบุ'} / {selectedPost.department?.Name || 'ไม่ระบุ'}
//                     </Text>
//                     <br />
//                     <Text type="secondary">
//                       ชั้นปี: {selectedPost.year || selectedPost.student?.year || 'ไม่ระบุ'}
//                     </Text>
//                   </div>
//                 </div>
//               </Card>

//               {/* Job Type */}
//               <div style={{ marginBottom: '16px' }}>
//                 <Text strong>ประเภทงานที่ต้องการ:</Text>
//                 <div style={{ marginTop: '4px' }}>
//                   <Tag color="blue" style={{ borderRadius: '12px' }}>
//                     {selectedPost.job_type || 'ไม่ระบุ'}
//                   </Tag>
//                 </div>
//               </div>

//               {/* Introduction */}
//               <div style={{ marginBottom: '16px' }}>
//                 <Text strong>แนะนำตัว:</Text>
//                 <Paragraph style={{ marginTop: '8px', background: '#f9f9f9', padding: '12px', borderRadius: '6px' }}>
//                   {selectedPost.introduction || 'ไม่มีการแนะนำตัว'}
//                 </Paragraph>
//               </div>

//               {/* Skills */}
//               <div style={{ marginBottom: '16px' }}>
//                 <Text strong>ทักษะ:</Text>
//                 <div style={{ marginTop: '8px' }}>
//                   {selectedPost.skills ? (
//                     selectedPost.skills.split(',').map((skill, index) => (
//                       <Tag key={index} color="geekblue" style={{ marginBottom: '4px' }}>
//                         {skill.trim()}
//                       </Tag>
//                     ))
//                   ) : (
//                     <Text type="secondary">ไม่มีทักษะระบุ</Text>
//                   )}
//                 </div>
//               </div>

//               {/* Portfolio */}
//               {selectedPost.portfolio_url && (
//                 <div style={{ marginBottom: '16px' }}>
//                   <Text strong>ผลงาน:</Text>
//                   <div style={{ marginTop: '4px' }}>
//                     <a
//                       href={selectedPost.portfolio_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{ color: '#1890ff' }}
//                     >
//                       ดูผลงาน
//                     </a>
//                   </div>
//                 </div>
//               )}

//               {/* Contact Info */}
//               <Divider />
//               <div>
//                 <Text strong>ข้อมูลติดต่อ:</Text>
//                 <div style={{ marginTop: '8px' }}>
//                   {selectedPost.email && (
//                     <div style={{ marginBottom: '4px' }}>
//                       <MailOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
//                       <Text copyable>{selectedPost.email}</Text>
//                     </div>
//                   )}
//                   {selectedPost.phone && (
//                     <div>
//                       <PhoneOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
//                       <Text copyable>{selectedPost.phone}</Text>
//                     </div>
//                   )}
//                   {!selectedPost.email && !selectedPost.phone && (
//                     <Text type="secondary">ไม่มีข้อมูลติดต่อในโพสต์นี้</Text>
//                   )}
//                 </div>
//               </div>

//               {/* Created Date */}
//               <div style={{ marginTop: '16px', textAlign: 'right' }}>
//                 <Text type="secondary" style={{ fontSize: '12px' }}>
//                   โพสต์เมื่อ: {new Date(selectedPost.CreatedAt).toLocaleDateString('th-TH', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </Text>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default StudentFeedPage;

// src/pages/StudentFeed/StudentFeedPage.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Card,
//   Col,
//   Row,
//   Typography,
//   Tag,
//   Avatar,
//   Button,
//   Input,
//   Space,
//   Modal,
//   Spin,
//   message,
//   Empty,
//   Divider,
//   Pagination,
//   Badge
// } from 'antd';
// import {
//   UserOutlined,
//   SearchOutlined,
//   EyeOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   BookOutlined,
//   StarOutlined,
//   PlusOutlined,
//   FireOutlined,
//   HeartOutlined,
//   TrophyOutlined
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { getStudentProfilePosts } from '../../services/studentPostService';

// const { Title, Text, Paragraph } = Typography;
// const { Search } = Input;

// // Interface สำหรับ StudentProfilePost
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
// }

// interface Faculty {
//   ID: number;
//   Name: string;
// }

// interface Department {
//   ID: number;
//   Name: string;
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
//   faculty_id?: number;
//   faculty?: Faculty;
//   department_id?: number;
//   department?: Department;
// }

// const StudentFeedPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [posts, setPosts] = useState<StudentProfilePost[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<StudentProfilePost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(12);

//   const isStudent = user && (user.role === 'student' || user.role === 'stu');

//   // ดึงข้อมูลโพสต์จาก API
//   const fetchPosts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await getStudentProfilePosts();
//       console.log('📄 Student posts response:', response);

//       const postsData = response?.data || response || [];

//       if (Array.isArray(postsData)) {
//         setPosts(postsData);
//         setFilteredPosts(postsData);
//       } else {
//         console.error('Invalid posts data structure:', response);
//         setPosts([]);
//         setFilteredPosts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching student posts:', error);
//       message.error('ไม่สามารถโหลดข้อมูลโพสต์ได้');
//       setPosts([]);
//       setFilteredPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   // ฟังก์ชันค้นหา
//   const handleSearch = useCallback((value: string) => {
//     setSearchTerm(value);
//     setCurrentPage(1);

//     if (!value.trim()) {
//       setFilteredPosts(posts);
//       return;
//     }

//     const searchLower = value.toLowerCase();
//     const filtered = posts.filter(post => {
//       const studentName = post.student ?
//         `${post.student.first_name || ''} ${post.student.last_name || ''}`.toLowerCase() : '';
//       const facultyName = post.faculty?.Name?.toLowerCase() || post.student?.faculty?.toLowerCase() || '';
//       const departmentName = post.department?.Name?.toLowerCase() || '';
//       const skills = post.skills?.toLowerCase() || '';
//       const introduction = post.introduction?.toLowerCase() || '';
//       const jobType = post.job_type?.toLowerCase() || '';

//       return (
//         studentName.includes(searchLower) ||
//         facultyName.includes(searchLower) ||
//         departmentName.includes(searchLower) ||
//         skills.includes(searchLower) ||
//         introduction.includes(searchLower) ||
//         jobType.includes(searchLower)
//       );
//     });

//     setFilteredPosts(filtered);
//   }, [posts]);

//   // แสดง Modal รายละเอียด
//   const showPostDetail = (post: StudentProfilePost) => {
//     setSelectedPost(post);
//     setIsModalVisible(true);
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//     setSelectedPost(null);
//   };

//   // ไปหน้าโปรไฟล์
//   const goToProfile = (studentId: number) => {
//     navigate(`/profile/${studentId}`);
//   };

//   // ไปหน้าสร้างโพสต์
//   const goToCreatePost = () => {
//     navigate('/feed');
//   };

//   // คำนวณข้อมูลสำหรับ Pagination
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentPosts = filteredPosts.slice(startIndex, endIndex);

//   // Get gradient colors for different job types
//   const getJobTypeGradient = (jobType: string) => {
//     const gradients = {
//       'Full-time': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       'Part-time': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//       'Internship': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//       'Freelance': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//       'Contract': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
//       'default': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//     };
//     return gradients[jobType as keyof typeof gradients] || gradients.default;
//   };

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         flexDirection: 'column'
//       }}>
//         <div style={{
//           background: 'rgba(255, 255, 255, 0.9)',
//           padding: '40px',
//           borderRadius: '20px',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//           backdropFilter: 'blur(10px)',
//           textAlign: 'center'
//         }}>
//           <Spin size="large" />
//           <Text style={{
//             marginTop: '20px',
//             color: '#666',
//             fontSize: '16px',
//             display: 'block'
//           }}>
//             กำลังโหลดข้อมูลโพสต์งานสุดพิเศษ...
//           </Text>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//       position: 'relative'
//     }}>
//       {/* Background decorative elements */}
//       <div style={{
//         position: 'absolute',
//         top: '10%',
//         right: '10%',
//         width: '200px',
//         height: '200px',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         borderRadius: '50%',
//         opacity: 0.1,
//         zIndex: 0
//       }} />
//       <div style={{
//         position: 'absolute',
//         bottom: '20%',
//         left: '5%',
//         width: '150px',
//         height: '150px',
//         background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//         borderRadius: '50%',
//         opacity: 0.1,
//         zIndex: 0
//       }} />

//       <div style={{
//         padding: '40px 24px',
//         position: 'relative',
//         zIndex: 1
//       }}>
//         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
//           {/* Header */}
//           <div style={{
//             marginBottom: '40px',
//             textAlign: 'center',
//             position: 'relative'
//           }}>
//             <div style={{
//               background: 'rgba(255, 255, 255, 0.95)',
//               backdropFilter: 'blur(20px)',
//               borderRadius: '24px',
//               padding: '32px',
//               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//               border: '1px solid rgba(255, 255, 255, 0.2)'
//             }}>
//               <Row justify="space-between" align="middle">
//                 <Col flex="auto">
//                   <Space direction="vertical" size={0} style={{ width: '100%' }}>
//                     <Title level={1} style={{
//                       margin: 0,
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent',
//                       backgroundClip: 'text',
//                       fontSize: '2.5rem',
//                       fontWeight: 'bold'
//                     }}>
//                       <TrophyOutlined style={{ marginRight: '16px' }} />
//                       โพสต์หางานของนักศึกษา
//                     </Title>
//                     <Text style={{
//                       fontSize: '18px',
//                       color: '#666',
//                       marginTop: '8px'
//                     }}>
//                       ค้นพบนักศึกษาที่เหมาะสมสำหรับองค์กรของคุณ
//                     </Text>
//                   </Space>
//                 </Col>

//                 {isStudent && (
//                   <Col>
//                     <Button
//                       type="primary"
//                       size="large"
//                       icon={<PlusOutlined />}
//                       onClick={goToCreatePost}
//                       style={{
//                         height: '56px',
//                         padding: '0 32px',
//                         borderRadius: '16px',
//                         fontSize: '16px',
//                         fontWeight: '600',
//                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                         border: 'none',
//                         boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
//                         transition: 'all 0.3s ease'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = 'translateY(-2px)';
//                         e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = 'translateY(0px)';
//                         e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.4)';
//                       }}
//                     >
//                       สร้างโพสต์หางาน
//                     </Button>
//                   </Col>
//                 )}
//               </Row>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <Card style={{
//             marginBottom: '32px',
//             borderRadius: '20px',
//             border: 'none',
//             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
//             background: 'rgba(255, 255, 255, 0.95)',
//             backdropFilter: 'blur(20px)'
//           }}>
//             <div style={{ textAlign: 'center' }}>
//               <Search
//                 placeholder="🔍 ค้นหาตามชื่อ, คณะ, สาขา, ทักษะ, หรือประเภทงาน..."
//                 allowClear
//                 enterButton={
//                   <Button
//                     icon={<SearchOutlined />}
//                     style={{
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       border: 'none',
//                       borderRadius: '0 12px 12px 0'
//                     }}
//                   />
//                 }
//                 size="large"
//                 onSearch={handleSearch}
//                 onChange={(e) => !e.target.value && handleSearch('')}
//                 style={{
//                   maxWidth: '700px',
//                   borderRadius: '12px',
//                   overflow: 'hidden'
//                 }}
//               />

//               <div style={{
//                 marginTop: '20px',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 gap: '16px'
//               }}>
//                 <Badge
//                   count={filteredPosts.length}
//                   showZero
//                   style={{
//                     backgroundColor: '#52c41a',
//                     fontWeight: 'bold'
//                   }}
//                 >
//                   <Text style={{
//                     fontSize: '16px',
//                     color: '#666',
//                     marginRight: '8px'
//                   }}>
//                     พบโพสต์ทั้งหมด
//                   </Text>
//                 </Badge>
//                 {searchTerm && (
//                   <Tag
//                     color="blue"
//                     style={{
//                       fontSize: '14px',
//                       padding: '4px 12px',
//                       borderRadius: '20px'
//                     }}
//                   >
//                     ค้นหา: "{searchTerm}"
//                   </Tag>
//                 )}
//               </div>
//             </div>
//           </Card>

//           {/* Posts Grid */}
//           {currentPosts.length > 0 ? (
//             <>
//               <Row gutter={[24, 24]}>
//                 {currentPosts.map((post) => {
//                   const studentName = post.student ?
//                     `${post.student.first_name || ''} ${post.student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ'
//                     : 'ไม่ระบุชื่อ';

//                   const facultyName = post.faculty?.Name || post.student?.faculty || 'ไม่ระบุคณะ';
//                   const departmentName = post.department?.Name || 'ไม่ระบุสาขา';
//                   const skillsArray = post.skills ? post.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

//                   return (
//                     <Col xs={24} sm={12} lg={8} xl={6} key={post.ID}>
//                       <Card
//                         hoverable
//                         style={{
//                           height: '100%',
//                           borderRadius: '20px',
//                           border: 'none',
//                           overflow: 'hidden',
//                           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//                           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                           background: 'rgba(255, 255, 255, 0.95)',
//                           backdropFilter: 'blur(20px)'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
//                           e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = 'translateY(0px) scale(1)';
//                           e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
//                         }}
//                         cover={
//                           <div style={{
//                             height: '140px',
//                             background: getJobTypeGradient(post.job_type || 'default'),
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             position: 'relative',
//                             overflow: 'hidden'
//                           }}>
//                             {/* Background pattern */}
//                             <div style={{
//                               position: 'absolute',
//                               top: 0,
//                               left: 0,
//                               right: 0,
//                               bottom: 0,
//                               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                               opacity: 0.3
//                             }} />

//                             <Avatar
//                               size={80}
//                               src={post.student?.profile_image_url}
//                               icon={<UserOutlined />}
//                               style={{
//                                 border: '4px solid rgba(255, 255, 255, 0.8)',
//                                 boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
//                                 position: 'relative',
//                                 zIndex: 2
//                               }}
//                             />

//                             <div style={{
//                               position: 'absolute',
//                               top: '16px',
//                               right: '16px',
//                               zIndex: 3
//                             }}>
//                               <Tag
//                                 color="rgba(255, 255, 255, 0.9)"
//                                 style={{
//                                   color: '#333',
//                                   fontWeight: '600',
//                                   borderRadius: '20px',
//                                   padding: '4px 12px',
//                                   fontSize: '12px',
//                                   border: 'none',
//                                   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
//                                 }}
//                               >
//                                 {post.job_type || 'ไม่ระบุ'}
//                               </Tag>
//                             </div>

//                             {/* Online indicator */}
//                             <div style={{
//                               position: 'absolute',
//                               bottom: '16px',
//                               left: '16px',
//                               zIndex: 3
//                             }}>
//                               <Badge status="success" text={
//                                 <Text style={{ color: 'white', fontSize: '12px', fontWeight: '500' }}>
//                                   พร้อมทำงาน
//                                 </Text>
//                               } />
//                             </div>
//                           </div>
//                         }
//                         actions={[
//                           <Button
//                             type="text"
//                             icon={<EyeOutlined />}
//                             onClick={() => showPostDetail(post)}
//                             style={{
//                               color: '#1890ff',
//                               fontWeight: '500',
//                               border: 'none',
//                               borderRadius: '8px'
//                             }}
//                           >
//                             ดูรายละเอียด
//                           </Button>,
//                           <Button
//                             type="text"
//                             icon={<UserOutlined />}
//                             onClick={() => goToProfile(post.student?.ID || post.student?.id || post.student_id || 0)}
//                             style={{
//                               color: '#52c41a',
//                               fontWeight: '500',
//                               border: 'none',
//                               borderRadius: '8px'
//                             }}
//                           >
//                             ดูโปรไฟล์
//                           </Button>
//                         ]}
//                       >
//                         <div style={{ padding: '8px 16px' }}>
//                           <Title level={4} style={{
//                             margin: '0 0 12px 0',
//                             textAlign: 'center',
//                             color: '#262626',
//                             fontSize: '18px',
//                             fontWeight: '600'
//                           }}>
//                             {studentName}
//                           </Title>

//                           <div style={{
//                             textAlign: 'center',
//                             marginBottom: '16px',
//                             background: '#f8f9fa',
//                             padding: '12px',
//                             borderRadius: '12px'
//                           }}>
//                             <Text style={{
//                               fontSize: '14px',
//                               color: '#1890ff',
//                               fontWeight: '500',
//                               display: 'block',
//                               marginBottom: '4px'
//                             }}>
//                               🏛️ {facultyName}
//                             </Text>
//                             <Text style={{
//                               fontSize: '13px',
//                               color: '#666'
//                             }}>
//                               📚 {departmentName} • ปีที่ {post.year || post.student?.year || 'N/A'}
//                             </Text>
//                           </div>

//                           <Paragraph
//                             ellipsis={{ rows: 2 }}
//                             style={{
//                               fontSize: '14px',
//                               marginBottom: '16px',
//                               minHeight: '40px',
//                               color: '#666',
//                               lineHeight: '1.5'
//                             }}
//                           >
//                             💭 {post.introduction || 'ไม่มีการแนะนำตัว'}
//                           </Paragraph>

//                           <div>
//                             <Text strong style={{
//                               fontSize: '13px',
//                               color: '#8c8c8c',
//                               display: 'block',
//                               marginBottom: '8px'
//                             }}>
//                               🛠️ ทักษะ:
//                             </Text>
//                             <div style={{ minHeight: '32px' }}>
//                               {skillsArray.length > 0 ? (
//                                 skillsArray.slice(0, 2).map((skill, index) => (
//                                   <Tag
//                                     key={index}
//                                     style={{
//                                       fontSize: '11px',
//                                       marginBottom: '4px',
//                                       borderRadius: '12px',
//                                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                                       color: 'white',
//                                       border: 'none'
//                                     }}
//                                   >
//                                     {skill}
//                                   </Tag>
//                                 ))
//                               ) : (
//                                 <Text type="secondary" style={{ fontSize: '12px' }}>
//                                   ไม่มีทักษะระบุ
//                                 </Text>
//                               )}
//                               {skillsArray.length > 2 && (
//                                 <Tag style={{
//                                   fontSize: '11px',
//                                   background: 'rgba(0, 0, 0, 0.05)',
//                                   color: '#666',
//                                   border: '1px solid #d9d9d9',
//                                   borderRadius: '12px'
//                                 }}>
//                                   +{skillsArray.length - 2} เพิ่มเติม
//                                 </Tag>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </Card>
//                     </Col>
//                   );
//                 })}
//               </Row>

//               {/* Pagination */}
//               <div style={{
//                 textAlign: 'center',
//                 marginTop: '48px',
//                 padding: '24px',
//                 background: 'rgba(255, 255, 255, 0.8)',
//                 backdropFilter: 'blur(10px)',
//                 borderRadius: '16px',
//                 border: '1px solid rgba(255, 255, 255, 0.2)'
//               }}>
//                 <Pagination
//                   current={currentPage}
//                   total={filteredPosts.length}
//                   pageSize={pageSize}
//                   onChange={(page) => setCurrentPage(page)}
//                   showSizeChanger={false}
//                   showQuickJumper
//                   showTotal={(total, range) =>
//                     `📄 ${range[0]}-${range[1]} จาก ${total} โพสต์`
//                   }
//                   style={{
//                     fontSize: '16px'
//                   }}
//                 />
//               </div>
//             </>
//           ) : (
//             <div style={{
//               textAlign: 'center',
//               padding: '80px 40px',
//               background: 'rgba(255, 255, 255, 0.9)',
//               borderRadius: '24px',
//               backdropFilter: 'blur(20px)',
//               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
//             }}>
//               <Empty
//                 description={
//                   <div>
//                     <Text style={{
//                       fontSize: '18px',
//                       color: '#666',
//                       display: 'block',
//                       marginBottom: '8px'
//                     }}>
//                       {searchTerm ?
//                         `🔍 ไม่พบโพสต์ที่ตรงกับ "${searchTerm}"` :
//                         "📝 ยังไม่มีโพสต์หางานจากนักศึกษา"
//                       }
//                     </Text>
//                     <Text style={{ fontSize: '14px', color: '#999' }}>
//                       {isStudent ? '🚀 เริ่มต้นสร้างโพสต์หางานแรกของคุณเลย!' : '⏳ กลับมาดูใหม่ในภายหลัง'}
//                     </Text>
//                   </div>
//                 }
//                 image={Empty.PRESENTED_IMAGE_SIMPLE}
//               >
//                 {isStudent && !searchTerm && (
//                   <Button
//                     type="primary"
//                     icon={<PlusOutlined />}
//                     onClick={goToCreatePost}
//                     size="large"
//                     style={{
//                       height: '48px',
//                       padding: '0 24px',
//                       borderRadius: '12px',
//                       fontSize: '16px',
//                       fontWeight: '600',
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       border: 'none',
//                       boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
//                     }}
//                   >
//                     สร้างโพสต์หางานแรกของคุณ
//                   </Button>
//                 )}
//               </Empty>
//             </div>
//           )}

//           {/* Detail Modal */}
//           <Modal
//             title={null}
//             open={isModalVisible}
//             onCancel={closeModal}
//             footer={null}
//             width={700}
//             centered
//             style={{
//               borderRadius: '20px',
//               overflow: 'hidden'
//             }}
//             bodyStyle={{
//               padding: 0,
//               borderRadius: '20px',
//               overflow: 'hidden'
//             }}
//           >
//             {selectedPost && (
//               <div style={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 position: 'relative'
//               }}>
//                 {/* Modal Header */}
//                 <div style={{
//                   padding: '24px',
//                   textAlign: 'center',
//                   color: 'white'
//                 }}>
//                   <Avatar
//                     size={80}
//                     src={selectedPost.student?.profile_image_url}
//                     icon={<UserOutlined />}
//                     style={{
//                       marginBottom: '16px',
//                       border: '3px solid rgba(255, 255, 255, 0.8)'
//                     }}
//                   />
//                   <Title level={3} style={{
//                     color: 'white',
//                     margin: '0 0 8px 0'
//                   }}>
//                     {selectedPost.student ?
//                       `${selectedPost.student.first_name || ''} ${selectedPost.student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ'
//                       : 'ไม่ระบุชื่อ'
//                     }
//                   </Title>
//                   <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
//                     {selectedPost.faculty?.Name || selectedPost.student?.faculty || 'ไม่ระบุ'} • {selectedPost.department?.Name || 'ไม่ระบุ'}
//                   </Text>
//                   <br />
//                   <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
//                     ปีการศึกษา {selectedPost.year || selectedPost.student?.year || 'ไม่ระบุ'}
//                   </Text>
//                 </div>

//                 {/* Modal Content */}
//                 <div style={{
//                   background: 'white',
//                   padding: '32px',
//                   borderRadius: '20px 20px 0 0',
//                   marginTop: '-10px'
//                 }}>
//                   {/* Job Type */}
//                   <div style={{ marginBottom: '24px', textAlign: 'center' }}>
//                     <Text strong style={{ fontSize: '16px', color: '#666' }}>ประเภทงานที่ต้องการ</Text>
//                     <div style={{ marginTop: '8px' }}>
//                       <Tag style={{
//                         fontSize: '14px',
//                         padding: '8px 16px',
//                         borderRadius: '20px',
//                         background: getJobTypeGradient(selectedPost.job_type || 'default'),
//                         color: 'white',
//                         border: 'none',
//                         fontWeight: '600'
//                       }}>
//                         {selectedPost.job_type || 'ไม่ระบุ'}
//                       </Tag>
//                     </div>
//                   </div>

//                   <Divider />

//                   {/* Introduction */}
//                   <div style={{ marginBottom: '24px' }}>
//                     <Title level={5} style={{ color: '#333', marginBottom: '12px' }}>
//                       💭 แนะนำตัว
//                     </Title>
//                     <div style={{
//                       background: '#f8f9fa',
//                       padding: '20px',
//                       borderRadius: '12px',
//                       border: '1px solid #e9ecef'
//                     }}>
//                       <Paragraph style={{
//                         margin: 0,
//                         fontSize: '15px',
//                         lineHeight: '1.6',
//                         color: '#555'
//                       }}>
//                         {selectedPost.introduction || 'ไม่มีการแนะนำตัว'}
//                       </Paragraph>
//                     </div>
//                   </div>

//                   {/* Skills */}
//                   <div style={{ marginBottom: '24px' }}>
//                     <Title level={5} style={{ color: '#333', marginBottom: '12px' }}>
//                       🛠️ ทักษะ
//                     </Title>
//                     <div>
//                       {selectedPost.skills ? (
//                         selectedPost.skills.split(',').map((skill, index) => (
//                           <Tag
//                             key={index}
//                             style={{
//                               marginBottom: '8px',
//                               fontSize: '13px',
//                               padding: '6px 12px',
//                               borderRadius: '16px',
//                               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                               color: 'white',
//                               border: 'none'
//                             }}
//                           >
//                             {skill.trim()}
//                           </Tag>
//                         ))
//                       ) : (
//                         <Text type="secondary">ไม่มีทักษะระบุ</Text>
//                       )}
//                     </div>
//                   </div>

//                   {/* Portfolio */}
//                   {selectedPost.portfolio_url && (
//                     <>
//                       <div style={{ marginBottom: '24px' }}>
//                         <Title level={5} style={{ color: '#333', marginBottom: '12px' }}>
//                           🎨 ผลงาน
//                         </Title>
//                         <Button
//                           type="primary"
//                           href={selectedPost.portfolio_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{
//                             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                             border: 'none',
//                             borderRadius: '8px'
//                           }}
//                         >
//                           ดูผลงาน →
//                         </Button>
//                       </div>
//                       <Divider />
//                     </>
//                   )}

//                   {/* Contact Info */}
//                   <div style={{ marginBottom: '24px' }}>
//                     <Title level={5} style={{ color: '#333', marginBottom: '16px' }}>
//                       📞 ข้อมูลติดต่อ
//                     </Title>
//                     <div style={{
//                       background: '#f8f9fa',
//                       padding: '16px',
//                       borderRadius: '12px'
//                     }}>
//                       {selectedPost.email && (
//                         <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
//                           <MailOutlined style={{
//                             marginRight: '12px',
//                             color: '#1890ff',
//                             fontSize: '16px'
//                           }} />
//                           <Text copyable style={{ fontSize: '14px' }}>
//                             {selectedPost.email}
//                           </Text>
//                         </div>
//                       )}
//                       {selectedPost.phone && (
//                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                           <PhoneOutlined style={{
//                             marginRight: '12px',
//                             color: '#52c41a',
//                             fontSize: '16px'
//                           }} />
//                           <Text copyable style={{ fontSize: '14px' }}>
//                             {selectedPost.phone}
//                           </Text>
//                         </div>
//                       )}
//                       {!selectedPost.email && !selectedPost.phone && (
//                         <Text type="secondary" style={{ fontSize: '14px' }}>
//                           ไม่มีข้อมูลติดต่อในโพสต์นี้
//                         </Text>
//                       )}
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div style={{ textAlign: 'center', marginTop: '32px' }}>
//                     <Space size="middle">
//                       <Button
//                         type="primary"
//                         size="large"
//                         icon={<UserOutlined />}
//                         onClick={() => {
//                           closeModal();
//                           goToProfile(selectedPost.student?.ID || selectedPost.student?.id || selectedPost.student_id || 0);
//                         }}
//                         style={{
//                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                           border: 'none',
//                           borderRadius: '12px',
//                           padding: '0 24px',
//                           height: '48px',
//                           fontSize: '16px'
//                         }}
//                       >
//                         ดูโปรไฟล์เต็ม
//                       </Button>
//                       <Button
//                         size="large"
//                         onClick={closeModal}
//                         style={{
//                           borderRadius: '12px',
//                           padding: '0 24px',
//                           height: '48px',
//                           fontSize: '16px'
//                         }}
//                       >
//                         ปิด
//                       </Button>
//                     </Space>
//                   </div>

//                   {/* Created Date */}
//                   <div style={{
//                     textAlign: 'center',
//                     marginTop: '24px',
//                     paddingTop: '16px',
//                     borderTop: '1px solid #f0f0f0'
//                   }}>
//                     <Text type="secondary" style={{ fontSize: '13px' }}>
//                       📅 โพสต์เมื่อ: {new Date(selectedPost.CreatedAt).toLocaleDateString('th-TH', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </Text>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentFeedPage;

// src/pages/StudentFeed/StudentFeedPage.tsx
// src/pages/StudentFeed/StudentFeedPage.tsx
// src/pages/StudentFeed/StudentFeedPage.tsx
// src/pages/StudentFeed/StudentFeedPage.tsx
// src/pages/StudentFeed/StudentFeedPage.tsx
// src/pages/StudentFeed/StudentFeedPage.tsx
// src/pages/StudentFeed/StudentFeedPage.tsx
// src/pages/StudentFeed/StudentFeedPage.tsx
import React, { useState, useEffect, useCallback } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Avatar,
  Button,
  Input,
  Space,
  Modal,
  Spin,
  message,
  Empty,
  Pagination,
  Form,
  Select,
  Popconfirm,
  Dropdown,
  Menu,
  Divider,
} from "antd";

import {
  UserOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  TagOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { getStudentProfilePosts } from "../../services/studentPostService";

import CreateStudentPostModal from "../../components/CreateStudentPostModal";

const { Title, Text, Paragraph } = Typography;

const { Search } = Input;

const { TextArea } = Input;

const { Option } = Select;

// Interface definitions (same as before)

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

  UserID?: number;

  user_id?: number;
}

interface Faculty {
  ID: number;

  Name: string;
}

interface Department {
  ID: number;

  Name: string;
}

interface StudentProfilePost {
  ID: number;

  CreatedAt: string;

  UpdatedAt: string;

  title?: string;

  job_type: string;

  skills: string;

  availability?: string;

  preferred_location?: string;

  expected_compensation?: string;

  content?: string;

  introduction?: string;

  portfolio_url?: string;

  year?: number;

  phone?: string;

  email?: string;

  student_id?: number;

  student?: Student;

  faculty_id?: number;

  faculty?: Faculty;

  department_id?: number;

  department?: Department;
}

const StudentFeedPage: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [posts, setPosts] = useState<StudentProfilePost[]>([]);

  const [filteredPosts, setFilteredPosts] = useState<StudentProfilePost[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedJobType, setSelectedJobType] = useState<string>("");

  const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(
    null
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize] = useState(12);

  const [isCreatePostModalVisible, setIsCreatePostModalVisible] =
    useState(false);

  const [editingPost, setEditingPost] = useState<StudentProfilePost | null>(
    null
  );

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [editForm] = Form.useForm();

  const isStudent =
    user?.role &&
    (user.role.toLowerCase() === "student" ||
      user.role.toLowerCase() === "stu");

  // ประเภทงาน 6 ตัวเลือกตามรูป

  const jobTypeOptions = [
    { label: "งานประจำ", value: "งานประจำ" },

    { label: "งานพาร์ทไทม์", value: "งานพาร์ทไทม์" },

    { label: "ฟรีแลนซ์", value: "ฟรีแลนซ์" },

    { label: "ฝึกงาน", value: "ฝึกงาน" },

    { label: "งานชั่วคราว", value: "งานชั่วคราว" },

    { label: "งานโครงการ", value: "งานโครงการ" },
  ];

  // Skill options

  const skillOptions = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "HTML/CSS",
    "React",
    "Node.js",
    "PHP",

    "SQL",
    "Database Management",
    "Web Development",
    "Mobile App Development",

    "Photoshop",
    "Illustrator",
    "Figma",
    "Canva",
    "Video Editing",
    "After Effects",

    "Premiere Pro",
    "UI/UX Design",
    "Graphic Design",
    "3D Modeling",

    "Microsoft Office",
    "Excel Advanced",
    "PowerPoint",
    "Word Processing",

    "Data Entry",
    "Typing (Fast)",
    "Google Workspace",
    "PDF Editing",

    "English (Fluent)",
    "Chinese",
    "Japanese",
    "Korean",
    "Translation",

    "Content Writing",
    "Copywriting",
    "Proofreading",
  ];

  // Helper functions

  const isOwnPost = (post: StudentProfilePost): boolean => {
    if (!user || !post.student) return false;

    const userId = user.ID || user.id || user.user_id;

    const studentUserId = post.student.UserID || post.student.user_id;

    return userId === studentUserId;
  };

  // API function

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getStudentProfilePosts();

      const postsData = response?.data || response || [];

      if (Array.isArray(postsData)) {
        setPosts(postsData);

        setFilteredPosts(postsData);
      } else {
        setPosts([]);

        setFilteredPosts([]);
      }
    } catch (error) {
      console.error("Error fetching student posts:", error);

      message.error("ไม่สามารถโหลดข้อมูลโพสต์ได้");

      setPosts([]);

      setFilteredPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // อัปเดตฟังก์ชันการค้นหา และกรองให้รองรับประเภทงาน

  const applyFilters = useCallback(() => {
    let filtered = posts;

    // กรองด้วยคำค้นหา

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();

      filtered = filtered.filter((post) => {
        const studentName = post.student
          ? `${post.student.first_name || ""} ${
              post.student.last_name || ""
            }`.toLowerCase()
          : "";

        const title = post.title?.toLowerCase() || "";

        const skills = post.skills?.toLowerCase() || "";

        const content = post.content?.toLowerCase() || "";

        const introduction = post.introduction?.toLowerCase() || "";

        const jobType = post.job_type?.toLowerCase() || "";

        return (
          studentName.includes(searchLower) ||
          title.includes(searchLower) ||
          skills.includes(searchLower) ||
          content.includes(searchLower) ||
          introduction.includes(searchLower) ||
          jobType.includes(searchLower)
        );
      });
    }

    // กรองด้วยประเภทงาน

    if (selectedJobType) {
      filtered = filtered.filter((post) =>
        post.job_type?.toLowerCase().includes(selectedJobType.toLowerCase())
      );
    }

    setFilteredPosts(filtered);

    setCurrentPage(1);
  }, [posts, searchTerm, selectedJobType]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // ฟังก์ชันจัดการการเลือกประเภทงาน

  const handleJobTypeClick = (jobType: string) => {
    if (selectedJobType === jobType) {
      setSelectedJobType("");
    } else {
      setSelectedJobType(jobType);
    }
  };

  // ฟังก์ชันแสดงทั้งหมด

  const showAllPosts = () => {
    setSearchTerm("");

    setSelectedJobType("");
  };

  // Modal and navigation functions

  const showPostDetail = (post: StudentProfilePost) => {
    setSelectedPost(post);

    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);

    setSelectedPost(null);
  };

  const goToProfile = (studentId: number) => {
    navigate(`/profile/${studentId}`);
  };

  const openCreatePostModal = () => {
    setIsCreatePostModalVisible(true);
  };

  const closeCreatePostModal = () => {
    setIsCreatePostModalVisible(false);
  };

  const handleCreatePostSuccess = () => {
    fetchPosts();

    setIsCreatePostModalVisible(false);

    message.success("โพสต์ของคุณถูกสร้างสำเร็จแล้ว!");
  };

  // Edit and delete functions (simplified)

  const handleEditPost = (post: StudentProfilePost) => {
    setEditingPost(post);

    setEditModalVisible(true);

    const skillsArray = post.skills
      ? post.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    editForm.setFieldsValue({
      title: post.title,

      job_type: post.job_type,

      skills: skillsArray,

      availability: post.availability,

      preferred_location: post.preferred_location,

      expected_compensation: post.expected_compensation,

      content: post.content,

      introduction: post.introduction,

      portfolio_url: post.portfolio_url,
    });
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/student-profile-posts/${postId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      message.success("ลบโพสต์สำเร็จ!");

      setPosts(posts.filter((p) => p.ID !== postId));

      setFilteredPosts(filteredPosts.filter((p) => p.ID !== postId));
    } catch (error: any) {
      console.error("Error deleting post:", error);

      message.error("เกิดข้อผิดพลาดในการลบโพสต์");
    }
  };

  // Pagination

  const startIndex = (currentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />

        <div style={{ marginTop: "16px" }}>กำลังโหลดข้อมูลโพสต์...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

            maxWidth: "1200px",

            margin: "0 auto",
          }}
        >
          <div style={{ flex: 1 }}>
            <Title level={2} style={{ margin: "0 0 8px 0", color: "#1890ff" }}>
              โพสต์หางานของนักศึกษา
            </Title>

            <Text type="secondary" style={{ fontSize: "16px" }}>
              ค้นหานักศึกษาที่เหมาะสมสำหรับงานของคุณ
            </Text>
          </div>

          {isStudent && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreatePostModal}
              style={{
                borderRadius: "8px",

                fontWeight: "500",
              }}
            >
              สร้างโพสต์หางาน
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Search
          placeholder="ค้นหาโดยชื่อ, ทักษะ, ประเภทงาน หรือคำแนะนำตัว..."
          prefix={<SearchOutlined />}
          size="large"
          value={searchTerm}
          onSearch={handleSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "600px", display: "block", margin: "0 auto" }}
        />
      </div>

      {/* ✅ Job Type Filter Bar - ปรับให้ไม่เลื่อนได้ */}

      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            maxWidth: "1200px",

            margin: "0 auto",

            padding: "0 16px",

            display: "flex",

            justifyContent: "center",
          }}
        >
          {/* ✅ Fixed Filter Bar - ไม่เลื่อนได้ใช้ flex-wrap */}

          <div
            style={{
              marginBottom: "16px",

              maxWidth: "900px",

              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",

                gap: "12px",

                justifyContent: "center",

                // ✅ เพิ่ม flex-wrap เพื่อให้ปุ่มขึ้นบรรทัดใหม่เมื่อหน้าจอเล็ก

                flexWrap: "wrap",

                // ✅ ลบ overflow-x ออกเพื่อไม่ให้เลื่อนได้

                alignItems: "center",
              }}
            >
              {jobTypeOptions.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => handleJobTypeClick(option.value)}
                  style={{
                    minWidth: "120px",

                    height: "40px",

                    borderRadius: "20px",

                    fontSize: "14px",

                    fontWeight: "500",

                    whiteSpace: "nowrap",

                    backgroundColor:
                      selectedJobType === option.value ? "#1890ff" : "white",

                    color: selectedJobType === option.value ? "white" : "#666",

                    borderColor:
                      selectedJobType === option.value ? "#1890ff" : "#d9d9d9",

                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

                    transition: "all 0.3s ease",

                    // ✅ เพิ่ม margin สำหรับการ wrap

                    marginBottom: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedJobType !== option.value) {
                      e.currentTarget.style.backgroundColor = "#f0f8ff";

                      e.currentTarget.style.borderColor = "#1890ff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedJobType !== option.value) {
                      e.currentTarget.style.backgroundColor = "white";

                      e.currentTarget.style.borderColor = "#d9d9d9";
                    }
                  }}
                >
                  {option.label}
                </Button>
              ))}

              {/* ปุ่ม "ทั้งหมด" */}

              <Button
                icon={<AppstoreOutlined />}
                onClick={showAllPosts}
                style={{
                  minWidth: "100px",

                  height: "40px",

                  borderRadius: "20px",

                  fontSize: "14px",

                  fontWeight: "500",

                  backgroundColor:
                    !selectedJobType && !searchTerm ? "#1890ff" : "white",

                  color: !selectedJobType && !searchTerm ? "white" : "#666",

                  borderColor:
                    !selectedJobType && !searchTerm ? "#1890ff" : "#d9d9d9",

                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

                  transition: "all 0.3s ease",

                  // ✅ เพิ่ม margin สำหรับการ wrap

                  marginBottom: "8px",
                }}
                onMouseEnter={(e) => {
                  if (selectedJobType || searchTerm) {
                    e.currentTarget.style.backgroundColor = "#f0f8ff";

                    e.currentTarget.style.borderColor = "#1890ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedJobType || searchTerm) {
                    e.currentTarget.style.backgroundColor = "white";

                    e.currentTarget.style.borderColor = "#d9d9d9";
                  }
                }}
              >
                ทั้งหมด
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Space direction="vertical" size={4}>
          <Text type="secondary">
            พบ{" "}
            <Text strong style={{ color: "#1890ff" }}>
              {filteredPosts.length}
            </Text>{" "}
            โพสต์
            {searchTerm && (
              <>
                {" "}
                จากการค้นหา "<Text strong>{searchTerm}</Text>"
              </>
            )}
          </Text>

          {selectedJobType && (
            <div>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                ประเภทงาน:{" "}
              </Text>

              <Tag color="blue" size="small" style={{ fontSize: "11px" }}>
                {selectedJobType}
              </Tag>
            </div>
          )}
        </Space>
      </div>

      {/* Posts Grid */}

      {currentPosts.length > 0 ? (
        <>
          <Row
            gutter={[24, 24]}
            style={{ maxWidth: "1200px", margin: "0 auto" }}
          >
            {currentPosts.map((post) => {
              const studentName = post.student
                ? `${post.student.first_name || ""} ${
                    post.student.last_name || ""
                  }`.trim() || "ไม่ระบุชื่อ"
                : "ไม่ระบุชื่อ";

              const skillsArray = post.skills
                ? post.skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [];

              const isOwn = isOwnPost(post);

              // เมนูตัวเลือกสำหรับโพสต์ของตัวเอง

              const moreOptionsMenu = (
                <Menu>
                  <Menu.Item
                    key="edit"
                    icon={<EditOutlined />}
                    onClick={() => handleEditPost(post)}
                  >
                    แก้ไขโพสต์
                  </Menu.Item>

                  <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                    <Popconfirm
                      title="คุณแน่ใจหรือไม่ที่จะลบโพสต์นี้?"
                      onConfirm={() => handleDeletePost(post.ID)}
                      okText="ลบ"
                      cancelText="ยกเลิก"
                      okButtonProps={{ danger: true }}
                    >
                      ลบโพสต์
                    </Popconfirm>
                  </Menu.Item>
                </Menu>
              );

              return (
                <Col key={post.ID} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: "12px",

                      overflow: "hidden",

                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",

                      transition: "all 0.3s ease",

                      position: "relative",

                      height: "100%",
                    }}
                    cover={
                      <div
                        style={{
                          padding: "16px",

                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

                          textAlign: "center",

                          position: "relative",
                        }}
                      >
                        <Avatar
                          size={64}
                          src={post.student?.profile_image_url}
                          icon={<UserOutlined />}
                          style={{
                            border: "3px solid white",

                            marginBottom: "8px",
                          }}
                        />

                        <div style={{ color: "white", fontWeight: "bold" }}>
                          {studentName}
                        </div>

                        <Tag
                          color="orange"
                          style={{
                            marginTop: "8px",

                            border: "none",

                            fontWeight: "500",
                          }}
                        >
                          {post.title || post.job_type || "ไม่ระบุ"}
                        </Tag>

                        {/* ปุ่มตัวเลือกสำหรับโพสต์ของตัวเอง */}

                        {isOwn && (
                          <Dropdown
                            overlay={moreOptionsMenu}
                            trigger={["click"]}
                          >
                            <Button
                              icon={<MoreOutlined />}
                              style={{
                                position: "absolute",

                                top: "8px",

                                right: "8px",

                                background: "rgba(255, 255, 255, 0.9)",

                                border: "none",
                              }}
                              size="small"
                            />
                          </Dropdown>
                        )}
                      </div>
                    }
                    actions={[
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => showPostDetail(post)}
                        style={{ color: "#1890ff" }}
                      >
                        ดูรายละเอียด
                      </Button>,

                      <Button
                        type="link"
                        icon={<UserOutlined />}
                        onClick={() =>
                          goToProfile(post.student?.ID || post.student?.id || 0)
                        }
                        style={{ color: "#52c41a" }}
                      >
                        ดูโปรไฟล์
                      </Button>,
                    ]}
                  >
                    <div style={{ padding: "0 8px" }}>
                      {/* ข้อความแนะนำตัว */}

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontSize: "14px",

                            color: "#666",

                            marginBottom: "6px",

                            fontWeight: "500",
                          }}
                        >
                          แนะนำตัว:
                        </div>

                        <Paragraph
                          style={{
                            margin: 0,

                            fontSize: "15px",

                            lineHeight: "1.4",

                            color: "#333",

                            fontWeight: "500",

                            background: "#f8f9fa",

                            padding: "12px",

                            borderRadius: "8px",

                            border: "1px solid #e9ecef",
                          }}
                          ellipsis={{ rows: 3, tooltip: true }}
                        >
                          {post.content ||
                            post.introduction ||
                            "ไม่มีการแนะนำตัว"}
                        </Paragraph>
                      </div>

                      {/* ทักษะ */}

                      <div>
                        <div
                          style={{
                            fontSize: "12px",

                            color: "#666",

                            marginBottom: "8px",

                            fontWeight: "500",
                          }}
                        >
                          🛠️ ทักษะหลัก:
                        </div>

                        <div>
                          {skillsArray.length > 0 ? (
                            skillsArray.slice(0, 3).map((skill, index) => (
                              <Tag
                                key={index}
                                color="blue"
                                style={{
                                  marginBottom: "4px",

                                  fontSize: "11px",

                                  border: "none",
                                }}
                              >
                                {skill}
                              </Tag>
                            ))
                          ) : (
                            <Tag color="default" style={{ fontSize: "11px" }}>
                              ไม่มีทักษะระบุ
                            </Tag>
                          )}

                          {skillsArray.length > 3 && (
                            <Tag
                              color="default"
                              style={{
                                fontSize: "11px",

                                fontStyle: "italic",
                              }}
                            >
                              +{skillsArray.length - 3} อื่นๆ
                            </Tag>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Pagination */}

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Pagination
              current={currentPage}
              total={filteredPosts.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} จาก ${total} โพสต์`
              }
            />
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Empty
            description={
              <Space direction="vertical">
                <span style={{ fontSize: "16px", color: "#666" }}>
                  {searchTerm || selectedJobType
                    ? "🔍 ไม่พบโพสต์ที่ตรงกับเงื่อนไขการค้นหา"
                    : "📝 ยังไม่มีโพสต์หางานจากนักศึกษา"}
                </span>

                {(searchTerm || selectedJobType) && (
                  <Button
                    type="link"
                    onClick={showAllPosts}
                    style={{ padding: 0 }}
                  >
                    แสดงโพสต์ทั้งหมด
                  </Button>
                )}
              </Space>
            }
            style={{ margin: "50px 0" }}
          >
            {isStudent && !searchTerm && !selectedJobType && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreatePostModal}
                size="large"
              >
                สร้างโพสต์หางานแรกของคุณ
              </Button>
            )}
          </Empty>
        </div>
      )}

      {/* Detail Modal - same as before */}

      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <Avatar
              size={48}
              src={selectedPost?.student?.profile_image_url}
              style={{ marginBottom: "8px" }}
            />

            <div style={{ fontSize: "18px", fontWeight: "bold" }}></div>
          </div>
        }
        open={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            key="profile"
            type="primary"
            onClick={() => {
              if (selectedPost) {
                closeModal();

                goToProfile(
                  selectedPost.student?.ID || selectedPost.student?.id || 0
                );
              }
            }}
          >
            ดูโปรไฟล์เต็ม
          </Button>,

          <Button key="close" onClick={closeModal}>
            ปิด
          </Button>,
        ]}
        width={700}
        centered
      >
        {selectedPost && (
          <div>
            {/* Student Info */}

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Avatar
                size={80}
                src={selectedPost.student?.profile_image_url}
                icon={<UserOutlined />}
                style={{ marginBottom: "12px" }}
              />

              <Title level={4} style={{ margin: "0 0 8px 0" }}>
                {selectedPost.student
                  ? `${selectedPost.student.first_name || ""} ${
                      selectedPost.student.last_name || ""
                    }`.trim() || "ไม่ระบุชื่อ"
                  : "ไม่ระบุชื่อ"}
              </Title>

              <Text type="secondary">
                🏛️{" "}
                {selectedPost.faculty?.Name ||
                  selectedPost.student?.faculty ||
                  "ไม่ระบุคณะ"}{" "}
                • 📚 {selectedPost.department?.Name || "ไม่ระบุสาขา"}
              </Text>

              <br />

              <Text type="secondary">
                📅 ชั้นปีที่{" "}
                {selectedPost.year || selectedPost.student?.year || "ไม่ระบุ"}
              </Text>
            </div>

            <Divider />

            {/* รายละเอียดโพสต์ */}

            {selectedPost.title && (
              <div style={{ marginBottom: "16px" }}>
                <Title level={5}>📝 หัวข้อโพสต์:</Title>

                <Tag
                  color="blue"
                  style={{ fontSize: "14px", padding: "4px 12px" }}
                >
                  {selectedPost.title}
                </Tag>
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <Title level={5}>💼 ประเภทงานที่ต้องการ:</Title>

              <Tag
                color="green"
                style={{ fontSize: "14px", padding: "4px 12px" }}
              >
                {selectedPost.job_type || "ไม่ระบุ"}
              </Tag>
            </div>

            {selectedPost.availability && (
              <div style={{ marginBottom: "16px" }}>
                <Title level={5}>⏰ เวลาที่สะดวก:</Title>

                <Tag
                  color="orange"
                  style={{ fontSize: "14px", padding: "4px 12px" }}
                >
                  {selectedPost.availability}
                </Tag>
              </div>
            )}

            {selectedPost.preferred_location && (
              <div style={{ marginBottom: "16px" }}>
                <Title level={5}>📍 สถานที่ที่สะดวก:</Title>

                <Tag
                  color="cyan"
                  style={{ fontSize: "14px", padding: "4px 12px" }}
                >
                  {selectedPost.preferred_location}
                </Tag>
              </div>
            )}

            {selectedPost.expected_compensation && (
              <div style={{ marginBottom: "16px" }}>
                <Title level={5}>💰 ค่าตอบแทนที่คาดหวัง:</Title>

                <Tag
                  color="gold"
                  style={{ fontSize: "14px", padding: "4px 12px" }}
                >
                  {selectedPost.expected_compensation}
                </Tag>
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <Title level={5}>💭 รายละเอียด:</Title>

              <div
                style={{
                  background: "#f8f9fa",

                  padding: "16px",

                  borderRadius: "8px",

                  border: "1px solid #e9ecef",

                  fontSize: "14px",

                  lineHeight: "1.6",
                }}
              >
                {selectedPost.content ||
                  selectedPost.introduction ||
                  "ไม่มีการแนะนำตัว"}
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Title level={5}>🛠️ ทักษะ:</Title>

              <div>
                {selectedPost.skills ? (
                  selectedPost.skills.split(",").map((skill, index) => (
                    <Tag
                      key={index}
                      color="blue"
                      style={{ marginBottom: "4px" }}
                    >
                      {skill.trim()}
                    </Tag>
                  ))
                ) : (
                  <Text type="secondary">ไม่มีทักษะระบุ</Text>
                )}
              </div>
            </div>

            {selectedPost.portfolio_url && (
              <div style={{ marginBottom: "16px" }}>
                <Title level={5}>🎨 ผลงาน:</Title>

                <Button
                  type="link"
                  href={selectedPost.portfolio_url}
                  target="_blank"
                  style={{ padding: 0 }}
                >
                  ดูผลงาน →
                </Button>
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <Title level={5}>📞 ข้อมูลติดต่อ:</Title>

              {selectedPost.student?.email && (
                <div style={{ marginBottom: "4px" }}>
                  <MailOutlined
                    style={{ marginRight: "8px", color: "#1890ff" }}
                  />

                  <Text copyable>{selectedPost.student.email}</Text>
                </div>
              )}

              {selectedPost.student?.phone && (
                <div>
                  <PhoneOutlined
                    style={{ marginRight: "8px", color: "#52c41a" }}
                  />

                  <Text copyable>{selectedPost.student.phone}</Text>
                </div>
              )}

              {!selectedPost.student?.email && !selectedPost.student?.phone && (
                <Text type="secondary">ไม่มีข้อมูลติดต่อในโพสต์นี้</Text>
              )}
            </div>

            <Divider />

            <div style={{ textAlign: "center" }}>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                📅 โพสต์เมื่อ:{" "}
                {new Date(selectedPost.CreatedAt).toLocaleDateString("th-TH", {
                  year: "numeric",

                  month: "long",

                  day: "numeric",

                  hour: "2-digit",

                  minute: "2-digit",
                })}
              </Text>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Post Modal */}

      <CreateStudentPostModal
        visible={isCreatePostModalVisible}
        onClose={closeCreatePostModal}
        onSuccess={handleCreatePostSuccess}
      />
    </div>
  );
};

export default StudentFeedPage;
