// /Users/phonsirithabunsri/Desktop/frontend/src/pages/RequestThreadPage/RequestThreadPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, Input, Button, Card, message, Space, Tag, Spin, Result } from 'antd';
import { UserOutlined, MessageOutlined, PictureOutlined } from '@ant-design/icons';
import type { Question, Answer, Notification } from '../../types';
import './RequestThreadPage.css';

const { Title } = Typography;
const { TextArea } = Input;

const RequestThreadPage: React.FC = () => {
    // ดึงค่า id ของคำร้องจาก URL
    const { id } = useParams<{ id: string }>();
    const [request, setRequest] = useState<Question | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [replyText, setReplyText] = useState<string>('');
    // ref สำหรับเลื่อน scroll ไปยังข้อความล่าสุด
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const requestId = parseInt(id as string);

    // ฟังก์ชันสำหรับโหลดข้อมูลคำร้องจาก LocalStorage
    const loadRequest = () => {
        const storedRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
        const foundRequest = storedRequests.find((q: Question) => q.id === requestId);
        if (foundRequest) {
            setRequest(foundRequest);
        }
        setLoading(false);
    };

    // โหลดข้อมูลเมื่อ component ถูก mount และเมื่อข้อมูลใน LocalStorage เปลี่ยนแปลง
    useEffect(() => {
        loadRequest();
        window.addEventListener('storage', loadRequest);
        return () => {
            window.removeEventListener('storage', loadRequest);
        };
    }, [requestId]);

    // เลื่อน scroll ไปยังข้อความล่าสุดทุกครั้งที่มีข้อความใหม่
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [request]);

    // ฟังก์ชันสำหรับส่งข้อความตอบกลับ
    const handleSendReply = () => {
        if (!replyText.trim() || !request) {
            message.warn('กรุณาพิมพ์ข้อความก่อนส่ง');
            return;
        }

        // สร้าง Object ข้อความใหม่จากผู้ใช้งาน
        const newAnswer: Answer = {
            id: Date.now(),
            author: 'ผู้ใช้งาน', // สามารถปรับเป็นชื่อผู้ใช้จริงได้
            text: replyText.trim(),
            isStaff: false,
            createdAt: Date.now(),
        };

        // อัปเดตข้อมูลใน LocalStorage
        const existingRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
        const updatedRequests = existingRequests.map((req: Question) => {
            if (req.id === requestId) {
                return {
                    ...req,
                    answers: [...req.answers, newAnswer],
                    answerCount: req.answerCount + 1,
                };
            }
            return req;
        });

        localStorage.setItem('userRequests', JSON.stringify(updatedRequests));

        // สร้าง Notification เพื่อแจ้งเตือนแอดมิน
        const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const newNotification: Notification = {
            id: Date.now(),
            message: `ผู้ใช้งานตอบกลับคำร้องของคุณ: "${request.title}"`,
            read: false,
            link: `/admin/requests`, // ลิงก์ไปยังหน้าจัดการคำร้องของแอดมิน
            timestamp: Date.now(),
        };
        localStorage.setItem('notifications', JSON.stringify([newNotification, ...existingNotifications]));

        // ล้างช่อง input และแสดงข้อความสำเร็จ
        setReplyText('');
        message.success('ส่งข้อความเรียบร้อย');
    };

    // แสดงหน้าโหลดหากข้อมูลยังไม่พร้อม
    if (loading) {
        return <Spin size="large" className="request-thread-spin" />;
    }

    // แสดงหน้า 404 หากไม่พบคำร้อง
    if (!request) {
        return <Result status="404" title="404" subTitle="ไม่พบคำร้องที่ท่านต้องการ" />;
    }

    return (
        <Card className="request-thread-card">
            <div className="thread-header">
                <Title level={4} className="thread-title">{request.title}</Title>
                <p className="thread-subtitle">
                    โดย: <strong className="thread-author">{request.author}</strong>
                </p>
            </div>
            
            <div className="thread-messages">
                {request.answers.map((answer) => (
                    <div
                        key={answer.id}
                        className={`message-bubble ${answer.isStaff ? 'staff-message' : 'user-message'}`}
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
                ))}
                {/* div เปล่าสำหรับเลื่อน scroll ไปยังส่วนท้ายสุด */}
                <div ref={messagesEndRef} />
            </div>

            <div className="thread-input-area">
                <div className="input-with-button-container">
                    <Input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="พิมพ์ข้อความตอบกลับ..."
                        className="reply-input"
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
                        className="send-button-design"
                    >
                        ส่ง
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default RequestThreadPage;