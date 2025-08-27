// // src/pages/Admin2/RequestsPage.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Table, Tag, Button, Typography, Space, Modal, message, Descriptions, Input, Avatar, Card } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { EyeOutlined, MessageOutlined, UserOutlined, ClockCircleOutlined, PictureOutlined } from '@ant-design/icons';
// // 🔄 แก้ไข: เปลี่ยนการ import type จาก Question เป็น FormQuestion
// import type { FormQuestion, Answer } from '../../types';

// const { Title, Paragraph } = Typography;
// const { TextArea } = Input;

// // 🔄 เพิ่ม: กำหนด URL ของ API
// const API_URL = 'http://localhost:8080/api';

// const RequestsPage: React.FC = () => {
//     // 🔄 แก้ไข: เปลี่ยน State ให้รองรับ FormQuestion[]
//     const [requests, setRequests] = useState<FormQuestion[]>([]);
//     const [loading, setLoading] = useState<boolean>(true); // เพิ่ม State สำหรับ Loading
//     const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
//     const [isChatModalVisible, setIsChatModalVisible] = useState(false);
//     // 🔄 แก้ไข: เปลี่ยน State ให้รองรับ FormQuestion | null
//     const [selectedRequest, setSelectedRequest] = useState<FormQuestion | null>(null);
//     const [replyMessage, setReplyMessage] = useState('');
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     // 🔄 เพิ่ม: ฟังก์ชันสำหรับดึงข้อมูลคำร้องจาก API
//     const fetchRequests = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${API_URL}/requests`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch requests from server');
//             }
//             const data: FormQuestion[] = await response.json();
//             setRequests(data);
//         } catch (error) {
//             console.error(error);
//             message.error('ไม่สามารถดึงข้อมูลคำร้องได้');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 🔄 แก้ไข: เรียกใช้ fetchRequests เมื่อ component โหลด
//     useEffect(() => {
//         fetchRequests();
//     }, []);


//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [isChatModalVisible, selectedRequest]);

//     const handleViewDetails = (request: FormQuestion) => {
//         setSelectedRequest(request);
//         setIsDetailModalVisible(true);
//     };

//     const handleOpenChat = (request: FormQuestion) => {
//         setSelectedRequest(request);
//         setIsChatModalVisible(true);
//     };

//     const handleCancelModals = () => {
//         setIsDetailModalVisible(false);
//         setIsChatModalVisible(false);
//         setReplyMessage('');
//         setSelectedRequest(null);
//     };

//     const handleSendReply = () => {
//         // (ส่วนนี้ยังไม่ได้เชื่อมต่อ API จริง)
//         if (!replyMessage.trim() || !selectedRequest) {
//             message.error('กรุณาพิมพ์ข้อความตอบกลับ');
//             return;
//         }
//         message.success(`ตอบกลับคำร้องของคุณ "${selectedRequest.name}" สำเร็จ!`);
//         setReplyMessage('');
//     };

//     const formatTime = (ts?: string) => {
//         if (!ts) return '';
//         return new Date(ts).toLocaleString('th-TH');
//     };

//     // 🔄 แก้ไข: ปรับ Columns ให้ตรงกับข้อมูลจาก FormQuestion
//     const columns: ColumnsType<FormQuestion> = [
//         {
//             title: 'เวลาที่ส่ง',
//             dataIndex: 'CreatedAt',
//             key: 'CreatedAt',
//             render: (text) => formatTime(text),
//             sorter: (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime(),
//             defaultSortOrder: 'ascend',
//         },
//         { title: 'หัวข้อ', dataIndex: 'title', key: 'title', ellipsis: true },
//         {
//             title: 'ผู้ส่ง',
//             key: 'author',
//             render: (_, record) => `${record.name} ${record.lastname}`,
//         },
//         {
//             title: 'สถานะ',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status: string) => (
//                 <Tag color={status === 'pending' ? 'warning' : 'success'}>
//                     {status}
//                 </Tag>
//             )
//         },
//         {
//             title: 'การดำเนินการ',
//             key: 'action',
//             render: (_, record) => (
//                 <Space>
//                     <Button
//                         icon={<EyeOutlined />}
//                         onClick={() => handleViewDetails(record)}
//                     >
//                         ดูรายละเอียด
//                     </Button>
//                     <Button
//                         type="primary"
//                         icon={<MessageOutlined />}
//                         onClick={() => handleOpenChat(record)}
//                     >
//                         แชท
//                     </Button>
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <Title level={2}>จัดการคำร้อง</Title>
//             <Table
//                 columns={columns}
//                 dataSource={requests}
//                 rowKey="ID"
//                 loading={loading} // เพิ่ม: แสดงสถานะโหลด
//             />

//             {/* Modal สำหรับดูรายละเอียดคำร้อง */}
//             <Modal
//                 title="รายละเอียดคำร้อง"
//                 open={isDetailModalVisible}
//                 onCancel={handleCancelModals}
//                 width={700}
//                 footer={[<Button key="back" onClick={handleCancelModals}>ปิด</Button>]}
//             >
//                 {selectedRequest && (
//                     <Descriptions bordered column={1}>
//                         <Descriptions.Item label="ID คำร้อง">{selectedRequest.ID}</Descriptions.Item>
//                         <Descriptions.Item label="ผู้ส่ง">
//                             <Space>
//                                 <Avatar size="small" icon={<UserOutlined />} />
//                                 {`${selectedRequest.name} ${selectedRequest.lastname}`}
//                             </Space>
//                         </Descriptions.Item>
//                         <Descriptions.Item label="หัวข้อเรื่อง">{selectedRequest.title}</Descriptions.Item>
//                         <Descriptions.Item label="รายละเอียดที่ส่งมา">
//                             <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
//                                 {selectedRequest.details || 'ไม่มีรายละเอียด'}
//                             </Paragraph>
//                         </Descriptions.Item>
//                     </Descriptions>
//                 )}
//             </Modal>
            
//             {/* Modal สำหรับแชท */}
//             <Modal
//                 title={`แชทกับ ${selectedRequest?.name}`}
//                 open={isChatModalVisible}
//                 onCancel={handleCancelModals}
//                 footer={null}
//                 width={700}
//             >
//                 {/* เนื้อหาใน Modal Chat ยังคงเดิม */}
//                 <p>ส่วนการแชทยังอยู่ในระหว่างการพัฒนา</p>
//             </Modal>
//         </div>
//     );
// };

// export default RequestsPage;

// src/pages/Admin2/RequestsPage.tsx
import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Space, Modal, message, Descriptions, Input, Avatar, Card, Divider, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { RequestTicket } from '../../types';
import './RequestsPage.css';

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
            const sortedData = data.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());
            setTickets(sortedData);
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

    const getStatusColor = (status: RequestTicket['status']) => {
        switch (status) {
          case 'Open': return 'orange';
          case 'In Progress': return 'processing';
          case 'Awaiting Confirmation': return 'blue';
          case 'Resolved': return 'green';
          default: return 'default';
        }
    };

    const getStatusText = (status: RequestTicket['status']) => {
        switch (status) {
          case 'Open': return 'รอการตอบกลับ';
          case 'In Progress': return 'กำลังดำเนินการ';
          case 'Awaiting Confirmation': return 'รอยืนยัน';
          case 'Resolved': return 'แก้ไขแล้ว';
          default: return 'ไม่ทราบสถานะ';
        }
    };

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
            fetchTickets(); 
            
            const updatedTicketResponse = await fetch(`${API_URL}/tickets/${selectedTicket.ID}`);
            const updatedTicketData = await updatedTicketResponse.json();
            setSelectedTicket(updatedTicketData);

        } catch (error) {
            console.error('Error sending reply:', error);
            message.error('เกิดข้อผิดพลาดในการส่งข้อความตอบกลับ');
        }
    };
    
    const handleUpdateStatus = async (status: RequestTicket['status']) => {
        if (!selectedTicket) return;
        try {
            const response = await fetch(`${API_URL}/tickets/${selectedTicket.ID}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) throw new Error('Failed to update status');

            message.success(`อัปเดตสถานะเป็น "${getStatusText(status)}" สำเร็จ`);
            fetchTickets();
            const updatedTicketData = await response.json();
            setSelectedTicket(updatedTicketData);

        } catch (error) {
            message.error('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
        }
    };
    
    const formatTime = (ts?: string) => ts ? new Date(ts).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : '';

    const columns: ColumnsType<RequestTicket> = [
        { title: 'เวลาที่ส่ง', dataIndex: 'CreatedAt', key: 'CreatedAt', render: formatTime },
        { title: 'หัวข้อเรื่อง', dataIndex: 'subject', key: 'subject', ellipsis: true },
        { title: 'ผู้ส่ง', key: 'author', render: (_, record) => <Space><Avatar size="small" icon={<UserOutlined />} />{record.user?.username || 'N/A'}</Space> },
        { 
            title: 'สถานะ', 
            dataIndex: 'status', 
            key: 'status', 
            render: (status: RequestTicket['status']) => (
                <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
            )
        },
        { title: 'การดำเนินการ', key: 'action', render: (_, record) => <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(record)}>ตรวจสอบ</Button> },
    ];

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
                    <div style={{ display: 'flex', flexDirection: 'column', height: '75vh' }}>
                        <div style={{ flexShrink: 0 }}>
                            <Card>
                                <Descriptions column={1} size="small" layout="horizontal" bordered>
                                    <Descriptions.Item label="ผู้ส่งคำร้อง">{selectedTicket.user?.username || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="สถานะ">
                                        <Tag color={getStatusColor(selectedTicket.status)}>
                                            {getStatusText(selectedTicket.status)}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="วันที่ส่ง">{formatTime(selectedTicket.CreatedAt)}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                            
                            <Title level={5} style={{ marginTop: '16px', marginBottom: '8px' }}>ประวัติการสนทนา</Title>
                        </div>

                        <div className="conversation-history" style={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '6px', border: '1px solid #e8e8e8' }}>
                            <div key={`initial-${selectedTicket.ID}`} className="history-entry user-reply">
                                <div className="entry-header">
                                    <Text strong>{selectedTicket.user?.username || 'Unknown'}</Text>
                                    <Text type="secondary" className="entry-timestamp">{formatTime(selectedTicket.CreatedAt)}</Text>
                                </div>
                                <div className="entry-body">
                                    <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{selectedTicket.initial_message}</Paragraph>
                                </div>
                            </div>
                            {(selectedTicket.replies || []).map((msg: any) => (
                                <div key={msg.ID} className={`history-entry ${msg.is_staff_reply ? 'staff-reply' : 'user-reply'}`}>
                                    <div className="entry-header">
                                        <Text strong>{msg.author?.username || 'Unknown'}</Text>
                                        {msg.is_staff_reply && <Tag color="blue">เจ้าหน้าที่</Tag>}
                                        <Text type="secondary" className="entry-timestamp">{formatTime(msg.CreatedAt)}</Text>
                                    </div>
                                    <div className="entry-body">
                                        <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{msg.message}</Paragraph>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ flexShrink: 0, paddingTop: '16px' }}>
                             <Divider style={{ margin: '0 0 16px 0' }}/>
                             <Title level={5} style={{ marginBottom: '8px' }}>ตอบกลับ</Title>
                             <TextArea
                                rows={2}
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="พิมพ์คำตอบในฐานะเจ้าหน้าที่..."
                                disabled={selectedTicket.status === 'Resolved' || selectedTicket.status === 'Awaiting Confirmation'}
                            />
                            <Space style={{ marginTop: '12px', justifyContent: 'space-between', width: '100%' }}>
                                <Button
                                    type="primary"
                                    onClick={handleSendReply}
                                    disabled={selectedTicket.status === 'Resolved' || selectedTicket.status === 'Awaiting Confirmation'}
                                >
                                    ส่งตอบกลับ
                                </Button>
                                { (selectedTicket.status === 'Open' || selectedTicket.status === 'In Progress') && (
                                    <Button
                                        icon={<CheckCircleOutlined />}
                                        onClick={() => handleUpdateStatus('Awaiting Confirmation')}
                                    >
                                        จบการสนทนา
                                    </Button>
                                )}
                            </Space>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default RequestsPage;