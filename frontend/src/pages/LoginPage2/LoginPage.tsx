// src/pages/LoginPage2/LoginPage.tsx
import React from 'react';
import { Card, Form, Input, Button, Tabs, Typography, Space, message } from 'antd';
import { UserOutlined, SearchOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const { Title, Link, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (response.ok) {
        message.success('เข้าสู่ระบบสำเร็จ!');
        // In a real app, you would save the token from the response
        navigate('/');
      } else {
        const errorData = await response.json();
        message.error(errorData.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      message.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };


  const items = [
    {
      label: (
        <Space>
          <SearchOutlined />
          หางาน
        </Space>
      ),
      key: 'jobseeker',
      children: (
        <>
          <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>
            เข้าสู่ระบบสำหรับผู้สมัครงาน
          </Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="ชื่อผู้ใช้" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
            </Form.Item>
            <Form.Item>
              <Link className="login-form-forgot" href="">
                ลืมรหัสผ่าน
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
          <div className="login-register-link">
            <Text>ยังไม่ได้เป็นสมาชิก? </Text>
            <Link to="/register">สมัครสมาชิก</Link>
          </div>
        </>
      ),
    },
    {
      label: (
        <Space>
          <UserOutlined />
          หาคน
        </Space>
      ),
      key: 'employer',
      children: (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Title level={4}>เข้าสู่ระบบสำหรับผู้ประกอบการ</Title>
            <Text type="secondary">ส่วนนี้ยังไม่เปิดให้บริการ</Text>
        </div>
      ),
    },
  ];

  return (
    <div className="login-page-container">
      <Card className="login-card">
        <Tabs defaultActiveKey="jobseeker" items={items} centered />
      </Card>
    </div>
  );
};

export default LoginPage;