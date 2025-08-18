import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  List,
  Tabs,
  Space,
  Progress,
  Rate,
  Flex,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../App.css";

const { Title, Text, Paragraph } = Typography;

const mockProfileData = {
  name: "พนิดา โ.",
  details:
    "นักศึกษาวิศวกรรมคอมพิวเตอร์ ชั้นปีที่ 3 มหาวิทยาลัยเทคโนโลยีสุรนารี",
  experience: "มีประสบการณ์ทำงานพาร์ทไทม์ในร้านกาแฟและร้านอาหาร",
  rating: 4.8,
  reviews: [
    {
      id: 1,
      reviewer: "ร้านยายสา",
      date: "18 พฤษภาคม 2568 เวลา 18:22 น.",
      comment: "ช่วยยายได้เยอะมากค่ะ น้องทำงานได้ดีมาก",
      rating: 5,
    },
    {
      id: 2,
      reviewer: "Late Night Cafe",
      date: "3 มิถุนายน 2568 เวลา 22:31 น.",
      comment: "สู้งานมากครับ พี่ชอบที่น้องมีความรับผิดชอบ",
      rating: 5,
    },
    {
      id: 3,
      reviewer: "Pop Cafe",
      date: "7 กรกฎาคม 2568 เวลา 11:45 น.",
      comment: "",
      rating: 4,
    },
    {
      id: 4,
      reviewer: "Lahui Malatang",
      date: "22 กรกฎาคม 2568 เวลา 18:26 น.",
      comment: "น้องทำงานเก่งมากค่ะ พี่ไม่ต้องทำอะไรเยอะเลย",
      rating: 5,
    },
  ],
};

const mockPosts = [
  { id: 1, title: "หางานร้านกาแฟ", date: "10 กรกฎาคม 2568" },
  { id: 2, title: "หางานพาร์ทไทม์", date: "12 กรกฎาคม 2568" },
];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("reviews");

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabsContent = {
    reviews: (
      <List
        itemLayout="horizontal"
        dataSource={mockProfileData.reviews.sort((a, b) => b.id - a.id)}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space>
                      <Text style={{ fontSize: "14px", color: "#1E3A5F" }}>
                        {item.reviewer}
                      </Text>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: "12px",
                          color: "#1E3A5F",
                          fontWeight: "normal",
                        }}
                      >
                        {item.date}
                      </Text>
                    </Space>
                  </Col>
                  <Col>
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={item.rating}
                      style={{ color: "#0088FF" }}
                    />
                  </Col>
                </Row>
              }
              description={
                item.comment ? (
                  <Text style={{ fontSize: "14px", color: "#1E3A5F" }}>
                    {item.comment}
                  </Text>
                ) : null
              }
            />
          </List.Item>
        )}
      />
    ),
    posts: (
      <List
        itemLayout="horizontal"
        dataSource={mockPosts.sort((a, b) => b.id - a.id)}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link
                  to={`/post/${item.id}`}
                  style={{ color: "#1E3A5F", fontWeight: "bold" }}
                >
                  {item.title}
                </Link>
              }
              description={
                <Text style={{ fontSize: "12px", color: "#1E3A5F" }}>{item.date}</Text>
              }
            />
          </List.Item>
        )}
      />
    ),
  };

  const tabsItems = [
    {
      label: "รีวิวการทำงาน",
      key: "reviews",
      children: tabsContent.reviews,
    },
    {
      label: "ประวัติการโพสต์",
      key: "posts",
      children: tabsContent.posts,
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, minHeight: "85vh" }}>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: 24, color: "#1E3A5F" }}
      >
        โปรไฟล์
      </Title>

      <Card
        className="profile-card"
        style={{
          width: "100%",
          marginBottom: "24px",
          border: "none",
          boxShadow: "none",
        }}
        bordered={false}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col style={{ textAlign: "center" }}>
            <Avatar size={128} icon={<UserOutlined />} />
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0, color: "#1E3A5F" }}>
              {mockProfileData.name}
            </Title>
            <Paragraph style={{ margin: "4px 0 0", color: "#1E3A5F" }}>
              {mockProfileData.details}
            </Paragraph>
            <Paragraph type="secondary" style={{ margin: 0, color: "#1E3A5F" }}>
              {mockProfileData.experience}
            </Paragraph>
          </Col>
          <Col flex="auto" style={{ maxWidth: "200px" }}>
            <Progress
              percent={(mockProfileData.rating / 5) * 100}
              showInfo={false}
              strokeColor="#0088FF"
            />
            <Flex justify="center">
              <Text style={{ color: "#1E3A5F" }}>
                ระดับคะแนน: {mockProfileData.rating.toFixed(1)}/5.0
              </Text>
            </Flex>
          </Col>
        </Row>
      </Card>

      <Card
        className="reviews-card"
        style={{ width: "100%" }}
        bodyStyle={{ padding: 0 }}
      >
        <Tabs
          activeKey={activeTab}
          items={tabsItems}
          onChange={onTabChange}
          style={{ padding: "0 24px" }}
        />
      </Card>
    </div>
  );
};

export default ProfilePage;