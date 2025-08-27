import React, { useState } from "react";
import {
  List,
  Typography,
  Flex,
  Button,
  Tag,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import './paymentreport.css';

const { Title, Text } = Typography;

interface PaymentRecord {
  id: number;
  title: string;
  requester: string;
  method: "QR Promptpay" | "Mobile Banking";
  proofFile: string;
  status: "completed" | "pending";
  timestamp?: string;
}

const initialData: PaymentRecord[] = [
  {
    id: 1,
    title: "งานเขียนโปรแกรม ComPro II",
    requester: "คุณพนิดา โ.",
    method: "QR Promptpay",
    proofFile: "IMG8528.png",
    status: "pending",
  },
  {
    id: 2,
    title: "งานหาพนักงานพาร์ทไทม์",
    requester: "คุณพนิดา โ.",
    method: "QR Promptpay",
    proofFile: "IMG3654.png",
    status: "completed",
    timestamp: "22 กรกฎาคม 2568 เวลา 18:26 น.",
  },
  {
    id: 3,
    title: "งานวาดรูปวอลเปเปอร์มือถือ",
    requester: "คุณพนิดา โ.",
    method: "Mobile Banking",
    proofFile: "IMG26544.jpeg",
    status: "completed",
    timestamp: "7 กรกฎาคม 2568 เวลา 11:45 น.",
  },
];

const PaymentReportPage: React.FC = () => {
  const [data] = useState<PaymentRecord[]>(initialData);

  return (
    <div style={{ background: '#fff', padding: 24, minHeight: '85vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24, color: "#1E3A5F" }}>
        รายงานการชำระเงิน
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => {
          const record = item as PaymentRecord;
          return (
            <List.Item
              style={{
                backgroundColor: "#ffffff",
                marginBottom: 16,
                padding: "20px 24px",
                borderRadius: 8,
                border: '1px solid #f0f0f0'
              }}
            >
              <Flex
                justify="space-between"
                align="center"
                style={{ width: "100%" }}
              >
                <Flex vertical style={{ flex: 2.5 }}>
                  <Text
                    strong
                    style={{ color: "#00529B", fontSize: "1.2rem" }}
                  >
                    {record.title}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ color: "#00529B", fontSize: "0.9rem" }}
                  >
                    {record.requester}
                  </Text>
                </Flex>
                <Text
                  style={{ flex: 1.5, fontSize: "1.0rem", color: "#00529B" }}
                >
                  {record.method}
                </Text>
                <Text
                  style={{ flex: 1.55, fontSize: "1.0rem", color: "#00529B" }}
                >
                  {record.proofFile}
                </Text>
                <Flex
                  style={{ flex: 2, fontSize: "1.0rem", color: "#00529B" }}
                >
                  {record.status === "pending" ? (
                    <Tag color="warning">รอตรวจสอบ</Tag>
                  ) : (
                    <Text
                      type="secondary"
                      style={{
                        flex: 2,
                        fontSize: "0.8rem",
                        color: "#c7c9cA",
                      }}
                    >
                      {record.timestamp}
                    </Text>
                  )}
                </Flex>
                <Button
                  type="text"
                  icon={
                    <DownloadOutlined
                      style={{ fontSize: 24, color: record.status === "pending" ? "#c7c9cA" : "#00529B" }}
                    />
                  }
                  disabled={record.status === "pending"}
                />
              </Flex>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default PaymentReportPage;