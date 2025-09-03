import React, { useState } from "react";
import {
  Typography,
  Flex,
  Button,
  Divider,
  Collapse,
  Radio,
  Space,
  Avatar,
  Card,
} from "antd";
import {
  UserOutlined,
  QrcodeOutlined,
  BankOutlined,
} from "@ant-design/icons";

import './payment.css';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const DetailRow: React.FC<{
  label: string;
  value: string;
  isBold?: boolean;
}> = ({ label, value, isBold = false }) => (
  <Flex justify="space-between" align="center" style={{ marginBottom: "16px" }}>
    <Text style={{ color: "#595959", fontSize: "16px" }}>{label}</Text>
    <Text strong={isBold} style={{ fontSize: "16px" }}>
      {value}
    </Text>
  </Flex>
);

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("promptpay");
  
  const [paymentData] = useState({
    employer: {
      name: "คุณ ล่า ฮุย หม่าล่าทัง",
      shopName: "ร้านล่า ฮุย หม่าล่าทัง",
      location: "นครราชสีมา"
    },
    jobDetails: {
      StudentName: "คุณพนิดา โ.",
      jobTitle: "งานหาพนักงานพาร์ทไทม์",
      workPeriod: "ทำงาน 21 - 30 มิถุนายน 2568",
      workDays: "10 วัน",
      hoursPerDay: "5 ชั่วโมง",
      hourlyRate: "50 บาท",
      totalAmount: "2,500 บาท"
    },
    payment: {
      serviceCharge: "2,500 บาท",
      discount: "0 บาท",
      totalPayment: "2,500 บาท"
    },
    coupons: {
      available: false,
      message: "ยังไม่มีคูปองส่วนลดที่ใช้ได้"
    }
  });

  return (
    <div style={{ background: '#fff', padding: '24px 32px', minHeight: '85vh' }}>
        <div 
          style={{ 
            maxWidth: "900px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <Title 
              level={2} 
              style={{ 
                margin: 0, 
                color: "#1E3A5F",
                textAlign: "center"
              }}
            >
              รายการชำระเงิน
            </Title>
          </div>

          <Card
            bordered={false}
            style={{ marginBottom: "16px", borderRadius: "8px" }}
            bodyStyle={{ padding: "28px" }}
          >
            <Flex align="center" gap="middle">
              <Avatar
                size={64}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff" }}
              />
              <Flex vertical>
                <Text strong style={{ fontSize: "18px", color: "#1E3A5F" }}>
                  {paymentData.employer.name}
                </Text>
                <Text type="secondary" style={{ fontSize: "16px" }}>
                  {paymentData.employer.shopName}, {paymentData.employer.location}
                </Text>
              </Flex>
            </Flex>
          </Card>

          <Card
            bordered={false}
            style={{ marginBottom: "16px", borderRadius: "8px" }}
            bodyStyle={{ padding: "20px" }}
          >
            <Title level={5} style={{ marginBottom: "16px", color: "#1E3A5F" }}>
              รายละเอียดการจ้างงาน
            </Title>
            <Divider style={{ margin: "16px 0" }} />

            <div style={{ marginBottom: "16px" }}>
              <Text strong style={{ fontSize: "15px", color: "#1E3A5F" }}>
                {paymentData.jobDetails.StudentName} ({paymentData.jobDetails.jobTitle})
              </Text>
            </div>

            <DetailRow label={paymentData.jobDetails.workPeriod} value={paymentData.jobDetails.workDays} />
            <DetailRow label="ทำงานวันละ" value={paymentData.jobDetails.hoursPerDay} />
            <DetailRow label="ค่าตอบแทนชั่วโมงละ" value={paymentData.jobDetails.hourlyRate} />

            <Divider style={{ margin: "16px 0" }} />
            <DetailRow label="รวมยอดเงินที่ต้องชำระ" value={paymentData.jobDetails.totalAmount} isBold />
          </Card>

          <Card
            bordered={false}
            style={{ marginBottom: "16px", borderRadius: "8px" }}
            bodyStyle={{ padding: "0" }}
          >
            <Collapse
              ghost
              expandIconPosition="end"
              style={{ backgroundColor: "transparent" }}
            >
              <Panel
                header={
                  <Text strong style={{ fontSize: "15px", color: "#1E3A5F" }}>
                    คูปองส่วนลด
                  </Text>
                }
                key="1"
                style={{ padding: "20px 0" }}
              >
                <div style={{ padding: "0 20px 20px" }}>
                  <Text type="secondary">{paymentData.coupons.message}</Text>
                </div>
              </Panel>
            </Collapse>
          </Card>

          <Card
            bordered={false}
            style={{ marginBottom: "16px", borderRadius: "8px" }}
            bodyStyle={{ padding: "20px" }}
          >
            <Flex
              justify="space-between"
              align="center"
              style={{ marginBottom: "16px" }}
            >
              <Title level={5} style={{ margin: 0, color: "#1E3A5F" }}>
                ช่องทางการชำระเงิน
              </Title>
              <Button type="link" style={{ color: "#1890ff" }}>
                ดูทั้งหมด
              </Button>
            </Flex>
            <Divider style={{ margin: "16px 0" }} />

            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              style={{ width: "100%" }}
            >
              <Flex vertical gap="16px">
                <Radio value="promptpay" style={{ fontSize: "15px" }}>
                  <Space size="middle">
                    <QrcodeOutlined
                      style={{ color: "#52c41a", fontSize: "18px" }}
                    />
                    <span>QR Promptpay</span>
                  </Space>
                </Radio>
                <Radio value="mobile_banking" style={{ fontSize: "15px" }}>
                  <Space size="middle">
                    <BankOutlined
                      style={{ color: "#1890ff", fontSize: "18px" }}
                    />
                    <span>Mobile Banking</span>
                  </Space>
                </Radio>
              </Flex>
            </Radio.Group>
          </Card>

          <Card
            bordered={false}
            style={{ marginBottom: "24px", borderRadius: "8px" }}
            bodyStyle={{ padding: "20px" }}
          >
            <Title level={5} style={{ marginBottom: "16px", color: "#1E3A5F" }}>
              ข้อมูลการชำระเงิน
            </Title>
            <Divider style={{ margin: "16px 0" }} />
            <DetailRow label="ค่าบริการ/งาน" value={paymentData.payment.serviceCharge} />
            <DetailRow label="ส่วนลด" value={paymentData.payment.discount} />
            <Divider style={{ margin: "16px 0" }} />
            <DetailRow label="ยอดชำระเงินทั้งหมด" value={paymentData.payment.totalPayment} isBold />
          </Card>

          <Button
            type="primary"
            size="large"
            block
            style={{
              height: "48px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(24, 144, 255, 0.3)",
            }}
          >
            ชำระเงิน
          </Button>

          <div style={{ height: "24px" }} />
        </div>
    </div>
  );
};

export default PaymentPage;