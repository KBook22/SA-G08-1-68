// src/pages/StudentPost/StudentPostForm.tsx
import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Typography,
  Row,
  Col,
  Divider,
  Upload,
} from 'antd';
import { 
  RocketOutlined, 
  SolutionOutlined, 
  UploadOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { createStudentProfilePost } from '../../services/studentPostService';
import { useAuth } from '../../context/AuthContext';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface StudentPostFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const StudentPostForm: React.FC<StudentPostFormProps> = ({ onSuccess, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { user, token } = useAuth();

  const onFinish = async (values: any) => {
    if (!user) {
      message.error('กรุณาเข้าสู่ระบบก่อนสร้างโพสต์');
      return;
    }

    setLoading(true);
    try {
      await createStudentProfilePost({
        ...values,
        portfolio_url: values.portfolio_url || "",
        file_url: values.file_url || "", 
      });
      message.success('สร้างโพสต์ของคุณสำเร็จแล้ว!');
      onSuccess();
    } catch (error: any) {
      console.error('Failed to create post:', error);
      message.error(error.message || 'เกิดข้อผิดพลาดในการสร้างโพสต์');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'http://localhost:8080/api/upload',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    maxCount: 1,
    fileList,
    onChange(info) {
      setFileList(info.fileList);
      if (info.file.status === 'done') {
        message.success(`${info.file.name} อัปโหลดสำเร็จ`);
        form.setFieldsValue({ file_url: info.file.response.url }); 
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} อัปโหลดไม่สำเร็จ`);
      }
    },
    onRemove() {
        form.setFieldsValue({ file_url: null });
        setFileList([]);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="large">
      <Title level={4} style={{ textAlign: 'center' }}>
        <RocketOutlined /> สร้างโพสต์หางานใหม่
      </Title>
      <Divider />
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="title" label="หัวข้อโพสต์" rules={[{ required: true, message: 'กรุณากรอกหัวข้อโพสต์' }]}>
            <Input placeholder="เช่น: 'นักพัฒนา React ตามหางาน Part-time'" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="job_type" label="ประเภทงานที่มองหา" rules={[{ required: true, message: 'กรุณาเลือกประเภทงาน' }]}>
            <Select placeholder="เลือกประเภทงาน">
              <Option value="งานประจำ">งานประจำ</Option>
              <Option value="งานพาร์ทไทม์">งานพาร์ทไทม์</Option>
              <Option value="ฟรีแลนซ์">ฟรีแลนซ์</Option>
              <Option value="ฝึกงาน">ฝึกงาน</Option>
              <Option value="งานชั่วคราว">งานชั่วคราว</Option>
              <Option value="งานโครงการ">งานโครงการ</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="year" label="ชั้นปี">
            <Input placeholder="เช่น ปีที่ 3" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="introduction" label="แนะนำตัวเองสั้นๆ">
            <TextArea rows={3} placeholder="แนะนำตัว, เป้าหมาย, หรือสิ่งที่น่าสนใจเกี่ยวกับคุณ" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="skills" label="ทักษะ (คั่นด้วยเครื่องหมาย ,)" rules={[{ required: true, message: 'กรุณาระบุทักษะของคุณ' }]}>
            <Input placeholder="เช่น React, TypeScript, Figma, Go" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
            <Form.Item name="portfolio_url" label="แนบลิงก์ผลงาน (ถ้ามี)">
                <Input prefix={<LinkOutlined />} placeholder="URL ของ GitHub, LinkedIn, Behance" />
            </Form.Item>
        </Col>
        <Col xs={24} md={12}>
            <Form.Item label="อัปโหลดไฟล์ (ถ้ามี)">
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} style={{width: '100%'}}>เลือกไฟล์ (Resume, CV, etc.)</Button>
                </Upload>
            </Form.Item>
            <Form.Item name="file_url" hidden>
                <Input />
            </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Form.Item style={{ textAlign: 'right' }}>
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          ยกเลิก
        </Button>
        <Button type="primary" htmlType="submit" loading={loading} icon={<SolutionOutlined />}>
          สร้างโพสต์
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StudentPostForm;