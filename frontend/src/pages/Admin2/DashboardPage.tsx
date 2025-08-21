import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { QuestionCircleOutlined, FlagOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  // สมมติว่านี่คือข้อมูลที่ดึงมาจาก State หรือ API
  const stats = {
    pendingRequests: 5,
    pendingReports: 2,
    totalUsers: 150,
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="dashboard-stat-card">
            <Statistic
              title="คำร้องที่รอตรวจสอบ"
              value={stats.pendingRequests}
              prefix={<QuestionCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="dashboard-stat-card">
            <Statistic
              title="โพสต์ที่ถูกรายงาน"
              value={stats.pendingReports}
              prefix={<FlagOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="dashboard-stat-card">
            <Statistic
              title="ผู้ใช้งานทั้งหมด"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;