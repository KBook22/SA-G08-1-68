// // src/pages/StudentPost/StudentPostPage.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   Form,
//   Input,
//   Button,
//   Select,
//   Typography,
//   Space,
//   Divider,
//   message,
//   Upload,
//   Tag,
//   Row,
//   Col,
//   Avatar,
//   Steps
// } from 'antd';
// import {
//   UserOutlined,
//   SaveOutlined,
//   PlusOutlined,
//   LinkOutlined,
//   BulbOutlined,
//   BriefcaseOutlined,
//   EditOutlined,
//   CheckCircleOutlined
// } from '@ant-design/icons';

// const { Title, Paragraph, Text } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// const StudentPostPage: React.FC = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
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

//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       const profileData = {
//         ...values,
//         skills: skills
//       };

//       // API call จะใส่ตรงนี้
//       console.log('Profile Data:', profileData);
      
//       // จำลอง API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       message.success('สร้างโปรไฟล์หางานสำเร็จ!');
      
//       // เด้งกลับไปหน้า feed หรือหน้าอื่นๆ
//       setTimeout(() => {
//         navigate('/feed');
//       }, 1000);
      
//     } catch (error) {
//       message.error('เกิดข้อผิดพลาดในการสร้างโปรไฟล์');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       padding: '24px'
//     }}>
//       {/* Background decorations */}
//       <div style={{
//         position: 'absolute',
//         top: '10%',
//         right: '5%',
//         width: '200px',
//         height: '200px',
//         background: 'rgba(255, 255, 255, 0.1)',
//         borderRadius: '50%',
//         zIndex: 0
//       }} />
//       <div style={{
//         position: 'absolute',
//         bottom: '20%',
//         left: '3%',
//         width: '150px',
//         height: '150px',
//         background: 'rgba(255, 255, 255, 0.05)',
//         borderRadius: '50%',
//         zIndex: 0
//       }} />

//       <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
//         {/* Header */}
//         <Card style={{
//           marginBottom: '32px',
//           borderRadius: '20px',
//           border: 'none',
//           background: 'rgba(255, 255, 255, 0.95)',
//           backdropFilter: 'blur(20px)',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//           textAlign: 'center'
//         }}>
//           <Space direction="vertical" size="large" style={{ width: '100%' }}>
//             <div style={{ fontSize: '4rem' }}>🚀</div>
//             <Title level={1} style={{ 
//               margin: 0,
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               fontSize: '2.5rem'
//             }}>
//               สร้างโปรไฟล์หางานของคุณ
//             </Title>
//             <Paragraph style={{ 
//               fontSize: '18px', 
//               color: '#666',
//               margin: 0,
//               maxWidth: '600px'
//             }}>
//               กรอกข้อมูลเพื่อให้ผู้ว่าจ้างรู้จักคุณมากขึ้น
//             </Paragraph>
//           </Space>
//         </Card>

//         {/* Progress Steps */}
//         <Card style={{
//           marginBottom: '32px',
//           borderRadius: '16px',
//           border: 'none',
//           background: 'rgba(255, 255, 255, 0.95)',
//           backdropFilter: 'blur(20px)',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
//         }}>
//           <Steps
//             current={0}
//             items={[
//               {
//                 icon: <EditOutlined />,
//                 title: 'กรอกข้อมูล',
//                 description: 'รายละเอียดโปรไฟล์'
//               },
//               {
//                 icon: <BulbOutlined />,
//                 title: 'ทักษะ',
//                 description: 'ความสามารถพิเศษ'
//               },
//               {
//                 icon: <CheckCircleOutlined />,
//                 title: 'เสร็จสิ้น',
//                 description: 'พร้อมใช้งาน'
//               }
//             ]}
//           />
//         </Card>

//         {/* Main Form */}
//         <Card style={{
//           borderRadius: '20px',
//           border: 'none',
//           background: 'rgba(255, 255, 255, 0.95)',
//           backdropFilter: 'blur(20px)',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
//         }}>
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             size="large"
//             style={{ padding: '20px' }}
//           >
//             <Title level={3} style={{ 
//               color: '#333',
//               marginBottom: '24px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '12px'
//             }}>
//               <UserOutlined style={{ color: '#667eea' }} />
//               รายละเอียดโปรไฟล์
//             </Title>

//             {/* แนะนำตัวเอง */}
//             <Form.Item
//               label={
//                 <Text strong style={{ fontSize: '16px' }}>
//                   <BulbOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
//                   แนะนำตัวเอง
//                 </Text>
//               }
//               name="introduction"
//               rules={[
//                 { required: true, message: 'กรุณาแนะนำตัวเอง' },
//                 { min: 50, message: 'กรุณาเขียนแนะนำตัวอย่างน้อย 50 ตัวอักษร' }
//               ]}
//             >
//               <TextArea
//                 rows={6}
//                 placeholder="เช่น สวัสดีครับ ผมชื่อ... เป็นนักศึกษาชั้นปีที่... คณะ... มีความสนใจในด้าน... มีประสบการณ์... และกำลังมองหาโอกาสใน..."
//                 showCount
//                 maxLength={1000}
//                 style={{ 
//                   borderRadius: '12px',
//                   border: '2px solid #f0f0f0',
//                   fontSize: '15px'
//                 }}
//               />
//             </Form.Item>

//             <Divider />

//             {/* ทักษะ */}
//             <Form.Item
//               label={
//                 <Text strong style={{ fontSize: '16px' }}>
//                   <BulbOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
//                   ทักษะ
//                 </Text>
//               }
//             >
//               <Space direction="vertical" style={{ width: '100%' }}>
//                 <div style={{ marginBottom: '12px' }}>
//                   <Input
//                     placeholder="พิมพ์ทักษะ เช่น React, Node.js, SQL (กด Enter หรือ , เพื่อเพิ่ม)"
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     onKeyPress={handleSkillInputKeyPress}
//                     onBlur={handleAddSkill}
//                     suffix={
//                       <Button 
//                         type="text" 
//                         icon={<PlusOutlined />} 
//                         onClick={handleAddSkill}
//                         style={{ border: 'none', padding: '0 8px' }}
//                       />
//                     }
//                     style={{ borderRadius: '12px', border: '2px solid #f0f0f0' }}
//                   />
//                 </div>
                
//                 <div style={{ 
//                   minHeight: '60px',
//                   padding: '12px',
//                   background: '#fafafa',
//                   borderRadius: '12px',
//                   border: '2px dashed #d9d9d9'
//                 }}>
//                   {skills.length > 0 ? (
//                     <Space wrap>
//                       {skills.map((skill, index) => (
//                         <Tag
//                           key={index}
//                           closable
//                           onClose={() => handleRemoveSkill(skill)}
//                           style={{
//                             padding: '4px 12px',
//                             borderRadius: '16px',
//                             background: '#e6f7ff',
//                             border: '1px solid #91d5ff',
//                             fontSize: '14px'
//                           }}
//                         >
//                           {skill}
//                         </Tag>
//                       ))}
//                     </Space>
//                   ) : (
//                     <Text type="secondary" style={{ fontStyle: 'italic' }}>
//                       ทักษะที่เพิ่มจะแสดงที่นี่...
//                     </Text>
//                   )}
//                 </div>
                
//                 <Text type="secondary" style={{ fontSize: '13px' }}>
//                   💡 เคล็ดลับ: เพิ่มทักษะที่เกี่ยวข้องกับงานที่ต้องการ เช่น React, Node.js, Python, Photoshop
//                 </Text>
//               </Space>
//             </Form.Item>

//             <Divider />

//             {/* ประเภทงาน */}
//             <Row gutter={[24, 24]}>
//               <Col xs={24} md={12}>
//                 <Form.Item
//                   label={
//                     <Text strong style={{ fontSize: '16px' }}>
//                       <BriefcaseOutlined style={{ marginRight: '8px', color: '#faad14' }} />
//                       ประเภทงานที่สนใจ
//                     </Text>
//                   }
//                   name="jobType"
//                   rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
//                 >
//                   <Select
//                     placeholder="เลือกประเภทงาน"
//                     style={{ borderRadius: '12px' }}
//                     size="large"
//                   >
//                     {jobTypes.map(type => (
//                       <Option key={type} value={type}>
//                         <div style={{ padding: '4px 0' }}>
//                           {type === 'งานพาร์ทไทม์' && <span style={{ marginRight: '8px' }}>⏰</span>}
//                           {type === 'งานประจำ' && <span style={{ marginRight: '8px' }}>💼</span>}
//                           {type === 'ฟรีแลนซ์' && <span style={{ marginRight: '8px' }}>🌟</span>}
//                           {type === 'ฝึกงาน' && <span style={{ marginRight: '8px' }}>🎓</span>}
//                           {type}
//                         </div>
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col xs={24} md={12}>
//                 <Form.Item
//                   label={
//                     <Text strong style={{ fontSize: '16px' }}>
//                       <LinkOutlined style={{ marginRight: '8px', color: '#722ed1' }} />
//                       ลิงก์ผลงาน/LinkedIn
//                     </Text>
//                   }
//                   name="portfolioLink"
//                 >
//                   <Input
//                     placeholder="https://linkedin.com/in/yourname หรือ https://github.com/yourname"
//                     style={{ 
//                       borderRadius: '12px',
//                       border: '2px solid #f0f0f0'
//                     }}
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Divider />

//             {/* Action Buttons */}
//             <div style={{ textAlign: 'center', marginTop: '32px' }}>
//               <Space size="large">
//                 <Button
//                   size="large"
//                   onClick={() => navigate('/feed')}
//                   style={{
//                     height: '48px',
//                     borderRadius: '12px',
//                     fontSize: '16px',
//                     minWidth: '120px'
//                   }}
//                 >
//                   ยกเลิก
//                 </Button>
                
//                 <Button
//                   type="primary"
//                   size="large"
//                   htmlType="submit"
//                   loading={loading}
//                   icon={<SaveOutlined />}
//                   style={{
//                     height: '48px',
//                     borderRadius: '12px',
//                     fontSize: '16px',
//                     minWidth: '160px',
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     border: 'none',
//                     boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
//                   }}
//                 >
//                   {loading ? 'กำลังบันทึก...' : 'บันทึกโปรไฟล์'}
//                 </Button>
//               </Space>
//             </div>
//           </Form>
//         </Card>

//         {/* Tips Card */}
//         <Card style={{
//           marginTop: '24px',
//           borderRadius: '16px',
//           border: 'none',
//           background: 'rgba(255, 255, 255, 0.9)',
//           backdropFilter: 'blur(10px)'
//         }}>
//           <Title level={5} style={{ color: '#1890ff', marginBottom: '16px' }}>
//             💡 เคล็ดลับการสร้างโปรไฟล์ที่ดี
//           </Title>
//           <Row gutter={[16, 16]}>
//             <Col xs={24} md={6}>
//               <div style={{ textAlign: 'center', padding: '16px' }}>
//                 <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⏰</div>
//                 <Text strong>งานพาร์ทไทม์</Text>
//                 <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
//                   เหมาะสำหรับนักศึกษาที่ต้องการรายได้พิเศษ
//                 </div>
//               </div>
//             </Col>
//             <Col xs={24} md={6}>
//               <div style={{ textAlign: 'center', padding: '16px' }}>
//                 <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💼</div>
//                 <Text strong>งานประจำ</Text>
//                 <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
//                   สำหรับผู้จบใหม่ที่พร้อมทำงานเต็มเวลา
//                 </div>
//               </div>
//             </Col>
//             <Col xs={24} md={6}>
//               <div style={{ textAlign: 'center', padding: '16px' }}>
//                 <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌟</div>
//                 <Text strong>ฟรีแลนซ์</Text>
//                 <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
//                   งานโปรเจกต์ ยืดหยุ่นเวลาได้
//                 </div>
//               </div>
//             </Col>
//             <Col xs={24} md={6}>
//               <div style={{ textAlign: 'center', padding: '16px' }}>
//                 <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎓</div>
//                 <Text strong>ฝึกงาน</Text>
//                 <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
//                   เรียนรู้ประสบการณ์จริงในสายงาน
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default StudentPostPage;