// // src/pages/Admin2/RequestsPage.tsx
// import React, { useState, useEffect } from 'react';
// import { Table, Tag, Button, Typography, Space, Modal, message, Descriptions, Input, Avatar, Card, Divider } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { EyeOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
// import type { RequestTicket } from '../../types';
// import './RequestThreadPage.css';

// const { Title, Paragraph, Text } = Typography;
// const { TextArea } = Input;

// const API_URL = 'http://localhost:8080/api';

// const RequestsPage: React.FC = () => {
//     const [tickets, setTickets] = useState<RequestTicket[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [selectedTicket, setSelectedTicket] = useState<RequestTicket | null>(null);
//     const [replyMessage, setReplyMessage] = useState('');

//     const fetchTickets = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${API_URL}/tickets`);
//             if (!response.ok) throw new Error('Failed to fetch tickets');
//             const data: RequestTicket[] = await response.json();
//             setTickets(data);
//         } catch (error) {
//             console.error(error);
//             message.error('ไม่สามารถดึงข้อมูลคำร้องได้');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTickets();
//     }, []);

//     const handleViewDetails = (ticket: RequestTicket) => {
//         setSelectedTicket(ticket);
//         setIsModalVisible(true);
//     };

//     const handleCancelModal = () => {
//         setIsModalVisible(false);
//         setReplyMessage('');
//         setSelectedTicket(null);
//     };

//     const handleSendReply = async () => {
//         if (!replyMessage.trim() || !selectedTicket) {
//             message.error('กรุณาพิมพ์ข้อความตอบกลับ');
//             return;
//         }
//         try {
//             const response = await fetch(`${API_URL}/tickets/${selectedTicket.ID}/replies`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ message: replyMessage, is_staff_reply: true }),
//             });
//             if (!response.ok) throw new Error((await response.json()).error || 'Failed to send reply');
            
//             message.success(`ตอบกลับคำร้อง "${selectedTicket.subject}" สำเร็จ!`);
//             setReplyMessage('');
//             fetchTickets(); // โหลดข้อมูลใหม่เพื่ออัปเดตตาราง
            
//             // โหลดข้อมูล ticket ที่เลือกอยู่ใหม่เพื่ออัปเดต modal
//             const updatedTicketResponse = await fetch(`${API_URL}/tickets/${selectedTicket.ID}`);
//             const updatedTicketData = await updatedTicketResponse.json();
//             setSelectedTicket(updatedTicketData);

//         } catch (error) {
//             console.error('Error sending reply:', error);
//             message.error('เกิดข้อผิดพลาดในการส่งข้อความตอบกลับ');
//         }
//     };
    
//     const formatTime = (ts?: string) => ts ? new Date(ts).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : '';

//     const columns: ColumnsType<RequestTicket> = [
//         { title: 'เวลาที่ส่ง', dataIndex: 'CreatedAt', key: 'CreatedAt', render: formatTime, sorter: (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime(), defaultSortOrder: 'ascend' },
//         { title: 'หัวข้อเรื่อง', dataIndex: 'subject', key: 'subject', ellipsis: true },
//         { title: 'ผู้ส่ง', key: 'author', render: (_, record) => <Space><Avatar size="small" icon={<UserOutlined />} />{record.user?.username || 'N/A'}</Space> },
//         { title: 'สถานะ', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'Open' ? 'warning' : 'success'}>{status}</Tag> },
//         { title: 'การดำเนินการ', key: 'action', render: (_, record) => <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(record)}>ตรวจสอบ</Button> },
//     ];

//     const allMessages = selectedTicket ? [
//         { ID: `initial-${selectedTicket.ID}`, author: selectedTicket.user, message: selectedTicket.initial_message, is_staff_reply: false, CreatedAt: selectedTicket.CreatedAt },
//         ...(selectedTicket.replies || [])
//     ] : [];

//     return (
//         <div>
//             <Title level={2}>จัดการคำร้อง</Title>
//             <Table columns={columns} dataSource={tickets} rowKey="ID" loading={loading} />

//             <Modal
//                 title={`สอบถามเรื่อง: ${selectedTicket?.subject}`}
//                 open={isModalVisible}
//                 onCancel={handleCancelModal}
//                 width={800}
//                 footer={null}
//                 className="ticket-modal"
//             >
//                 {selectedTicket && (
//                     <>
//                         <Descriptions bordered column={1} size="small" className="ticket-descriptions">
//                             <Descriptions.Item label="ผู้ส่งคำร้อง">{selectedTicket.user?.username || 'N/A'}</Descriptions.Item>
//                             <Descriptions.Item label="อีเมล">somchai@email.com (ตัวอย่าง)</Descriptions.Item>
//                             <Descriptions.Item label="เบอร์โทร">082-345-6789 (ตัวอย่าง)</Descriptions.Item>
//                             <Descriptions.Item label="สถานะ"><Tag color={selectedTicket.status === 'Open' ? 'warning' : 'success'}>{selectedTicket.status}</Tag></Descriptions.Item>
//                             <Descriptions.Item label="วันที่ส่ง">{formatTime(selectedTicket.CreatedAt)}</Descriptions.Item>
//                         </Descriptions>
                        
//                         <Title level={5} style={{ marginTop: '24px' }}>รายละเอียดคำร้อง</Title>
//                         <Paragraph className="initial-message-box">
//                             {selectedTicket.initial_message}
//                         </Paragraph>

//                         <Title level={5} style={{ marginTop: '24px' }}>การตอบกลับ</Title>
//                         <div className="conversation-history">
//                             {allMessages.slice(1).map((msg: any) => (
//                                 <div key={msg.ID} className={`history-entry ${msg.is_staff_reply ? 'staff-reply' : 'user-reply'}`}>
//                                     <div className="entry-header">
//                                         <Text strong>{msg.author?.username || 'Unknown'}</Text>
//                                         {msg.is_staff_reply && <Tag color="blue">เจ้าหน้าที่</Tag>}
//                                         <Text type="secondary" className="entry-timestamp">{formatTime(msg.CreatedAt)}</Text>
//                                     </div>
//                                     <div className="entry-body">
//                                         <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</Paragraph>
//                                     </div>
//                                 </div>
//                             ))}
//                             {allMessages.length <= 1 && <Text type="secondary">ยังไม่มีการตอบกลับ...</Text>}
//                         </div>

//                         <Divider />
                        
//                         <div className="reply-section">
//                              <Title level={5}>ตอบกลับ</Title>
//                              <TextArea
//                                 rows={4}
//                                 value={replyMessage}
//                                 onChange={(e) => setReplyMessage(e.target.value)}
//                                 placeholder="พิมพ์คำตอบในฐานะเจ้าหน้าที่..."
//                             />
//                             <Button
//                                 type="primary"
//                                 onClick={handleSendReply}
//                                 style={{ marginTop: '16px' }}
//                                 icon={<EditOutlined />}
//                             >
//                                 ส่งตอบกลับ
//                             </Button>
//                         </div>
//                     </>
//                 )}
//             </Modal>
//         </div>
//     );
// };

// export default RequestsPage;

// src/pages/RequestThreadPage/RequestStatusPage-Connected.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Spin, 
  Result, 
  Button, 
  Space, 
  Tag, 
  Avatar, 
  Divider,
  Input,
  message,
  Empty
} from 'antd';
import { 
  UserOutlined, 
  MessageOutlined, 
  ClockCircleOutlined, 
  HomeOutlined,
  SendOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

// Import services และ types
import { getTicketById, createTicketReply } from '../../services/helpCenterService';
import type{ RequestTicket, CreateReplyRequest } from '../../type/helpCenter';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const RequestStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<RequestTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getTicketById(id);
        setTicket(data);
      } catch (error: any) {
        console.error(error);
        message.error(error.message || 'ไม่สามารถโหลดข้อมูลคำร้องได้');
        setTicket(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const formatTime = (ts?: string) => {
    if (!ts) return '';
    return new Date(ts).toLocaleString('th-TH', { 
      dateStyle: 'long', 
      timeStyle: 'short' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return '#faad14';
      case 'In Progress': return '#1890ff';
      case 'Awaiting Confirmation': return '#722ed1';
      case 'Resolved': return '#52c41a';
      case 'Closed': return '#8c8c8c';
      default: return '#faad14';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Open': return 'รอการตอบกลับ';
      case 'In Progress': return 'กำลังดำเนินการ';
      case 'Awaiting Confirmation': return 'รอการยืนยัน';
      case 'Resolved': return 'เสร็จสิ้น';
      case 'Closed': return 'ปิด';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <ClockCircleOutlined />;
      case 'In Progress': return <ExclamationCircleOutlined />;
      case 'Awaiting Confirmation': return <MessageOutlined />;
      case 'Resolved': return <CheckCircleOutlined />;
      case 'Closed': return <CheckCircleOutlined />;
      default: return <ClockCircleOutlined />;
    }
  };

  const handleSendReply = async () => {
    if (!ticket || !replyMessage.trim()) {
      message.error('กรุณาพิมพ์ข้อความ');
      return;
    }

    setReplyLoading(true);
    try {
      const replyData: CreateReplyRequest = {
        message: replyMessage,
        is_staff_reply: false
      };

      await createTicketReply(ticket.ID.toString(), replyData);
      message.success('ส่งคำตอบสำเร็จแล้ว');
      setReplyMessage('');

      // รีเฟรชข้อมูลคำร้อง
      const updatedTicket = await getTicketById(ticket.ID.toString());
      setTicket(updatedTicket);
    } catch (error: any) {
      console.error('Error sending reply:', error);
      message.error(error.message || 'เกิดข้อผิดพลาดในการส่งคำตอบ');
    } finally {
      setReplyLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        gap: '16px'
      }}>
        <Spin size="large" />
        <Text style={{ color: '#666' }}>กำลังโหลดข้อมูลคำร้อง...</Text>
      </div>
    );
  }

  if (!ticket) {
    return (
      <Result
        status="404"
        title="ไม่พบคำร้องที่ต้องการ"
        subTitle="คำร้องนี้อาจถูกลบหรือไม่มีสิทธิ์ในการเข้าถึง"
        extra={
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/help')}
            icon={<HomeOutlined />}
          >
            กลับไปศูนย์ช่วยเหลือ
          </Button>
        }
      />
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px 24px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header Card */}
        <Card
          style={{
            borderRadius: '20px',
            marginBottom: '24px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px'
            }}>
              <MessageOutlined style={{ color: 'white' }} />
            </div>
            
            <Title level={2} style={{ 
              margin: '0 0 8px 0',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              สถานะคำร้องของคุณ
            </Title>
            
            <Tag 
              color={getStatusColor(ticket.status)}
              icon={getStatusIcon(ticket.status)}
              style={{ 
                fontSize: '16px', 
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: '600'
              }}
            >
              สถานะ: {getStatusText(ticket.status)}
            </Tag>
          </div>
        </Card>

        {/* Ticket Details */}
        <Card
          title={
            <Space>
              <MessageOutlined style={{ color: '#1890ff' }} />
              <span>{ticket.subject}</span>
            </Space>
          }
          style={{
            borderRadius: '20px',
            marginBottom: '24px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
          headStyle={{
            background: 'transparent',
            borderBottom: '2px solid #f0f0f0',
            borderRadius: '20px 20px 0 0'
          }}
        >
          {/* Ticket Info */}
          <div style={{ marginBottom: '24px' }}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Text type="secondary">ผู้ส่ง:</Text>
                <br />
                <Space>
                  <Avatar icon={<UserOutlined />} size="small" />
                  <Text strong>{ticket.User?.username || 'N/A'}</Text>
                </Space>
              </Col>
              <Col span={8}>
                <Text type="secondary">เวลาที่ส่ง:</Text>
                <br />
                <Text>{formatTime(ticket.CreatedAt)}</Text>
              </Col>
              <Col span={8}>
                <Text type="secondary">สถานะ:</Text>
                <br />
                <Tag 
                  color={getStatusColor(ticket.status)}
                  icon={getStatusIcon(ticket.status)}
                >
                  {getStatusText(ticket.status)}
                </Tag>
              </Col>
            </Row>
          </div>

          {/* Initial Message */}
          <div style={{ marginBottom: '24px' }}>
            <Title level={5} style={{ marginBottom: '12px' }}>
              💭 ข้อความเริ่มต้น
            </Title>
            <div style={{
              background: '#f8f9fa',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <Paragraph style={{ 
                margin: 0,
                fontSize: '15px',
                lineHeight: '1.6' 
              }}>
                {ticket.initial_message}
              </Paragraph>
            </div>
          </div>

          <Divider />

          {/* Conversation History */}
          <div style={{ marginBottom: '24px' }}>
            <Title level={5} style={{ marginBottom: '16px' }}>
              💬 ประวัติการสนทนา
            </Title>
            
            {ticket.replies && ticket.replies.length > 0 ? (
              <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '8px',
                background: '#f8f9fa',
                borderRadius: '12px'
              }}>
                {ticket.replies.map((reply: any, index: number) => (
                  <div key={reply.ID || index} style={{
                    background: reply.is_staff_reply ? '#e6f7ff' : '#f6ffed',
                    border: `1px solid ${reply.is_staff_reply ? '#91d5ff' : '#b7eb8f'}`,
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '8px' 
                    }}>
                      <Avatar 
                        icon={<UserOutlined />} 
                        size="small" 
                        style={{ marginRight: '8px' }}
                      />
                      <Text strong>{reply.Author?.username || 'ไม่ระบุ'}</Text>
                      {reply.is_staff_reply && (
                        <Tag color="blue" size="small" style={{ marginLeft: '8px' }}>
                          เจ้าหน้าที่
                        </Tag>
                      )}
                      <Text type="secondary" style={{ marginLeft: 'auto', fontSize: '11px' }}>
                        {formatTime(reply.CreatedAt)}
                      </Text>
                    </div>
                    <Text>{reply.message}</Text>
                  </div>
                ))}
              </div>
            ) : (
              <Empty 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="ยังไม่มีการตอบกลับ..."
                style={{ padding: '20px' }}
              />
            )}
          </div>

          {/* Reply Section */}
          {ticket.status === 'Open' || ticket.status === 'In Progress' ? (
            <div>
              <Title level={5} style={{ marginBottom: '12px' }}>
                ✉️ ตอบกลับ
              </Title>
              <TextArea
                rows={4}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="พิมพ์ข้อความตอบกลับของคุณ..."
                style={{ marginBottom: '16px' }}
              />
              <div style={{ textAlign: 'right' }}>
                <Space>
                  <Button
                    onClick={() => navigate('/help')}
                    icon={<HomeOutlined />}
                  >
                    กลับไปศูนย์ช่วยเหลือ
                  </Button>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    loading={replyLoading}
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim()}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none'
                    }}
                  >
                    ส่งข้อความ
                  </Button>
                </Space>
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: '#f0f0f0',
                borderRadius: '12px',
                marginBottom: '16px'
              }}>
                <Text type="secondary">
                  คำร้องนี้ได้ {getStatusText(ticket.status)} แล้ว
                </Text>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate('/help')}
                  icon={<HomeOutlined />}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                >
                  กลับไปศูนย์ช่วยเหลือ
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RequestStatusPage;