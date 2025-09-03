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
import React, { useState, useEffect, useCallback } from 'react';
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
  Divider
} from 'antd';
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
  TagOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStudentProfilePosts } from '../../services/studentPostService';
import CreateStudentPostModal from '../../components/CreateStudentPostModal';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;

// ✅ อัปเดต Interface สำหรับข้อมูลใหม่
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
  
  // ✅ ข้อมูลใหม่ที่เพิ่มเข้ามา
  title?: string;
  job_type: string;
  skills: string;
  availability?: string;
  preferred_location?: string;
  expected_compensation?: string;
  content?: string;
  
  // ✅ ข้อมูลเก่าที่ยังใช้ได้ (backward compatibility)
  introduction?: string;
  portfolio_url?: string;
  
  // ความสัมพันธ์
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<StudentProfilePost | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();

  const isStudent = user && (user.role === 'student' || user.role === 'stu');

  // ✅ ทักษะที่ให้เลือก - ครอบคลุมหลายด้าน
  const skillOptions = [
    // ด้าน IT & Programming
    'JavaScript', 'Python', 'Java', 'C++', 'HTML/CSS', 'React', 'Node.js', 'PHP',
    'SQL', 'Database Management', 'Web Development', 'Mobile App Development',
    
    // ด้าน Design & Creative
    'Photoshop', 'Illustrator', 'Figma', 'Canva', 'Video Editing', 'After Effects',
    'Premiere Pro', 'UI/UX Design', 'Graphic Design', '3D Modeling',
    
    // ด้าน Office & Documentation
    'Microsoft Office', 'Excel Advanced', 'PowerPoint', 'Word Processing',
    'Data Entry', 'Typing (Fast)', 'Google Workspace', 'PDF Editing',
    
    // ด้านภาษา
    'English (Fluent)', 'Chinese', 'Japanese', 'Korean', 'Translation',
    'Content Writing', 'Copywriting', 'Proofreading',
    
    // ด้าน Marketing & Sales
    'Social Media Marketing', 'Content Marketing', 'SEO', 'Google Ads',
    'Facebook Marketing', 'Sales', 'Customer Service', 'Event Planning',
    
    // ด้าน Business & Analysis
    'Data Analysis', 'Financial Analysis', 'Project Management', 'Research',
    'Market Research', 'Business Planning', 'Accounting', 'Bookkeeping',
    
    // ด้าน Technical Skills
    'AutoCAD', 'SolidWorks', 'MATLAB', 'R Programming', 'SPSS', 'Tableau',
    'Machine Learning', 'AI Development', 'Network Administration',
    
    // ด้าน Creative & Arts
    'Photography', 'Music Production', 'Writing', 'Blogging', 'Podcasting',
    'Voice Over', 'Acting', 'Dancing', 'Singing',
    
    // ด้าน Manual & Service
    'Tutoring', 'Teaching', 'Cooking', 'Cleaning', 'Delivery', 'Driver',
    'Pet Care', 'Child Care', 'Elder Care', 'Gardening',
    
    // ด้าน Specialized
    'Laboratory Work', 'Engineering', 'Architecture', 'Medical Assistance',
    'Legal Research', 'Survey', 'Quality Control', 'Testing'
  ];

  // ตรวจสอบว่าเป็นโพสต์ของตัวเอง
  const isOwnPost = (post: StudentProfilePost): boolean => {
    if (!user || !post.student) {
      return false;
    }
    const userId = user.ID || user.id || user.user_id;
    const studentUserId = post.student.UserID || post.student.user_id;
    return userId === studentUserId;
  };

  // ดึงข้อมูลโพสต์จาก API
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStudentProfilePosts();
      console.log('📄 Student posts response:', response);
      const postsData = response?.data || response || [];
      if (Array.isArray(postsData)) {
        setPosts(postsData);
        setFilteredPosts(postsData);
      } else {
        console.error('Invalid posts data structure:', response);
        setPosts([]);
        setFilteredPosts([]);
      }
    } catch (error) {
      console.error('Error fetching student posts:', error);
      message.error('ไม่สามารถโหลดข้อมูลโพสต์ได้');
      setPosts([]);
      setFilteredPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ✅ อัปเดตการค้นหาให้รองรับฟิลด์ใหม่
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    if (!value.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const searchLower = value.toLowerCase();
    const filtered = posts.filter(post => {
      const studentName = post.student ?
        `${post.student.first_name || ''} ${post.student.last_name || ''}`.toLowerCase() : '';
      const facultyName = post.faculty?.Name?.toLowerCase() || post.student?.faculty?.toLowerCase() || '';
      const departmentName = post.department?.Name?.toLowerCase() || '';
      
      // ✅ ค้นหาในฟิลด์ใหม่และเก่า
      const title = post.title?.toLowerCase() || '';
      const skills = post.skills?.toLowerCase() || '';
      const content = post.content?.toLowerCase() || '';
      const availability = post.availability?.toLowerCase() || '';
      const preferredLocation = post.preferred_location?.toLowerCase() || '';
      const expectedCompensation = post.expected_compensation?.toLowerCase() || '';
      const introduction = post.introduction?.toLowerCase() || '';
      const jobType = post.job_type?.toLowerCase() || '';

      return (
        studentName.includes(searchLower) ||
        facultyName.includes(searchLower) ||
        departmentName.includes(searchLower) ||
        title.includes(searchLower) ||
        skills.includes(searchLower) ||
        content.includes(searchLower) ||
        availability.includes(searchLower) ||
        preferredLocation.includes(searchLower) ||
        expectedCompensation.includes(searchLower) ||
        introduction.includes(searchLower) ||
        jobType.includes(searchLower)
      );
    });
    setFilteredPosts(filtered);
  }, [posts]);

  // ลบโพสต์
  const handleDeletePost = async (postId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/student-profile-posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.text();
          try {
            const jsonError = JSON.parse(errorData);
            errorMessage = jsonError.error || jsonError.message || errorMessage;
          } catch {
            errorMessage = errorData || errorMessage;
          }
        } catch (parseError) {
          console.log('Could not parse error response');
        }
        throw new Error(errorMessage);
      }

      message.success('ลบโพสต์สำเร็จ!');
      setPosts(posts.filter(p => p.ID !== postId));
      setFilteredPosts(filteredPosts.filter(p => p.ID !== postId));
    } catch (error: any) {
      console.error('Error deleting post:', error);
      message.error(error.message || 'เกิดข้อผิดพลาดในการลบโพสต์');
    }
  };

  // ✅ แก้ไขโพสต์ - อัปเดตให้รองรับฟิลด์ใหม่
  const handleEditPost = (post: StudentProfilePost) => {
    setEditingPost(post);
    setEditModalVisible(true);
    
    // ✅ แปลง skills string เป็น array สำหรับ tags mode
    const skillsArray = post.skills ? post.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    editForm.setFieldsValue({
      title: post.title,
      job_type: post.job_type,
      skills: skillsArray, // ✅ ส่งเป็น array
      availability: post.availability,
      preferred_location: post.preferred_location,
      expected_compensation: post.expected_compensation,
      content: post.content,
      // Backward compatibility
      introduction: post.introduction,
      portfolio_url: post.portfolio_url,
    });
  };

  // บันทึกการแก้ไข
  const handleSaveEdit = async (values: any) => {
    try {
      const token = localStorage.getItem('token');
      
      // ✅ จัดการ skills - ถ้าเป็น array ให้ join เป็น string
      const skillsString = Array.isArray(values.skills) 
        ? values.skills.join(', ') 
        : values.skills;
      
      const updateData = {
        ...values,
        skills: skillsString
      };

      const response = await fetch(`http://localhost:8080/api/student-profile-posts/${editingPost!.ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      const updatedPost = await response.json();
      message.success('แก้ไขโพสต์สำเร็จ!');
      setPosts(posts.map(p => p.ID === editingPost!.ID ? updatedPost.data : p));
      setFilteredPosts(filteredPosts.map(p => p.ID === editingPost!.ID ? updatedPost.data : p));
      setEditModalVisible(false);
      setEditingPost(null);
      editForm.resetFields();
    } catch (error: any) {
      console.error('Error updating post:', error);
      message.error(error.message || 'เกิดข้อผิดพลาดในการแก้ไขโพสต์');
    }
  };

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
    message.success('โพสต์ของคุณถูกสร้างสำเร็จแล้ว!');
  };

  // คำนวณข้อมูลสำหรับ Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh' 
      }}>
        <Spin size="large" />
        <div style={{ marginLeft: '16px', fontSize: '16px' }}>
          กำลังโหลดข้อมูลโพสต์...
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header - เลย์เอาต์เดิม */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'left' }}>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              โพสต์หางานของนักศึกษา
            </Title>
            <Text style={{ fontSize: '16px', color: '#666', marginTop: '8px', display: 'block' }}>
              ค้นหานักศึกษาที่เหมาะสมสำหรับงานของคุณ
            </Text>
          </div>

          {/* ปุ่มโพสต์ - แสดงเฉพาะนักศึกษา */}
          {isStudent && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreatePostModal}
              style={{
                borderRadius: '8px',
                fontWeight: '500'
              }}
            >
              สร้างโพสต์หางาน
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar - เลย์เอาต์เดิม */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Search
          placeholder="ค้นหาโพสต์งาน, ทักษะ, สำนักวิชา, ประเภทงาน..."
          prefix={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          onChange={(e) => !e.target.value && handleSearch('')}
          style={{ maxWidth: '600px', display: 'block', margin: '0 auto' }}
        />
        
        <div style={{ marginTop: '16px' }}>
          <Text>
            พบ {filteredPosts.length} โพสต์{searchTerm && ` จาก "${searchTerm}"`}
          </Text>
        </div>
      </div>

      {/* Posts Grid - เลย์เอาต์เดิม แต่เพิ่มข้อมูลใหม่ */}
      {currentPosts.length > 0 ? (
        <>
          <Row gutter={[16, 16]} style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {currentPosts.map((post) => {
              const studentName = post.student ?
                `${post.student.first_name || ''} ${post.student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ'
                : 'ไม่ระบุชื่อ';
              const facultyName = post.faculty?.Name || post.student?.faculty || 'ไม่ระบุคณะ';
              const departmentName = post.department?.Name || 'ไม่ระบุสาขา';
              const skillsArray = post.skills ? post.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
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
                  <Menu.Item 
                    key="delete" 
                    icon={<DeleteOutlined />} 
                    danger
                  >
                    <Popconfirm
                      title="คุณแน่ใจว่าต้องการลบโพสต์นี้?"
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
                <Col xs={24} sm={12} lg={8} xl={6} key={post.ID}>
                  <Card
                    hoverable
                    cover={
                      <div style={{
                        height: '120px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <Avatar
                          size={64}
                          icon={<UserOutlined />}
                          src={post.student?.profile_image_url}
                          style={{ border: '3px solid white' }}
                        />
                        
                        {/* ✅ แสดงหัวข้อโพสต์ (ข้อมูลใหม่) หรือ job_type */}
                        <div style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '12px',
                          right: '12px'
                        }}>
                          <Tag color="blue" style={{ 
                            fontSize: '12px', 
                            fontWeight: '600',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            textAlign: 'center'
                          }}>
                            {post.title || post.job_type || 'ไม่ระบุ'}
                          </Tag>
                        </div>

                        {/* ปุ่มตัวเลือกสำหรับโพสต์ของตัวเอง */}
                        {isOwn && (
                          <Dropdown overlay={moreOptionsMenu} trigger={['click']}>
                            <Button
                              icon={<MoreOutlined />}
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                border: 'none'
                              }}
                              size="small"
                            />
                          </Dropdown>
                        )}
                      </div>
                    }
                    actions={[
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => showPostDetail(post)}
                      >
                        ดูรายละเอียด
                      </Button>,
                      <Button
                        type="text"
                        icon={<UserOutlined />}
                        onClick={() => goToProfile(post.student?.ID || post.student?.id || 0)}
                      >
                        ดูโปรไฟล์
                      </Button>
                    ]}
                  >
                    <div style={{ minHeight: '180px' }}>
                      <Title level={5} style={{ margin: '0 0 8px 0', color: '#1890ff' }}>
                        {studentName}
                      </Title>
                      
                      <Text style={{ color: '#666', fontSize: '13px', display: 'block', marginBottom: '4px' }}>
                        🏛️ {facultyName}
                      </Text>
                      
                      <Text style={{ color: '#666', fontSize: '13px', display: 'block', marginBottom: '12px' }}>
                        📚 {departmentName} • ปีที่ {post.year || post.student?.year || 'N/A'}
                      </Text>

                      {/* ✅ แสดงข้อมูลใหม่ - เวลาและสถานที่ */}
                      <div style={{ marginBottom: '8px' }}>
                        {post.availability && (
                          <Tag icon={<ClockCircleOutlined />} color="orange" size="small" style={{ marginBottom: '4px', fontSize: '10px' }}>
                            {post.availability}
                          </Tag>
                        )}
                        {post.preferred_location && (
                          <Tag icon={<EnvironmentOutlined />} color="cyan" size="small" style={{ marginBottom: '4px', fontSize: '10px' }}>
                            {post.preferred_location}
                          </Tag>
                        )}
                      </div>

                      {/* ✅ แสดง content ใหม่ หรือ introduction เก่า */}
                      <Paragraph 
                        ellipsis={{ rows: 2 }} 
                        style={{ marginBottom: '12px', fontSize: '13px' }}
                      >
                        {post.content || post.introduction || 'ไม่มีการแนะนำตัว'}
                      </Paragraph>

                      <div>
                        <Text style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>🛠️ ทักษะ: </Text>
                        <div style={{ marginTop: '4px' }}>
                          {skillsArray.length > 0 ? (
                            skillsArray.slice(0, 2).map((skill, index) => (
                              <Tag key={index} size="small" style={{ marginBottom: '2px', fontSize: '10px' }}>
                                {skill}
                              </Tag>
                            ))
                          ) : (
                            <Tag size="small" color="default">
                              ไม่มีทักษะระบุ
                            </Tag>
                          )}
                          {skillsArray.length > 2 && (
                            <Tag size="small" color="blue">
                              +{skillsArray.length - 2} อื่นๆ
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

          {/* Pagination - เลย์เอาต์เดิม */}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
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
        <Empty
          description={
            <div>
              <Title level={4}>
                {searchTerm ?
                  `ไม่พบโพสต์ที่ตรงกับ "${searchTerm}"` :
                  "ยังไม่มีโพสต์หางานจากนักศึกษา"
                }
              </Title>
              <Text>
                {isStudent ? 'เริ่มต้นสร้างโพสต์หางานแรกของคุณเลย!' : 'กลับมาดูใหม่ในภายหลัง'}
              </Text>
            </div>
          }
        >
          {/* ปุ่มสร้างโพสต์ใน Empty State */}
          {isStudent && !searchTerm && (
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
      )}

      {/* ✅ Detail Modal - อัปเดตเพิ่มข้อมูลใหม่ */}
      <Modal
        title="รายละเอียดโพสต์หางาน"
        open={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            type="primary"
            key="profile"
            onClick={() => {
              if (selectedPost) {
                closeModal();
                goToProfile(selectedPost.student?.ID || selectedPost.student?.id || 0);
              }
            }}
          >
            ดูโปรไฟล์เต็ม
          </Button>,
          <Button key="close" onClick={closeModal}>
            ปิด
          </Button>
        ]}
        width={600}
        centered
      >
        {selectedPost && (
          <div>
            {/* Student Info */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Avatar
                size={80}
                icon={<UserOutlined />}
                src={selectedPost.student?.profile_image_url}
              />
              <Title level={4} style={{ margin: '8px 0 4px 0' }}>
                {selectedPost.student ?
                  `${selectedPost.student.first_name || ''} ${selectedPost.student.last_name || ''}`.trim() || 'ไม่ระบุชื่อ'
                  : 'ไม่ระบุชื่อ'
                }
              </Title>
              <Text>
                คณะ/สาขา: {selectedPost.faculty?.Name || selectedPost.student?.faculty || 'ไม่ระบุ'} / {selectedPost.department?.Name || 'ไม่ระบุ'}
              </Text>
              <br />
              <Text>
                ชั้นปี: {selectedPost.year || selectedPost.student?.year || 'ไม่ระบุ'}
              </Text>
            </div>

            <Divider />

            {/* ✅ หัวข้อโพสต์ (ข้อมูลใหม่) */}
            {selectedPost.title && (
              <div style={{ marginBottom: '16px' }}>
                <Text strong>
                  <TagOutlined /> หัวข้อโพสต์:
                </Text>
                <div style={{ marginTop: '8px' }}>
                  <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {selectedPost.title}
                  </Tag>
                </div>
              </div>
            )}

            {/* Job Type */}
            <div style={{ marginBottom: '16px' }}>
              <Text strong>ประเภทงานที่ต้องการ:</Text>
              <div style={{ marginTop: '8px' }}>
                <Tag color="green">{selectedPost.job_type || 'ไม่ระบุ'}</Tag>
              </div>
            </div>

            {/* ✅ ข้อมูลใหม่ - เวลาและสถานที่ */}
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              {selectedPost.availability && (
                <Col span={12}>
                  <Text strong>
                    <ClockCircleOutlined /> เวลาที่สะดวก:
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    <Tag color="orange">{selectedPost.availability}</Tag>
                  </div>
                </Col>
              )}
              {selectedPost.preferred_location && (
                <Col span={12}>
                  <Text strong>
                    <EnvironmentOutlined /> สถานที่ที่สะดวก:
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    <Tag color="cyan">{selectedPost.preferred_location}</Tag>
                  </div>
                </Col>
              )}
            </Row>

            {/* ✅ ค่าตอบแทน (ข้อมูลใหม่) */}
            {selectedPost.expected_compensation && (
              <div style={{ marginBottom: '16px' }}>
                <Text strong>
                  <DollarOutlined /> ค่าตอบแทนที่คาดหวัง:
                </Text>
                <div style={{ marginTop: '8px' }}>
                  <Tag color="red">{selectedPost.expected_compensation}</Tag>
                </div>
              </div>
            )}

            {/* ✅ รายละเอียด - แสดง content หรือ introduction */}
            <div style={{ marginBottom: '16px' }}>
              <Text strong>รายละเอียด:</Text>
              <Paragraph style={{ marginTop: '8px' }}>
                {selectedPost.content || selectedPost.introduction || 'ไม่มีการแนะนำตัว'}
              </Paragraph>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '16px' }}>
              <Text strong>ทักษะ:</Text>
              <div style={{ marginTop: '8px' }}>
                {selectedPost.skills ? (
                  selectedPost.skills.split(',').map((skill, index) => (
                    <Tag key={index} style={{ marginBottom: '4px' }}>
                      {skill.trim()}
                    </Tag>
                  ))
                ) : (
                  <Text type="secondary">ไม่มีทักษะระบุ</Text>
                )}
              </div>
            </div>

            {/* Portfolio */}
            {selectedPost.portfolio_url && (
              <div style={{ marginBottom: '16px' }}>
                <Text strong>ผลงาน:</Text>
                <div style={{ marginTop: '8px' }}>
                  <Button 
                    type="link" 
                    href={selectedPost.portfolio_url} 
                    target="_blank"
                    style={{ padding: 0 }}
                  >
                    ดูผลงาน
                  </Button>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div style={{ marginBottom: '16px' }}>
              <Text strong>ข้อมูลติดต่อ:</Text>
              <div style={{ marginTop: '8px' }}>
                {selectedPost.student?.email && (
                  <div style={{ marginBottom: '4px' }}>
                    <MailOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                    <Text>{selectedPost.student.email}</Text>
                  </div>
                )}
                {selectedPost.student?.phone && (
                  <div style={{ marginBottom: '4px' }}>
                    <PhoneOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    <Text>{selectedPost.student.phone}</Text>
                  </div>
                )}
                {!selectedPost.student?.email && !selectedPost.student?.phone && (
                  <Text type="secondary">ไม่มีข้อมูลติดต่อในโพสต์นี้</Text>
                )}
              </div>
            </div>

            {/* Created Date */}
            <div style={{ textAlign: 'center', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
              <Text type="secondary">
                โพสต์เมื่อ: {new Date(selectedPost.CreatedAt).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
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

      {/* ✅ Edit Modal - อัปเดตให้รองรับฟิลด์ใหม่ */}
      <Modal
        title="แก้ไขโพสต์หางาน"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingPost(null);
          editForm.resetFields();
        }}
        footer={null}
        width={600}
        centered
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleSaveEdit}
          style={{ marginTop: '24px' }}
        >
          <Form.Item
            label="หัวข้อโพสต์"
            name="title"
          >
            <Input placeholder="เช่น รับงานพิมพ์รายงาน" />
          </Form.Item>

          {/* ✅ ประเภทงาน - อัปเดตตัวเลือกใหม่ */}
          <Form.Item
            label="ประเภทงาน"
            name="job_type"
            rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
          >
            <Select placeholder="เลือกประเภทงาน">
              <Option value="งานประจำ">งานประจำ</Option>
              <Option value="งานพาร์ทไทม์">งานพาร์ทไทม์</Option>
              <Option value="ฟรีแลนซ์">ฟรีแลนซ์</Option>
              <Option value="ฝึกงาน">ฝึกงาน</Option>
              <Option value="งานชั่วคราว">งานชั่วคราว</Option>
              <Option value="งานโครงการ">งานโครงการ</Option>
            </Select>
          </Form.Item>

          {/* ✅ ทักษะ - เปลี่ยนเป็น tags mode */}
          <Form.Item
            label="ทักษะ"
            name="skills"
            rules={[{ required: true, message: 'กรุณาเลือกทักษะอย่างน้อย 1 อย่าง' }]}
          >
            <Select
              mode="tags"
              placeholder="เลือกทักษะหรือพิมพ์เพิ่มเติม..."
              style={{ width: '100%' }}
              maxTagCount={5}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {skillOptions.map(skill => (
                <Option key={skill} value={skill}>{skill}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* ✅ เวลาที่สะดวก - เปลี่ยนเป็น Input */}
          <Form.Item
            label="เวลาที่สะดวก"
            name="availability"
            rules={[{ required: true, message: 'กรุณาระบุเวลาที่สะดวก' }]}
          >
            <Input placeholder='เช่น "ว่าง จ.-ศ. หลัง 5 โมง", "เสาร์-อาทิตย์"' />
          </Form.Item>

          {/* ✅ สถานที่ที่สะดวก - เปลี่ยนเป็น Input */}
          <Form.Item
            label="สถานที่ที่สะดวก"
            name="preferred_location"
            rules={[{ required: true, message: 'กรุณาระบุสถานที่ที่สะดวก' }]}
          >
            <Input placeholder='เช่น "หอสมุด", "Online", "ตึกวิศวะ"' />
          </Form.Item>

          {/* ค่าตอบแทน */}
          <Form.Item
            label="ค่าตอบแทนที่คาดหวัง (ไม่บังคับ)"
            name="expected_compensation"
          >
            <Input placeholder='เช่น "50 บาท/ชั่วโมง", "ตามตกลง"' />
          </Form.Item>

          {/* รายละเอียด */}
          <Form.Item
            label="รายละเอียดโพสต์"
            name="content"
            rules={[{ required: true, message: 'กรุณาเขียนรายละเอียด' }]}
          >
            <TextArea rows={4} placeholder="แนะนำตัวและรายละเอียดเพิ่มเติม..." />
          </Form.Item>

          {/* URL ผลงาน */}
          <Form.Item
            label="URL ผลงาน (ไม่บังคับ)"
            name="portfolio_url"
          >
            <Input placeholder="https://..." />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: '24px' }}>
            <Space>
              <Button
                onClick={() => {
                  setEditModalVisible(false);
                  setEditingPost(null);
                  editForm.resetFields();
                }}
              >
                ยกเลิก
              </Button>
              <Button type="primary" htmlType="submit">
                บันทึกการแก้ไข
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentFeedPage;
