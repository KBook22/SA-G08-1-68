// // src/pages/HelpCenter/CreateRequestPage.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   Form,
//   Input,
//   Button,
//   Typography,
//   Space,
//   message,
//   Steps,
//   Row,
//   Col,
//   Alert
// } from 'antd';
// import {
//   ArrowLeftOutlined,
//   SendOutlined,
//   FileTextOutlined,
//   CheckCircleOutlined
// } from '@ant-design/icons';

// const { Title, Text, Paragraph } = Typography;
// const { TextArea } = Input;

// const API_URL = 'http://localhost:8080/api';

// const CreateRequestPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);

//   const handleSubmit = async (values: { subject: string; initial_message: string }) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         message.error('กรุณาเข้าสู่ระบบก่อนส่งคำร้อง');
//         navigate('/login');
//         return;
//       }

//       const response = await fetch(`${API_URL}/tickets`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           subject: values.subject,
//           initial_message: values.initial_message
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to create ticket');
//       }

//       const ticketData = await response.json();
      
//       // แสดงขั้นตอนสำเร็จ
//       setCurrentStep(1);
//       message.success('ส่งคำร้องสำเร็จแล้ว! กำลังนำทางไปหน้าศูนย์ช่วยเหลือ...');
      
//       // รอ 2 วินาทีแล้วไปหน้า Help Center พร้อมเปิดแท็บ "คำร้องของฉัน"
//       setTimeout(() => {
//         navigate('/help?tab=2');
//       }, 2000);

//     } catch (error: any) {
//       console.error('Error creating ticket:', error);
//       message.error(error.message || 'เกิดข้อผิดพลาดในการส่งคำร้อง');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const steps = [
//     {
//       title: 'กรอกข้อมูล',
//       icon: <FileTextOutlined />,
//     },
//     {
//       title: 'ส่งสำเร็จ',
//       icon: <CheckCircleOutlined />,
//     },
//   ];

//   if (currentStep === 1) {
//     return (
//       <div style={{ 
//         backgroundColor: '#eff3fb', 
//         minHeight: '100vh',
//         padding: '40px 20px' 
//       }}>
//         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//           <Card style={{
//             borderRadius: '16px',
//             textAlign: 'center',
//             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
//           }}>
//             <div style={{ padding: '40px 20px' }}>
//               <CheckCircleOutlined 
//                 style={{ 
//                   fontSize: '64px', 
//                   color: '#52c41a', 
//                   marginBottom: '24px' 
//                 }} 
//               />
//               <Title level={2} style={{ color: '#52c41a', marginBottom: '16px' }}>
//                 ส่งคำร้องสำเร็จแล้ว!
//               </Title>
//               <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
//                 เราได้รับคำร้องของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด
//               </Paragraph>
//               <Text type="secondary">
//                 กำลังนำคุณไปยังหน้าศูนย์ช่วยเหลือ...
//               </Text>
//             </div>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ 
//       backgroundColor: '#eff3fb', 
//       minHeight: '100vh',
//       padding: '40px 20px' 
//     }}>
//       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
//         {/* Header */}
//         <div style={{ marginBottom: '32px' }}>
//           <Button
//             icon={<ArrowLeftOutlined />}
//             onClick={() => navigate('/help')}
//             style={{ marginBottom: '16px' }}
//           >
//             กลับไปศูนย์ช่วยเหลือ
//           </Button>
          
//           <Title level={1} style={{ color: '#1d39c4', marginBottom: '8px' }}>
//             📝 ส่งคำร้องใหม่
//           </Title>
//           <Text style={{ fontSize: '16px', color: '#666' }}>
//             กรอกรายละเอียดปัญหาหรือคำถามของคุณ เราจะตอบกลับโดยเร็วที่สุด
//           </Text>
//         </div>

//         {/* Progress Steps */}
//         <Card style={{ marginBottom: '24px', borderRadius: '12px' }}>
//           <Steps current={currentStep} items={steps} />
//         </Card>

//         {/* Main Form */}
//         <Card style={{
//           borderRadius: '16px',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
//         }}>
//           <Row gutter={[24, 24]}>
//             {/* Form Section */}
//             <Col xs={24} lg={16}>
//               <Title level={3} style={{ marginBottom: '24px' }}>
//                 รายละเอียดคำร้อง
//               </Title>
              
//               <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={handleSubmit}
//                 size="large"
//               >
//                 <Form.Item
//                   name="subject"
//                   label="หัวข้อเรื่อง"
//                   rules={[
//                     { required: true, message: 'กรุณากรอกหัวข้อเรื่อง' },
//                     { min: 5, message: 'หัวข้อควรมีอย่างน้อย 5 ตัวอักษร' },
//                     { max: 100, message: 'หัวข้อไม่ควรเกิน 100 ตัวอักษร' }
//                   ]}
//                 >
//                   <Input 
//                     placeholder="เช่น: ปัญหาการสมัครงาน, คำถามเกี่ยวกับโปรไฟล์"
//                     style={{ borderRadius: '8px' }}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   name="initial_message"
//                   label="รายละเอียดปัญหา"
//                   rules={[
//                     { required: true, message: 'กรุณากรอกรายละเอียดปัญหา' },
//                     { min: 10, message: 'รายละเอียดควรมีอย่างน้อย 10 ตัวอักษร' },
//                     { max: 1000, message: 'รายละเอียดไม่ควรเกิน 1000 ตัวอักษร' }
//                   ]}
//                 >
//                   <TextArea
//                     rows={6}
//                     placeholder="อธิบายปัญหาหรือคำถามของคุณให้ละเอียด เพื่อให้เราสามารถช่วยเหลือคุณได้อย่างมีประสิทธิภaพ"
//                     style={{ borderRadius: '8px' }}
//                     showCount
//                     maxLength={1000}
//                   />
//                 </Form.Item>

//                 <Form.Item style={{ marginBottom: 0 }}>
//                   <Space size="middle" style={{ width: '100%' }}>
//                     <Button
//                       size="large"
//                       onClick={() => navigate('/help')}
//                       style={{ borderRadius: '8px', minWidth: '120px' }}
//                     >
//                       ยกเลิก
//                     </Button>
                    
//                     <Button
//                       type="primary"
//                       htmlType="submit"
//                       loading={loading}
//                       icon={<SendOutlined />}
//                       size="large"
//                       style={{
//                         borderRadius: '8px',
//                         minWidth: '120px',
//                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                         border: 'none'
//                       }}
//                     >
//                       ส่งคำร้อง
//                     </Button>
//                   </Space>
//                 </Form.Item>
//               </Form>
//             </Col>

//             {/* Info Section */}
//             <Col xs={24} lg={8}>
//               <div style={{ padding: '0 16px' }}>
//                 <Title level={4} style={{ marginBottom: '16px' }}>
//                   💡 คำแนะนำ
//                 </Title>
                
//                 <Alert
//                   message="เพื่อให้เราช่วยเหลือคุณได้ดีที่สุด"
//                   description={
//                     <ul style={{ margin: '8px 0', paddingLeft: '16px' }}>
//                       <li>อธิบายปัญหาให้ละเอียดชัดเจน</li>
//                       <li>แนบไฟล์หรือภาพหน้าจอ (หากจำเป็น)</li>
//                       <li>ระบุขั้นตอนที่ทำให้เกิดปัญหา</li>
//                       <li>แจ้งเบราว์เซอร์และอุปกรณ์ที่ใช้</li>
//                     </ul>
//                   }
//                   type="info"
//                   style={{ marginBottom: '16px' }}
//                 />

//                 <Card size="small" style={{ backgroundColor: '#f8f9fa' }}>
//                   <Title level={5} style={{ marginBottom: '8px' }}>
//                     📞 ติดต่อด่วน
//                   </Title>
//                   <Text strong>อีเมล:</Text> support@sutcareer.com<br />
//                   <Text strong>โทร:</Text> 02-123-4567<br />
//                   <Text strong>เวลา:</Text> จ-ศ 9:00-17:00
//                 </Card>
//               </div>
//             </Col>
//           </Row>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CreateRequestPage;


// src/pages/HelpCenter/CreateRequestPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, Form, Input, Button, Typography, Space, message,
  Steps, Row, Col, Alert, Upload, Image, Progress
} from 'antd';
import {
  ArrowLeftOutlined, SendOutlined, FileTextOutlined,
  CheckCircleOutlined, PictureOutlined, DeleteOutlined
} from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { uploadHelpCenterImage } from '../../lib/firebase';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const API_URL = 'http://localhost:8080/api';

const CreateRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // ✨ เพิ่ม states สำหรับรูปภาพ
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [uploadingImages, setUploadingImages] = useState(false);

  // ✨ ฟังก์ชันจัดการการอัปโหลดรูป
  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      setUploadingImages(true);
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

      // Simulate progress (Firebase doesn't provide real progress for uploads)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[file.name] || 0;
          if (current < 90) {
            return { ...prev, [file.name]: current + 10 };
          }
          return prev;
        });
      }, 100);

      const result = await uploadHelpCenterImage(file, 'ticket');
      
      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      
      if (result) {
        message.success(`อัปโหลดรูป ${result.originalName} สำเร็จ`);
        return result.url;
      }
      return null;
    } catch (error: any) {
      message.error(error.message || 'เกิดข้อผิดพลาดในการอัปโหลดรูป');
      return null;
    } finally {
      setUploadingImages(false);
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[file.name];
          return newProgress;
        });
      }, 1000);
    }
  };

  const handleSubmit = async (values: { subject: string; initial_message: string }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('กรุณาเข้าสู่ระบบก่อนส่งคำร้อง');
        navigate('/login');
        return;
      }

      // ✨ อัปโหลดรูปทั้งหมดก่อน
      const imageUrls: string[] = [];
      for (const fileObj of imageFiles) {
        if (fileObj.originFileObj) {
          const url = await handleImageUpload(fileObj.originFileObj);
          if (url) imageUrls.push(url);
        }
      }

      const requestData = {
        subject: values.subject,
        initial_message: values.initial_message,
        images: imageUrls // ✨ เพิ่มรูปภาพ
      };

      const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create ticket');
      }

      const ticketData = await response.json();
      setCurrentStep(1);
      message.success('ส่งคำร้องสำเร็จแล้ว! กำลังนำทางไปหน้าศูนย์ช่วยเหลือ...');
      
      setTimeout(() => {
        navigate('/help?tab=2');
      }, 2000);

    } catch (error: any) {
      console.error('Error creating ticket:', error);
      message.error(error.message || 'เกิดข้อผิดพลาดในการส่งคำร้อง');
    } finally {
      setLoading(false);
    }
  };

  // ✨ การจัดการไฟล์อัปโหลด
  const uploadProps = {
    beforeUpload: (file: File) => {
      // ตรวจสอบประเภทไฟล์
      if (!file.type.startsWith('image/')) {
        message.error('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        return false;
      }
      
      // ตรวจสอบขนาดไฟล์ (5MB)
      if (file.size > 5 * 1024 * 1024) {
        message.error('ไฟล์รูปภาพต้องมีขนาดไม่เกิน 5MB');
        return false;
      }

      return false; // ป้องกันการอัปโหลดอัตโนมัติ
    },
    onChange: ({ fileList }: { fileList: UploadFile[] }) => {
      setImageFiles(fileList.slice(-3)); // จำกัดแค่ 3 รูป
    },
    onRemove: (file: UploadFile) => {
      setImageFiles(prev => prev.filter(f => f.uid !== file.uid));
    },
    fileList: imageFiles,
    multiple: true,
    accept: 'image/*',
    listType: 'picture-card' as const,
  };

  const steps = [
    {
      title: 'กรอกข้อมูล',
      icon: <FileTextOutlined />,
      description: 'กรอกรายละเอียดคำร้อง'
    },
    {
      title: 'สำเร็จ',
      icon: <CheckCircleOutlined />,
      description: 'ส่งคำร้องเรียบร้อย'
    }
  ];

  if (currentStep === 1) {
    return (
      <div className="help-center-container">
        <Card 
          style={{ 
            maxWidth: 600, 
            margin: '50px auto',
            borderRadius: '16px',
            textAlign: 'center'
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Steps current={1} items={steps} />
            
            <div className="success-icon">
              <CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a' }} />
            </div>
            
            <Title level={3} style={{ color: '#52c41a' }}>
              ส่งคำร้องสำเร็จแล้ว!
            </Title>
            
            <Paragraph>
              เราได้รับคำร้องของคุณแล้ว และจะดำเนินการตอบกลับโดยเร็วที่สุด
              กำลังนำทางไปยังศูนย์ช่วยเหลือ...
            </Paragraph>

            <div className="success-redirect">
              <Progress percent={100} showInfo={false} />
            </div>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div className="help-center-container">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card 
            className="create-request-form"
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Button 
                icon={<ArrowLeftOutlined />}
                type="text" 
                onClick={() => navigate('/help')}
                style={{ float: 'left' }}
              >
                กลับ
              </Button>
              
              <Title level={3} style={{ margin: 0, color: '#1d39c4' }}>
                <FileTextOutlined /> ส่งคำร้องขอความช่วยเหลือ
              </Title>
              
              <Text type="secondary">
                กรุณากรอกรายละเอียดปัญหาที่คุณพบ เราจะตอบกลับโดยเร็วที่สุด
              </Text>
            </div>

            <Steps current={0} items={steps} style={{ marginBottom: '32px' }} />

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              size="large"
            >
              <Form.Item
                name="subject"
                label="หัวข้อคำร้อง"
                rules={[
                  { required: true, message: 'กรุณากรอกหัวข้อคำร้อง' },
                  { min: 5, message: 'หัวข้อต้องมีอย่างน้อย 5 ตัวอักษร' }
                ]}
              >
                <Input 
                  placeholder="เช่น ปัญหาการเข้าสู่ระบบ, ข้อผิดพลาดในการใช้งาน"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              <Form.Item
                name="initial_message"
                label="รายละเอียดปัญหา"
                rules={[
                  { required: true, message: 'กรุณากรอกรายละเอียดปัญหา' },
                  { min: 10, message: 'รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร' }
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="กรุณาอธิบายปัญหาที่พบให้ละเอียด เพื่อให้เราสามารถช่วยเหลือคุณได้อย่างมีประสิทธิภาพ..."
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>

              {/* ✨ ส่วนอัปโหลดรูปภาพ */}
              <Form.Item label="แนบรูปภาพประกอบ (ไม่บังคับ)">
                <Dragger {...uploadProps} style={{ borderRadius: '8px' }}>
                  <p className="ant-upload-drag-icon">
                    <PictureOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  </p>
                  <p className="ant-upload-text">
                    คลิกหรือลากไฟล์รูปภาพมาที่นี่
                  </p>
                  <p className="ant-upload-hint">
                    รองรับไฟล์ JPG, PNG, GIF (ขนาดไม่เกิน 5MB, สูงสุด 3 รูป)
                  </p>
                </Dragger>

                {/* แสดง Progress การอัปโหลด */}
                {Object.entries(uploadProgress).map(([fileName, progress]) => (
                  <div key={fileName} style={{ marginTop: '8px' }}>
                    <Text style={{ fontSize: '12px' }}>กำลังอัปโหลด {fileName}</Text>
                    <Progress percent={progress} size="small" />
                  </div>
                ))}
              </Form.Item>

              <Alert
                message="ข้อแนะนำ"
                description="การแนบรูปภาพที่แสดงปัญหาจะช่วยให้เราเข้าใจและแก้ไขปัญหาได้รวดเร็วขึ้น"
                type="info"
                showIcon
                style={{ marginBottom: '24px', borderRadius: '8px' }}
              />

              <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
                <Space size="middle">
                  <Button 
                    size="large"
                    onClick={() => navigate('/help')}
                    style={{ borderRadius: '8px', minWidth: '120px' }}
                  >
                    ยกเลิก
                  </Button>
                  
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading || uploadingImages}
                    icon={<SendOutlined />}
                    size="large"
                    style={{
                      borderRadius: '8px',
                      minWidth: '160px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none'
                    }}
                  >
                    {uploadingImages ? 'กำลังอัปโหลดรูป...' : loading ? 'กำลังส่ง...' : 'ส่งคำร้อง'}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateRequestPage;
