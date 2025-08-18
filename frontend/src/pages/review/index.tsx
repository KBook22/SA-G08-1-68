import React, { useState } from "react";
import {
  Typography,
  Card,
  Rate,
  Input,
  Button,
  Space,
  Flex,
} from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ReviewPage: React.FC = () => {
  const [rating, setRating] = useState<number>(1);

  return (
    <div style={{ background: '#fff', padding: 24, minHeight: '85vh' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24, color: "#1E3A5F" }}>
          รายการรีวิว
        </Title>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Flex style={{ marginBottom: 24 }}>
                <Text
                    type="secondary"
                    style={{ fontSize: "20px", color: "#1E3A5F" }}
                >
                    รหัสงาน : 10001
                </Text>
            </Flex>

          <Card
            className="review-section"
            style={{ marginBottom: 24 }}
          >
            <Flex vertical align="center" gap="middle">
              <Text strong style={{ fontSize: "20px", color: "#1E3A5F" }}>
                ให้คะแนนการทำงานกับนักศึกษาที่คุณจ้าง
              </Text>
              <Rate
                onChange={setRating}
                value={rating}
                style={{ fontSize: 48, color: "#0088FF" }}
              />
              <Flex
                justify="space-between"
                style={{ width: "45%", color: "#1E3A5F" }}
              >
                <Text type="secondary" style={{ color: "#1E3A5F" }}>
                  แย่ที่สุด
                </Text>
                <Text type="secondary" style={{ color: "#1E3A5F" }}>
                  ยอดเยี่ยมที่สุด
                </Text>
              </Flex>
            </Flex>
          </Card>

          <Card
            className="review-section"
            style={{ border: 'none', boxShadow: 'none' }}
            bodyStyle={{padding: 0}}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Flex vertical align="center" gap="middle">
                <Text strong style={{ fontSize: "20px", color: "#1E3A5F" }}>
                  บอกเล่าประสบการณ์ที่คุณได้รับกับเรา
                </Text>
              </Flex>
              <TextArea
                style={{
                  fontSize: "16px",
                  color: "#1E3A5F",
                  backgroundColor: "#E4F2FD",
                }}
                rows={10}
                placeholder="พิมพ์ข้อความรีวิวของคุณที่นี่..."
              />
            </Space>
          </Card>

          <Flex justify="center" style={{ marginTop: "24px" }}>
            <Button
              type="primary"
              size="large"
              className="review-section middle-width-button"
            >
              ส่งรีวิว
            </Button>
          </Flex>
        </div>
    </div>
  );
};

export default ReviewPage;