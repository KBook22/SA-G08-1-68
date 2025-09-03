// // src/pages/Employer/EmployerFeedPage.tsx
// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Typography, Spin, Alert, List, Input, Tabs, Row, Col, Modal, Button, Space, Tag, Avatar } from 'antd';
// import { SearchOutlined, UserOutlined, EyeOutlined, MessageOutlined, SolutionOutlined, MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
// import StudentProfileCard from '../../components/StudentProfileCard';
// import PageHeader from '../../components/PageHeader';
// import { getStudentProfilePosts } from '../../services/studentPostService';
// import { AuthContext } from '../../context/AuthContext';
// import type{ StudentProfilePost } from '../../types';

// const { Paragraph, Text } = Typography;

// const EmployerFeedPage: React.FC = () => {
//     const [posts, setPosts] = useState<StudentProfilePost[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [activeTab, setActiveTab] = useState<string>('all');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const pageSize = 12;
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);

//     const authContext = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPosts = async () => {
//             setLoading(true);
//             try {
//                 const data = await getStudentProfilePosts();
//                 setPosts(Array.isArray(data) ? data : []);
//             } catch (err) {
//                 setError('ไม่สามารถโหลดข้อมูลโปรไฟล์นักศึกษาได้');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPosts();
//     }, []);

//     const filteredPosts = posts.filter(post => {
//         if (!post.student) return false;
//         const lowerSearch = searchTerm.toLowerCase();
//         const matchesSearch =
//             `${post.student.first_name} ${post.student.last_name}`.toLowerCase().includes(lowerSearch) ||
//             (post.skills || '').toLowerCase().includes(lowerSearch) ||
//             (post.student.faculty || '').toLowerCase().includes(lowerSearch);
//         const matchesTab = activeTab === 'all' || post.job_type === activeTab;
//         return matchesSearch && matchesTab;
//     });

//     const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//     const showModal = (post: StudentProfilePost) => {
//         setSelectedPost(post);
//         setIsModalOpen(true);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setSelectedPost(null);
//     };

//     const tabItems = [
//       { key: 'all', label: 'ทั้งหมด' },
//       { key: 'พาร์ทไทม์', label: 'พาร์ทไทม์' },
//       { key: 'ฝึกงาน', label: 'งานฝึกงาน' },
//       { key: 'ฟรีแลนซ์', label: 'ฟรีแลนซ์' },
//       { key: 'งานประจำ', label: 'งานประจำ' },
//     ];

//     if (loading) { return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>; }
//     if (error) { return <Alert message="เกิดข้อผิดพลาด" description={error} type="error" showIcon style={{ margin: '24px' }} />; }

//     return (
//         <>
//             <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                     <PageHeader title="ค้นหาโปรไฟล์นักศึกษา" />
//                     {authContext?.user?.role === 'student' && (
//                         <Button
//                             type="primary"
//                             icon={<PlusOutlined />}
//                             size="large"
//                             // 👇 3. อัปเดตลิงก์ตรงนี้
//                             onClick={() => navigate('/feed/create')}
//                         >
//                             สร้างโพสต์หางาน
//                         </Button>
//                     )}
//                 </div>
                
//                 <Row gutter={[24, 24]}>
//                     <Col xs={24}>
//                         <Input
//                             size="large"
//                             placeholder="ค้นหาจากชื่อ, ทักษะ, หรือคณะ..."
//                             prefix={<SearchOutlined />}
//                             onChange={e => setSearchTerm(e.target.value)}
//                             style={{ marginBottom: '16px' }}
//                         />
//                         <Tabs
//                             defaultActiveKey="all"
//                             items={tabItems}
//                             onChange={key => { setActiveTab(key); setCurrentPage(1); }}
//                         />
//                         <List
//                             grid={{ gutter: 24, xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
//                             dataSource={paginatedPosts}
//                             renderItem={post => (
//                                 <List.Item>
//                                     <StudentProfileCard post={post} onClick={() => showModal(post)} />
//                                 </List.Item>
//                             )}
//                             locale={{ emptyText: 'ไม่พบโปรไฟล์นักศึกษาที่ตรงกับเงื่อนไข' }}
//                             pagination={{
//                                 current: currentPage,
//                                 pageSize: pageSize,
//                                 total: filteredPosts.length,
//                                 onChange: (page) => setCurrentPage(page),
//                                 style: { textAlign: 'center', marginTop: '24px' }
//                             }}
//                         />
//                     </Col>
//                 </Row>
//             </div>

//             {/* ... (Modal code is unchanged) ... */}
//             <Modal
//                 open={isModalOpen}
//                 onCancel={handleCancel}
//                 width={720}
//                 className="profile-modal"
//                 destroyOnClose
//                 footer={
//                     <Space>
//                         {selectedPost?.portfolio_url && (
//                             <a href={selectedPost.portfolio_url} target="_blank" rel="noopener noreferrer">
//                                 <Button icon={<EyeOutlined />}>ดูผลงาน</Button>
//                             </a>
//                         )}
//                         <Link to={`/profile/${selectedPost?.student.first_name}`}>
//                            <Button icon={<SolutionOutlined />}>ดูโปรไฟล์</Button>
//                         </Link>
//                         <Button type="primary" icon={<MessageOutlined />}>
//                             ติดต่อ
//                         </Button>
//                     </Space>
//                 }
//             >
//                 {selectedPost && selectedPost.student && (
//                     <>
//                         <div className="modal-header-content">
//                             <Avatar size={64} icon={<UserOutlined />} />
//                             <div className="modal-header-info">
//                                 <h3 className="student-name">{selectedPost.student.first_name} {selectedPost.student.last_name}</h3>
//                                 <p className="student-faculty" style={{ margin: '2px 0' }}>
//                                     <span style={{ fontWeight: 500 }}>สาขา:</span> {selectedPost.student.faculty}
//                                 </p>
//                                 <p className="student-faculty" style={{ margin: '2px 0', marginLeft: '0px' }}>
//                                     <span style={{ fontWeight: 500 }}>ชั้นปีที่:</span> {selectedPost.student.year}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="modal-body-section">
//                             <section className="modal-introduction">
//                                 <div className="modal-skills-title">รายละเอียดงาน</div>
//                                 <Paragraph>{selectedPost.introduction}</Paragraph>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ข้อมูลติดต่อ</div>
//                                 <Space direction="vertical">
//                                     <Text><MailOutlined style={{ marginRight: 8 }} />{selectedPost.student.email}</Text>
//                                     <Text><PhoneOutlined style={{ marginRight: 8 }} />{selectedPost.student.phone}</Text>
//                                 </Space>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ประเภทงานที่มองหา</div>
//                                 <Space size={[8, 8]} wrap>
//                                     <Tag color="geekblue">{selectedPost.job_type}</Tag>
//                                 </Space>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ทักษะทั้งหมด</div>
//                                 <div className="modal-skills-container">
//                                     <Space size={[8, 8]} wrap>
//                                         {(selectedPost.skills?.split(',').map(s => s.trim()).filter(s => s) || []).map(skill => (
//                                             <Tag key={skill}>{skill}</Tag>
//                                         ))}
//                                     </Space>
//                                 </div>
//                             </section>
//                         </div>
//                     </>
//                 )}
//             </Modal>
//         </>
//     );
// };

// export default EmployerFeedPage;

// // src/pages/Employer/EmployerFeedPage.tsx

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Typography, Spin, Alert, List, Input, Tabs, Row, Col, Modal, Button, Space, Tag, Avatar } from 'antd';
// import { SearchOutlined, UserOutlined, EyeOutlined, MessageOutlined, SolutionOutlined, MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
// import StudentProfileCard from '../../components/StudentProfileCard';
// import PageHeader from '../../components/PageHeader';
// // --- vvvv START CODE CHANGE vvvv ---
// // 1. แก้ไขชื่อฟังก์ชันที่ import เข้ามาให้ถูกต้อง
// import { getStudentProfilePosts } from '../../services/studentPostService'; 
// // --- ^^^^ END CODE CHANGE ^^^^ ---
// import { AuthContext } from '../../context/AuthContext';
// import type{ StudentProfilePost } from '../../types';

// const { Paragraph, Text } = Typography;

// const EmployerFeedPage: React.FC = () => {
//     const [posts, setPosts] = useState<StudentProfilePost[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [activeTab, setActiveTab] = useState<string>('all');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const pageSize = 12;
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);

//     const authContext = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPosts = async () => {
//             setLoading(true);
//             try {
//                 // --- vvvv START CODE CHANGE vvvv ---
//                 // 2. เรียกใช้ฟังก์ชันด้วยชื่อที่ถูกต้อง
//                 const data = await getStudentProfilePosts(); 
//                 // --- ^^^^ END CODE CHANGE ^^^^ ---
//                 setPosts(Array.isArray(data) ? data : []);
//             } catch (err) {
//                 setError('ไม่สามารถโหลดข้อมูลโปรไฟล์นักศึกษาได้');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPosts();
//     }, []);

//     const filteredPosts = posts.filter(post => {
//         if (!post.student) return false;
//         const lowerSearch = searchTerm.toLowerCase();
//         const matchesSearch =
//             `${post.student.first_name} ${post.student.last_name}`.toLowerCase().includes(lowerSearch) ||
//             (post.skills || '').toLowerCase().includes(lowerSearch) ||
//             (post.student.faculty || '').toLowerCase().includes(lowerSearch);
//         const matchesTab = activeTab === 'all' || post.job_type === activeTab;
//         return matchesSearch && matchesTab;
//     });

//     const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//     const showModal = (post: StudentProfilePost) => {
//         setSelectedPost(post);
//         setIsModalOpen(true);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setSelectedPost(null);
//     };

//     const tabItems = [
//       { key: 'all', label: 'ทั้งหมด' },
//       { key: 'พาร์ทไทม์', label: 'พาร์ทไทม์' },
//       { key: 'ฝึกงาน', label: 'งานฝึกงาน' },
//       { key: 'ฟรีแลนซ์', label: 'ฟรีแลนซ์' },
//       { key: 'งานประจำ', label: 'งานประจำ' },
//     ];

//     if (loading) { return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>; }
//     if (error) { return <Alert message="เกิดข้อผิดพลาด" description={error} type="error" showIcon style={{ margin: '24px' }} />; }

//     return (
//         <>
//             <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                     <PageHeader title="ค้นหาโปรไฟล์นักศึกษา" />
//                     {authContext?.user?.role === 'student' && (
//                         <Button
//                             type="primary"
//                             icon={<PlusOutlined />}
//                             size="large"
//                             onClick={() => navigate('/feed/create')}
//                         >
//                             สร้างโพสต์หางาน
//                         </Button>
//                     )}
//                 </div>
                
//                 <Row gutter={[24, 24]}>
//                     <Col xs={24}>
//                         <Input
//                             size="large"
//                             placeholder="ค้นหาจากชื่อ, ทักษะ, หรือคณะ..."
//                             prefix={<SearchOutlined />}
//                             onChange={e => setSearchTerm(e.target.value)}
//                             style={{ marginBottom: '16px' }}
//                         />
//                         <Tabs
//                             defaultActiveKey="all"
//                             items={tabItems}
//                             onChange={key => { setActiveTab(key); setCurrentPage(1); }}
//                         />
//                         <List
//                             grid={{ gutter: 24, xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
//                             dataSource={paginatedPosts}
//                             renderItem={post => (
//                                 <List.Item>
//                                     <StudentProfileCard post={post} onClick={() => showModal(post)} />
//                                 </List.Item>
//                             )}
//                             locale={{ emptyText: 'ไม่พบโปรไฟล์นักศึกษาที่ตรงกับเงื่อนไข' }}
//                             pagination={{
//                                 current: currentPage,
//                                 pageSize: pageSize,
//                                 total: filteredPosts.length,
//                                 onChange: (page) => setCurrentPage(page),
//                                 style: { textAlign: 'center', marginTop: '24px' }
//                             }}
//                         />
//                     </Col>
//                 </Row>
//             </div>

//             {/* Modal code is unchanged */}
//             <Modal
//                 open={isModalOpen}
//                 onCancel={handleCancel}
//                 width={720}
//                 className="profile-modal"
//                 destroyOnClose
//                 footer={
//                     <Space>
//                         {selectedPost?.portfolio_url && (
//                             <a href={selectedPost.portfolio_url} target="_blank" rel="noopener noreferrer">
//                                 <Button icon={<EyeOutlined />}>ดูผลงาน</Button>
//                             </a>
//                         )}
//                         <Link to={`/profile/${selectedPost?.student.first_name}`}>
//                            <Button icon={<SolutionOutlined />}>ดูโปรไฟล์</Button>
//                         </Link>
//                         <Button type="primary" icon={<MessageOutlined />}>
//                             ติดต่อ
//                         </Button>
//                     </Space>
//                 }
//             >
//                 {selectedPost && selectedPost.student && (
//                     <>
//                         <div className="modal-header-content">
//                             <Avatar size={64} icon={<UserOutlined />} />
//                             <div className="modal-header-info">
//                                 <h3 className="student-name">{selectedPost.student.first_name} {selectedPost.student.last_name}</h3>
//                                 <p className="student-faculty" style={{ margin: '2px 0' }}>
//                                     <span style={{ fontWeight: 500 }}>สาขา:</span> {selectedPost.student.faculty}
//                                 </p>
//                                 <p className="student-faculty" style={{ margin: '2px 0', marginLeft: '0px' }}>
//                                     <span style={{ fontWeight: 500 }}>ชั้นปีที่:</span> {selectedPost.student.year}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="modal-body-section">
//                             <section className="modal-introduction">
//                                 <div className="modal-skills-title">รายละเอียดงาน</div>
//                                 <Paragraph>{selectedPost.introduction}</Paragraph>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ข้อมูลติดต่อ</div>
//                                 <Space direction="vertical">
//                                     <Text><MailOutlined style={{ marginRight: 8 }} />{selectedPost.student.email}</Text>
//                                     <Text><PhoneOutlined style={{ marginRight: 8 }} />{selectedPost.student.phone}</Text>
//                                 </Space>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ประเภทงานที่มองหา</div>
//                                 <Space size={[8, 8]} wrap>
//                                     <Tag color="geekblue">{selectedPost.job_type}</Tag>
//                                 </Space>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ทักษะทั้งหมด</div>
//                                 <div className="modal-skills-container">
//                                     <Space size={[8, 8]} wrap>
//                                         {(selectedPost.skills?.split(',').map(s => s.trim()).filter(s => s) || []).map(skill => (
//                                             <Tag key={skill}>{skill}</Tag>
//                                         ))}
//                                     </Space>
//                                 </div>
//                             </section>
//                         </div>
//                     </>
//                 )}
//             </Modal>
//         </>
//     );
// };

// export default EmployerFeedPage;

// src/pages/Employer/EmployerFeedPage.tsx

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Typography, Spin, Alert, List, Input, Tabs, Row, Col, Modal, Button, Space, Tag, Avatar } from 'antd';
// import { SearchOutlined, UserOutlined, EyeOutlined, MessageOutlined, SolutionOutlined, MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
// import StudentProfileCard from '../../components/StudentProfileCard';
// import PageHeader from '../../components/PageHeader';
// import { getStudentProfilePosts } from '../../services/studentPostService'; 
// import { AuthContext } from '../../context/AuthContext';
// import type{ StudentProfilePost } from '../../types';

// const { Paragraph, Text } = Typography;

// const EmployerFeedPage: React.FC = () => {
//     const [posts, setPosts] = useState<StudentProfilePost[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [activeTab, setActiveTab] = useState<string>('all');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const pageSize = 12;
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);

//     const authContext = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPosts = async () => {
//             setLoading(true);
//             try {
//                 // เรียก API เพื่อดึงข้อมูล
//                 const response = await getStudentProfilePosts(); 

//                 // --- vvvv START CODE CHANGE vvvv ---
//                 // ✨ จุดแก้ไขสำคัญ ✨
//                 // ตรวจสอบว่า response ที่ได้มามี key ชื่อ data และข้างในเป็น Array หรือไม่
//                 if (response && Array.isArray(response.data)) {
//                     // ถ้าใช่, ให้ setPosts ด้วยอาร์เรย์ที่อยู่ใน response.data
//                     setPosts(response.data);
//                 } else {
//                     // ถ้าโครงสร้างไม่ถูกต้อง ให้ตั้งค่าเป็นอาร์เรย์ว่าง
//                     console.warn("API response is not in the expected format:", response);
//                     setPosts([]);
//                 }
//                 // --- ^^^^ END CODE CHANGE ^^^^ ---

//             } catch (err) {
//                 // จัดการ Error กรณีที่เรียก API ไม่สำเร็จ (เช่น Server ปิด)
//                 if (err instanceof Error) {
//                     setError(`ไม่สามารถโหลดข้อมูลโปรไฟล์นักศึกษาได้: ${err.message}`);
//                 } else {
//                     setError('เกิดข้อผิดพลาดที่ไม่รู้จักขณะโหลดข้อมูล');
//                 }
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPosts();
//     }, []);

//     // โค้ดส่วนที่เหลือไม่ต้องแก้ไข
//     const filteredPosts = posts.filter(post => {
//         if (!post.student) return false;
//         const lowerSearch = searchTerm.toLowerCase();
//         const matchesSearch =
//             `${post.student.first_name} ${post.student.last_name}`.toLowerCase().includes(lowerSearch) ||
//             (post.skills || '').toLowerCase().includes(lowerSearch) ||
//             (post.student.faculty || '').toLowerCase().includes(lowerSearch);
//         const matchesTab = activeTab === 'all' || post.job_type === activeTab;
//         return matchesSearch && matchesTab;
//     });

//     const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//     const showModal = (post: StudentProfilePost) => {
//         setSelectedPost(post);
//         setIsModalOpen(true);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setSelectedPost(null);
//     };

//     const tabItems = [
//       { key: 'all', label: 'ทั้งหมด' },
//       { key: 'พาร์ทไทม์', label: 'พาร์ทไทม์' },
//       { key: 'ฝึกงาน', label: 'งานฝึกงาน' },
//       { key: 'ฟรีแลนซ์', label: 'ฟรีแลนซ์' },
//       { key: 'งานประจำ', label: 'งานประจำ' },
//     ];

//     if (loading) { return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>; }
//     if (error) { return <Alert message="เกิดข้อผิดพลาด" description={error} type="error" showIcon style={{ margin: '24px' }} />; }

//     return (
//         <>
//             <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                     <PageHeader title="ค้นหาโปรไฟล์นักศึกษา" />
//                     {authContext?.user?.role === 'student' && (
//                         <Button
//                             type="primary"
//                             icon={<PlusOutlined />}
//                             size="large"
//                             onClick={() => navigate('/feed/create')}
//                         >
//                             สร้างโพสต์หางาน
//                         </Button>
//                     )}
//                 </div>
                
//                 <Row gutter={[24, 24]}>
//                     <Col xs={24}>
//                         <Input
//                             size="large"
//                             placeholder="ค้นหาจากชื่อ, ทักษะ, หรือคณะ..."
//                             prefix={<SearchOutlined />}
//                             onChange={e => setSearchTerm(e.target.value)}
//                             style={{ marginBottom: '16px' }}
//                         />
//                         <Tabs
//                             defaultActiveKey="all"
//                             items={tabItems}
//                             onChange={key => { setActiveTab(key); setCurrentPage(1); }}
//                         />
//                         <List
//                             grid={{ gutter: 24, xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
//                             dataSource={paginatedPosts}
//                             renderItem={post => (
//                                 <List.Item>
//                                     <StudentProfileCard post={post} onClick={() => showModal(post)} />
//                                 </List.Item>
//                             )}
//                             locale={{ emptyText: 'ไม่พบโปรไฟล์นักศึกษาที่ตรงกับเงื่อนไข' }}
//                             pagination={{
//                                 current: currentPage,
//                                 pageSize: pageSize,
//                                 total: filteredPosts.length,
//                                 onChange: (page) => setCurrentPage(page),
//                                 style: { textAlign: 'center', marginTop: '24px' }
//                             }}
//                         />
//                     </Col>
//                 </Row>
//             </div>

//             <Modal
//                 open={isModalOpen}
//                 onCancel={handleCancel}
//                 width={720}
//                 className="profile-modal"
//                 destroyOnClose
//                 footer={
//                     <Space>
//                         {selectedPost?.portfolio_url && (
//                             <a href={selectedPost.portfolio_url} target="_blank" rel="noopener noreferrer">
//                                 <Button icon={<EyeOutlined />}>ดูผลงาน</Button>
//                             </a>
//                         )}
//                         <Link to={`/profile/${selectedPost?.student.first_name}`}>
//                            <Button icon={<SolutionOutlined />}>ดูโปรไฟล์</Button>
//                         </Link>
//                         <Button type="primary" icon={<MessageOutlined />}>
//                             ติดต่อ
//                         </Button>
//                     </Space>
//                 }
//             >
//                 {selectedPost && selectedPost.student && (
//                     <>
//                         <div className="modal-header-content">
//                             <Avatar size={64} icon={<UserOutlined />} />
//                             <div className="modal-header-info">
//                                 <h3 className="student-name">{selectedPost.student.first_name} {selectedPost.student.last_name}</h3>
//                                 <p className="student-faculty" style={{ margin: '2px 0' }}>
//                                     <span style={{ fontWeight: 500 }}>สาขา:</span> {selectedPost.student.faculty}
//                                 </p>
//                                 <p className="student-faculty" style={{ margin: '2px 0', marginLeft: '0px' }}>
//                                     <span style={{ fontWeight: 500 }}>ชั้นปีที่:</span> {selectedPost.student.year}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="modal-body-section">
//                             <section className="modal-introduction">
//                                 <div className="modal-skills-title">รายละเอียดงาน</div>
//                                 <Paragraph>{selectedPost.introduction}</Paragraph>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ข้อมูลติดต่อ</div>
//                                 <Space direction="vertical">
//                                     <Text><MailOutlined style={{ marginRight: 8 }} />{selectedPost.student.email}</Text>
//                                     <Text><PhoneOutlined style={{ marginRight: 8 }} />{selectedPost.student.phone}</Text>
//                                 </Space>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ประเภทงานที่มองหา</div>
//                                 <Space size={[8, 8]} wrap>
//                                     <Tag color="geekblue">{selectedPost.job_type}</Tag>
//                                 </Space>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ทักษะทั้งหมด</div>
//                                 <div className="modal-skills-container">
//                                     <Space size={[8, 8]} wrap>
//                                         {(selectedPost.skills?.split(',').map(s => s.trim()).filter(s => s) || []).map(skill => (
//                                             <Tag key={skill}>{skill}</Tag>
//                                         ))}
//                                     </Space>
//                                 </div>
//                             </section>
//                         </div>
//                     </>
//                 )}
//             </Modal>
//         </>
//     );
// };

// export default EmployerFeedPage;

// src/pages/Employer/EmployerFeedPage.tsx

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Typography, Spin, Alert, List, Input, Tabs, Row, Col, Modal, Button, Space, Tag, Avatar } from 'antd';
// import { SearchOutlined, UserOutlined, EyeOutlined, MessageOutlined, SolutionOutlined, MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
// import StudentProfileCard from '../../components/StudentProfileCard';
// import PageHeader from '../../components/PageHeader';
// import { getStudentProfilePosts } from '../../services/studentPostService';
// import { AuthContext } from '../../context/AuthContext';
// import type{ StudentProfilePost } from '../../types';

// const { Paragraph, Text } = Typography;

// const EmployerFeedPage: React.FC = () => {
//     const [posts, setPosts] = useState<StudentProfilePost[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [activeTab, setActiveTab] = useState<string>('all');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const pageSize = 12;
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);

//     const authContext = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPosts = async () => {
//             setLoading(true);
//             try {
//                 const response = await getStudentProfilePosts();
                
//                 // --- vvvv START DEBUGGING CODE vvvv ---
//                 // ✨ จุดตรวจสอบที่ 1: ดูข้อมูลดิบที่ได้จาก API ทั้งหมด
//                 console.log("API Response:", response); 
//                 // ✨ จุดตรวจสอบที่ 2: ดูเฉพาะข้อมูลที่คาดว่าจะเป็น Array ของโพสต์
//                 console.log("Data to be set:", response.data);
//                 // --- ^^^^ END DEBUGGING CODE ^^^^ ---

//                 if (response && Array.isArray(response.data)) {
//                     setPosts(response.data);
//                 } else {
//                     console.warn("API response is not in the expected format:", response);
//                     setPosts([]);
//                 }
//             } catch (err) {
//                 // --- vvvv START DEBUGGING CODE vvvv ---
//                 // ✨ จุดตรวจสอบที่ 3: ดู Error ที่เกิดขึ้นถ้าการเรียก API ล้มเหลว
//                 console.error("Failed to fetch posts:", err); 
//                 // --- ^^^^ END DEBUGGING CODE ^^^^ ---

//                 if (err instanceof Error) {
//                     setError(`ไม่สามารถโหลดข้อมูลโปรไฟล์นักศึกษาได้: ${err.message}`);
//                 } else {
//                     setError('เกิดข้อผิดพลาดที่ไม่รู้จักขณะโหลดข้อมูล');
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPosts();
//     }, []);

//     // ... (โค้ดส่วนที่เหลือเหมือนเดิมทั้งหมด) ...
//     const filteredPosts = posts.filter(post => {
//         if (!post.student) return false;
//         const lowerSearch = searchTerm.toLowerCase();
//         // --- vvvv START DEBUGGING CODE vvvv ---
//         // ✨ จุดตรวจสอบที่ 4: แก้ไขการค้นหาให้ตรงกับข้อมูลจาก Backend (Faculty เป็น Object)
//         const facultyName = post.faculty?.Name || 'N/A';
//         const matchesSearch =
//             `${post.student.first_name} ${post.student.last_name}`.toLowerCase().includes(lowerSearch) ||
//             (post.skills || '').toLowerCase().includes(lowerSearch) ||
//             facultyName.toLowerCase().includes(lowerSearch);
//         // --- ^^^^ END DEBUGGING CODE ^^^^ ---
//         const matchesTab = activeTab === 'all' || post.job_type === activeTab;
//         return matchesSearch && matchesTab;
//     });

//     const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//     const showModal = (post: StudentProfilePost) => {
//         setSelectedPost(post);
//         setIsModalOpen(true);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//         setSelectedPost(null);
//     };

//     const tabItems = [
//       { key: 'all', label: 'ทั้งหมด' },
//       { key: 'พาร์ทไทม์', label: 'พาร์ทไทม์' },
//       { key: 'ฝึกงาน', label: 'งานฝึกงาน' },
//       { key: 'ฟรีแลนซ์', label: 'ฟรีแลนซ์' },
//       { key: 'งานประจำ', label: 'งานประจำ' },
//     ];

//     if (loading) { return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>; }
//     if (error) { return <Alert message="เกิดข้อผิดพลาด" description={error} type="error" showIcon style={{ margin: '24px' }} />; }

//     return (
//         <>
//             <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                     <PageHeader title="ค้นหาโปรไฟล์นักศึกษา" />
//                     {authContext?.user?.role === 'student' && (
//                         <Button
//                             type="primary"
//                             icon={<PlusOutlined />}
//                             size="large"
//                             onClick={() => navigate('/feed/create')}
//                         >
//                             สร้างโพสต์หางาน
//                         </Button>
//                     )}
//                 </div>
                
//                 <Row gutter={[24, 24]}>
//                     <Col xs={24}>
//                         <Input
//                             size="large"
//                             placeholder="ค้นหาจากชื่อ, ทักษะ, หรือคณะ..."
//                             prefix={<SearchOutlined />}
//                             onChange={e => setSearchTerm(e.target.value)}
//                             style={{ marginBottom: '16px' }}
//                         />
//                         <Tabs
//                             defaultActiveKey="all"
//                             items={tabItems}
//                             onChange={key => { setActiveTab(key); setCurrentPage(1); }}
//                         />
//                         <List
//                             grid={{
//                                 gutter: 24,
//                                 xs: 1,
//                                 sm: 2,
//                                 md: 2,
//                                 lg: 3,
//                                 xl: 4,
//                                 xxl: 4,
//                             }}
//                             dataSource={paginatedPosts}
//                             renderItem={post => (
//                                 <List.Item>
//                                     <StudentProfileCard post={post} onClick={() => showModal(post)} />
//                                 </List.Item>
//                             )}
//                             locale={{ emptyText: 'ไม่พบโปรไฟล์นักศึกษาที่ตรงกับเงื่อนไข' }}
//                             pagination={{
//                                 current: currentPage,
//                                 pageSize: pageSize,
//                                 total: filteredPosts.length,
//                                 onChange: (page) => setCurrentPage(page),
//                                 style: { textAlign: 'center', marginTop: '24px' }
//                             }}
//                         />
//                     </Col>
//                 </Row>
//             </div>

//             <Modal
//                 open={isModalOpen}
//                 onCancel={handleCancel}
//                 width={720}
//                 className="profile-modal"
//                 destroyOnClose
//                 footer={
//                     <Space>
//                         {selectedPost?.portfolio_url && (
//                             <a href={selectedPost.portfolio_url} target="_blank" rel="noopener noreferrer">
//                                 <Button icon={<EyeOutlined />}>ดูผลงาน</Button>
//                             </a>
//                         )}
//                         {selectedPost?.student && (
//                             <Link to={`/profile/${selectedPost.student.ID}`}>
//                                <Button icon={<SolutionOutlined />}>ดูโปรไฟล์</Button>
//                             </Link>
//                         )}
//                         <Button type="primary" icon={<MessageOutlined />}>
//                             ติดต่อ
//                         </Button>
//                     </Space>
//                 }
//             >
//                 {/* --- vvvv START DEBUGGING CODE vvvv --- */}
//                 {/* ✨ จุดตรวจสอบที่ 5: แก้ไขการแสดงผล Modal ให้ตรงกับข้อมูลจาก Backend */}
//                 {selectedPost && selectedPost.student && (
//                     <>
//                         <div className="modal-header-content">
//                             <Avatar size={64} icon={<UserOutlined />} src={selectedPost.student.profile_image_url} />
//                             <div className="modal-header-info">
//                                 <h3 className="student-name">{selectedPost.student.first_name} {selectedPost.student.last_name}</h3>
//                                 <p className="student-faculty" style={{ margin: '2px 0' }}>
//     <span style={{ fontWeight: 500 }}>คณะ/สาขา:</span> {selectedPost.student?.faculty?.Name} / {selectedPost.student?.department?.Name}
// </p>
//                                 <p className="student-faculty" style={{ margin: '2px 0' }}>
//                                     <span style={{ fontWeight: 500 }}>ชั้นปี:</span> {selectedPost.year}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="modal-body-section">
//                             <section className="modal-introduction">
//                                 <div className="modal-skills-title">รายละเอียดงาน</div>
//                                 <Paragraph>{selectedPost.introduction}</Paragraph>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ข้อมูลติดต่อ</div>
//                                 <Space direction="vertical">
//                                     <Text><MailOutlined style={{ marginRight: 8 }} />{selectedPost.student.email}</Text>
//                                     <Text><PhoneOutlined style={{ marginRight: 8 }} />{selectedPost.student.phone}</Text>
//                                 </Space>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ประเภทงาน</div>
//                                 <Space size={[8, 8]} wrap>
//                                     <Tag color="geekblue">{selectedPost.job_type}</Tag>
//                                 </Space>
//                             </section>
//                             <section>
//                                 <div className="modal-skills-title">ความสามารถพิเศษ</div>
//                                 <div className="modal-skills-container">
//                                     <Space size={[8, 8]} wrap>
//                                         {(selectedPost.skills?.split(',').map(s => s.trim()).filter(s => s) || []).map(skill => (
//                                             <Tag key={skill}>{skill}</Tag>
//                                         ))}
//                                     </Space>
//                                 </div>
//                             </section>
//                         </div>
//                     </>
//                 )}
//                 {/* --- ^^^^ END DEBUGGING CODE ^^^^ --- */}
//             </Modal>
//         </>
//     );
// };

// export default EmployerFeedPage;
