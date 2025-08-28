// src/pages/Admin2/ManageFaqPage.tsx
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, message, Typography, Popconfirm, Card, Tooltip, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FAQ } from '../../types';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const API_URL = 'http://localhost:8080/api';

const ManageFaqPage: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [form] = Form.useForm();

    const fetchFaqs = async () => {
        try {
            const response = await fetch(`${API_URL}/faqs`);
            if (!response.ok) throw new Error('Failed to fetch FAQs');
            const data: FAQ[] = await response.json();
            setFaqs(data);
        } catch (error) {
            console.error("Failed to fetch FAQs:", error);
            message.error('ไม่สามารถดึงข้อมูล FAQ ได้');
        }
    };
    
    useEffect(() => {
        fetchFaqs();
    }, []);

    const showFaqModal = (faq?: FAQ) => {
        if (faq) {
            setEditingFaq(faq);
            form.setFieldsValue({ title: faq.title, answer: faq.content });
        } else {
            setEditingFaq(null);
            form.resetFields();
        }
        setIsFaqModalVisible(true);
    };

    const handleCancel = () => {
        setIsFaqModalVisible(false);
    };

    const onFinishFaq = async (values: { title: string; answer: string }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                message.error('ไม่พบ Token สำหรับยืนยันตัวตน กรุณาเข้าสู่ระบบใหม่');
                return;
            }

            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            let response;
            const url = editingFaq 
                ? `${API_URL}/admin/faqs/${editingFaq.ID}` 
                : `${API_URL}/admin/faqs`;
            
            const method = editingFaq ? 'PUT' : 'POST';
            
            const payload = {
                title: values.title,
                content: values.answer,
            };

            response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(payload),
            });
                
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save FAQ');
            }
                
            message.success(editingFaq ? 'แก้ไข FAQ สำเร็จ!' : 'สร้าง FAQ ใหม่สำเร็จ!');
            fetchFaqs(); // Refresh data after success
            setIsFaqModalVisible(false);

        } catch (error) {
            console.error('Error in onFinishFaq:', error);
            const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
            message.error(errorMessage);
        }
    };

    const handleDeleteFaq = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                message.error('ไม่พบ Token สำหรับยืนยันตัวตน');
                return;
            }

            const response = await fetch(`${API_URL}/admin/faqs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to delete FAQ');
            }
            
            message.success("ลบ FAQ สำเร็จ!");
            fetchFaqs(); // Refresh data
        } catch (error) {
            message.error('เกิดข้อผิดพลาดในการลบ');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>จัดการคำถามที่พบบ่อย (FAQ)</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showFaqModal()}>
                    เพิ่ม FAQ ใหม่
                </Button>
            </div>

            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {faqs.map(item => (
                    <Card
                        key={item.ID}
                        title={item.title}
                        actions={[
                            <Tooltip title="แก้ไข FAQ">
                                <Button icon={<EditOutlined />} onClick={() => showFaqModal(item)} type="text" />
                            </Tooltip>,
                            <Popconfirm title="ต้องการลบ FAQ นี้?" onConfirm={() => handleDeleteFaq(item.ID)} okText="ใช่" cancelText="ไม่">
                                <Tooltip title="ลบ FAQ">
                                    <Button danger icon={<DeleteOutlined />} type="text" />
                                </Tooltip>
                            </Popconfirm>,
                        ]}
                    >
                        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'ดูเพิ่มเติม' }}>
                            {item.content || 'ยังไม่มีคำตอบ'}
                        </Paragraph>
                    </Card>
                ))}
                {faqs.length === 0 && (
                    <Card style={{ textAlign: 'center' }}>
                        <Typography.Text type="secondary">ยังไม่มีคำถามที่พบบ่อยในระบบ</Typography.Text>
                    </Card>
                )}
            </Space>

            <Modal title={editingFaq ? 'แก้ไข FAQ' : 'สร้าง FAQ ใหม่'} open={isFaqModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={onFinishFaq}>
                    <Form.Item
                        name="title"
                        label="หัวข้อคำถาม"
                        rules={[{ required: true, message: 'กรุณาระบุหัวข้อคำถาม' }]}
                    >
                        <Input placeholder="พิมพ์หัวข้อคำถาม..." />
                    </Form.Item>
                    <Form.Item
                        name="answer"
                        label="คำตอบ"
                        rules={[{ required: true, message: 'กรุณาระบุคำตอบ' }]}
                    >
                        <TextArea rows={4} placeholder="พิมพ์คำตอบ..." />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={handleCancel}>ยกเลิก</Button>
                            <Button type="primary" htmlType="submit">
                                {editingFaq ? 'บันทึกการแก้ไข' : 'สร้าง FAQ'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageFaqPage;