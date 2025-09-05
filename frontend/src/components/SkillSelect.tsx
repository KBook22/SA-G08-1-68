import React, { useState, useEffect } from 'react';
import { Select, Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Skill {
  id: number;
  name: string;
}

interface SkillSelectProps {
  value?: string[];
  onChange?: (skills: string[]) => void;
  placeholder?: string;
}

const SkillSelect: React.FC<SkillSelectProps> = ({
  value = [],
  onChange,
  placeholder = "เลือกทักษะ..."
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // ✅ ดึงข้อมูล Skills (แก้ไข URL และเพิ่ม error handling)
  const fetchSkills = async (search?: string) => {
    try {
      setLoading(true);
      const params = search ? `?search=${encodeURIComponent(search)}` : '';
      
      // ✅ ใช้ absolute URL แทน relative path
      const response = await fetch(`http://localhost:8080/api/skills${params}`);
      
      // ✅ ตรวจสอบ HTTP status
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // ✅ ตรวจสอบว่า response เป็น JSON หรือไม่
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Response is not JSON:', textResponse);
        throw new Error('Server response is not JSON');
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setSkills(data.data);
      } else {
        console.error('API response structure is incorrect:', data);
        throw new Error(data.message || 'Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      message.error('ไม่สามารถโหลดรายการทักษะได้ กรุณาตรวจสอบการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ✅ เพิ่มทักษะใหม่ (แก้ไข URL และเพิ่ม error handling)
  const handleAddSkill = async (values: any) => {
    try {
      // ✅ ใช้ absolute URL แทน relative path
      const response = await fetch('http://localhost:8080/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skill_name: values.skill_name })
      });

      // ✅ ตรวจสอบ HTTP status
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // ✅ ตรวจสอบว่า response เป็น JSON หรือไม่
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Response is not JSON:', textResponse);
        throw new Error('Server response is not JSON');
      }

      const data = await response.json();
      
      if (data.success) {
        message.success(
          data.data.is_new 
            ? 'เพิ่มทักษะใหม่สำเร็จ!' 
            : 'ทักษะนี้มีอยู่แล้ว และได้เพิ่มให้คุณแล้ว'
        );
        
        // เพิ่มลงใน selection
        const newSkillName = values.skill_name;
        if (!value.includes(newSkillName)) {
          const updatedSkills = [...value, newSkillName];
          onChange?.(updatedSkills);
        }
        
        // Refresh skills list
        fetchSkills();
        
        setIsModalVisible(false);
        form.resetFields();
      } else {
        throw new Error(data.message || 'เกิดข้อผิดพลาดในการเพิ่มทักษะ');
      }
    } catch (error: any) {
      console.error('Error adding skill:', error);
      message.error(error.message || 'เกิดข้อผิดพลาดในการเพิ่มทักษะ');
    }
  };

  return (
    <>
      <Select
        mode="tags"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onSearch={fetchSkills}
        loading={loading}
        style={{ width: '100%' }}
        showSearch
        filterOption={false}
        notFoundContent={loading ? 'กำลังโหลด...' : 'ไม่พบทักษะที่ค้นหา'}
        dropdownRender={(menu) => (
          <>
            {menu}
            <div style={{ 
              padding: '8px', 
              borderTop: '1px solid #f0f0f0',
              textAlign: 'center' 
            }}>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                style={{ width: '100%' }}
              >
                เพิ่มทักษะใหม่
              </Button>
            </div>
          </>
        )}
      >
        {skills.map(skill => (
          <Option key={skill.id} value={skill.name}>
            {skill.name}
          </Option>
        ))}
      </Select>

      {/* Modal เพิ่มทักษะ */}
      <Modal
        title="เพิ่มทักษะใหม่"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={400}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={handleAddSkill} layout="vertical">
          <Form.Item
            label="ชื่อทักษะ"
            name="skill_name"
            rules={[
              { required: true, message: 'กรุณาใส่ชื่อทักษะ' },
              { min: 2, message: 'ชื่อทักษะอย่างน้อย 2 ตัวอักษร' },
              { max: 100, message: 'ชื่อทักษะไม่เกิน 100 ตัวอักษร' }
            ]}
          >
            <Input placeholder="เช่น React, Digital Marketing" />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button 
              onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}
              style={{ marginRight: '8px' }}
            >
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit">
              เพิ่ม
            </Button>
          </div>
        </Form>

        {/* ✅ เพิ่ม Note สำหรับ Debugging */}
        <div style={{ 
          marginTop: '16px', 
          padding: '8px', 
          backgroundColor: '#f6ffed', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#666'
        }}>
          💡 หมายเหตุ: หากเกิดปัญหา กรุณาตรวจสอบว่า Backend Server รันอยู่ที่ http://localhost:8080
        </div>
      </Modal>
    </>
  );
};

export default SkillSelect;
