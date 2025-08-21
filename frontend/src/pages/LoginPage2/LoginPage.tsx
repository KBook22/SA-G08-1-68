import React from 'react';
import { Card, Form, Input, Button, Tabs, Typography, Space } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const { Title, Link, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // TODO: เพิ่ม Logic การตรวจสอบ username/password จริง
    // หากสำเร็จ ให้ redirect ไปหน้าหลัก
    navigate('/');
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
              name="email"
              rules={[{ required: true, message: 'กรุณากรอกอีเมล!' }]}
            >
              <Input placeholder="อีเมล" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
            >
              <Input.Password placeholder="รหัสผ่าน" />
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
            <Link href="">สมัครสมาชิก</Link>
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