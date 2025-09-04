// // src/components/CreateStudentPostModal.tsx
// import React, { useState } from 'react';
// import {
//   Modal,
//   Form,
//   Input,
//   Button,
//   Select,
//   Typography,
//   Space,
//   Divider,
//   message,
//   Tag,
//   Row,
//   Col,
// } from 'antd';
// import {
//   SaveOutlined,
//   PlusOutlined,
//   LinkOutlined,
//   BulbOutlined,
//   BriefcaseOutlined,
//   CloseOutlined
// } from '@ant-design/icons';

// const { Title, Text } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// interface CreateStudentPostModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
// }

// const CreateStudentPostModal: React.FC<CreateStudentPostModalProps> = ({
//   visible,
//   onClose,
//   onSuccess
// }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [skills, setSkills] = useState<string[]>([]);
//   const [skillInput, setSkillInput] = useState('');

//   const jobTypes = [
//     'งานพาร์ทไทม์',
//     'งานประจำ',
//     'ฟรีแลนซ์',
//     'ฝึกงาน'
//   ];

//   const handleAddSkill = () => {
//     if (skillInput.trim() && !skills.includes(skillInput.trim())) {
//       setSkills([...skills, skillInput.trim()]);
//       setSkillInput('');
//     }
//   };

//   const handleRemoveSkill = (skillToRemove: string) => {
//     setSkills(skills.filter(skill => skill !== skillToRemove));
//   };

//   const handleSkillInputKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       handleAddSkill();
//     }
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setSkills([]);
//     setSkillInput('');
//     onClose();
//   };

//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       const profileData = {
//         ...values,
//         skills: skills.join(', ')
//       };

//       console.log('Profile Data:', profileData);
      
//       // จำลอง API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       message.success('สร้างโพสต์หางานสำเร็จ!');
      
//       // รีเซ็ตฟอร์ม
//       form.resetFields();
//       setSkills([]);
//       setSkillInput('');
      
//       // ปิด Modal
//       onClose();
      
//       // เรียก callback เพื่อ refresh ข้อมูล
//       if (onSuccess) {
//         onSuccess();
//       }
      
//     } catch (error) {
//       message.error('เกิดข้อผิดพลาดในการสร้างโพสต์');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       open={visible}
//       onCancel={handleCancel}
//       footer={null}
//       width={800}
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
//     >
//       {/* Modal Header */}
//       <div style={{
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         padding: '32px',
//         textAlign: 'center',
//         color: 'white'
//       }}>
//         <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
//         <Title level={2} style={{ color: 'white', margin: 0, marginBottom: '8px' }}>
//           สร้างโพสต์หางานของคุณ
//         </Title>
//         <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
//           กรอกข้อมูลเพื่อให้ผู้ว่าจ้างรู้จักคุณมากขึ้น
//         </Text>
//       </div>

//       {/* Modal Content */}
//       <div style={{ padding: '32px' }}>
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           size="large"
//         >
//           {/* แนะนำตัวเอง */}
//           <Form.Item
//             label={
//               <Text strong style={{ fontSize: '16px' }}>
//                 <BulbOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
//                 แนะนำตัวเอง
//               </Text>
//             }
//             name="introduction"
//             rules={[
//               { required: true, message: 'กรุณาแนะนำตัวเอง' },
//               { min: 50, message: 'กรุณาเขียนแนะนำตัวอย่างน้อย 50 ตัวอักษร' }
//             ]}
//           >
//             <TextArea
//               rows={5}
//               placeholder="เช่น สวัสดีครับ ผมชื่อ... เป็นนักศึกษาชั้นปีที่... คณะ... มีความสนใจในด้าน... มีประสบการณ์... และกำลังมองหาโอกาสใน..."
//               showCount
//               maxLength={1000}
//               style={{ 
//                 borderRadius: '12px',
//                 border: '2px solid #f0f0f0',
//                 fontSize: '15px'
//               }}
//             />
//           </Form.Item>

//           <Divider />

//           {/* ทักษะ */}
//           <Form.Item
//             label={
//               <Text strong style={{ fontSize: '16px' }}>
//                 <BulbOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
//                 ทักษะ
//               </Text>
//             }
//           >
//             <Space direction="vertical" style={{ width: '100%' }}>
//               <div style={{ marginBottom: '12px' }}>
//                 <Input
//                   placeholder="พิมพ์ทักษะ เช่น React, Node.js, SQL (กด Enter หรือ , เพื่อเพิ่ม)"
//                   value={skillInput}
//                   onChange={(e) => setSkillInput(e.target.value)}
//                   onKeyPress={handleSkillInputKeyPress}
//                   onBlur={handleAddSkill}
//                   suffix={
//                     <Button 
//                       type="text" 
//                       icon={<PlusOutlined />} 
//                       onClick={handleAddSkill}
//                       style={{ border: 'none', padding: '0 8px' }}
//                     />
//                   }
//                   style={{ borderRadius: '12px', border: '2px solid #f0f0f0' }}
//                 />
//               </div>
              
//               <div style={{ 
//                 minHeight: '50px',
//                 padding: '12px',
//                 background: '#fafafa',
//                 borderRadius: '12px',
//                 border: '2px dashed #d9d9d9'
//               }}>
//                 {skills.length > 0 ? (
//                   <Space wrap>
//                     {skills.map((skill, index) => (
//                       <Tag
//                         key={index}
//                         closable
//                         onClose={() => handleRemoveSkill(skill)}
//                         style={{
//                           padding: '4px 12px',
//                           borderRadius: '16px',
//                           background: '#e6f7ff',
//                           border: '1px solid #91d5ff',
//                           fontSize: '14px'
//                         }}
//                       >
//                         {skill}
//                       </Tag>
//                     ))}
//                   </Space>
//                 ) : (
//                   <Text type="secondary" style={{ fontStyle: 'italic' }}>
//                     ทักษะที่เพิ่มจะแสดงที่นี่...
//                   </Text>
//                 )}
//               </div>
              
//               <Text type="secondary" style={{ fontSize: '13px' }}>
//                 💡 เคล็ดลับ: เพิ่มทักษะที่เกี่ยวข้องกับงานที่ต้องการ เช่น React, Node.js, Python, Photoshop
//               </Text>
//             </Space>
//           </Form.Item>

//           <Divider />

//           {/* ประเภทงาน */}
//           <Row gutter={[24, 24]}>
//             <Col xs={24} md={12}>
//               <Form.Item
//                 label={
//                   <Text strong style={{ fontSize: '16px' }}>
//                     <BriefcaseOutlined style={{ marginRight: '8px', color: '#faad14' }} />
//                     ประเภทงานที่สนใจ
//                   </Text>
//                 }
//                 name="jobType"
//                 rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
//               >
//                 <Select
//                   placeholder="เลือกประเภทงาน"
//                   style={{ borderRadius: '12px' }}
//                   size="large"
//                 >
//                   {jobTypes.map(type => (
//                     <Option key={type} value={type}>
//                       <div style={{ padding: '4px 0' }}>
//                         {type === 'งานพาร์ทไทม์' && <span style={{ marginRight: '8px' }}>⏰</span>}
//                         {type === 'งานประจำ' && <span style={{ marginRight: '8px' }}>💼</span>}
//                         {type === 'ฟรีแลนซ์' && <span style={{ marginRight: '8px' }}>🌟</span>}
//                         {type === 'ฝึกงาน' && <span style={{ marginRight: '8px' }}>🎓</span>}
//                         {type}
//                       </div>
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>

//             <Col xs={24} md={12}>
//               <Form.Item
//                 label={
//                   <Text strong style={{ fontSize: '16px' }}>
//                     <LinkOutlined style={{ marginRight: '8px', color: '#722ed1' }} />
//                     ลิงก์ผลงาน/LinkedIn
//                   </Text>
//                 }
//                 name="portfolioLink"
//               >
//                 <Input
//                   placeholder="https://linkedin.com/in/yourname"
//                   style={{ 
//                     borderRadius: '12px',
//                     border: '2px solid #f0f0f0'
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider />

//           {/* Action Buttons */}
//           <div style={{ textAlign: 'center', marginTop: '24px' }}>
//             <Space size="large">
//               <Button
//                 size="large"
//                 onClick={handleCancel}
//                 style={{
//                   height: '48px',
//                   borderRadius: '12px',
//                   fontSize: '16px',
//                   minWidth: '120px'
//                 }}
//               >
//                 ยกเลิก
//               </Button>
              
//               <Button
//                 type="primary"
//                 size="large"
//                 htmlType="submit"
//                 loading={loading}
//                 icon={<SaveOutlined />}
//                 style={{
//                   height: '48px',
//                   borderRadius: '12px',
//                   fontSize: '16px',
//                   minWidth: '160px',
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   border: 'none',
//                   boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
//                 }}
//               >
//                 {loading ? 'กำลังโพสต์...' : 'โพสต์หางาน'}
//               </Button>
//             </Space>
//           </div>
//         </Form>

//         {/* Quick Tips */}
//         <div style={{
//           marginTop: '32px',
//           padding: '20px',
//           background: '#fafbfc',
//           borderRadius: '12px',
//           border: '1px solid #e8e8e8'
//         }}>
//           <Title level={5} style={{ margin: 0, color: '#1890ff', marginBottom: '12px' }}>
//             💡 เคล็ดลับการสร้างโพสต์ที่ดี
//           </Title>
          
//           <Row gutter={[16, 8]}>
//             <Col xs={24} md={6}>
//               <Text style={{ fontSize: '13px', color: '#666' }}>
//                 ⏰ <strong>งานพาร์ทไทม์</strong><br/>
//                 เหมาะกับนักศึกษา
//               </Text>
//             </Col>
//             <Col xs={24} md={6}>
//               <Text style={{ fontSize: '13px', color: '#666' }}>
//                 💼 <strong>งานประจำ</strong><br/>
//                 สำหรับผู้จบใหม่
//               </Text>
//             </Col>
//             <Col xs={24} md={6}>
//               <Text style={{ fontSize: '13px', color: '#666' }}>
//                 🌟 <strong>ฟรีแลนซ์</strong><br/>
//                 งานโปรเจกต์
//               </Text>
//             </Col>
//             <Col xs={24} md={6}>
//               <Text style={{ fontSize: '13px', color: '#666' }}>
//                 🎓 <strong>ฝึกงาน</strong><br/>
//                 หาประสบการณ์
//               </Text>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CreateStudentPostModal;

// src/components/CreateStudentPostModal.tsx
// src/components/CreateStudentPostModal.tsx
// src/components/CreateStudentPostModal.tsx
// src/components/CreateStudentPostModal.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   Form,
//   Input,
//   Select,
//   Button,
//   message,
//   Space,
//   Tag
// } from 'antd';

// const { TextArea } = Input;
// const { Option } = Select;

// interface CreateStudentPostModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const CreateStudentPostModal: React.FC<CreateStudentPostModalProps> = ({
//   visible,
//   onClose,
//   onSuccess
// }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   // ✅ เพิ่ม state สำหรับทักษะ
//   const [skillsList, setSkillsList] = useState<string[]>([]);
//   const [skillsInput, setSkillsInput] = useState('');

//   // ✅ จัดการเมื่อ input ทักษะเปลี่ยน
//   const handleSkillsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSkillsInput(value);
    
//     // แยกทักษะตาม comma แล้วกรองค่าว่าง
//     const skills = value.split(',').map(skill => skill.trim()).filter(Boolean);
//     setSkillsList(skills);
//   };

//   // ✅ Custom validation สำหรับทักษะ
//   const validateSkills = (_: any, value: string) => {
//     if (!value || !value.trim()) {
//       return Promise.reject(new Error('กรุณาระบุความสามารถทักษะอย่างน้อย 1 อย่าง'));
//     }
    
//     const skills = value.split(',').map(skill => skill.trim()).filter(Boolean);
//     if (skills.length === 0) {
//       return Promise.reject(new Error('กรุณาระบุความสามารถทักษะอย่างน้อย 1 อย่าง'));
//     }
    
//     return Promise.resolve();
//   };

//   const handleSubmit = async (values: any) => {
//     try {
//       // ✅ ตรวจสอบทักษะก่อนส่ง
//       if (skillsList.length === 0) {
//         message.error('กรุณาระบุความสามารถทักษะอย่างน้อย 1 อย่าง');
//         return;
//       }

//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:8080/api/student-profile-posts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(values)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'ไม่สามารถสร้างโพสต์ได้');
//       }

//       message.success('สร้างโพสต์สำเร็จ!');
//       form.resetFields();
//       setSkillsList([]);
//       setSkillsInput('');
//       onSuccess();
//     } catch (error: any) {
//       console.error('Error creating post:', error);
//       message.error(error.message || 'เกิดข้อผิดพลาดในการสร้างโพสต์');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // รีเซ็ตฟอร์มเมื่อปิด Modal
//   const handleCancel = () => {
//     form.resetFields();
//     setSkillsList([]);
//     setSkillsInput('');
//     onClose();
//   };

//   // เคลียร์ state เมื่อ modal เปิด/ปิด
//   useEffect(() => {
//     if (!visible) {
//       setSkillsList([]);
//       setSkillsInput('');
//     }
//   }, [visible]);

//   return (
//     <Modal
//       title={
//         <div style={{ 
//           textAlign: 'center',
//           fontSize: '20px',
//           fontWeight: '600',
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           backgroundClip: 'text',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent'
//         }}>
//           สร้างโพสต์หางาน
//         </div>
//       }
//       open={visible}
//       onCancel={handleCancel}
//       footer={null}
//       width={600}
//       centered
//       destroyOnClose={true}
//     >
//       <Form
//         form={form}
//         onFinish={handleSubmit}
//         layout="vertical"
//         style={{ marginTop: '20px' }}
//       >
//         <Form.Item
//           name="job_type"
//           label="ประเภทงานที่ต้องการ"
//           rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
//         >
//           <Select 
//             placeholder="เลือกประเภทงาน"
//             size="large"
//             style={{ borderRadius: '8px' }}
//           >
//             <Option value="ฝึกงาน">ฝึกงาน</Option>
//             <Option value="งานพาร์ทไทม์">งานพาร์ทไทม์</Option>
//             <Option value="งานประจำ">งานประจำ</Option>
//             <Option value="ฟรีแลนซ์">ฟรีแลนซ์</Option>
//           </Select>
//         </Form.Item>

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
//             size="large"
//             style={{ borderRadius: '8px' }}
//           />
//         </Form.Item>

//         {/* ✅ ฟิลด์ทักษะ พร้อม validation */}
//         <Form.Item
//           name="skills"
//           label="ทักษะ"
//           rules={[
//             { required: true, message: 'กรุณาระบุความสามารถทักษะอย่างน้อย 1 อย่าง' },
//             { validator: validateSkills }
//           ]}
//         >
//           <Input
//             placeholder="เช่น React, Node.js, Python, Design (คั่นด้วยเครื่องหมายจุลภาค)"
//             size="large"
//             style={{ borderRadius: '8px' }}
//             value={skillsInput}
//             onChange={handleSkillsInputChange}
//           />
//         </Form.Item>

//         {/* ✅ แสดงแท็คทักษะแบบไดนามิก */}
//         {skillsList.length > 0 && (
//           <div style={{ 
//             marginTop: '-16px', 
//             marginBottom: '16px',
//             padding: '12px',
//             background: '#f8f9fa',
//             borderRadius: '8px',
//             border: '1px solid #e9ecef'
//           }}>
//             <div style={{ 
//               fontSize: '13px', 
//               color: '#666', 
//               marginBottom: '8px',
//               fontWeight: '500'
//             }}>
//               ความสามารถพิเศษ ({skillsList.length} ทักษะ):
//             </div>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
//               {skillsList.map((skill, index) => (
//                 <Tag 
//                   key={index}
//                   style={{
//                     background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
//                     border: '1px solid rgba(102, 126, 234, 0.3)',
//                     borderRadius: '6px',
//                     padding: '4px 8px',
//                     fontSize: '12px',
//                     fontWeight: '500',
//                     color: '#667eea'
//                   }}
//                 >
//                   {skill}
//                 </Tag>
//               ))}
//             </div>
//           </div>
//         )}

//         <Form.Item
//           name="portfolio_url"
//           label="ลิงก์ผลงาน (Portfolio)"
//         >
//           <Input 
//             placeholder="https://..."
//             size="large"
//             style={{ borderRadius: '8px' }}
//           />
//         </Form.Item>

//         <Form.Item style={{ textAlign: 'center', marginBottom: 0, marginTop: '32px' }}>
//           <Space size="middle">
//             <Button 
//               onClick={handleCancel}
//               size="large"
//               style={{
//                 borderRadius: '12px',
//                 padding: '0 24px',
//                 height: '48px',
//                 fontSize: '16px'
//               }}
//             >
//               ยกเลิก
//             </Button>
//             <Button 
//               type="primary" 
//               htmlType="submit"
//               loading={loading}
//               size="large"
//               style={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 border: 'none',
//                 borderRadius: '12px',
//                 padding: '0 32px',
//                 height: '48px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
//               }}
//             >
//               สร้างโพสต์
//             </Button>
//           </Space>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default CreateStudentPostModal;
// src/components/CreateStudentPostModal.tsx
// import React, { useState } from 'react';
// import {
//   Modal,
//   Form,
//   Input,
//   Select,
//   Button,
//   message,
//   Space,
//   Row,
//   Col,
//   Typography,
//   Divider,
//   Card,
//   Upload
// } from 'antd';
// import {
//   BulbOutlined,
//   ClockCircleOutlined,
//   EnvironmentOutlined,
//   DollarOutlined,
//   UserOutlined,
//   TagOutlined,
//   InboxOutlined
// } from '@ant-design/icons';
// import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
// import SkillSelect from './SkillSelect'; // Make sure this component exists

// const { TextArea } = Input;
// const { Option } = Select;
// const { Title, Text } = Typography;
// const { Dragger } = Upload;

// interface CreateStudentPostModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// // Helper for Ant Design's Upload component in a Form
// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };


// const CreateStudentPostModal: React.FC<CreateStudentPostModalProps> = ({
//   visible,
//   onClose,
//   onSuccess
// }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   const jobTypes = [
//     'งานประจำ',
//     'งานพาร์ทไทม์',
//     'ฟรีแลนซ์',
//     'ฝึกงาน',
//     'งานชั่วคราว',
//     'งานโครงการ'
//   ];

//   const handleSubmit = async (values: any) => {
//     // Note: The 'attachment' value from the form will contain the file list.
//     // You would handle the actual file upload logic here.
//     console.log('Form Values:', values);
    
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');

//       const skillsString = Array.isArray(values.skills)
//         ? values.skills.join(', ')
//         : values.skills;

//       const postData = {
//         title: values.title,
//         job_type: values.jobType,
//         skills: skillsString,
//         availability: values.availability,
//         preferred_location: values.preferredLocation,
//         expected_compensation: values.expectedCompensation || '',
//         content: values.content,
//         portfolio_url: values.portfolio_url || ''
//       };

//       const response = await fetch('http://localhost:8080/api/student-profile-posts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(postData)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'ไม่สามารถสร้างโพสต์ได้');
//       }

//       message.success('สร้างโพสต์สำเร็จ!');
//       form.resetFields();
//       setFileList([]);
//       onSuccess();
//       onClose();
//     } catch (error: any) {
//       console.error('Error creating post:', error);
//       message.error(error.message || 'เกิดข้อผิดพลาดในการสร้างโพสต์');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setFileList([]);
//     if (onClose) {
//       onClose();
//     }
//   };
  
//   const uploadProps: UploadProps = {
//     onRemove: () => {
//       setFileList([]);
//     },
//     beforeUpload: (file) => {
//       setFileList([file]);
//       return false; // Prevent automatic upload
//     },
//     fileList,
//     maxCount: 1,
//   };

//   return (
//     <Modal
//       title={
//         <div style={{ textAlign: 'center', padding: '20px 0' }}>
//           <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
//             สร้างโพสต์หางานของคุณ
//           </Title>
//           <Text type="secondary">
//             กรอกข้อมูลเพื่อให้ผู้ว่าจ้างรู้จักคุณมากขึ้น
//           </Text>
//         </div>
//       }
//       open={visible}
//       onCancel={handleCancel}
//       footer={null}
//       width={700}
//       centered
//       destroyOnHidden={true}
//       style={{ borderRadius: '20px' }}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleSubmit}
//         style={{ padding: '0 20px' }}
//       >
//         {/* ... other form items like title, jobType, etc. ... */}
//         <Form.Item
//           label={<span><BulbOutlined style={{ color: '#faad14', marginRight: '8px' }} />หัวข้อโพสต์</span>}
//           name="title"
//           rules={[{ required: true, message: 'กรุณาใส่หัวข้อโพสต์' }, { min: 10, message: 'หัวข้อควรมีอย่างน้อย 10 ตัวอักษร' }]}
//         >
//           <Input placeholder="เช่น นักศึกษาหางานพาร์ทไทม์ร้านกาแฟ" />
//         </Form.Item>

//         <Row gutter={16}>
//           <Col xs={24} sm={12}>
//             <Form.Item
//               label={<span><TagOutlined style={{ color: '#722ed1', marginRight: '8px' }} />ประเภทงานที่สนใจ</span>}
//               name="jobType"
//               rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
//             >
//               <Select placeholder="เลือกประเภทงาน" showSearch>
//                 {jobTypes.map(type => (<Option key={type} value={type}>{type}</Option>))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col xs={24} sm={12}>
//             <Form.Item
//               label={<span><UserOutlined style={{ color: '#722ed1', marginRight: '8px' }} />ทักษะที่มี</span>}
//               name="skills"
//               rules={[{ required: true, message: 'กรุณาเลือกทักษะอย่างน้อย 1 อย่าง' }]}
//             >
//               <SkillSelect placeholder="เลือกทักษะหรือพิมพ์เพิ่ม..." />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col xs={24} sm={12}>
//             <Form.Item
//               label={<span><ClockCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />เวลาที่สะดวก</span>}
//               name="availability"
//               rules={[{ required: true, message: 'กรุณาระบุเวลาที่สะดวก' }]}
//             >
//               <Input placeholder="เช่น จันทร์-ศุกร์ หลัง 18:00 น." />
//             </Form.Item>
//           </Col>
//           <Col xs={24} sm={12}>
//             <Form.Item
//               label={<span><EnvironmentOutlined style={{ color: '#1890ff', marginRight: '8px' }} />สถานที่ที่สะดวก</span>}
//               name="preferredLocation"
//               rules={[{ required: true, message: 'กรุณาระบุสถานที่ที่สะดวก' }]}
//             >
//               <Input placeholder="เช่น ใกล้ ม.เทคโนโลยีสุรนารี" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item
//           label={<span><DollarOutlined style={{ color: '#faad14', marginRight: '8px' }} />ค่าตอบแทนที่คาดหวัง (ไม่บังคับ)</span>}
//           name="expectedCompensation"
//         >
//           <Input placeholder="เช่น 120-150 บาท/ชั่วโมง หรือตามตกลง" />
//         </Form.Item>

//         <Form.Item
//           label={<span><BulbOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />รายละเอียดเกี่ยวกับตัวคุณ</span>}
//           name="content"
//           rules={[{ required: true, message: 'กรุณาใส่รายละเอียด' }, { min: 50, message: 'รายละเอียดควรมีอย่างน้อย 50 ตัวอักษร' }]}
//         >
//           <TextArea rows={4} placeholder="แนะนำตัวเอง ประสบการณ์ การศึกษา หรือสิ่งที่ต้องการให้นายจ้างรู้..." />
//         </Form.Item>


//         <Divider>แนบไฟล์ หรือ ลิงก์ผลงาน (เลือกอย่างใดอย่างหนึ่ง)</Divider>
        
//         {/* ✅ FIXED: Added 'name' and 'getValueFromEvent' props */}
//         <Form.Item
//           name="attachment"
//           label="อัปโหลดไฟล์ (Resume, Portfolio)"
//           valuePropName="fileList"
//           getValueFromEvent={normFile}
//         >
//           <Dragger {...uploadProps} disabled={!!form.getFieldValue('portfolio_url')}>
//             <p className="ant-upload-drag-icon">
//               <InboxOutlined />
//             </p>
//             <p className="ant-upload-text">คลิก หรือ ลากไฟล์มาวางที่นี่เพื่ออัปโหลด</p>
//             <p className="ant-upload-hint">
//               รองรับการอัปโหลดเพียงไฟล์เดียว (PDF, DOCX, JPG, PNG)
//             </p>
//           </Dragger>
//         </Form.Item>

//         <Form.Item
//           label="หรือวางลิงก์ผลงาน"
//           name="portfolio_url"
//           rules={[{ type: 'url', message: 'กรุณาใส่ URL ที่ถูกต้อง' }]}
//         >
//           <Input 
//             placeholder="https://your-portfolio.com" 
//             disabled={fileList.length > 0} 
//           />
//         </Form.Item>

//         <Divider />

//         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <Space size="large">
//             <Button size="large" onClick={handleCancel} style={{ minWidth: '120px' }}>
//               ยกเลิก
//             </Button>
//             <Button type="primary" size="large" htmlType="submit" loading={loading} style={{ minWidth: '120px' }}>
//               {loading ? 'กำลังโพสต์...' : 'โพสต์หางาน'}
//             </Button>
//           </Space>
//         </div>
//         <Card size="small" style={{ backgroundColor: '#f6ffed', marginBottom: '20px' }}>
//           <Text type="secondary" style={{ fontSize: '12px' }}>
//             💡 เคล็ดลับ: เขียนหัวข้อให้น่าสนใจ ระบุทักษะที่มีให้ชัดเจน และแนบลิงก์ผลงานจะช่วยเพิ่มโอกาสในการถูกติดต่อกลับมากขึ้น
//           </Text>
//         </Card>
//       </Form>
//     </Modal>
//   );
// };

// export default CreateStudentPostModal;
// src/components/CreateStudentPostModal.tsx
// src/components/CreateStudentPostModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
  Row,
  Col,
  Typography,
  Space,
  Upload,
  Card,
  Divider,
  Alert
} from 'antd';
import {
  BulbOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  UserOutlined,
  TagOutlined,
  InboxOutlined,
  LinkOutlined,
  FileOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { createStudentPost } from '../services/studentPostService';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { Dragger } = Upload;

interface CreateStudentPostModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateStudentPostModal: React.FC<CreateStudentPostModalProps> = ({
  visible,
  onClose,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [attachmentMethod, setAttachmentMethod] = useState<'file' | 'url' | null>(null);

  const jobTypes = [
    'งานประจำ',
    'งานพาร์ทไทม์',
    'ฟรีแลนซ์',
    'ฝึกงาน',
    'งานชั่วคราว',
    'งานโครงการ'
  ];

  // ✅ Upload Props สำหรับไฟล์แนบ
  const uploadProps: UploadProps = {
    name: 'file',
    action: 'http://localhost:8080/api/upload',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    multiple: false,
    maxCount: 1,
    fileList,
    accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
    beforeUpload: (file) => {
      const isValidType = ['application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      
      if (!isValidType) {
        message.error('สามารถอัปโหลดไฟล์ PDF, DOC, DOCX, JPG, PNG เท่านั้น');
        return false;
      }
      
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('ขนาดไฟล์ต้องไม่เกิน 10MB');
        return false;
      }
      
      return true;
    },
    onChange: (info) => {
      setFileList(info.fileList);
      
      if (info.file.status === 'uploading') {
        return;
      }
      
      if (info.file.status === 'done') {
        message.success(`${info.file.name} อัปโหลดสำเร็จ`);
        // เก็บ URL ที่ได้จาก server
        const uploadedUrl = info.file.response?.url;
        if (uploadedUrl) {
          form.setFieldsValue({
            attachment_url: uploadedUrl,
            attachment_name: info.file.name,
            attachment_type: info.file.type
          });
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} อัปโหลดไม่สำเร็จ`);
      }
    },
    onRemove: () => {
      form.setFieldsValue({
        attachment_url: '',
        attachment_name: '',
        attachment_type: ''
      });
      setFileList([]);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      
      // ✅ เตรียมข้อมูลส่ง API
      const postData = {
        title: values.title,
        job_type: values.jobType,
        skills: Array.isArray(values.skills) 
          ? values.skills.join(', ') 
          : values.skills,
        availability: values.availability,
        preferred_location: values.preferredLocation,
        expected_compensation: values.expectedCompensation || '',
        introduction: values.introduction,
        portfolio_url: values.portfolio_url || '',
        // ✅ เพิ่มข้อมูลไฟล์แนบ
        attachment_url: values.attachment_url || '',
        attachment_name: values.attachment_name || '',
        attachment_type: values.attachment_type || ''
      };

      await createStudentPost(postData);
      
      message.success('สร้างโพสต์สำเร็จ!');
      form.resetFields();
      setFileList([]);
      setAttachmentMethod(null);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error creating post:', error);
      message.error(error.message || 'เกิดข้อผิดพลาดในการสร้างโพสต์');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setAttachmentMethod(null);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      title={
        <Space>
          <BulbOutlined style={{ color: '#1890ff' }} />
          <span>สร้างโพสต์หางานของคุณ</span>
        </Space>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      destroyOnClose={true}
      style={{ borderRadius: '20px' }}
    >
      <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
        กรอกข้อมูลเพื่อให้ผู้ว่าจ้างรู้จักคุณมากขึ้น
      </Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={<><TagOutlined /> หัวข้อโพสต์</>}
              name="title"
              rules={[
                { required: true, message: 'กรุณาใส่หัวข้อโพสต์' },
                { min: 10, message: 'หัวข้อควรมีอย่างน้อย 10 ตัวอักษร' }
              ]}
            >
              <Input placeholder="เช่น นักศึกษาวิศวะ หางานพาร์ทไทม์" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<><BulbOutlined /> ประเภทงานที่สนใจ</>}
              name="jobType"
              rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
            >
              <Select placeholder="เลือกประเภทงาน">
                {jobTypes.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<><ClockCircleOutlined /> เวลาที่สะดวก</>}
              name="availability"
              rules={[{ required: true, message: 'กรุณาระบุเวลาที่สะดวก' }]}
            >
              <Input placeholder="เช่น หลัง 18:00, วันหยุด" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<><EnvironmentOutlined /> สถานที่ที่สะดวก</>}
              name="preferredLocation"
              rules={[{ required: true, message: 'กรุณาระบุสถานที่ที่สะดวก' }]}
            >
              <Input placeholder="เช่น กรุงเทพ, ออนไลน์" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<><DollarOutlined /> ค่าตอบแทนที่คาดหวัง (ไม่บังคับ)</>}
              name="expectedCompensation"
            >
              <Input placeholder="เช่น 15,000 บาท/เดือน" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="ทักษะที่มี"
          name="skills"
          rules={[{ required: true, message: 'กรุณาระบุทักษะอย่างน้อย 1 อย่าง' }]}
        >
          <TextArea 
            rows={2} 
            placeholder="เช่น React, Node.js, Photoshop (คั่นด้วยเครื่องหมายจุลภาค)" 
          />
        </Form.Item>

        <Form.Item
          label={<><UserOutlined /> รายละเอียดเกี่ยวกับตัวคุณ</>}
          name="introduction"
          rules={[
            { required: true, message: 'กรุณาใส่รายละเอียด' },
            { min: 50, message: 'รายละเอียดควรมีอย่างน้อย 50 ตัวอักษร' }
          ]}
        >
          <TextArea 
            rows={4} 
            placeholder="แนะนำตัวเอง ประสบการณ์ที่มี และสิ่งที่คุณสนใจ..." 
          />
        </Form.Item>

        <Form.Item
          label={<><LinkOutlined /> ลิงก์ผลงาน/โปรไฟล์ (ไม่บังคับ)</>}
          name="portfolio_url"
          rules={[{ type: 'url', message: 'กรุณาใส่ URL ที่ถูกต้อง' }]}
        >
          <Input placeholder="https://github.com/yourusername หรือ LinkedIn Profile" />
        </Form.Item>

        <Divider orientation="left">
          <FileOutlined /> แนบไฟล์หรือลิงก์เพิ่มเติม (ไม่บังคับ)
        </Divider>

        {/* ✅ ตัวเลือกวิธีการแนบ */}
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Button 
              type={attachmentMethod === 'file' ? 'primary' : 'default'}
              onClick={() => setAttachmentMethod('file')}
              icon={<CloudUploadOutlined />}
            >
              อัปโหลดไฟล์
            </Button>
            <Button 
              type={attachmentMethod === 'url' ? 'primary' : 'default'}
              onClick={() => setAttachmentMethod('url')}
              icon={<LinkOutlined />}
            >
              ใส่ลิงก์
            </Button>
            {attachmentMethod && (
              <Button onClick={() => setAttachmentMethod(null)}>
                ยกเลิก
              </Button>
            )}
          </Space>
        </div>

        {/* ✅ แสดงการอัปโหลดไฟล์ */}
        {attachmentMethod === 'file' && (
          <Card size="small" style={{ marginBottom: '16px' }}>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">คลิก หรือ ลากไฟล์มาวางที่นี่</p>
              <p className="ant-upload-hint">
                รองรับ: PDF, DOC, DOCX, JPG, PNG (ไม่เกิน 10MB)
                <br />
                เช่น Resume, CV, Portfolio, ใบรับรอง
              </p>
            </Dragger>
          </Card>
        )}

        {/* ✅ แสดงการใส่ลิงก์ */}
        {attachmentMethod === 'url' && (
          <Card size="small" style={{ marginBottom: '16px' }}>
            <Form.Item
              label="ลิงก์ไฟล์หรือเอกสาร"
              name="attachment_url"
              rules={[{ type: 'url', message: 'กรุณาใส่ URL ที่ถูกต้อง' }]}
            >
              <Input placeholder="https://drive.google.com/... หรือ https://dropbox.com/..." />
            </Form.Item>
            <Form.Item
              label="ชื่อไฟล์/เอกสาร"
              name="attachment_name"
            >
              <Input placeholder="เช่น Resume_2025.pdf, Portfolio" />
            </Form.Item>
          </Card>
        )}

        {/* Hidden fields สำหรับเก็บข้อมูลไฟล์ที่อัปโหลด */}
        <Form.Item name="attachment_url" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="attachment_name" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="attachment_type" hidden>
          <Input />
        </Form.Item>

        <Alert
          message="เคล็ดลับการแนบไฟล์"
          description="การแนบ Resume, CV หรือ Portfolio จะช่วยให้ผู้ว่าจ้างเข้าใจความสามารถของคุณได้ดีขึ้น และเพิ่มโอกาสในการได้รับการติดต่อกลับ"
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />

        <Row justify="end" style={{ marginTop: '24px' }}>
          <Space>
            <Button onClick={handleCancel} size="large">
              ยกเลิก
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              size="large"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            >
              {loading ? 'กำลังโพสต์...' : 'โพสต์หางาน'}
            </Button>
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateStudentPostModal;
