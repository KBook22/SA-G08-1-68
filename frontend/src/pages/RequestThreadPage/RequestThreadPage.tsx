// src/pages/Admin2/RequestsPage.tsx
import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Space, Modal, message, Descriptions, Input, Avatar, Card, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import type { RequestTicket } from '../../types';
import './RequestThreadPage.css';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const API_URL = 'http://localhost:8080/api';

const RequestsPage: React.FC = () => {
    const [tickets, setTickets] = useState<RequestTicket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<RequestTicket | null>(null);
    const [replyMessage, setReplyMessage] = useState('');

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/tickets`);
            if (!response.ok) throw new Error('Failed to fetch tickets');
            const data: RequestTicket[] = await response.json();
            setTickets(data);
        } catch (error) {
            console.error(error);
            message.error('ไม่สามารถดึงข้อมูลคำร้องได้');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleViewDetails = (ticket: RequestTicket) => {
        setSelectedTicket(ticket);
        setIsModalVisible(true);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
        setReplyMessage('');
        setSelectedTicket(null);
    };

    const handleSendReply = async () => {
        if (!replyMessage.trim() || !selectedTicket) {
            message.error('กรุณาพิมพ์ข้อความตอบกลับ');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/tickets/${selectedTicket.ID}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: replyMessage, is_staff_reply: true }),
            });
            if (!response.ok) throw new Error((await response.json()).error || 'Failed to send reply');
            
            message.success(`ตอบกลับคำร้อง "${selectedTicket.subject}" สำเร็จ!`);
            setReplyMessage('');
            fetchTickets(); // โหลดข้อมูลใหม่เพื่ออัปเดตตาราง
            
            // โหลดข้อมูล ticket ที่เลือกอยู่ใหม่เพื่ออัปเดต modal
            const updatedTicketResponse = await fetch(`${API_URL}/tickets/${selectedTicket.ID}`);
            const updatedTicketData = await updatedTicketResponse.json();
            setSelectedTicket(updatedTicketData);

        } catch (error) {
            console.error('Error sending reply:', error);
            message.error('เกิดข้อผิดพลาดในการส่งข้อความตอบกลับ');
        }
    };
    
    const formatTime = (ts?: string) => ts ? new Date(ts).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : '';

    const columns: ColumnsType<RequestTicket> = [
        { title: 'เวลาที่ส่ง', dataIndex: 'CreatedAt', key: 'CreatedAt', render: formatTime, sorter: (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime(), defaultSortOrder: 'ascend' },
        { title: 'หัวข้อเรื่อง', dataIndex: 'subject', key: 'subject', ellipsis: true },
        { title: 'ผู้ส่ง', key: 'author', render: (_, record) => <Space><Avatar size="small" icon={<UserOutlined />} />{record.user?.username || 'N/A'}</Space> },
        { title: 'สถานะ', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'Open' ? 'warning' : 'success'}>{status}</Tag> },
        { title: 'การดำเนินการ', key: 'action', render: (_, record) => <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(record)}>ตรวจสอบ</Button> },
    ];

    const allMessages = selectedTicket ? [
        { ID: `initial-${selectedTicket.ID}`, author: selectedTicket.user, message: selectedTicket.initial_message, is_staff_reply: false, CreatedAt: selectedTicket.CreatedAt },
        ...(selectedTicket.replies || [])
    ] : [];

    return (
        <div>
            <Title level={2}>จัดการคำร้อง</Title>
            <Table columns={columns} dataSource={tickets} rowKey="ID" loading={loading} />

            <Modal
                title={`สอบถามเรื่อง: ${selectedTicket?.subject}`}
                open={isModalVisible}
                onCancel={handleCancelModal}
                width={800}
                footer={null}
                className="ticket-modal"
            >
                {selectedTicket && (
                    <>
                        <Descriptions bordered column={1} size="small" className="ticket-descriptions">
                            <Descriptions.Item label="ผู้ส่งคำร้อง">{selectedTicket.user?.username || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="อีเมล">somchai@email.com (ตัวอย่าง)</Descriptions.Item>
                            <Descriptions.Item label="เบอร์โทร">082-345-6789 (ตัวอย่าง)</Descriptions.Item>
                            <Descriptions.Item label="สถานะ"><Tag color={selectedTicket.status === 'Open' ? 'warning' : 'success'}>{selectedTicket.status}</Tag></Descriptions.Item>
                            <Descriptions.Item label="วันที่ส่ง">{formatTime(selectedTicket.CreatedAt)}</Descriptions.Item>
                        </Descriptions>
                        
                        <Title level={5} style={{ marginTop: '24px' }}>รายละเอียดคำร้อง</Title>
                        <Paragraph className="initial-message-box">
                            {selectedTicket.initial_message}
                        </Paragraph>

                        <Title level={5} style={{ marginTop: '24px' }}>การตอบกลับ</Title>
                        <div className="conversation-history">
                            {allMessages.slice(1).map((msg: any) => (
                                <div key={msg.ID} className={`history-entry ${msg.is_staff_reply ? 'staff-reply' : 'user-reply'}`}>
                                    <div className="entry-header">
                                        <Text strong>{msg.author?.username || 'Unknown'}</Text>
                                        {msg.is_staff_reply && <Tag color="blue">เจ้าหน้าที่</Tag>}
                                        <Text type="secondary" className="entry-timestamp">{formatTime(msg.CreatedAt)}</Text>
                                    </div>
                                    <div className="entry-body">
                                        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</Paragraph>
                                    </div>
                                </div>
                            ))}
                            {allMessages.length <= 1 && <Text type="secondary">ยังไม่มีการตอบกลับ...</Text>}
                        </div>

                        <Divider />
                        
                        <div className="reply-section">
                             <Title level={5}>ตอบกลับ</Title>
                             <TextArea
                                rows={4}
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="พิมพ์คำตอบในฐานะเจ้าหน้าที่..."
                            />
                            <Button
                                type="primary"
                                onClick={handleSendReply}
                                style={{ marginTop: '16px' }}
                                icon={<EditOutlined />}
                            >
                                ส่งตอบกลับ
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default RequestsPage;