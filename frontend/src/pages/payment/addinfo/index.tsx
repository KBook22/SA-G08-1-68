import React from "react";
import { Form, Input, Button, Card, Typography, message, Select, Flex } from "antd";
import { BankOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

interface BankInfo {
  bankName: string;
  accountNumber: string;
}

const bankOptions = [
  { value: 'kbank', label: 'ธนาคารกสิกรไทย' },
  { value: 'scb', label: 'ธนาคารไทยพาณิชย์' },
  { value: 'bbl', label: 'ธนาคารกรุงเทพ' },
  { value: 'ktb', label: 'ธนาคารกรุงไทย' },
  { value: 'tmb', label: 'ธนาคารทหารไทยธนชาต (ttb)' },
  { value: 'bay', label: 'ธนาคารกรุงศรีอยุธยา' },
];

const AddInfoPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: BankInfo) => {
    console.log("ข้อมูลที่บันทึก:", values);
    message.success("บันทึกข้อมูลบัญชีธนาคารเรียบร้อยแล้ว!");
    form.resetFields();
  };

  return (
    <div
      style={{
        background: '#fff',
        padding: 24,
        minHeight: '85vh',
      }}
    >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          เพิ่มข้อมูลบัญชีธนาคาร
        </Title>
      
        <Flex justify="center">
            <Card style={{ width: 400, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                <BankOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
                <Title level={4} style={{ marginTop: 16 }}>
                    ข้อมูลบัญชีธนาคาร
                </Title>
                </div>
                <Form
                form={form}
                name="add_bank_info"
                onFinish={onFinish}
                layout="vertical"
                >
                <Form.Item
                    name="bankName"
                    label="ชื่อธนาคาร"
                    rules={[{ required: true, message: "กรุณาเลือกชื่อธนาคาร!" }]}
                >
                    <Select placeholder="เลือกชื่อธนาคาร">
                    {bankOptions.map((bank) => (
                        <Option key={bank.value} value={bank.label}>
                        {bank.label}
                        </Option>
                    ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="accountNumber"
                    label="เลขที่บัญชี"
                    rules={[
                    { required: true, message: "กรุณากรอกเลขที่บัญชี!" },
                    { pattern: /^[0-9]+$/, message: "กรุณากรอกเฉพาะตัวเลข!" },
                    ]}
                >
                    <Input placeholder="กรอกเฉพาะตัวเลข" maxLength={16} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                    บันทึกข้อมูล
                    </Button>
                </Form.Item>
                </Form>
            </Card>
        </Flex>
    </div>
  );
};

export default AddInfoPage;