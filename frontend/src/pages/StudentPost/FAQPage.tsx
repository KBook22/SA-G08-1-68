// // src/pages/StudentPost/FAQPage.tsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Input,
//   Typography,
//   Button,
//   Tabs,
//   List,
//   Tag,
//   message,
//   Spin,
//   Collapse,
// } from 'antd';
// import type { CollapseProps, TabsProps } from 'antd';
// import {
//   QuestionCircleOutlined,
//   SendOutlined,
//   FileTextOutlined,
//   PlusOutlined,
//   MinusOutlined,
// } from '@ant-design/icons';
// import type { Question, FormQuestion } from '../../types';
// import './HelpCenter.css';

// const { Title, Paragraph, Text } = Typography;

// const API_URL = 'http://localhost:8080/api';

// const FAQPage: React.FC = () => {
//   const [faqs, setFaqs] = useState<Question[]>([]);
//   const [loadingFaqs, setLoadingFaqs] = useState(true);
//   const navigate = useNavigate();

//   const [myRequests, setMyRequests] = useState<FormQuestion[]>([]);
//   const [loadingRequests, setLoadingRequests] = useState(false); // เริ่มต้นเป็น false

//   // --- แก้ไข: ดึงข้อมูล FAQ จาก API โดยตรงใน Component นี้ ---
//   const fetchFaqs = async () => {
//     setLoadingFaqs(true);
//     try {
//       const response = await fetch(`${API_URL}/questions`);
//       if (!response.ok) throw new Error('Failed to fetch FAQs');
//       const data: Question[] = await response.json();
//       setFaqs(data.filter(q => q.is_faq));
//     } catch (error) {
//       console.error("Failed to fetch FAQs:", error);
//       message.error('ไม่สามารถดึงข้อมูล FAQ ได้');
//     } finally {
//       setLoadingFaqs(false);
//     }
//   };

//   useEffect(() => {
//     fetchFaqs();
//   }, []);

//   const fetchMyRequests = async () => {
//     const userId = 'user_placeholder_id';
//     setLoadingRequests(true);
//     try {
//       const response = await fetch(`${API_URL}/users/${userId}/requests`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch user requests');
//       }
//       const data: FormQuestion[] = await response.json();
//       setMyRequests(data);
//     } catch (error) {
//       console.error(error);
//       message.error("ไม่สามารถดึงข้อมูลคำร้องของคุณได้");
//     } finally {
//       setLoadingRequests(false);
//     }
//   };

//   const handleTabClick = (key: string) => {
//     if (key === '2') {
//       fetchMyRequests();
//     }
//   };

//   const handleRequestClick = (request: FormQuestion) => {
//     navigate(`/help/request-status/${request.ID}`);
//   };

//   const faqItems: CollapseProps['items'] = faqs.map(q => ({
//     key: q.ID,
//     label: <Title level={5} style={{ margin: 0, color: '#1E3A5F' }}>{q.title}</Title>,
//     children: (
//       <Paragraph className="faq-answer-text">
//         {q.Answers?.find(a => a.isStaff)?.text || 'ยังไม่มีคำตอบ'}
//       </Paragraph>
//     ),
//   }));

//   const tabItems: TabsProps['items'] = [
//     {
//       key: '1',
//       label: (
//         <span>
//           <QuestionCircleOutlined /> คำถามที่พบบ่อย
//         </span>
//       ),
//       children: loadingFaqs ? (
//         <div style={{ textAlign: 'center', padding: '50px' }}>
//           <Spin size="large" />
//         </div>
//       ) : faqs.length > 0 ? (
//         <Collapse
//           accordion
//           className="faq-collapse"
//           bordered={false}
//           items={faqItems}
//           expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}
//         />
//       ) : (
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//           <Text type="secondary">ยังไม่มีคำถามที่พบบ่อย</Text>
//         </div>
//       ),
//     },
//     {
//       key: '2',
//       label: (
//         <span>
//           <FileTextOutlined /> คำร้องของฉัน
//         </span>
//       ),
//       children: loadingRequests ? (
//         <div style={{ textAlign: 'center', padding: '50px' }}>
//           <Spin size="large" />
//         </div>
//       ) : (
//         <List
//           className="my-requests-list"
//           itemLayout="horizontal"
//           dataSource={myRequests}
//           renderItem={item => (
//             <List.Item
//               style={{cursor: 'pointer'}}
//               onClick={() => handleRequestClick(item)}
//               actions={[
//                 <Tag color={item.status === 'pending' ? 'warning' : 'success'}>
//                   {item.status}
//                 </Tag>
//               ]}
//             >
//               <List.Item.Meta
//                 title={<a onClick={() => handleRequestClick(item)}>{item.title}</a>}
//                 description={`ส่งเมื่อ: ${new Date(item.CreatedAt).toLocaleString('th-TH')}`}
//               />
//             </List.Item>
//           )}
//           locale={{ emptyText: "คุณยังไม่มีคำร้องที่เคยส่ง" }}
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="help-center-wrapper">
//       <div className="new-request-button-container">
//         <Button
//           type="primary"
//           size="large"
//           icon={<SendOutlined />}
//           onClick={() => navigate('/help/ask')}
//         >
//           ส่งคำร้องใหม่
//         </Button>
//       </div>

//       <div className="help-center-container">
//         <div className="help-center-header">
//           <Title level={2}>ศูนย์ช่วยเหลือ</Title>
//           <Paragraph>เราพร้อมช่วยเหลือคุณเสมอ! ค้นหาคำตอบจากคำถามที่พบบ่อย หรือส่งคำร้องหาเราโดยตรง</Paragraph>
//           <div className="help-center-search">
//             <Input.Search size="large" placeholder="ค้นหาคำถามที่พบบ่อย..." enterButton="ค้นหา" />
//           </div>
//         </div>

//         <div className="help-center-tabs">
//           <Tabs defaultActiveKey="1" size="large" centered items={tabItems} onTabClick={handleTabClick} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQPage;

// src/pages/StudentPost/FAQPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Typography, Button, Tabs, List, Tag, message, Spin, Collapse, Modal, Descriptions, Card, Divider, Alert, Space } from 'antd';
import type { CollapseProps, TabsProps } from 'antd';
import { QuestionCircleOutlined, SendOutlined, FileTextOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import type { FAQ, RequestTicket } from '../../types';
import './HelpCenter.css';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const API_URL = 'http://localhost:8080/api';

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const navigate = useNavigate();

  const [myRequests, setMyRequests] = useState<RequestTicket[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<RequestTicket | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  const fetchFaqs = async () => {
    setLoadingFaqs(true);
    try {
      const response = await fetch(`${API_URL}/faqs`);
      if (!response.ok) throw new Error('Failed to fetch FAQs');
      const data: FAQ[] = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
      message.error('ไม่สามารถดึงข้อมูล FAQ ได้');
    } finally {
      setLoadingFaqs(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchMyRequests = async () => {
    setLoadingRequests(true);
    try {
      const response = await fetch(`${API_URL}/tickets`);
      if (!response.ok) throw new Error('Failed to fetch user requests');
      const data: RequestTicket[] = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());
      setMyRequests(sortedData);
    } catch (error) {
      console.error(error);
      message.error("ไม่สามารถดึงข้อมูลคำร้องของคุณได้");
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleTabClick = (key: string) => {
    if (key === '2') {
      fetchMyRequests();
    }
  };

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

  const handleRequestClick = async (request: RequestTicket) => {
    setLoadingModal(true);
    setIsModalVisible(true);
    try {
        const response = await fetch(`${API_URL}/tickets/${request.ID}`);
        if (!response.ok) throw new Error('Failed to fetch ticket details');
        const data: RequestTicket = await response.json();
        setSelectedTicket(data);
    } catch (error) {
        message.error("ไม่สามารถโหลดรายละเอียดคำร้องได้");
        setIsModalVisible(false);
    } finally {
        setLoadingModal(false);
    }
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
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
            body: JSON.stringify({ message: replyMessage, is_staff_reply: false }),
        });
        if (!response.ok) throw new Error((await response.json()).error || 'Failed to send reply');
        
        message.success(`ส่งข้อความตอบกลับสำเร็จ!`);
        setReplyMessage('');
        
        const updatedTicketResponse = await fetch(`${API_URL}/tickets/${selectedTicket.ID}`);
        if (!updatedTicketResponse.ok) throw new Error('Failed to re-fetch ticket details');
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

        message.success(`อัปเดตสถานะคำร้องสำเร็จ`);
        fetchMyRequests(); // Re-fetch list to update tag
        const updatedTicketData = await response.json();
        setSelectedTicket(updatedTicketData);

        if (status === 'Resolved') {
            setIsModalVisible(false);
        }

    } catch (error) {
        message.error('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    }
  };
  
  const formatTime = (ts?: string) => ts ? new Date(ts).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : '';

  const faqItems: CollapseProps['items'] = faqs.map(q => ({
    key: q.ID,
    label: <Title level={5} style={{ margin: 0, color: '#1E3A5F' }}>{q.title}</Title>,
    children: <Paragraph className="faq-answer-text">{q.content || 'ยังไม่มีคำตอบ'}</Paragraph>,
  }));

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: <span><QuestionCircleOutlined /> คำถามที่พบบ่อย</span>,
      children: loadingFaqs ? <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
        : faqs.length > 0 ? <Collapse accordion className="faq-collapse" bordered={false} items={faqItems} expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}/>
        : <div style={{ padding: '20px', textAlign: 'center' }}><Text type="secondary">ยังไม่มีคำถามที่พบบ่อย</Text></div>,
    },
    {
      key: '2',
      label: <span><FileTextOutlined /> คำร้องของฉัน</span>,
      children: loadingRequests ? <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
        : <List
            className="my-requests-list"
            itemLayout="horizontal"
            dataSource={myRequests}
            renderItem={item => (
              <List.Item
                style={{cursor: 'pointer'}}
                onClick={() => handleRequestClick(item)}
                actions={[<Tag color={getStatusColor(item.status)}>{getStatusText(item.status)}</Tag>]}
              >
                <List.Item.Meta
                  title={<a>{item.subject}</a>}
                  description={`ส่งเมื่อ: ${formatTime(item.CreatedAt)}`}
                />
              </List.Item>
            )}
            locale={{ emptyText: "คุณยังไม่มีคำร้องที่เคยส่ง" }}
          />,
    },
  ];

  return (
    <>
      <div className="help-center-wrapper">
        <div className="new-request-button-container">
          <Button type="primary" size="large" icon={<SendOutlined />} onClick={() => navigate('/help/ask')}>
            ส่งคำร้องใหม่
          </Button>
        </div>
        <div className="help-center-container">
          <div className="help-center-header">
            <Title level={2}>ศูนย์ช่วยเหลือ</Title>
            <Paragraph>เราพร้อมช่วยเหลือคุณเสมอ! ค้นหาคำตอบจากคำถามที่พบบ่อย หรือส่งคำร้องหาเราโดยตรง</Paragraph>
            <div className="help-center-search">
              <Input.Search size="large" placeholder="ค้นหาคำถามที่พบบ่อย..." enterButton="ค้นหา" />
            </div>
          </div>
          <div className="help-center-tabs">
            <Tabs defaultActiveKey="1" size="large" centered items={tabItems} onTabClick={handleTabClick} />
          </div>
        </div>
      </div>

      <Modal
          title={`สอบถามเรื่อง: ${selectedTicket?.subject}`}
          open={isModalVisible}
          onCancel={handleCancelModal}
          width={800}
          footer={null}
      >
          {loadingModal || !selectedTicket ? (
              <div style={{ textAlign: 'center', padding: '48px' }}><Spin /></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '75vh' }}>
              {selectedTicket.status === 'Awaiting Confirmation' && (
                  <Alert
                      message="เจ้าหน้าที่ได้จบการสนทนาแล้ว"
                      description="หากคุณได้รับคำตอบที่พึงพอใจแล้ว กรุณากด 'ปิดคำร้อง' หากยังต้องการความช่วยเหลือเพิ่มเติม กรุณากด 'ยังต้องการความช่วยเหลือ'"
                      type="info"
                      showIcon
                      style={{ marginBottom: 16 }}
                      action={
                          <Space direction="vertical">
                              <Button size="small" type="primary" onClick={() => handleUpdateStatus('Resolved')}>
                                  ปิดคำร้อง
                              </Button>
                              <Button size="small" onClick={() => handleUpdateStatus('In Progress')}>
                                  ยังต้องการความช่วยเหลือ
                              </Button>
                          </Space>
                      }
                  />
              )}
              <div style={{ flexShrink: 0 }}>
                <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="ผู้ส่งคำร้อง">{selectedTicket.user?.username || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label="สถานะ">
                      <Tag color={getStatusColor(selectedTicket.status)}>
                        {getStatusText(selectedTicket.status)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="วันที่ส่ง">{formatTime(selectedTicket.CreatedAt)}</Descriptions.Item>
                </Descriptions>
                <Title level={5} style={{ marginTop: '16px', marginBottom: '8px' }}>ประวัติการสนทนา</Title>
              </div>

              <div className="conversation-history" style={{ flexGrow: 1, overflowY: 'auto' }}>
                  <div key={`initial-${selectedTicket.ID}`} className="history-entry user-reply">
                      <div className="entry-header">
                          <Text strong>{selectedTicket.user?.username || 'Unknown'}</Text>
                          <Text type="secondary" className="entry-timestamp">{formatTime(selectedTicket.CreatedAt)}</Text>
                      </div>
                      <div className="entry-body">
                          <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{selectedTicket.initial_message}</Paragraph>
                      </div>
                  </div>
                  {(selectedTicket.replies || []).map((reply: any) => (
                      <div key={reply.ID} className={`history-entry ${reply.is_staff_reply ? 'staff-reply' : 'user-reply'}`}>
                          <div className="entry-header">
                              <Text strong>{reply.author?.username || 'Unknown'}</Text>
                              {reply.is_staff_reply && <Tag color="blue">เจ้าหน้าที่</Tag>}
                              <Text type="secondary" className="entry-timestamp">{formatTime(reply.CreatedAt)}</Text>
                          </div>
                          <div className="entry-body">
                              <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{reply.message}</Paragraph>
                          </div>
                      </div>
                  ))}
              </div>
              
              <div style={{ flexShrink: 0, paddingTop: '16px' }}>
                <Divider style={{ margin: '0 0 16px 0' }}/>
                <div className="reply-section">
                    <Title level={5}>ตอบกลับ</Title>
                    <TextArea
                        rows={3}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="พิมพ์ข้อความตอบกลับของคุณ..."
                        disabled={selectedTicket.status !== 'Open' && selectedTicket.status !== 'In Progress'}
                    />
                    <Button
                        type="primary"
                        onClick={handleSendReply}
                        style={{ marginTop: '16px' }}
                        disabled={selectedTicket.status !== 'Open' && selectedTicket.status !== 'In Progress'}
                    >
                        ส่งข้อความ
                    </Button>
                </div>
              </div>
            </div>
          )}
      </Modal>
    </>
  );
};

export default FAQPage;