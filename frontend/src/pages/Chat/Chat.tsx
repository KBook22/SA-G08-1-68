import React, { useState } from 'react';
import {
  Layout,
  List,
  Avatar,
  Input,
  Button,
  Badge,
  Space,
  Typography,
  Row,
  Col,
} from 'antd';
import {
  BellOutlined,
  PictureOutlined,
  FontSizeOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
  avatar?: string;
}

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  isActive?: boolean;
  lastMessage?: string;
}

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<number>(1);
  const [newMessage, setNewMessage] = useState<string>('');

  const chatUsers: ChatUser[] = [
    { 
      id: 1, 
      name: 'นายจ้าง A', 
      avatar: '🏢', 
      isActive: true,
      lastMessage: 'ไม่มีครับ'
    },
    { id: 2, name: 'นายจ้าง B', avatar: '' },
    { id: 3, name: 'นายจ้าง C', avatar: '' },
    { id: 4, name: 'นายจ้าง D', avatar: '' },
    { id: 5, name: 'นายจ้าง E', avatar: '' },
    { id: 6, name: 'นายจ้าง F', avatar: '' },
    { id: 7, name: 'นายจ้าง G', avatar: '' },
  ];

  const [messages] = useState<Message[]>([
  {
    id: 1,
    sender: 'นักศึกษา C',
    content: 'สวัสดีครับ ที่บริษัทมีที่จอดรถยนต์ในอาคารไหมครับ',
    time: '13.03',
    isOwn: true,
  },
  {
    id: 2,
    sender: 'นายจ้าง A',
    content: 'ไม่มีครับ',
    time: '13.10',
    isOwn: false,
    avatar: '🏢',
  },
  {
    id: 3,
    sender: 'นักศึกษา C',
    content: 'ขอบคุณครับ',
    time: '13.15',
    isOwn: true,
  },
]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedUserData = chatUsers.find(user => user.id === selectedUser);

  return (
    <Layout style={{ height: '90vh' }}>
      {/* Top Header */}
      <Header 
        style={{ 
          backgroundColor: '#fff', 
          borderBottom: '1px solid #f0f0f0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Space size="large">
          <Text style={{ color: '#666', fontWeight: 500 }}>Chat</Text>
          <Badge count={5}>
            <BellOutlined style={{ fontSize: '18px', color: '#666' }} />
          </Badge>
          <span style={{ fontSize: '24px' }}>🇹🇭</span>
          <Text style={{ color: '#1890ff', fontWeight: 500 }}>Profile</Text>
        </Space>
      </Header>

      <Layout>
        {/* Chat Title Header */}
        <div style={{ 
          backgroundColor: '#1e3a8a',
          color: 'white', 
          textAlign: 'center', 
          padding: '16px 0' 
        }}>
          <Title level={2} style={{ color: 'white', margin: 0 }}>
            แชทกับนายจ้าง
          </Title>
        </div>

        <Layout style={{ backgroundColor: '#f5f5f5' }}>
          {/* Sidebar */}
          <Sider 
            width={320} 
            style={{ 
              backgroundColor: '#fff',
              borderRight: '1px solid #f0f0f0'
            }}
          >
            <div style={{ padding: '16px' }}>
              <List
                dataSource={chatUsers}
                renderItem={(user) => (
                  <List.Item
                    onClick={() => setSelectedUser(user.id)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedUser === user.id ? '#e6f7ff' : '#f0f8ff',
                      border: selectedUser === user.id ? '2px solid #91d5ff' : '1px solid transparent',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      padding: '12px 16px',
                      transition: 'all 0.3s'
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        user.avatar === '🏢' ? (
                          <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#ff7a45',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                          }}>
                            🏢
                          </div>
                        ) : (
                          <Avatar 
                            size={48} 
                            style={{ backgroundColor: '#1890ff' }}
                            icon={<UserOutlined />}
                          />
                        )
                      }
                      title={
                        <Text strong style={{ fontSize: '16px' }}>
                          {user.name}
                        </Text>
                      }
                      description={user.lastMessage}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Sider>

          {/* Chat Area */}
          <Layout>
            <Content style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Chat Header */}
              {selectedUserData && (
                <div style={{ 
                  backgroundColor: '#b3d9ff', 
                  padding: '16px 24px',
                  borderBottom: '1px solid #d9d9d9'
                }}>
                  <Text strong style={{ fontSize: '18px' }}>
                    {selectedUserData.name}
                  </Text>
                </div>
              )}

              {/* Messages Area */}
              <div style={{ 
                flex: 1, 
                padding: '24px', 
                overflowY: 'auto',
                backgroundColor: '#fafafa'
              }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {messages.map((message) => (
                    <Row 
                      key={message.id}
                      justify={message.isOwn ? 'end' : 'start'}
                    >
                      <Col>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          gap: '8px',
                          maxWidth: '400px',
                          flexDirection: message.isOwn ? 'row-reverse' : 'row'
                        }}>
                          {!message.isOwn && (
                            <Avatar 
                              size={32}
                              style={{ backgroundColor: '#ff7a45' }}
                            >
                              🏢
                            </Avatar>
                          )}
                          {message.isOwn && (
                            <Avatar 
                              size={32}
                              style={{ backgroundColor: '#666' }}
                              icon={<UserOutlined />}
                            />
                          )}
                          
                          <div>
                            {!message.isOwn && (
                              <div style={{ 
                                marginBottom: '4px', 
                                marginRight: '18px',
                                fontSize: '12px',
                                color: '#666',
                                marginTop: '0px'
                              }}>
                                {message.sender}
                              </div>
                            )}
                            {message.isOwn && (
                              <div style={{ 
                                marginBottom: '4px', 
                                marginRight: '8px',
                                fontSize: '12px',
                                color: '#666',
                                textAlign: 'right',
                                marginTop: '0px'
                              }}>
                                นักศึกษา C
                              </div>
                            )}
                            
                            <div style={{
                              backgroundColor: message.isOwn ? '#666' : '#d9d9d9',
                              color: message.isOwn ? 'white' : '#000',
                              padding: '12px 16px',
                              borderRadius: '16px',
                              maxWidth: '400px',
                              wordWrap: 'break-word'
                            }}>
                              {message.content}
                            </div>
                            
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#999', 
                              marginTop: '4px',
                              textAlign: message.isOwn ? 'right' : 'left',
                              marginLeft: message.isOwn ? '0' : '8px',
                              marginRight: message.isOwn ? '8px' : '0'
                            }}>
                              {message.time}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Space>
              </div>

              {/* Message Input */}
              <div style={{ 
                backgroundColor: '#fff',
                borderTop: '1px solid #f0f0f0',
                padding: '16px 24px'
              }}>
                <Row gutter={12} align="middle">
                  <Col>
                    <Button 
                      type="text" 
                      icon={<PictureOutlined />}
                      size="large"
                    />
                  </Col>
                  <Col>
                    <Button 
                      type="text" 
                      icon={<FontSizeOutlined />}
                      size="large"
                    />
                  </Col>
                  <Col flex="auto">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="พิมพ์ข้อความ..."
                      size="large"
                      style={{ borderRadius: '20px' }}
                    />
                  </Col>
                  <Col>
                    <Button 
                      type="primary"
                      onClick={handleSendMessage}
                      size="large"
                      style={{ borderRadius: '20px' }}
                    >
                      ส่ง
                    </Button>
                  </Col>
                </Row>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Chat;
