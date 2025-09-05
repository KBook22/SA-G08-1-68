// // src/components/StudentPostFormModal.tsx - Fixed
// import React, { useState } from 'react';
// import { Modal, Button, Typography } from 'antd';
// import { CloseOutlined } from '@ant-design/icons';
// import StudentPostForm from '../pages/StudentPost/StudentPostForm';

// const { Title } = Typography;

// interface StudentPostFormModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
// }

// const StudentPostFormModal: React.FC<StudentPostFormModalProps> = ({
//   visible,
//   onClose,
//   onSuccess
// }) => {
//   return (
//     <Modal
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//       width={900}
//       centered
//       closeIcon={<CloseOutlined style={{ fontSize: '20px' }} />}
//       styles={{
//         content: {
//           borderRadius: '20px',
//           overflow: 'hidden',
//           padding: 0,
//           maxHeight: '90vh',
//           overflowY: 'auto'
//         }
//       }}
//       destroyOnClose // ทำลาย component เมื่อปิด modal
//     >
//       {/* Header */}
//       <div style={{
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         padding: '40px 32px',
//         textAlign: 'center',
//         color: 'white',
//         position: 'relative'
//       }}>
//         {/* Background decorations */}
//         <div style={{
//           position: 'absolute',
//           top: '10%',
//           right: '10%',
//           width: '80px',
//           height: '80px',
//           background: 'rgba(255, 255, 255, 0.1)',
//           borderRadius: '50%',
//           zIndex: 0
//         }} />
        
//         <div style={{ position: 'relative', zIndex: 1 }}>
//           <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🚀</div>
//           <Title level={2} style={{ 
//             color: 'white', 
//             margin: 0, 
//             marginBottom: '8px',
//             fontSize: '2rem'
//           }}>
//             สร้างโพสต์หางานของคุณ
//           </Title>
//         </div>
//       </div>

//       {/* Form Content */}
//       <div style={{ padding: '32px' }}>
//         <StudentPostForm 
//           onSuccess={onSuccess} 
//           onClose={onClose} 
//           isModal={true} // ✅ บอกว่าอยู่ใน Modal
//         />
//       </div>
//     </Modal>
//   );
// };

// export default StudentPostFormModal;