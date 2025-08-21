import { Form, Input, Button, Radio, Typography, Card, Row, Col } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

interface AskQuestionPageProps {
    onFormSubmit: (values: any) => void;
}

const AskQuestionPage: React.FC<AskQuestionPageProps> = ({ onFormSubmit }) => {
  return (
    <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>แบบฟอร์มรับคำร้อง</Title>
        <Form
            layout="vertical"
            onFinish={onFormSubmit}
            style={{ maxWidth: 800, margin: 'auto' }}
        >
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="ชื่อ" name="name" rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}>
                        <Input placeholder="เช่น สมชาย" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="นามสกุล" name="lastname" rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}>
                        <Input placeholder="ใจดี" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    {/* เพิ่ม pattern rule สำหรับตรวจสอบเบอร์โทร */}
                    <Form.Item
                      label="เบอร์โทร"
                      name="phone"
                      rules={[
                        { required: true, message: 'กรุณากรอกเบอร์โทร' },
                        { pattern: /^0\d{9}$/, message: 'รูปแบบเบอร์โทรไม่ถูกต้อง (ต้องขึ้นต้นด้วย 0 และมี 10 หลัก)' }
                      ]}
                    >
                        <Input placeholder="08xxxxxxxx" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="อีเมล" name="email" rules={[{ required: true, message: 'กรุณากรอกอีเมล' }, { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง'}]}>
                        <Input placeholder="example@mail.com" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="ติดต่อในนามของ" name="contact_type" rules={[{ required: true, message: 'กรุณาเลือกประเภท' }]}>
                        <Radio.Group>
                            <Radio value="ผู้ถูกจ้าง">ผู้ถูกจ้าง</Radio>
                            <Radio value="ผู้ว่าจ้าง">ผู้ว่าจ้าง</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label="หัวข้อเรื่อง" name="title" rules={[{ required: true, message: 'กรุณาระบุหัวข้อ' }]}>
                <Input placeholder="ระบุหัวข้อที่ต้องการติดต่อ" />
            </Form.Item>

            <Form.Item label="รายละเอียด" name="details" rules={[{ required: true, message: 'กรุณาอธิบายรายละเอียด' }]}>
                <TextArea rows={4} placeholder="อธิบายปัญหาหรือคำถามของคุณอย่างละเอียด..." />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" size="large">
                    ส่งคำร้อง
                </Button>
            </Form.Item>
        </Form>
    </Card>
  );
};

export default AskQuestionPage;