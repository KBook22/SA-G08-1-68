// // src/components/EditStudentPostModal.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   Form,
//   Input,
//   Select,
//   Button,
//   message,
//   Row,
//   Col
// } from 'antd';

// const { TextArea } = Input;
// const { Option } = Select;

// interface EditStudentPostModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
//   post: any;
// }

// const EditStudentPostModal: React.FC<EditStudentPostModalProps> = ({
//   visible,
//   onClose,
//   onSuccess,
//   post
// }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (visible && post) {
//       form.setFieldsValue({
//         introduction: post.introduction,
//         job_type: post.job_type,
//         skills: post.skills,
//         portfolio_url: post.portfolio_url,
//         phone: post.phone,
//         email: post.email,
//       });
//     }
//   }, [visible, post, form]);

//   const handleSubmit = async (values: any) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:8080/api/student-profile-posts/${post.ID}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(values)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to update post');
//       }

//       message.success('แก้ไขโพสต์สำเร็จ!');
//       form.resetFields();
//       onSuccess();
//       onClose();
//     } catch (error: any) {
//       console.error('Error updating post:', error);
//       message.error(error.message || 'เกิดข้อผิดพลาดในการแก้ไขโพสต์');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     onClose();
//   };

//   return (
//     <Modal
//       title="แก้ไขโพสต์หางาน"
//       open={visible}
//       onCancel={handleCancel}
//       footer={null}
//       width={700}
//       centered
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleSubmit}
//       >
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="job_type"
//               label="ประเภทงานที่ต้องการ"
//               rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
//             >
//               <Select placeholder="เลือกประเภทงาน">
//                 <Option value="ฝึกงาน">ฝึกงาน</Option>
//                 <Option value="งานพาร์ทไทม์">งานพาร์ทไทม์</Option>
//                 <Option value="งานประจำ">งานประจำ</Option>
//                 <Option value="ฟรีแลนซ์">ฟรีแลนซ์</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="portfolio_url"
//               label="ลิงก์ผลงาน (Portfolio)"
//             >
//               <Input placeholder="https://..." />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item
//           name="introduction"
//           label="แนะนำตัว"
//           rules={[{ required: true, message: 'กรุณาแนะนำตัว' }]}
//         >
//           <TextArea
//             rows={4}
//             placeholder="เล่าเกี่ยวกับตัวคุณ และสิ่งที่คุณสนใจ..."
//             showCount
//             maxLength={500}
//           />
//         </Form.Item>

//         <Form.Item
//           name="skills"
//           label="ทักษะ"
//           rules={[{ required: true, message: 'กรุณาระบุทักษะ' }]}
//         >
//           <Input
//             placeholder="เช่น React, Node.js, Python, Design (คั่นด้วยเครื่องหมายจุลภาค)"
//           />
//         </Form.Item>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="email"
//               label="อีเมลติดต่อ"
//               rules={[
//                 { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }
//               ]}
//             >
//               <Input placeholder="example@email.com" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="phone"
//               label="เบอร์โทรติดต่อ"
//             >
//               <Input placeholder="08X-XXX-XXXX" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
//           <Button 
//             onClick={handleCancel} 
//             style={{ marginRight: 8 }}
//           >
//             ยกเลิก
//           </Button>
//           <Button 
//             type="primary" 
//             htmlType="submit" 
//             loading={loading}
//             style={{
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               border: 'none'
//             }}
//           >
//             บันทึกการแก้ไข
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default EditStudentPostModal;
