// // src/pages/StudentPost/StudentPostForm.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Form,
//   Input,
//   Select,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Row,
//   Col,
//   Divider,
//   message,
//   Result,
// } from 'antd';
// import {
//   UserOutlined,
//   MailOutlined,
//   BookOutlined,
//   LinkOutlined,
//   SolutionOutlined,
//   RocketOutlined,
//   HomeOutlined,
//   PhoneOutlined, // เพิ่มไอคอนโทรศัพท์
// } from '@ant-design/icons';

// const { Title, Text } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// interface StudentPostFormProps {
//     onSuccess?: () => void;
// }

// const StudentPostForm: React.FC<StudentPostFormProps> = ({ onSuccess }) => {
//   const [loading, setLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const navigate = useNavigate();

//   const onFinish = async (values: any) => {
//     setLoading(true);
//     const postData = {
//         first_name: values.firstName,
//         last_name: values.lastName,
//         email: values.email,
//         phone: values.phone, // เพิ่มข้อมูลเบอร์โทรศัพท์
//         faculty: values.faculty,
//         year: values.year,
//         introduction: values.introduction,
//         job_type: values.jobType,
//         portfolio_url: values.portfolio || "",
//         skills: values.skills,
//     };
    
//     try {
//         const response = await fetch('http://localhost:8080/api/student-profile-posts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(postData),
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`Network response was not ok: ${errorText}`);
//         }
        
//         if (onSuccess) {
//             onSuccess();
//         } else {
//             setIsSubmitted(true);
//         }

//     } catch (error) {
//         console.error('Failed to submit the form:', error);
//         message.error('เกิดข้อผิดพลาดในการโพสต์โปรไฟล์');
//     } finally {
//         setLoading(false);
//     }
//   };

//   if (isSubmitted && !onSuccess) {
//     return (
//         <Result
//             status="success"
//             title="โพสต์โปรไฟล์ของคุณสำเร็จแล้ว!"
//             subTitle="ผู้ว่าจ้างที่สนใจจะเห็นโปรไฟล์ของคุณและสามารถติดต่อคุณได้โดยตรง"
//             extra={[
//             <Button
//                 type="primary"
//                 key="console"
//                 icon={<HomeOutlined />}
//                 onClick={() => navigate('/Job/Board')}
//             >
//                 กลับไปหน้าบอร์ด
//             </Button>,
//             ]}
//         />
//     );
//   }

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
//       <Card style={{ width: '100%', maxWidth: '800px', boxShadow: 'none', border: 'none' }}>
//         <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//             <RocketOutlined style={{ fontSize: '32px', color: '#007bff' }} />
//             <Title level={3} style={{ marginTop: '8px' }}>สร้างโปรไฟล์หางานของคุณ</Title>
//             <Text type="secondary">กรอกข้อมูลเพื่อให้ผู้ว่าจ้างรู้จักคุณมากขึ้น</Text>
//         </div>
        
//         <Form
//           layout="vertical"
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Divider orientation="left">ข้อมูลส่วนตัวและประวัติการศึกษา</Divider>
//           <Row gutter={24}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="firstName"
//                 label="ชื่อจริง"
//                 rules={[{ required: true, message: 'กรุณากรอกชื่อจริง' }]}
//               >
//                 <Input prefix={<UserOutlined />} placeholder="เช่น สมชาย" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="lastName"
//                 label="นามสกุล"
//                 rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
//               >
//                 <Input prefix={<UserOutlined />} placeholder="เช่น ใจดี" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//                 <Form.Item
//                     name="email"
//                     label="อีเมลติดต่อ"
//                     rules={[{ required: true, type: 'email', message: 'กรุณากรอกอีเมลที่ถูกต้อง' }]}
//                 >
//                     <Input prefix={<MailOutlined />} placeholder="example@email.com" />
//                 </Form.Item>
//             </Col>
//             {/* --- vvvv ส่วนที่เพิ่มเข้ามา vvvv --- */}
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="phone"
//                 label="เบอร์โทรศัพท์"
//                 rules={[
//                   { required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' },
//                   { pattern: /^0\d{9}$/, message: 'รูปแบบเบอร์โทรไม่ถูกต้อง (0xxxxxxxxxx)' }
//                 ]}
//               >
//                 <Input prefix={<PhoneOutlined />} placeholder="08xxxxxxxx" />
//               </Form.Item>
//             </Col>
//             {/* --- ^^^^ สิ้นสุดส่วนที่เพิ่มเข้ามา ^^^^ --- */}
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="faculty"
//                 label="คณะ/สาขาวิชา"
//                 rules={[{ required: true, message: 'กรุณากรอกคณะหรือสาขาวิชา' }]}
//               >
//                 <Input prefix={<BookOutlined />} placeholder="เช่น สาขาวิศวกรรมคอมพิวเตอร์" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="year"
//                 label="ชั้นปีที่กำลังศึกษา"
//                 rules={[{ required: true, message: 'กรุณาเลือกชั้นปี' }]}
//               >
//                 <Select placeholder="เลือกชั้นปี">
//                   <Option value="ปีที่ 1">ปีที่ 1</Option>
//                   <Option value="ปีที่ 2">ปีที่ 2</Option>
//                   <Option value="ปีที่ 3">ปีที่ 3</Option>
//                   <Option value="ปีที่ 4">ปีที่ 4</Option>
//                   <Option value="สูงกว่าปริญญาตรี">สูงกว่าปริญญาตรี</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider orientation="left">รายละเอียดเกี่ยวกับงาน</Divider>
//           <Row gutter={24}>
//             <Col xs={24} sm={12}>
//                 <Form.Item
//                     name="jobType"
//                     label="ประเภทงานที่มองหา"
//                     rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
//                 >
//                     <Select placeholder="เลือกประเภทงาน">
//                     <Option value="พาร์ทไทม์">พาร์ทไทม์</Option>
//                     <Option value="งานประจำ">งานประจำ</Option>
//                     <Option value="ฟรีแลนซ์">ฟรีแลนซ์</Option>
//                     <Option value="ฝึกงาน">ฝึกงาน</Option>
//                     </Select>
//                 </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//                 <Form.Item
//                     name="portfolio"
//                     label="ลิงก์ผลงาน/LinkedIn (ถ้ามี)"
//                 >
//                     <Input prefix={<LinkOutlined />} placeholder="https://linkedin.com/in/yourprofile" />
//                 </Form.Item>
//             </Col>
//           </Row>
          
//           <Form.Item
//             name="introduction"
//             label="แนะนำตัวเองสั้นๆ (เป้าหมาย, สิ่งที่สนใจ)"
//             rules={[{ required: true, message: 'กรุณาแนะนำตัวเอง'}]}
//           >
//             <TextArea rows={4} placeholder="อธิบายเกี่ยวกับตัวคุณและงานที่สนใจ เพื่อให้ผู้ว่าจ้างรู้จักคุณดีขึ้น" />
//           </Form.Item>

//           <Form.Item
//             name="skills"
//             label="ทักษะ หรือ ความสามารถ"
//             rules={[{ required: true, message: 'กรุณาระบุทักษะของคุณ'}]}
//             extra="คั่นแต่ละทักษะด้วยจุลภาค (,) เช่น ทำอาหาร, วาดภาพ, เขียนโปรแกรม"
//           >
//             <TextArea rows={4} placeholder="" />
//           </Form.Item>
          
//           <Form.Item style={{ textAlign: 'right', marginTop: '24px' }}>
//             <Space>
//                 <Button htmlType="button">
//                     ยกเลิก
//                 </Button>
//                 <Button type="primary" htmlType="submit" icon={<SolutionOutlined />} loading={loading}>
//                     โพสต์โปรไฟล์
//                 </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default StudentPostForm;


// import React from 'react';
// import type { useForm, SubmitHandler } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext'; // Import useAuth เพื่อเอาข้อมูล user
// import { Post } from '../../services/https'; // ❗***โค้ดที่แก้ไข: import ฟังก์ชัน Post เข้ามา***
// import './StudentPost.css';

// // กำหนด Type ของข้อมูลในฟอร์ม
// type FormInputs = {
//   title: string;
//   content: string;
// };

// const StudentPostForm: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
//   const navigate = useNavigate();
//   const { user } = useAuth(); // ดึงข้อมูล user ที่ login อยู่

//   const onSubmit: SubmitHandler<FormInputs> = async (data) => {
//     if (!user) {
//       alert("กรุณาเข้าสู่ระบบก่อนทำการโพสต์");
//       navigate('/login');
//       return;
//     }

//     try {
//       // สร้างข้อมูลที่จะส่งไป API
//       const postPayload = {
//         ...data,
//         student_id: user.id, // เพิ่ม ID ของนักเรียนที่โพสต์
//       };

//       // ❗***โค้ดที่แก้ไข: เรียกใช้ฟังก์ชัน Post จาก Service ที่มีการยืนยันตัวตน***
//       // Endpoint นี้เป็นการคาดเดาจาก Log ก่อนหน้า อาจจะต้องปรับแก้ให้ตรงกับ Backend
//       const response = await Post('/student-profile-posts', postPayload);

//       if (response && (response.status === 200 || response.status === 201)) {
//         // ถ้าสำเร็จ ให้กลับไปที่หน้า Feed
//         alert("โพสต์ของคุณถูกสร้างเรียบร้อยแล้ว!");
//         navigate('/feed');
//       } else {
//         // ถ้ามีข้อผิดพลาดจาก Server
//         alert(response?.data?.error || "ไม่สามารถสร้างโพสต์ได้");
//       }
//     } catch (error) {
//       console.error("Failed to create post:", error);
//       alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
//     }
//   };

//   return (
//     <div className="student-post-form-container">
//       <h2>สร้างโพสต์ใหม่</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="post-form">
//         <div className="form-group">
//           <label htmlFor="title">หัวข้อ</label>
//           <input
//             id="title"
//             {...register("title", { required: "กรุณากรอกหัวข้อ" })}
//           />
//           {errors.title && <p className="error-message">{errors.title.message}</p>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="content">เนื้อหา</label>
//           <textarea
//             id="content"
//             rows={10}
//             {...register("content", { required: "กรุณากรอกเนื้อหา" })}
//           />
//           {errors.content && <p className="error-message">{errors.content.message}</p>}
//         </div>

//         <button type="submit" className="submit-button">โพสต์</button>
//       </form>
//     </div>
//   );
// };

// export default StudentPostForm;
// src/pages/StudentPost/StudentPostForm.tsx
// src/pages/StudentPost/StudentPostForm.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Form,
//   Input,
//   Select,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Row,
//   Col,
//   Divider,
//   message,
//   Result,
// } from 'antd';
// import {
//   LinkOutlined,
//   SolutionOutlined,
//   RocketOutlined,
//   HomeOutlined,
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   BookOutlined,
// } from '@ant-design/icons';
// import { createStudentProfilePost } from '../../services/studentPostService';
// import { useAuth } from '../../context/AuthContext'; // ✅ ใช้ authContext

// const { Title, Text } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// const StudentPostForm: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const navigate = useNavigate();
//   const { user, token } = useAuth(); // ✅ ดึง user และ token

//   const onFinish = async (values: any) => {
//     if (!user || !token) {
//       message.error('กรุณาเข้าสู่ระบบก่อนโพสต์');
//       navigate('/login');
//       return;
//     }

//     setLoading(true);

//     const postData = {
//       student_id: user.id, // ✅ ผูกโพสต์กับ user ที่ login อยู่
//       first_name: user.username, // หรือ user.name ถ้า backend ต้องการ
//       introduction: values.introduction,
//       job_type: values.jobType,
//       portfolio_url: values.portfolio || '',
//       skills: values.skills,
//       faculty: values.faculty,
//       year: values.year,
//       email: values.email,
//       phone: values.phone,
//     };

//     try {
//       await createStudentProfilePost(postData);

//       message.success('โพสต์โปรไฟล์ของคุณสำเร็จแล้ว!');
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error('Failed to submit the form:', error);
//       message.error('เกิดข้อผิดพลาดในการโพสต์โปรไฟล์');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ หน้า success หลังโพสต์เสร็จ
//   if (isSubmitted) {
//     return (
//       <Result
//         status="success"
//         title="โพสต์โปรไฟล์ของคุณสำเร็จแล้ว!"
//         subTitle="ผู้ว่าจ้างสามารถเห็นโปรไฟล์ของคุณและติดต่อคุณได้โดยตรง"
//         extra={[
//           <Button
//             type="primary"
//             key="feed"
//             icon={<HomeOutlined />}
//             onClick={() => navigate('/feed')}
//           >
//             กลับไปหน้า Feed
//           </Button>,
//         ]}
//       />
//     );
//   }

//   // ✅ ฟอร์มหลัก
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
//       <Card style={{ width: '100%', maxWidth: '800px' }}>
//         <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//           <RocketOutlined style={{ fontSize: '32px', color: '#007bff' }} />
//           <Title level={3} style={{ marginTop: '8px' }}>
//             สร้างโปรไฟล์หางานของคุณ
//           </Title>
//           <Text type="secondary">
//             กรอกข้อมูลเพื่อให้ผู้ว่าจ้างรู้จักคุณมากขึ้น
//           </Text>
//         </div>

//         <Form layout="vertical" onFinish={onFinish} autoComplete="off">
//           <Divider orientation="left">ข้อมูลส่วนตัว</Divider>
//           <Row gutter={24}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="email"
//                 label="อีเมล"
//                 rules={[
//                   { required: true, type: 'email', message: 'กรุณากรอกอีเมล' },
//                 ]}
//               >
//                 <Input prefix={<MailOutlined />} placeholder="example@email.com" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="phone"
//                 label="เบอร์โทรศัพท์"
//                 rules={[
//                   { required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' },
//                   { pattern: /^0\d{9}$/, message: 'รูปแบบเบอร์โทรไม่ถูกต้อง' },
//                 ]}
//               >
//                 <Input prefix={<PhoneOutlined />} placeholder="08xxxxxxxx" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="faculty"
//                 label="คณะ/สาขา"
//                 rules={[{ required: true, message: 'กรุณากรอกคณะ/สาขา' }]}
//               >
//                 <Input prefix={<BookOutlined />} placeholder="วิศวกรรมคอมพิวเตอร์" />
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="year"
//                 label="ชั้นปี"
//                 rules={[{ required: true, message: 'กรุณาเลือกชั้นปี' }]}
//               >
//                 <Select placeholder="เลือกชั้นปี">
//                   <Option value="ปีที่ 1">ปีที่ 1</Option>
//                   <Option value="ปีที่ 2">ปีที่ 2</Option>
//                   <Option value="ปีที่ 3">ปีที่ 3</Option>
//                   <Option value="ปีที่ 4">ปีที่ 4</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Divider orientation="left">รายละเอียดโปรไฟล์</Divider>
//           <Form.Item
//             name="introduction"
//             label="แนะนำตัวเอง"
//             rules={[{ required: true, message: 'กรุณาเขียนแนะนำตัว' }]}
//           >
//             <TextArea rows={4} />
//           </Form.Item>

//           <Form.Item
//             name="skills"
//             label="ทักษะ"
//             rules={[{ required: true, message: 'กรุณาระบุทักษะ' }]}
//             extra="คั่นแต่ละทักษะด้วย , เช่น React, Node.js, SQL"
//           >
//             <TextArea rows={3} />
//           </Form.Item>

//           <Row gutter={24}>
//             <Col xs={24} sm={12}>
//               <Form.Item
//                 name="jobType"
//                 label="ประเภทงาน"
//                 rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
//               >
//                 <Select placeholder="เลือกประเภทงาน">
//                   <Option value="พาร์ทไทม์">พาร์ทไทม์</Option>
//                   <Option value="งานประจำ">งานประจำ</Option>
//                   <Option value="ฟรีแลนซ์">ฟรีแลนซ์</Option>
//                   <Option value="ฝึกงาน">ฝึกงาน</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col xs={24} sm={12}>
//               <Form.Item name="portfolio" label="ลิงก์ผลงาน/LinkedIn (ถ้ามี)">
//                 <Input prefix={<LinkOutlined />} placeholder="https://..." />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item style={{ textAlign: 'right', marginTop: '24px' }}>
//             <Space>
//               <Button htmlType="button" onClick={() => navigate('/feed')}>
//                 ยกเลิก
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 icon={<SolutionOutlined />}
//                 loading={loading}
//               >
//                 โพสต์โปรไฟล์
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default StudentPostForm;
// src/pages/StudentPost/StudentPostForm.tsx
// src/pages/StudentPost/StudentPostForm.tsx - Updated for Modal
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  message,
  Result,
} from 'antd';
import {
  LinkOutlined,
  SolutionOutlined,
  RocketOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { createStudentProfilePost } from '../../services/studentPostService';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface StudentPostFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
  isModal?: boolean; // เพิ่ม prop เพื่อบอกว่าทำงานใน Modal หรือไม่
}

const StudentPostForm: React.FC<StudentPostFormProps> = ({ 
  onSuccess, 
  onClose, 
  isModal = false 
}) => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const onFinish = async (values: any) => {
    if (!user || !token) {
      message.error('กรุณาเข้าสู่ระบบก่อนโพสต์');
      if (!isModal) {
        navigate('/login');
      }
      return;
    }

    setLoading(true);
    const postData = {
      student_id: user.id,
      introduction: values.introduction,
      job_type: values.jobType,
      portfolio_url: values.portfolio || '',
      skills: values.skills,
    };

    try {
      await createStudentProfilePost(postData);
      message.success('โพสต์โปรไฟล์ของคุณสำเร็จแล้ว!');
      
      if (isModal && onSuccess) {
        // หากอยู่ใน Modal ให้เรียก onSuccess callback และปิด Modal
        onSuccess();
        if (onClose) onClose();
      } else {
        // หากไม่อยู่ใน Modal ให้แสดง Success page
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to submit the form:', error);
      message.error('เกิดข้อผิดพลาดในการโพสต์โปรไฟล์');
    } finally {
      setLoading(false);
    }
  };

  // Success page (เฉพาะตอนไม่อยู่ใน Modal)
  if (isSubmitted && !isModal) {
    return (
      <Card style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
        <Result
          status="success"
          title="โพสต์โปรไฟล์สำเร็จ!"
          subTitle="โปรไฟล์ของคุณได้ถูกเผยแพร่แล้ว ผู้ว่าจ้างสามารถดูข้อมูลของคุณได้"
          extra={[
            <Button 
              type="primary" 
              key="feed"
              icon={<HomeOutlined />}
              onClick={() => navigate('/feed')}
            >
              กลับไปหน้า Feed
            </Button>
          ]}
        />
      </Card>
    );
  }

  // Main Form
  const handleCancel = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      navigate('/feed');
    }
  };

  const formContent = (
    <Form
      name="studentPost"
      layout="vertical"
      onFinish={onFinish}
      size="large"
      scrollToFirstError
    >
      <Row gutter={[24, 16]}>
        <Col span={24}>
          <Form.Item
            label={
              <Text strong style={{ fontSize: '16px' }}>
                <SolutionOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                แนะนำตัวเอง
              </Text>
            }
            name="introduction"
            rules={[
              { required: true, message: 'กรุณาแนะนำตัวเอง' },
              { min: 20, message: 'กรุณาเขียนแนะนำตัวอย่างน้อย 20 ตัวอักษร' }
            ]}
          >
            <TextArea
              rows={6}
              placeholder="เช่น สวัสดีครับ ผมชื่อ... เป็นนักศึกษาชั้นปีที่... คณะ... มีความสนใจในด้าน... มีประสบการณ์... และกำลังมองหาโอกาสใน..."
              showCount
              maxLength={1000}
              style={{ 
                borderRadius: '12px',
                border: '2px solid #f0f0f0',
                fontSize: '15px'
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            label={
              <Text strong style={{ fontSize: '16px' }}>
                <RocketOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                ประเภทงานที่สนใจ
              </Text>
            }
            name="jobType"
            rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
          >
            <Select
              placeholder="เลือกประเภทงาน"
              style={{ borderRadius: '12px' }}
              size="large"
            >
              <Option value="พาร์ทไทม์">
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '8px' }}>⏰</span>
                  พาร์ทไทม์
                </div>
              </Option>
              <Option value="งานประจำ">
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '8px' }}>💼</span>
                  งานประจำ
                </div>
              </Option>
              <Option value="ฟรีแลนซ์">
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '8px' }}>🌟</span>
                  ฟรีแลนซ์
                </div>
              </Option>
              <Option value="ฝึกงาน">
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '8px' }}>🎓</span>
                  ฝึกงาน
                </div>
              </Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label={
              <Text strong style={{ fontSize: '16px' }}>
                <LinkOutlined style={{ marginRight: '8px', color: '#722ed1' }} />
                ลิงก์ผลงาน/LinkedIn
              </Text>
            }
            name="portfolio"
          >
            <Input
              prefix={<LinkOutlined />}
              placeholder="https://..."
              style={{ 
                borderRadius: '12px',
                border: '2px solid #f0f0f0'
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[24, 16]}>
        <Col span={24}>
          <Form.Item
            label={
              <Text strong style={{ fontSize: '16px' }}>
                🛠️ ทักษะ
              </Text>
            }
            name="skills"
            rules={[
              { required: true, message: 'กรุณาระบุทักษะของคุณ' },
              { min: 10, message: 'กรุณาเขียนทักษะอย่างน้อย 10 ตัวอักษร' }
            ]}
          >
            <TextArea
              rows={4}
              placeholder="เช่น React, Node.js, Python, Photoshop, Microsoft Office, ภาษาอังกฤษ, การออกแบบ, การตลาด..."
              showCount
              maxLength={500}
              style={{ 
                borderRadius: '12px',
                border: '2px solid #f0f0f0',
                fontSize: '15px'
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      {/* Action Buttons */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Space size="large">
          <Button
            size="large"
            onClick={handleCancel}
            style={{
              height: '48px',
              borderRadius: '12px',
              fontSize: '16px',
              minWidth: '120px'
            }}
          >
            ยกเลิก
          </Button>
          
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            icon={<RocketOutlined />}
            style={{
              height: '48px',
              borderRadius: '12px',
              fontSize: '16px',
              minWidth: '160px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
          >
            {loading ? 'กำลังโพสต์...' : 'โพสต์โปรไฟล์'}
          </Button>
        </Space>
      </div>
    </Form>
  );

  // หากไม่อยู่ใน Modal ให้ wrap ด้วย Card
  if (!isModal) {
    return (
      <div style={{ padding: '24px', background: '#f5f7fa', minHeight: '100vh' }}>
        <Card style={{
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: 'none'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '20px 0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
            <Title level={1} style={{ 
              margin: 0,
              marginBottom: '8px',
              color: '#333'
            }}>
              สร้างโปรไฟล์หางานของคุณ
            </Title>
            <Text style={{ 
              fontSize: '16px', 
              color: '#666'
            }}>
              กรอกข้อมูลเพื่อให้ผู้ว่าจ้างรู้จักคุณมากขึ้น
            </Text>
          </div>

          <Divider />

          <div style={{ padding: '0 20px' }}>
            <Title level={4} style={{ 
              color: '#333',
              marginBottom: '24px'
            }}>
              รายละเอียดโปรไฟล์
            </Title>
            {formContent}
          </div>
        </Card>
      </div>
    );
  }

  // หากอยู่ใน Modal ให้ return เฉพาะฟอร์ม
  return formContent;
};

export default StudentPostForm;