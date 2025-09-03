// // src/components/CreatePostModal.tsx
// import React, { useState } from 'react';
// import { Modal, Card, Button, Typography, Row, Col, Space } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import {
//   EditOutlined,
//   UserAddOutlined,
//   BriefcaseOutlined,
//   RocketOutlined,
//   CloseOutlined
// } from '@ant-design/icons';

// const { Title, Text, Paragraph } = Typography;

// interface CreatePostModalProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const CreatePostModal: React.FC<CreatePostModalProps> = ({ visible, onClose }) => {
//   const navigate = useNavigate();

//   const handleCreateProfile = () => {
//     onClose();
//     navigate('/StudentPost');
//   };

//   const handleCreateRegularPost = () => {
//     // นี่จะเป็นการสร้างโพสต์ปกติ (ถ้ามี)
//     onClose();
//     // navigate('/create-regular-post'); // หรือเปิด modal อื่น
//   };

//   return (
//     <Modal
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//       width={700}
//       centered
//       closeIcon={<CloseOutlined style={{ fontSize: '20px' }} />}
//       styles={{
//         content: {
//           borderRadius: '20px',
//           overflow: 'hidden',
//           padding: 0
//         }
//       }}
//     >
//       <div style={{
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         padding: '40px',
//         textAlign: 'center',
//         color: 'white'
//       }}>
//         <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🚀</div>
//         <Title level={2} style={{ color: 'white', margin: 0, marginBottom: '8px' }}>
//           เริ่มต้นการเดินทางในสายอาชีพ
//         </Title>
//         <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', margin: 0 }}>
//           เลือกวิธีที่คุณต้องการแสดงตัวต่อนายจ้าง
//         </Paragraph>
//       </div>

//       <div style={{ padding: '32px' }}>
//         <Row gutter={[24, 24]}>
//           {/* สร้างโปรไฟล์หางาน */}
//           <Col xs={24} md={12}>
//             <Card
//               hoverable
//               onClick={handleCreateProfile}
//               style={{
//                 borderRadius: '16px',
//                 border: '2px solid #f0f0f0',
//                 height: '280px',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 textAlign: 'center'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.borderColor = '#667eea';
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.borderColor = '#f0f0f0';
//                 e.currentTarget.style.transform = 'translateY(0px)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
//               }}
//             >
//               <div style={{ padding: '20px' }}>
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 20px',
//                   fontSize: '32px'
//                 }}>
//                   <BriefcaseOutlined style={{ color: 'white' }} />
//                 </div>
                
//                 <Title level={4} style={{ color: '#333', marginBottom: '12px' }}>
//                   สร้างโปรไฟล์หางาน
//                 </Title>
                
//                 <Paragraph style={{ 
//                   color: '#666', 
//                   fontSize: '14px',
//                   lineHeight: '1.6',
//                   marginBottom: '16px'
//                 }}>
//                   สร้างโปรไฟล์แสดงทักษะ ความสามารถ และประสบการณ์ของคุณเพื่อให้นายจ้างสนใจ
//                 </Paragraph>

//                 <div style={{
//                   background: '#f0f7ff',
//                   padding: '8px 12px',
//                   borderRadius: '20px',
//                   display: 'inline-block'
//                 }}>
//                   <Text style={{ color: '#1890ff', fontSize: '12px', fontWeight: '500' }}>
//                     ⭐ แนะนำสำหรับนักศึกษา
//                   </Text>
//                 </div>
//               </div>
//             </Card>
//           </Col>

//           {/* โพสต์ปกติ */}
//           <Col xs={24} md={12}>
//             <Card
//               hoverable
//               onClick={handleCreateRegularPost}
//               style={{
//                 borderRadius: '16px',
//                 border: '2px solid #f0f0f0',
//                 height: '280px',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 textAlign: 'center'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.borderColor = '#52c41a';
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 8px 25px rgba(82, 196, 26, 0.15)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.borderColor = '#f0f0f0';
//                 e.currentTarget.style.transform = 'translateY(0px)';
//                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
//               }}
//             >
//               <div style={{ padding: '20px' }}>
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 20px',
//                   fontSize: '32px'
//                 }}>
//                   <EditOutlined style={{ color: 'white' }} />
//                 </div>
                
//                 <Title level={4} style={{ color: '#333', marginBottom: '12px' }}>
//                   โพสต์ทั่วไป
//                 </Title>
                
//                 <Paragraph style={{ 
//                   color: '#666', 
//                   fontSize: '14px',
//                   lineHeight: '1.6',
//                   marginBottom: '16px'
//                 }}>
//                   แชร์ความคิดเห็น ประสบการณ์ หรือข้อมูลที่น่าสนใจกับเพื่อนๆ ในชุมชน
//                 </Paragraph>

//                 <div style={{
//                   background: '#f6ffed',
//                   padding: '8px 12px',
//                   borderRadius: '20px',
//                   display: 'inline-block'
//                 }}>
//                   <Text style={{ color: '#52c41a', fontSize: '12px', fontWeight: '500' }}>
//                     💬 แบ่งปันประสบการณ์
//                   </Text>
//                 </div>
//               </div>
//             </Card>
//           </Col>
//         </Row>

//         {/* Quick Tips */}
//         <div style={{
//           marginTop: '32px',
//           padding: '20px',
//           background: '#fafbfc',
//           borderRadius: '12px',
//           border: '1px solid #e8e8e8'
//         }}>
//           <Space direction="vertical" style={{ width: '100%' }}>
//             <Title level={5} style={{ 
//               margin: 0, 
//               color: '#1890ff',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}>
//               <RocketOutlined />
//               เคล็ดลับเพื่อความสำเร็จ
//             </Title>
            
//             <Row gutter={[16, 8]} style={{ marginTop: '12px' }}>
//               <Col xs={24} md={8}>
//                 <Text style={{ fontSize: '13px', color: '#666' }}>
//                   ✏️ เขียนข้อมูลให้ครบถ้วน
//                 </Text>
//               </Col>
//               <Col xs={24} md={8}>
//                 <Text style={{ fontSize: '13px', color: '#666' }}>
//                   🎯 ระบุทักษะที่ตรงกับงาน
//                 </Text>
//               </Col>
//               <Col xs={24} md={8}>
//                 <Text style={{ fontSize: '13px', color: '#666' }}>
//                   🔗 แนบลิงก์ผลงานของคุณ
//                 </Text>
//               </Col>
//             </Row>
//           </Space>
//         </div>

//         {/* Cancel Button */}
//         <div style={{ textAlign: 'center', marginTop: '24px' }}>
//           <Button
//             size="large"
//             onClick={onClose}
//             style={{
//               height: '44px',
//               borderRadius: '12px',
//               fontSize: '15px',
//               minWidth: '120px',
//               border: '2px solid #f0f0f0'
//             }}
//           >
//             ยกเลิก
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CreatePostModal;