import React from 'react';
import { Layout, Menu, Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

const { Header } = Layout;

interface QAHeaderProps {
  newQuestionId: number | undefined;
}

const QAHeader: React.FC<QAHeaderProps> = ({ newQuestionId }) => {
  const myRequestsLink = newQuestionId ? `/qa/question/${newQuestionId}` : '/qa';

  // ✅ แก้ไข: เปลี่ยนไปใช้ prop `items`
  const requestMenuItems = [
    { key: "1", label: <Link to="/qa/ask">ส่งคำร้อง</Link> },
    { key: "2", label: <Link to={myRequestsLink}>คำร้องของฉัน</Link> }
  ];

  return (
    <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        padding: '0 24px', 
        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
        height: '80px' 
    }}>
      <div className="logo" style={{ marginRight: 'auto' }}>
        <Link to="/qa">
          <img
            src="/Logo.svg"
            alt="Logo"
            style={{ 
              height: '250px',
              display: 'block',
              position: 'relative',
              top: '-86px'
            }}
          />
        </Link>
      </div>
      <Menu theme="light" mode="horizontal" style={{ flex: 1, justifyContent: 'flex-end', borderBottom: 'none' }}>
        <Menu.Item key="home">
          <Link to="/">
            <Button type="primary">
              หน้าหลัก
            </Button>
          </Link>
        </Menu.Item>
        <Menu.Item key="requests" style={{ padding: 0 }}>
          {/* ✅ แก้ไข: เปลี่ยน overlay เป็น menu และใช้ items */}
          <Dropdown menu={{ items: requestMenuItems }} trigger={['click']} placement="bottomRight">
            <Button type="primary" icon={<FormOutlined />}>
              <Space>
                คำร้อง
              </Space>
            </Button>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default QAHeader;