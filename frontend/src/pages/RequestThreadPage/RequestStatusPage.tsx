import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Spin, Result, Button, Space, Tag } from 'antd';
import { UserOutlined, MessageOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { Question } from '../../types';

const { Title, Paragraph } = Typography;

interface RequestStatusPageProps {
    questions: Question[];
}

const RequestStatusPage: React.FC<RequestStatusPageProps> = ({ questions }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [request, setRequest] = useState<Question | null>(null);
    const requestId = parseInt(id as string);

    // ตรวจสอบสถานะคำร้องและเปลี่ยนเส้นทางเมื่อมีคำตอบจากแอดมิน
    const checkStatusAndRedirect = () => {
        const storedRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
        const foundRequest = storedRequests.find((q: Question) => q.id === requestId);
        
        if (foundRequest) {
            setRequest(foundRequest);
            // ตรวจสอบว่ามีคำตอบจากแอดมินหรือยัง
            const hasAdminReply = foundRequest.answers.some(ans => ans.isStaff);
            if (hasAdminReply) {
                // ถ้ามีคำตอบแล้ว ให้นำทางไปยังหน้าแชท
                navigate(`/qa/request/${foundRequest.id}`);
            }
        }
    };

    useEffect(() => {
        // เรียกใช้ฟังก์ชันตรวจสอบสถานะเมื่อ Component ถูก mount ครั้งแรก
        checkStatusAndRedirect();
        
        // เพิ่ม Listener เพื่อตรวจสอบการเปลี่ยนแปลงของ LocalStorage
        window.addEventListener('storage', checkStatusAndRedirect);
        
        // Cleanup listener เมื่อ Component ถูก unmount
        return () => {
            window.removeEventListener('storage', checkStatusAndRedirect);
        };
    }, [questions, requestId]);

    if (!request) {
        return <Result status="404" title="404" subTitle="ไม่พบคำร้องที่ท่านต้องการ" />;
    }
    
    // ดึงรายละเอียดของผู้ใช้ที่ส่งคำร้อง
    const userRequestDetails = request.answers[0]?.text;

    return (
        <Card className="request-status-card" style={{ maxWidth: 600, margin: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>คำร้องของคุณถูกส่งแล้ว</Title>
                <Spin size="large" />
                <Paragraph style={{ marginTop: 16 }}>
                    <ClockCircleOutlined /> กำลังรอแอดมินตรวจสอบและตอบกลับ...
                </Paragraph>
                <Tag color="warning" icon={<MessageOutlined />}>รอการตอบกลับ</Tag>
            </div>
            
            <Card title="รายละเอียดคำร้องของคุณ">
                <Paragraph>
                    <strong>หัวข้อ:</strong> {request.title}
                </Paragraph>
                <Paragraph>
                    <strong>โดย:</strong> <Space><UserOutlined />{request.author}</Space>
                </Paragraph>
                <Paragraph>
                    <strong>รายละเอียด:</strong> <br />
                    <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
                        {userRequestDetails}
                    </pre>
                </Paragraph>
            </Card>
        </Card>
    );
};

export default RequestStatusPage;
