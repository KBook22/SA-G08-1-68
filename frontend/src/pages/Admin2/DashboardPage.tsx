import React from 'react';
import { Row, Col, Card, Statistic, Typography, Button, List, Avatar, Tag, Space } from 'antd';
import {
  QuestionCircleOutlined,
  FlagOutlined,
  UserOutlined,
  FileTextOutlined,
  PlusOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';
import { Column } from '@ant-design/charts';

const { Title, Text } = Typography;

// Mock Data
const stats = {
  pendingRequests: 5,
  pendingReports: 2,
  totalUsers: 152,
  totalJobs: 78,
};

const recentActivities = [
    { id: 1, type: 'new_user', text: 'ผู้ใช้ใหม่ "สมชาย ใจดี" ได้ลงทะเบียน', time: '5 นาทีที่แล้ว', user: 'สมชาย ใจดี' },
    { id: 2, type: 'new_report', text: 'มีรายงานใหม่สำหรับโพสต์ #1024', time: '10 นาทีที่แล้ว', user: 'แอดมิน' },
    { id: 3, type: 'new_job', text: '"บริษัท Tech จำกัด" ได้โพสต์งานใหม่', time: '30 นาทีที่แล้ว', user: 'Tech จำกัด' },
    { id: 4, type: 'new_request', text: 'มีคำร้องใหม่จาก "วิชัย"', time: '1 ชั่วโมงที่แล้ว', user: 'วิชัย' },
];

const userGrowthData = [
    { month: 'เม.ย.', value: 80 }, { month: 'พ.ค.', value: 95 }, { month: 'มิ.ย.', value: 110 },
    { month: 'ก.ค.', value: 125 }, { month: 'ส.ค.', value: 152 },
];


const DashboardPage: React.FC = () => {
  const chartConfig = {
    data: userGrowthData,
    xField: 'month',
    yField: 'value',
    label: { position: 'middle' as const, style: { fill: '#FFFFFF', opacity: 0.6 } },
    xAxis: { label: { autoHide: true, autoRotate: false } },
    meta: { month: { alias: 'เดือน' }, value: { alias: 'ผู้ใช้' } },
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Dashboard ภาพรวมระบบ</Title>
      <Row gutter={[24, 24]}>
        {/* Stat Cards */}
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="ผู้ใช้งานทั้งหมด" value={stats.totalUsers} prefix={<UserOutlined />} suffix={<><ArrowUpOutlined /> 2%</>} valueStyle={{ color: '#3f8600' }}/>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="โพสต์งานทั้งหมด" value={stats.totalJobs} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="คำร้องรอตรวจสอบ" value={stats.pendingRequests} prefix={<QuestionCircleOutlined />} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="โพสต์ที่ถูกรายงาน" value={stats.pendingReports} prefix={<FlagOutlined />} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>

        {/* User Growth Chart */}
        <Col xs={24} lg={16}>
            <Card title="อัตราการเติบโตของผู้ใช้งาน (รายเดือน)">
                <Column {...chartConfig} height={300} />
            </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={8}>
          <Card title="กิจกรรมล่าสุด">
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={<a href="#">{item.text}</a>}
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;