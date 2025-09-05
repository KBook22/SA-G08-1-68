// src/pages/RegisterPage/RegisterPage.tsx

import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, message, Select, Row, Col, Divider, DatePicker } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ImageUpload from '../../components/ImageUpload'; // ✅ เพิ่ม import
import './RegisterPage.css';

const { Title, Text } = Typography;
const { Option } = Select;

interface Faculty { ID?: number; id?: number; Name?: string; name?: string }
interface Department { ID?: number; id?: number; Name?: string; name?: string }
interface Gender { ID?: number; id?: number; gender?: string; Gender?: string }

// --- Normalizers: รองรับทั้ง id/ID, name/Name, Gender/gender ---
const normId = (x: any) => (x?.id ?? x?.ID ?? null);
const normName = (x: any) => (x?.name ?? x?.Name ?? '');
const normGender = (x: any) => (x?.gender ?? x?.Gender ?? '');

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [genders, setGenders] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  
  // ✅ เพิ่ม state สำหรับเก็บ URL รูปภาพ
  const [profileImageURL, setProfileImageURL] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genderRes = await fetch('http://localhost:8080/api/genders');
        const genderData = await genderRes.json();
        setGenders(Array.isArray(genderData?.data) ? genderData.data : []);

        const facultyRes = await fetch('http://localhost:8080/api/faculties');
        const facultyData = await facultyRes.json();
        setFaculties(Array.isArray(facultyData?.data) ? facultyData.data : []);
      } catch (error) {
        message.error("ไม่สามารถโหลดข้อมูลเริ่มต้นได้");
      }
    };

    fetchData();
  }, []);

  const handleFacultyChange = async (facultyVal: number | string) => {
    const facultyId = Number(facultyVal);
    setSelectedFaculty(Number.isNaN(facultyId) ? null : facultyId);
    form.setFieldsValue({ department_id: undefined });
    setDepartments([]);

    try {
      const response = await fetch(`http://localhost:8080/api/faculties/${facultyId}/departments`);
      const data = await response.json();
      setDepartments(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      message.error("ไม่สามารถโหลดข้อมูลสาขาวิชาได้");
    }
  };

  const onFinish = async (values: any) => {
    try {
      const response = await fetch('http://localhost:8080/api/register/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phone: values.phone,
          birthday: values.birthday ? dayjs(values.birthday).format("YYYY-MM-DDTHH:mm:ssZ") : null,
          gender_id: values.gender_id,
          faculty: (() => {
            const f = faculties.find((x) => normId(x) === Number(values.faculty_id));
            return f ? normName(f) : undefined;
          })(),
          department: (() => {
            const d = departments.find((x) => normId(x) === Number(values.department_id));
            return d ? normName(d) : undefined;
          })(),
          year: parseInt(values.year, 10),
          gpa: parseFloat(values.gpa),
          // ✅ เพิ่มการส่งข้อมูลรูปภาพ
          profile_image_url: profileImageURL
        }),
      });

      if (response.ok) {
        message.success('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        navigate('/login');
      } else {
        const errorData = await response.json();
        message.error(errorData.error || 'การสมัครสมาชิกผิดพลาด');
      }
    } catch (error) {
      message.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <div className="register-page-container">
      <Card className="register-card-expanded">
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
          สมัครสมาชิกสำหรับนักศึกษา
        </Title>
        
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Divider>ข้อมูลส่วนตัวและการศึกษา</Divider>
          
          {/* ✅ เพิ่มส่วนอัปโหลดรูปภาพ */}
          <Form.Item label="รูปภาพโปรไฟล์">
            <ImageUpload 
              value={profileImageURL}
              onChange={setProfileImageURL}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="ชื่อจริง"
                rules={[{ required: true, message: 'กรุณากรอกชื่อจริง' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="ชื่อจริง" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="นามสกุล"
                rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="นามสกุล" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="อีเมล"
                rules={[
                  { required: true, message: 'กรุณากรอกอีเมล' },
                  { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="อีเมล" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="เบอร์โทรศัพท์"
                rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="เบอร์โทรศัพท์" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="birthday"
                label="วันเกิด"
                rules={[{ required: true, message: 'กรุณาเลือกวันเกิด' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }} 
                  placeholder="เลือกวันเกิด" 
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gender_id"
                label="เพศ"
                rules={[{ required: true, message: 'กรุณาเลือกเพศ' }]}
              >
                <Select placeholder="เลือกเพศ">
                  {genders
                    .map((g) => ({ id: normId(g), gender: normGender(g) }))
                    .filter((g) => g.id != null)
                    .map((g) => (
                      <Option key={g.id} value={g.id}>
                        {g.gender || String(g.id)}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gpa"
                label="เกรดเฉลี่ย (GPA)"
                rules={[{ required: true, message: 'กรุณากรอกเกรดเฉลี่ย' }]}
              >
                <Input placeholder="เกรดเฉลี่ย เช่น 3.25" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="faculty_id"
                label="คณะ"
                rules={[{ required: true, message: 'กรุณาเลือกคณะ' }]}
              >
                <Select placeholder="เลือกคณะ" onChange={handleFacultyChange}>
                  {faculties
                    .map((f) => ({ id: normId(f), name: normName(f) }))
                    .filter((f) => f.id != null)
                    .map((f) => (
                      <Option key={f.id} value={f.id}>
                        {f.name || String(f.id)}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department_id"
                label="สาขาวิชา"
                rules={[{ required: true, message: 'กรุณาเลือกสาขาวิชา' }]}
              >
                <Select placeholder="เลือกสาขาวิชา" disabled={!selectedFaculty}>
                  {departments
                    .map((d) => ({ id: normId(d), name: normName(d) }))
                    .filter((d) => d.id != null)
                    .map((d) => (
                      <Option key={d.id} value={d.id}>
                        {d.name || String(d.id)}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="year"
            label="ชั้นปี"
            rules={[{ required: true, message: 'กรุณาเลือกชั้นปี' }]}
          >
            <Select placeholder="เลือกชั้นปี">
              <Option value="1">ปีที่ 1</Option>
              <Option value="2">ปีที่ 2</Option>
              <Option value="3">ปีที่ 3</Option>
              <Option value="4">ปีที่ 4</Option>
            </Select>
          </Form.Item>

          <Divider>ข้อมูลสำหรับเข้าสู่ระบบ</Divider>

          <Form.Item
            name="username"
            label="ชื่อผู้ใช้"
            rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="ชื่อผู้ใช้" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="รหัสผ่าน"
                rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                label="ยืนยันรหัสผ่าน"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'กรุณายืนยันรหัสผ่าน' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) return Promise.resolve();
                      return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="ยืนยันรหัสผ่าน" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              สมัครสมาชิก
            </Button>
          </Form.Item>

          <div className="register-login-link">
            <Text>มีบัญชีอยู่แล้ว? </Text>
            <Link to="/login">เข้าสู่ระบบ</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
