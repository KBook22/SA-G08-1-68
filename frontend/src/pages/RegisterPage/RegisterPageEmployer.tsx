import React from 'react';
import { Card, Form, Input, Button, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'; // ใช้ CSS เดียวกันได้

const { Title, Text } = Typography;

const RegisterPageEmployer: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch('http://localhost:8080/api/register/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          company_name: values.companyName,
          contact_person: values.contactPerson,
          email: values.email,
          phone: values.phone,
          address: values.address,
        }),
      });

      if (response.ok) {
        message.success('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        navigate('/login');
      } else {
        const errorData = await response.json();
        message.error(errorData.error || 'การสมัครสมาชิกผิดพลาด');
      }
    } catch (error) {
      message.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <div className="register-page-container">
      <Card className="register-card-expanded">
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          สมัครสมาชิกสำหรับผู้ประกอบการ
        </Title>
        <Form name="register_employer" onFinish={onFinish} layout="vertical" scrollToFirstError>
          <Form.Item name="companyName" label="ชื่อบริษัท/องค์กร" rules={[{ required: true, message: 'กรุณากรอกชื่อบริษัท!' }]}>
            <Input prefix={<HomeOutlined />} placeholder="ชื่อบริษัท" />
          </Form.Item>
          <Form.Item name="contactPerson" label="ชื่อผู้ติดต่อ" rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ติดต่อ!' }]}>
            <Input prefix={<IdcardOutlined />} placeholder="ชื่อ-นามสกุล ของผู้ติดต่อ" />
          </Form.Item>
          <Form.Item name="email" label="อีเมลติดต่อ" rules={[{ required: true, message: 'กรุณากรอกอีเมล!', type: 'email' }]}>
            <Input prefix={<MailOutlined />} placeholder="อีเมลสำหรับการติดต่อ" />
          </Form.Item>
          <Form.Item name="phone" label="เบอร์โทรศัพท์ติดต่อ" rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}>
            <Input prefix={<PhoneOutlined />} placeholder="เบอร์โทรศัพท์" />
          </Form.Item>
          <Form.Item name="address" label="ที่อยู่บริษัท" rules={[{ required: true, message: 'กรุณากรอกที่อยู่!' }]}>
            <Input.TextArea rows={2} placeholder="ที่อยู่บริษัท/องค์กร" />
          </Form.Item>

          <Divider>ข้อมูลสำหรับเข้าสู่ระบบ</Divider>

          <Form.Item name="username" label="ชื่อผู้ใช้ (Username)" rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}>
            <Input prefix={<UserOutlined />} placeholder="ใช้สำหรับเข้าสู่ระบบ" />
          </Form.Item>
          <Form.Item name="password" label="รหัสผ่าน" rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]} hasFeedback>
            <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
          </Form.Item>
          <Form.Item name="confirm" label="ยืนยันรหัสผ่าน" dependencies={['password']} hasFeedback rules={[{ required: true, message: 'กรุณายืนยันรหัสผ่าน!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) { return Promise.resolve(); } return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!')); }, }),]}>
            <Input.Password prefix={<LockOutlined />} placeholder="ยืนยันรหัสผ่านอีกครั้ง" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              สมัครสมาชิก
            </Button>
          </Form.Item>
        </Form>
        <div className="register-login-link">
          <Text>มีบัญชีอยู่แล้ว? </Text>
          <Link to="/login">เข้าสู่ระบบ</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPageEmployer;