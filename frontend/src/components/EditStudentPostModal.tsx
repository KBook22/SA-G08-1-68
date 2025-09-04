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

// src/components/EditStudentPostModal.tsx
// src/components/EditStudentPostModal.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   Form,
//   Input,
//   Select,
//   Button,
//   message,
//   Row,
//   Col,
//   Typography
// } from 'antd';
// import {
//   BulbOutlined,
//   ClockCircleOutlined,
//   EnvironmentOutlined,
//   DollarOutlined,
//   TagOutlined,
//   LinkOutlined,
//   UserOutlined
// } from '@ant-design/icons';
// // สมมติว่าคุณมีคอมโพเนนต์ SkillSelect อยู่ที่เดียวกับ CreateStudentPostModal
// // หากไม่มี ให้ใช้ <Select mode="tags" /> แทนได้
// import SkillSelect from './SkillSelect'; 

// const { TextArea } = Input;
// const { Option } = Select;
// const { Title, Text } = Typography;

// // Interface สำหรับ props
// interface StudentProfilePost {
//     ID: number;
//     title?: string;
//     job_type: string;
//     skills: string;
//     availability?: string;
//     preferred_location?: string;
//     expected_compensation?: string;
//     content?: string;
//     portfolio_url?: string;
// }
  
// interface EditStudentPostModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
//   post: StudentProfilePost | null; // กำหนด Type ให้ชัดเจน
// }

// const EditStudentPostModal: React.FC<EditStudentPostModalProps> = ({
//   visible,
//   onClose,
//   onSuccess,
//   post
// }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const jobTypes = [
//     'งานประจำ',
//     'งานพาร์ทไทม์',
//     'ฟรีแลนซ์',
//     'ฝึกงาน',
//     'งานชั่วคราว',
//     'งานโครงการ'
//   ];

//   // ตั้งค่าข้อมูลในฟอร์มเมื่อ Modal เปิดและมีข้อมูล post
//   useEffect(() => {
//     if (visible && post) {
//       const skillsArray = post.skills ? post.skills.split(',').map(s => s.trim()) : [];
//       form.setFieldsValue({
//         title: post.title,
//         jobType: post.job_type,
//         skills: skillsArray,
//         availability: post.availability,
//         preferredLocation: post.preferred_location,
//         expectedCompensation: post.expected_compensation,
//         content: post.content,
//         portfolio_url: post.portfolio_url,
//       });
//     } else {
//         form.resetFields();
//     }
//   }, [visible, post, form]);

//   const handleSubmit = async (values: any) => {
//     if (!post) {
//         message.error("ไม่พบข้อมูลโพสต์ที่ต้องการแก้ไข");
//         return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       // แปลง array ของ skills กลับเป็น string
//       const skillsString = Array.isArray(values.skills) ? values.skills.join(', ') : values.skills;

//       const updatedData = {
//         ...values,
//         skills: skillsString,
//       };

//       const response = await fetch(`http://localhost:8080/api/student-profile-posts/${post.ID}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(updatedData)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to update post');
//       }

//       message.success('แก้ไขโพสต์สำเร็จ!');
//       onSuccess(); // เรียก onSuccess เพื่อ refresh ข้อมูลหน้า feed
//       onClose(); // ปิด Modal
//     } catch (error: any) {
//       console.error('Error updating post:', error);
//       message.error(error.message || 'เกิดข้อผิดพลาดในการแก้ไขโพสต์');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       title={
//         <div style={{ textAlign: 'center' }}>
//           <Title level={4} style={{ margin: 0 }}>
//             แก้ไขโพสต์หางาน
//           </Title>
//         </div>
//       }
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//       width={700}
//       centered
//       destroyOnClose={true}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleSubmit}
//         style={{ paddingTop: '20px' }}
//       >
//         <Form.Item
//           label={<span><BulbOutlined /> หัวข้อโพสต์</span>}
//           name="title"
//           rules={[{ required: true, message: 'กรุณาใส่หัวข้อโพสต์' }]}
//         >
//           <Input placeholder="เช่น นักศึกษาหางานพาร์ทไทม์ร้านกาแฟ" />
//         </Form.Item>

//         <Row gutter={16}>
//           <Col xs={24} sm={12}>
//             <Form.Item
//               label={<span><TagOutlined /> ประเภทงาน</span>}
//               name="jobType"
//               rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
//             >
//               <Select placeholder="เลือกประเภทงาน">
//                 {jobTypes.map(type => (<Option key={type} value={type}>{type}</Option>))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col xs={24} sm={12}>
//             <Form.Item
//               label={<span><UserOutlined /> ทักษะ</span>}
//               name="skills"
//               rules={[{ required: true, message: 'กรุณาระบุทักษะ' }]}
//             >
//               <SkillSelect placeholder="เลือกหรือเพิ่มทักษะ..." />
//             </Form.Item>
//           </Col>
//         </Row>
        
//         <Row gutter={16}>
//           <Col xs={24} sm={12}>
//             <Form.Item
//               label={<span><ClockCircleOutlined /> เวลาที่สะดวก</span>}
//               name="availability"
//               rules={[{ required: true, message: 'กรุณาระบุเวลา' }]}
//             >
//               <Input placeholder="เช่น จันทร์-ศุกร์ หลัง 18:00 น." />
//             </Form.Item>
//           </Col>
//           <Col xs={24} sm={12}>
//             <Form.Item
//               label={<span><EnvironmentOutlined /> สถานที่ที่สะดวก</span>}
//               name="preferredLocation"
//               rules={[{ required: true, message: 'กรุณาระบุสถานที่' }]}
//             >
//               <Input placeholder="เช่น ใกล้ มทส." />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item
//           label={<span><DollarOutlined /> ค่าตอบแทนที่คาดหวัง</span>}
//           name="expectedCompensation"
//         >
//           <Input placeholder="เช่น 120-150 บาท/ชั่วโมง" />
//         </Form.Item>

//         <Form.Item
//           label={<span><BulbOutlined /> รายละเอียด</span>}
//           name="content"
//           rules={[{ required: true, message: 'กรุณาใส่รายละเอียด' }]}
//         >
//           <TextArea rows={4} placeholder="แนะนำตัวเอง ประสบการณ์..." />
//         </Form.Item>

//         <Form.Item
//           label={<span><LinkOutlined /> ลิงก์ผลงาน</span>}
//           name="portfolio_url"
//           rules={[{ type: 'url', message: 'กรุณาใส่ URL ที่ถูกต้อง' }]}
//         >
//           <Input placeholder="https://your-portfolio.com" />
//         </Form.Item>

//         <Form.Item style={{ textAlign: 'right', marginBottom: 0, marginTop: '24px' }}>
//           <Button onClick={onClose} style={{ marginRight: 8 }}>
//             ยกเลิก
//           </Button>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             บันทึกการแก้ไข
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default EditStudentPostModal;

// src/components/EditStudentPostModal.tsx
import React, { useState, useEffect } from 'react';
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
  Space
} from 'antd';
import {
  BulbOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  TagOutlined,
  UserOutlined
} from '@ant-design/icons';
import { updateStudentPost } from '../services/studentPostService'; // ✅ แก้ไข import

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

// Interface สำหรับ props
interface StudentPost {
  ID: number;
  title: string;
  job_type: string;
  skills: string;
  availability: string;
  preferred_location: string;
  expected_compensation?: string;
  introduction: string;
  portfolio_url?: string;
}

interface EditStudentPostModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  post: StudentPost | null;
}

const EditStudentPostModal: React.FC<EditStudentPostModalProps> = ({
  visible,
  onClose,
  onSuccess,
  post
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const jobTypes = [
    'งานประจำ',
    'งานพาร์ทไทม์',
    'ฟรีแลนซ์',
    'ฝึกงาน',
    'งานชั่วคราว',
    'งานโครงการ'
  ];

  // ตั้งค่าข้อมูลในฟอร์มเมื่อ Modal เปิดและมีข้อมูล post
  useEffect(() => {
    if (visible && post) {
      form.setFieldsValue({
        title: post.title,
        jobType: post.job_type,
        skills: post.skills,
        availability: post.availability,
        preferredLocation: post.preferred_location,
        expectedCompensation: post.expected_compensation,
        introduction: post.introduction,
        portfolio_url: post.portfolio_url,
      });
    } else {
      form.resetFields();
    }
  }, [visible, post, form]);

  const handleSubmit = async (values: any) => {
    if (!post) {
      message.error("ไม่พบข้อมูลโพสต์ที่ต้องการแก้ไข");
      return;
    }

    setLoading(true);
    try {
      // ✅ แปลงข้อมูลให้ตรงกับ Backend API
      const updatedData = {
        title: values.title,
        job_type: values.jobType,
        skills: values.skills,
        availability: values.availability,
        preferred_location: values.preferredLocation,
        expected_compensation: values.expectedCompensation,
        introduction: values.introduction,
        portfolio_url: values.portfolio_url
      };

      // ✅ เรียก API ใหม่
      await updateStudentPost(post.ID, updatedData);
      
      message.success('แก้ไขโพสต์สำเร็จ!');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error updating post:', error);
      message.error(error.message || 'เกิดข้อผิดพลาดในการแก้ไขโพสต์');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <Space>
          <BulbOutlined style={{ color: '#1890ff' }} />
          <span>แก้ไขโพสต์หางาน</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      destroyOnClose={true}
    >
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
              rules={[{ required: true, message: 'กรุณาใส่หัวข้อโพสต์' }]}
            >
              <Input placeholder="หัวข้อโพสต์" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<><BulbOutlined /> ประเภทงาน</>}
              name="jobType"
              rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}
            >
              <Select>
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
              rules={[{ required: true, message: 'กรุณาระบุเวลา' }]}
            >
              <Input placeholder="เวลาที่สะดวก" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<><EnvironmentOutlined /> สถานที่ที่สะดวก</>}
              name="preferredLocation"
              rules={[{ required: true, message: 'กรุณาระบุสถานที่' }]}
            >
              <Input placeholder="สถานที่ที่สะดวก" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<><DollarOutlined /> ค่าตอบแทนที่คาดหวัง</>}
              name="expectedCompensation"
            >
              <Input placeholder="ค่าตอบแทนที่คาดหวัง" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="ทักษะ"
          name="skills"
          rules={[{ required: true, message: 'กรุณาระบุทักษะ' }]}
        >
          <TextArea rows={2} placeholder="ระบุทักษะ (คั่นด้วยเครื่องหมายจุลภาค)" />
        </Form.Item>

        <Form.Item
          label={<><UserOutlined /> รายละเอียด</>}
          name="introduction"
          rules={[{ required: true, message: 'กรุณาใส่รายละเอียด' }]}
        >
          <TextArea rows={4} placeholder="รายละเอียดเกี่ยวกับตัวคุณ" />
        </Form.Item>

        <Form.Item
          label="ลิงก์ผลงาน"
          name="portfolio_url"
          rules={[{ type: 'url', message: 'กรุณาใส่ URL ที่ถูกต้อง' }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        <Row justify="end" style={{ marginTop: '24px' }}>
          <Space>
            <Button onClick={onClose} size="large">
              ยกเลิก
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              size="large"
            >
              บันทึกการแก้ไข
            </Button>
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditStudentPostModal;
