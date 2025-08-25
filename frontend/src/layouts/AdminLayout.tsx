import React from 'react';
import { Layout, Menu, Typography, Avatar, Dropdown, Space } from 'antd';
import {
  DashboardOutlined,
  QuestionCircleOutlined,
  FlagOutlined,
  LogoutOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../pages/Admin2/Admin.css';

const { Header, Content, Sider } = Layout;
// 🔄 แก้ไขบรรทัดนี้: ดึง Text เข้ามาด้วย
const { Title, Text } = Typography;

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { key: '/admin', icon: <DashboardOutlined />, label: <Link to="/admin">Dashboard</Link> },
    { key: '/admin/users', icon: <TeamOutlined />, label: <Link to="/admin/users">จัดการผู้ใช้งาน</Link> },
    { key: '/admin/requests', icon: <QuestionCircleOutlined />, label: <Link to="/admin/requests">จัดการคำร้อง</Link> },
    { key: '/admin/reports', icon: <FlagOutlined />, label: <Link to="/admin/reports">โพสต์ที่ถูกรายงาน</Link> },
    { key: '/admin/manage-faq', icon: <BookOutlined />, label: <Link to="/admin/manage-faq">จัดการ FAQ</Link> },
  ];
  
  const profileMenuItems = [
      { key: 'settings', label: 'ตั้งค่า', icon: <SettingOutlined /> },
      { type: 'divider' as const },
      { key: 'logout', label: <Link to="/login">ออกจากระบบ</Link>, icon: <LogoutOutlined /> }
  ];

  return (
    <Layout className="admin-layout" style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" width={250}>
        <div className="logo">SUT Career Admin</div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <Layout>
        <Header>
          <div />
          <Dropdown menu={{ items: profileMenuItems }} trigger={['click']}>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <Text strong>ผู้ดูแลระบบ</Text>
            </Space>
          </Dropdown>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;