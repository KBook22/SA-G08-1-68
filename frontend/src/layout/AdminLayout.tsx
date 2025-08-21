import React from 'react';
import { Layout, Menu, Typography, Avatar, Dropdown, Space } from 'antd';
import {
  DashboardOutlined,
  QuestionCircleOutlined,
  FlagOutlined,
  LogoutOutlined,
  UserOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../pages/Admin/Admin.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { key: '/admin', icon: <DashboardOutlined />, label: <Link to="/admin">Dashboard</Link> },
    { key: '/admin/requests', icon: <QuestionCircleOutlined />, label: <Link to="/admin/requests">จัดการคำร้อง</Link> },
    { key: '/admin/reports', icon: <FlagOutlined />, label: <Link to="/admin/reports">โพสต์ที่ถูกรายงาน</Link> },
    { key: '/admin/manage-faq', icon: <BookOutlined />, label: <Link to="/admin/manage-faq">จัดการ FAQ</Link> },
  ];
  
  const profileMenuItems = [
      {
          key: 'logout',
          label: <Link to="/login">ออกจากระบบ</Link>,
          icon: <LogoutOutlined />,
      }
  ];

  return (
    <Layout className="admin-layout" style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo">Admin</div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <Layout>
        <Header>
          <Title level={4} style={{ margin: 0, color: '#001529' }}>Welcome, Admin!</Title>
          <Dropdown menu={{ items: profileMenuItems }} trigger={['click']}>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>ผู้ดูแลระบบ</span>
            </Space>
          </Dropdown>
        </Header>
        <Content>
          {/* ✅ เอา context ออก ไม่จำเป็นต้องส่งต่อแล้ว */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;