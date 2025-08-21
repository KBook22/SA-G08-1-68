import React, { useState, useEffect, useRef } from 'react';
import { Table, Tag, Button, Typography, Space, Modal, message, Descriptions, Input, Avatar, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined, MessageOutlined, UserOutlined, ClockCircleOutlined, PictureOutlined } from '@ant-design/icons';
import type { Question, Notification, Answer } from '../../types';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const RequestsPage: React.FC = () => {
    const [requests, setRequests] = useState<Question[]>([]);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isChatModalVisible, setIsChatModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<Question | null>(null);
    const [replyMessage, setReplyMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const loadRequests = () => {
        const storedRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
        setRequests(storedRequests);
    };

    useEffect(() => {
        loadRequests();
        window.addEventListener('storage', loadRequests);
        return () => {
            window.removeEventListener('storage', loadRequests);
        };
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isChatModalVisible, selectedRequest]);

    const handleViewDetails = (request: Question) => {
        setSelectedRequest(request);
        setIsDetailModalVisible(true);
    };

    const handleOpenChat = (request: Question) => {
        setSelectedRequest(request);
        setIsChatModalVisible(true);
    };

    const handleCancelModals = () => {
        setIsDetailModalVisible(false);
        setIsChatModalVisible(false);
        setReplyMessage('');
        setSelectedRequest(null);
    };

    const handleSendReply = () => {
        if (!replyMessage.trim() || !selectedRequest) {
            message.error('กรุณาพิมพ์ข้อความตอบกลับ');
            return;
        }

        const newAnswer: Answer = {
            id: Date.now(),
            author: 'แอดมิน',
            text: replyMessage.trim(),
            isStaff: true,
            createdAt: Date.now(),
        };

        const existingRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
        const updatedRequests = existingRequests.map((req: Question) => {
            if (req.id === selectedRequest.id) {
                return {
                    ...req,
                    answers: [...req.answers, newAnswer],
                    answerCount: req.answerCount + 1,
                };
            }
            return req;
        });
        localStorage.setItem('userRequests', JSON.stringify(updatedRequests));

        // สร้าง Notification สำหรับผู้ใช้
        const newNotification: Notification = {
            id: Date.now(),
            message: `แอดมินตอบกลับคำร้องของคุณ: "${selectedRequest.title}"`,
            read: false,
            link: `/qa/request/${selectedRequest.id}`,
            timestamp: Date.now(),
        };

        const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        localStorage.setItem('notifications', JSON.stringify([newNotification, ...existingNotifications]));

        setReplyMessage('');
        message.success(`ตอบกลับคำร้องของคุณ "${selectedRequest.author}" สำเร็จ!`);
    };

    const formatTime = (ts?: number) => {
        if (!ts) return '';
        return new Date(ts).toLocaleString('th-TH');
    };

    const renderMessage = (answer: Answer) => (
        <div
    key={answer.id}
    className={`message-bubble ${answer.isStaff ? 'user-message' : 'staff-message'}`}
>

            <div className="message-content">
                <Space align="start">
                    <Avatar size="small" icon={<UserOutlined />} />
                    <div className="message-text-container">
                        <div className="message-header">
                            <span className="message-author">
                                {answer.author}
                                {answer.isStaff && <Tag color="blue" style={{ marginLeft: 8 }}>แอดมิน</Tag>}
                            </span>
                            <span className="message-time">
                                {new Date(answer.createdAt!).toLocaleString('th-TH')}
                            </span>
                        </div>
                        <p className="message-text">{answer.text}</p>
                    </div>
                </Space>
            </div>
        </div>
    );
    

    const columns: ColumnsType<Question> = [
        {
            title: 'เวลาที่ส่ง',
            dataIndex: 'id',
            key: 'id',
            render: (id) => new Date(id).toLocaleString('th-TH'),
            sorter: (a, b) => b.id - a.id,
            defaultSortOrder: 'ascend',
        },
        { title: 'หัวข้อ', dataIndex: 'title', key: 'title', ellipsis: true },
        { title: 'ผู้ส่ง', dataIndex: 'author', key: 'author' },
        {
            title: 'สถานะ',
            key: 'status',
            render: (record: Question) => {
                const hasAdminReply = record.answers.some(ans => ans.isStaff && ans.author !== 'ระบบ');
                return hasAdminReply ? <Tag color="success">ตอบกลับแล้ว</Tag> : <Tag color="warning">รอการตรวจสอบ</Tag>;
            }
        },
        {
            title: 'การดำเนินการ',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                    >
                        ดูรายละเอียด
                    </Button>
                    <Button
                        type="primary"
                        icon={<MessageOutlined />}
                        onClick={() => handleOpenChat(record)}
                    >
                        แชท
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>จัดการคำร้อง</Title>
            <Table columns={columns} dataSource={requests} rowKey="id" />

            {/* Modal สำหรับดูรายละเอียดคำร้อง */}
            <Modal
                title="รายละเอียดคำร้อง"
                open={isDetailModalVisible}
                onCancel={handleCancelModals}
                width={700}
                footer={[
                    <Button key="back" onClick={handleCancelModals}>
                        ปิด
                    </Button>,
                ]}
            >
                {selectedRequest && (
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="ID คำร้อง">{selectedRequest.id}</Descriptions.Item>
                            <Descriptions.Item label="ผู้ส่ง">
                                <Space>
                                    <Avatar size="small" icon={<UserOutlined />} />
                                    {selectedRequest.author}
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label="หัวข้อเรื่อง">{selectedRequest.title}</Descriptions.Item>
                            <Descriptions.Item label="รายละเอียดที่ส่งมา">
                                <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                                    {selectedRequest.answers.find(a => !a.isStaff)?.text || 'ไม่มีรายละเอียด'}
                                </Paragraph>
                            </Descriptions.Item>
                        </Descriptions>
                    </Space>
                )}
            </Modal>
            
            {/* Modal สำหรับแชท */}
            <Modal
                title={`แชทกับ ${selectedRequest?.author}`}
                open={isChatModalVisible}
                onCancel={handleCancelModals}
                footer={null}
                width={700}
            >
                {selectedRequest && (
                    <Card className="requests-chat-card" style={{ boxShadow: 'none' }}>
                        <div className="thread-messages">
                            {selectedRequest.answers.map(renderMessage)}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="thread-input-area">
                            <div className="requests-chat-input-container">
                                <Input
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder={`พิมพ์ข้อความตอบกลับถึงคุณ ${selectedRequest.author}...`}
                                    className="requests-reply-input"
                                    onPressEnter={(e) => {
                                        if (!e.shiftKey) {
                                            e.preventDefault();
                                            handleSendReply();
                                        }
                                    }}
                                    suffix={
                                        <Button
                                            type="text"
                                            className="icon-button"
                                            icon={<PictureOutlined style={{ fontSize: '18px', color: '#888' }} />}
                                        />
                                    }
                                />
                                <Button
                                    type="primary"
                                    onClick={handleSendReply}
                                    className="requests-send-button"
                                >
                                    ส่ง
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </Modal>
        </div>
    );
};

export default RequestsPage;
