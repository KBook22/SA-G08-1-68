// // // // src/components/StudentProfileCard.tsx
// // // import React from 'react';
// // // import { Card, Avatar, Typography, Tag, Space } from 'antd';
// // // import { UserOutlined } from '@ant-design/icons';
// // // import './StudentProfileCard.css';

// // // const { Text } = Typography;
// // // const { Meta } = Card;

// // // interface Student {
// // //     first_name: string;
// // //     last_name: string;
// // //     faculty: string;
// // //     year: string;
// // // }

// // // // 1. แก้ไขชื่อจาก "Student" เป็น "student" (ตัวพิมพ์เล็ก)
// // // interface StudentProfilePost {
// // //     introduction: string;
// // //     skills: string;
// // //     student: Student;
// // // }

// // // interface StudentProfileCardProps {
// // //   post: StudentProfilePost;
// // //   onClick: () => void;
// // // }

// // // const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ post, onClick }) => {
// // //   const skillsArray = post.skills?.split(',').map(s => s.trim()).filter(s => s) || [];

// // //   return (
// // //     <Card
// // //       hoverable
// // //       className="student-grid-card"
// // //       onClick={onClick}
// // //       cover={
// // //         <div className="ant-card-cover">
// // //             <UserOutlined className="placeholder-icon" />
// // //         </div>
// // //       }
// // //     >
// // //       {/* 2. แก้ไขการแสดงผลเป็น post.student */}
// // //       <Meta
// // //         title={`${post.student.first_name} ${post.student.last_name}`}
// // //         description={post.introduction}
// // //       />
// // //       <div className="skills-section-in-card">
// // //         <div className="skills-title">ทักษะ</div>
// // //         <Space size={[4, 8]} wrap>
// // //             {skillsArray.slice(0, 3).map(skill => (
// // //                 <Tag key={skill}>{skill}</Tag>
// // //             ))}
// // //             {skillsArray.length > 3 && <Tag>...</Tag>}
// // //         </Space>
// // //       </div>
// // //     </Card>
// // //   );
// // // };

// // // export default StudentProfileCard;

// // // src/components/StudentProfileCard.tsx
// // // src/components/StudentProfileCard.tsx

// // // src/components/StudentProfileCard.tsx

// // // import React from 'react';
// // // import { Card, Typography, Space, Tag, Avatar, Button } from 'antd';
// // // import { UserOutlined } from '@ant-design/icons';
// // // import type { StudentProfilePost } from '../types'; // ตรวจสอบ path ให้ถูกต้อง

// // // const { Text, Paragraph } = Typography;

// // // interface StudentProfileCardProps {
// // //   post: StudentProfilePost;
// // //   onClick: () => void; // ฟังก์ชันสำหรับปุ่ม "ดูเพิ่มเติม"
// // // }

// // // const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ post, onClick }) => {
// // //   // เตรียมข้อมูล
// // //   const studentName = post.student ? `${post.student.first_name} ${post.student.last_name}` : 'ไม่ระบุชื่อ';
// // //   const faculty = post.student?.faculty || 'ไม่ระบุคณะ';
// // //   const displaySkills = post.skills?.split(',').map(s => s.trim()).filter(s => s) || [];

// // //   return (
// // //     <Card
// // //       hoverable
// // //       style={{
// // //         width: '100%',
// // //         borderRadius: '12px',
// // //         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
// // //         transition: 'all 0.3s ease',
// // //         border: '1px solid #f0f0f0',
// // //       }}
// // //       bodyStyle={{ padding: '24px' }}
// // //       onClick={onClick} // ทำให้คลิกตรงไหนของการ์ดก็ได้ผลเหมือนกดปุ่ม
// // //     >
// // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// // //         {/* ส่วนข้อมูลหลักด้านซ้าย */}
// // //         <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, marginRight: '20px' }}>
          
// // //           {/* Section 1: โปรไฟล์ */}
// // //           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
// // //             <Avatar size={64} icon={<UserOutlined />} src={post.student?.profile_image_url} style={{ marginRight: '16px' }} />
// // //             <div>
// // //               <Text strong style={{ fontSize: '1.2rem', display: 'block' }}>{studentName}</Text>
// // //               <Text type="secondary">{faculty}</Text>
// // //             </div>
// // //           </div>

// // //           {/* Section 2: ประเภทงาน */}
// // //           <div style={{ marginBottom: '16px' }}>
// // //             <Text strong>ประเภทงานที่ต้องการ:</Text>
// // //             <div style={{ marginTop: '8px' }}>
// // //               <Tag color="blue" style={{ fontSize: '14px', padding: '4px 8px' }}>{post.job_type}</Tag>
// // //             </div>
// // //           </div>

// // //           {/* Section 3: แนะนำตัวเอง */}
// // //           <div style={{ marginBottom: '20px' }}>
// // //             <Text strong>แนะนำตัวเอง:</Text>
// // //             <Paragraph ellipsis={{ rows: 2, expandable: false }} type="secondary" style={{ marginTop: '4px' }}>
// // //               {post.introduction || 'ไม่มีข้อมูลแนะนำตัว'}
// // //             </Paragraph>
// // //           </div>

// // //           {/* Section 4: ทักษะ */}
// // //           <div>
// // //             <Text strong>ทักษะ:</Text>
// // //             <Space size={[8, 8]} wrap style={{ marginTop: '8px' }}>
// // //               {displaySkills.length > 0 ? (
// // //                 displaySkills.slice(0, 4).map(skill => <Tag key={skill}>{skill}</Tag>) // แสดงแค่ 4 ทักษะ
// // //               ) : (
// // //                 <Text type="secondary">ไม่มีทักษะระบุ</Text>
// // //               )}
// // //               {displaySkills.length > 4 && <Tag>...</Tag>}
// // //             </Space>
// // //           </div>
// // //         </div>

// // //         {/* ส่วนปุ่ม "ดูเพิ่มเติม" ด้านขวา */}
// // //         <div style={{ flexShrink: 0 }}>
// // //           <Button type="primary" onClick={onClick}>
// // //             ดูเพิ่มเติม
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </Card>
// // //   );
// // // };

// // // export default StudentProfileCard;

// // import React from 'react';
// // import { Card, Avatar, Typography, Tag, Space } from 'antd';
// // import { UserOutlined } from '@ant-design/icons';
// // import type { StudentProfilePost } from '../types'; // ตรวจสอบว่า path ถูกต้อง
// // import './StudentProfileCard.css'; // Import CSS ที่จะแก้ไขในขั้นตอนถัดไป

// // const { Text, Paragraph } = Typography;
// // const { Meta } = Card;

// // interface StudentProfileCardProps {
// //   post: StudentProfilePost;
// //   onClick: () => void;
// // }

// // const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ post, onClick }) => {
// //   // เตรียมข้อมูล
// //   const studentName = post.student ? `${post.student.first_name} ${post.student.last_name}` : 'ไม่ระบุชื่อ';
// //   const facultyAndYear = post.student ? `${post.student.faculty || 'ไม่ระบุคณะ'} - ปีที่ ${post.student.year || 'N/A'}` : 'ไม่ระบุข้อมูลการศึกษา';
// //   const skillsArray = post.skills?.split(',').map(s => s.trim()).filter(s => s) || [];

// //   return (
// //     <Card
// //       hoverable
// //       className="student-grid-card"
// //       onClick={onClick}
// //       cover={
// //         <div className="ant-card-cover">
// //           {post.student?.profile_image_url ? (
// //             <img alt={studentName} src={post.student.profile_image_url} />
// //           ) : (
// //             <UserOutlined className="placeholder-icon" />
// //           )}
// //         </div>
// //       }
// //     >
// //       <Meta
// //         avatar={<Avatar src={post.student?.profile_image_url} icon={<UserOutlined />} />}
// //         title={studentName}
// //         description={facultyAndYear}
// //       />
      
// //       <div className="card-job-type">
// //         <Tag color="blue">{post.job_type}</Tag>
// //       </div>

// //       <div className="skills-section-in-card">
// //         <div className="skills-title">ทักษะเด่น</div>
// //         <Space size={[4, 8]} wrap>
// //           {skillsArray.length > 0 ? (
// //             skillsArray.slice(0, 3).map(skill => <Tag key={skill}>{skill}</Tag>)
// //           ) : (
// //             <Text type="secondary">ไม่มีทักษะที่ระบุ</Text>
// //           )}
// //           {skillsArray.length > 3 && <Tag>...</Tag>}
// //         </Space>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default StudentProfileCard;
// // src/components/StudentProfileCard.tsx

// import React from 'react';
// import { Card, Avatar, Typography, Tag, Space } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
// import type { StudentProfilePost } from '../types';
// import './StudentProfileCard.css';

// const { Text, Paragraph } = Typography;
// const { Meta } = Card;

// interface StudentProfileCardProps {
//   post: StudentProfilePost;
//   onClick: () => void;
// }

// const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ post, onClick }) => {
//   // --- ส่วนเตรียมข้อมูล ---
//   const studentName = post.student ? `${post.student.first_name} ${post.student.last_name}` : 'ไม่ระบุชื่อ';

//   // ✨ จุดแก้ไข: เปลี่ยนมาดึงข้อมูลคณะและปีจาก post.student ✨
//   const facultyAndYear = post.student
//     ? `${post.student.faculty || 'ไม่ระบุคณะ'} - ปีที่ ${post.student.year || 'N/A'}`
//     : 'ไม่ระบุข้อมูลการศึกษา';

//   const skillsArray = post.skills?.split(',').map(s => s.trim()).filter(s => s) || [];

//   return (
//     <Card
//       hoverable
//       className="student-grid-card"
//       onClick={onClick}
//       cover={
//         <div className="card-cover-image">
//           {post.student?.profile_image_url ? (
//             <img alt={studentName} src={post.student.profile_image_url} />
//           ) : (
//             <div className="placeholder-cover">
//               <UserOutlined className="placeholder-icon" />
//             </div>
//           )}
//         </div>
//       }
//     >
//       <Meta
//         avatar={<Avatar size={40} src={post.student?.profile_image_url} icon={<UserOutlined />} />}
//         title={<div className="card-title">{studentName}</div>}
//         description={<div className="card-description">{facultyAndYear}</div>}
//       />
      
//       <Paragraph className="card-introduction" ellipsis={{ rows: 3 }}>
//         {post.introduction}
//       </Paragraph>

//       <div className="card-job-type">
//         <Tag color="blue">{post.job_type}</Tag>
//       </div>

//       <div className="skills-section-in-card">
//         <div className="skills-title">ทักษะเด่น</div>
//         <Space size={[4, 8]} wrap>
//           {skillsArray.length > 0 ? (
//             skillsArray.slice(0, 3).map(skill => <Tag key={skill}>{skill}</Tag>)
//           ) : (
//             <Text type="secondary">ไม่มีทักษะที่ระบุ</Text>
//           )}
//           {skillsArray.length > 3 && <Tag>...</Tag>}
//         </Space>
//       </div>
//     </Card>
//   );
// };

// export default StudentProfileCard;