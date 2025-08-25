// src/pages/RequestThreadPage/RequestStatusPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Spin, Result, Button, Space, Tag } from 'antd';
// แก้ไขโดยพรศิริ: เพิ่มไอคอน HomeOutlined
import { UserOutlined, MessageOutlined, ClockCircleOutlined, HomeOutlined } from '@ant-design/icons';
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

    useEffect(() => {
        const storedRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');
        const foundRequest = storedRequests.find((q: Question) => q.id === requestId);
        
        if (foundRequest) {
            setRequest(foundRequest);
        }
    }, [requestId, questions]); // อัปเดตเมื่อ questions เปลี่ยน

    if (!request) {
        return <Result status="404" title="404" subTitle="ไม่พบคำร้องที่ท่านต้องการ" />;
    }
    
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

            {/* แก้ไขโดยพรศิริ: เพิ่มปุ่มกลับไปหน้าหลัก */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Button 
                    type="primary" 
                    icon={<HomeOutlined />} 
                    size="large"
                    onClick={() => navigate('/')}
                >
                    กลับไปหน้าหลัก
                </Button>
            </div>
        </Card>
    );
};

export default RequestStatusPage;