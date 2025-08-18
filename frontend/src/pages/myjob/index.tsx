import React from "react";
import { Typography, Flex, Button, Space, Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import lahuiLogo from '../../assets/lahui.svg';

const { Title, Text } = Typography;

interface Job {
  id: number;
  isPlaceholder: boolean;
  logo?: string;
  title?: string;
  company?: string;
  status?: string;
}

const jobsData: Job[] = [
  {
    id: 1,
    isPlaceholder: false,
    logo: lahuiLogo,
    title: "งานหาพนักงานพาร์ทไทม์",
    company: "ร้านล่าฮุยหม่าล่าทัง LAHUI MALATANG",
    status: "กำลังดำเนินการ",
  },
  { id: 2, isPlaceholder: true },
  { id: 3, isPlaceholder: true },
  { id: 4, isPlaceholder: true },
];

const PlaceholderBlock: React.FC<{
  width: string;
  height: string;
  margin?: string;
}> = ({ width, height, margin }) => (
  <div
    style={{
      backgroundColor: "#EAEAEA",
      width,
      height,
      borderRadius: "4px",
      margin,
    }}
  />
);

const JobCard: React.FC<Job> = ({
  isPlaceholder,
  logo,
  title,
  company,
  status,
}) => {
  if (isPlaceholder) {
    return (
      <Card className="job-card" style={{ marginBottom: "16px" }}>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="middle" style={{ flex: "2 1 0%" }}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              className="placeholder-avatar"
            />
            <div>
              <PlaceholderBlock
                width="200px"
                height="22px"
                margin="0 0 8px 0"
              />
              <PlaceholderBlock width="120px" height="18px" />
            </div>
          </Flex>
          <Flex justify="center" style={{ flex: "1 1 0%" }}>
            <PlaceholderBlock width="100px" height="20px" />
          </Flex>
          <Flex justify="flex-end" style={{ flex: "1 1 0%" }}>
            <Space>
              <div
                className="placeholder-button-default"
                style={{
                  width: "60px",
                  height: "32px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "6px",
                }}
              ></div>
              <div
                className="placeholder-button-primary"
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: "#d9d9d9",
                  borderRadius: "6px",
                }}
              ></div>
            </Space>
          </Flex>
        </Flex>
      </Card>
    );
  }

  return (
    <Card hoverable className="job-card" style={{ marginBottom: "16px" }}>
      <Flex justify="space-between" align="center" wrap="wrap">
        <Flex
          align="center"
          gap="middle"
          style={{ flex: "2 1 250px", minWidth: "250px" }}
        >
          <Avatar src={logo} shape="square" size={64} />
          <div>
            <Text strong style={{ fontSize: "16px" }}>
              {title}
            </Text>
            <br />
            <Text type="secondary">{company}</Text>
          </div>
        </Flex>
        <Flex
          justify="center"
          align="center"
          style={{ flex: "1 1 150px", margin: "10px 0" }}
        >
          <Text>{status}</Text>
        </Flex>
        <Flex justify="flex-end" align="center" style={{ flex: "1 1 200px" }}>
          <Space>
            <Link to="/review">
              <Button size="middle">
                รีวิว
              </Button>
            </Link>
            <Link to="/payment">
              <Button type="primary" size="middle">
                ชำระเงิน
              </Button>
            </Link>
          </Space>
        </Flex>
      </Flex>
    </Card>
  );
};

const MyJobPage: React.FC = () => (
  <div style={{ background: '#fff', padding: 24, minHeight: '85vh' }}>
    <Title level={2} style={{ textAlign: 'center', marginBottom: 24, color: "#1E3A5F" }}>
      งาน
    </Title>
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {jobsData.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </Space>
  </div>
);

export default MyJobPage;