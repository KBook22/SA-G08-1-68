"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Layout, List, Avatar, Input, Button, Space, Typography, Row, Col } from "antd"
import { PictureOutlined, FontSizeOutlined, UserOutlined } from "@ant-design/icons"

const { Sider, Content } = Layout
const { Text, Title } = Typography

// Interface สำหรับข้อมูลข้อความ (ควรตรงกับ entity ChatHistory ใน Backend)
interface ChatHistory {
  id: number
  chatRoomId: number
  message: string
  isOwn: boolean
  sender: string
  time: string
  // ถ้ามี field อื่นๆ เช่น image_url, message_type ให้เพิ่มที่นี่
}

// Interface สำหรับข้อมูลห้องแชท (ควรตรงกับ entity ChatRoom ใน Backend)
interface ChatRoom {
  id: number
  name: string
  avatar: string
  lastMessage?: string
}

const Chat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState<string>("")
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [currentMessages, setCurrentMessages] = useState<ChatHistory[]>([])
  
  // ✅ (1) แทนที่ Mock Data ด้วยการเรียก API เพื่อดึงรายชื่อห้องแชท
  useEffect(() => {
    // สมมติฟังก์ชัน fetchChatRooms() เรียก API ไปที่ backend
    // ตัวอย่าง: axios.get('/api/chat/rooms').then(response => setChatRooms(response.data))
    const fetchChatRooms = async () => {
      // **โค้ดจำลอง: แทนที่ด้วยการเรียก API จริง**
      const mockRooms = [
        { id: 1, name: "นายจ้าง A", avatar: "🏢", lastMessage: "สวัสดีครับ" },
        { id: 2, name: "นายจ้าง B", avatar: "🏢", lastMessage: "ขอบคุณครับ" },
      ]
      setChatRooms(mockRooms)
      // เลือกห้องแรกเป็นค่าเริ่มต้น
      if (mockRooms.length > 0) {
        setSelectedUser(mockRooms[0].id)
      }
    }
    fetchChatRooms()
  }, [])
  
  // ✅ (2) ใช้ useEffect เพื่อโหลดข้อความของห้องแชทที่เลือก
  useEffect(() => {
    if (selectedUser) {
      // สมมติฟังก์ชัน fetchMessages() เรียก API ไปที่ backend ด้วย id ห้องแชท
      // ตัวอย่าง: axios.get(`/api/chat/rooms/${selectedUser}/messages`).then(response => setCurrentMessages(response.data))
      const fetchMessages = async () => {
        // **โค้ดจำลอง: แทนที่ด้วยการเรียก API จริง**
        const mockMessages: ChatHistory[] = [
            { id: 1, chatRoomId: 1, sender: "นักศึกษา C", message: "สวัสดีครับ", time: "13:03", isOwn: true },
            { id: 2, chatRoomId: 1, sender: "นายจ้าง A", message: "สวัสดีครับ", time: "13:05", isOwn: false },
        ]
        setCurrentMessages(mockMessages)
      }
      fetchMessages()
    }
  }, [selectedUser])

  // ✅ (3) แก้ไขฟังก์ชันส่งข้อความให้เรียก API เพื่อบันทึกข้อมูล
  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const newMsg = {
        chatRoomId: selectedUser,
        message: newMessage,
        // เพิ่มข้อมูลอื่นๆ ที่จำเป็นสำหรับ backend
      }
      try {
        // สมมติว่า API สำหรับส่งข้อความคือ /api/chat/send
        // ตัวอย่าง: await axios.post('/api/chat/send', newMsg)
        
        // **โค้ดจำลอง: แทนที่ด้วยการเรียก API จริง**
        const savedMessage = {
          id: Date.now(),
          chatRoomId: selectedUser,
          sender: "นักศึกษา C",
          message: newMessage,
          time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
          isOwn: true,
        }
        
        setCurrentMessages(prev => [...prev, savedMessage])
        setNewMessage("")
      } catch (error) {
        console.error("Failed to send message:", error)
        // แสดงข้อความ error ให้ผู้ใช้ทราบ
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const selectedUserData = chatRooms.find((user) => user.id === selectedUser)
  
  return (
    <Layout style={{ height: "90vh" }}>
      <Layout>
        {/* Chat Title Header */}
        <div
          style={{
            backgroundColor: "#1e3a8a",
            color: "white",
            textAlign: "center",
            padding: "16px 0",
          }}
        >
          <Title level={2} style={{ color: "white", margin: 0 }}>
            แชทกับนายจ้าง
          </Title>
        </div>

        <Layout style={{ backgroundColor: "#f5f5f5" }}>
          {/* Sidebar */}
          <Sider
            width={320}
            style={{
              backgroundColor: "#fff",
              borderRight: "1px solid #f0f0f0",
            }}
          >
            <div style={{ padding: "16px" }}>
              <List
                dataSource={chatRooms}
                renderItem={(user) => (
                  <List.Item
                    onClick={() => setSelectedUser(user.id)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: selectedUser === user.id ? "#e6f7ff" : "#f0f8ff",
                      border: selectedUser === user.id ? "2px solid #91d5ff" : "1px solid transparent",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      padding: "12px 16px",
                      transition: "all 0.3s",
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        user.avatar === "🏢" ? (
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              backgroundColor: "#ff7a45",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "20px",
                            }}
                          >
                            🏢
                          </div>
                        ) : (
                          <Avatar size={48} style={{ backgroundColor: "#1890ff" }} icon={<UserOutlined />} />
                        )
                      }
                      title={
                        <Text strong style={{ fontSize: "16px" }}>
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
            <Content style={{ display: "flex", flexDirection: "column" }}>
              {/* Chat Header */}
              {selectedUserData && (
                <div
                  style={{
                    backgroundColor: "#b3d9ff",
                    padding: "16px 24px",
                    borderBottom: "1px solid #d9d9d9",
                  }}
                >
                  <Text strong style={{ fontSize: "18px" }}>
                    {selectedUserData.name}
                  </Text>
                </div>
              )}

              {/* Messages Area */}
              <div
                style={{
                  flex: 1,
                  padding: "24px",
                  overflowY: "auto",
                  backgroundColor: "#fafafa",
                }}
              >
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  {currentMessages.map((message) => (
                    <Row key={message.id} justify={message.isOwn ? "end" : "start"}>
                      <Col>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "8px",
                            maxWidth: "400px",
                            flexDirection: message.isOwn ? "row-reverse" : "row",
                          }}
                        >
                          {!message.isOwn && (
                            <Avatar size={32} style={{ backgroundColor: "#ff7a45" }}>
                              🏢
                            </Avatar>
                          )}
                          {message.isOwn && (
                            <Avatar size={32} style={{ backgroundColor: "#666" }} icon={<UserOutlined />} />
                          )}

                          <div>
                            {!message.isOwn && (
                              <div
                                style={{
                                  marginBottom: "4px",
                                  marginRight: "18px",
                                  fontSize: "12px",
                                  color: "#666",
                                  marginTop: "0px",
                                }}
                              >
                                {message.sender}
                              </div>
                            )}
                            {message.isOwn && (
                              <div
                                style={{
                                  marginBottom: "4px",
                                  marginRight: "8px",
                                  fontSize: "12px",
                                  color: "#666",
                                  textAlign: "right",
                                  marginTop: "0px",
                                }}
                              >
                                นักศึกษา C
                              </div>
                            )}

                            <div
                              style={{
                                backgroundColor: message.isOwn ? "#666" : "#d9d9d9",
                                color: message.isOwn ? "white" : "#000",
                                padding: "12px 16px",
                                borderRadius: "16px",
                                maxWidth: "400px",
                                wordWrap: "break-word",
                              }}
                            >
                              {message.message}
                            </div>

                            <div
                              style={{
                                fontSize: "12px",
                                color: "#999",
                                marginTop: "4px",
                                textAlign: message.isOwn ? "right" : "left",
                                marginLeft: message.isOwn ? "0" : "8px",
                                marginRight: message.isOwn ? "8px" : "0",
                              }}
                            >
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
              <div
                style={{
                  backgroundColor: "#fff",
                  borderTop: "1px solid #f0f0f0",
                  padding: "16px 24px",
                }}
              >
                <Row gutter={12} align="middle">
                  <Col>
                    <Button type="text" icon={<PictureOutlined />} size="large" />
                  </Col>
                  <Col>
                    <Button type="text" icon={<FontSizeOutlined />} size="large" />
                  </Col>
                  <Col flex="auto">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="พิมพ์ข้อความ..."
                      size="large"
                      style={{ borderRadius: "20px" }}
                    />
                  </Col>
                  <Col>
                    <Button type="primary" onClick={handleSendMessage} size="large" style={{ borderRadius: "20px" }}>
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
  )
}

export default Chat