// src/pages/ProfilePage2/ProfilePage.tsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Avatar, Button, Card, Tabs, List, Rate, Typography, Progress, Divider, Flex, Modal, Form, Input, Upload, message, Space, Tag
} from 'antd';
import {
  EditOutlined, UserOutlined, HomeOutlined, BookOutlined, StarOutlined, UploadOutlined, MessageOutlined, LinkOutlined, CodeOutlined, InfoCircleOutlined
} from '@ant-design/icons';
import PostCard from '../../components/QA/PostCard';
import PostCreator from '../../components/QA/PostCreator';
import type { Post } from '../../types';
import './ProfilePage.css';
import { mockProfileData } from '../profile/index';

const { Text, Title, Paragraph } = Typography;
const { TabPane } = Tabs;

// --- โครงสร้างข้อมูล (เหมือนเดิม) ---
const allUsers = {
    'johndoe': {
        name: 'จอมมาร',
        friendCount: 123,
        avatarUrl: '',
        coverUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop',
        bio: 'Frontend Developer ที่รักในการเรียนรู้เทคโนโลยีใหม่ๆ',
        location: 'นครราชสีมา',
        education: 'มหาวิทยาลัยเทคโนโลยีสุรนารี',
        skills: ['React', 'TypeScript', 'Ant Design', 'Node.js', 'Figma'],
        portfolio: [
            { title: 'เว็บแอปพลิเคชันสำหรับจัดการสต็อก', url: 'https://github.com' },
            { title: 'ออกแบบ UI/UX สำหรับแอปมือถือ', url: 'https://behance.net' },
        ]
    },
    'jane': {
        name: 'สมหญิง ยืนงง',
        friendCount: 45,
        avatarUrl: '',
        coverUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1950&auto=format&fit=crop',
        bio: 'รักการถ่ายภาพและเดินทาง',
        location: 'กรุงเทพมหานคร',
        education: 'มหาวิทยาลัยเกษตรศาสตร์',
        skills: ['Photography', 'Lightroom', 'Content Writing'],
        portfolio: []
    }
}


interface ProfilePageProps {
  posts: Post[];
  onEdit: (id: number, newContent: string, newSkills: string[]) => void;
  handleAddPost: (content: string, privacy: Post['privacy'], skills: string[], file?: File, image?: File, location?: { lat: number, lng: number }) => void;
  handleDeletePost: (id: number) => void;
  handleLikePost: (id: number) => void;
  handleAddComment: (postId: number, text: string, image?: File, parentId?: number) => void;
  onAddReport: (post: Post, reason: string, details: string) => void;
}


const ProfilePage: React.FC<ProfilePageProps> = ({
  posts,
  handleAddPost,
  handleDeletePost,
  handleLikePost,
  handleAddComment,
  onAddReport,
  onEdit
}) => {
  const { userId } = useParams<{ userId: string }>();
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);

  const loggedInUserId = 'johndoe';
  const profileUserId = userId || loggedInUserId;
  const isMyProfile = profileUserId === loggedInUserId;

  const [profileData, setProfileData] = React.useState(allUsers[profileUserId as keyof typeof allUsers]);

  React.useEffect(() => {
    setProfileData(allUsers[profileUserId as keyof typeof allUsers]);
  }, [profileUserId]);

  const userPosts = posts.filter(p => p.authorId === profileUserId);

  const showEditModal = () => {
    form.setFieldsValue({
        bio: profileData.bio,
        location: profileData.location,
        education: profileData.education,
        skills: profileData.skills.join(', '),
        portfolio_title: profileData.portfolio[0]?.title,
        portfolio_url: profileData.portfolio[0]?.url,
    });
    setIsEditModalVisible(true);
  };

  const handleSave = (values: any) => {
    const newSkills = values.skills ? values.skills.split(',').map((s: string) => s.trim()) : [];
    const newPortfolio = values.portfolio_title && values.portfolio_url
        ? [{ title: values.portfolio_title, url: values.portfolio_url }]
        : [];

    setProfileData(prev => ({
        ...prev,
        bio: values.bio,
        location: values.location,
        education: values.education,
        skills: newSkills,
        portfolio: newPortfolio,
    }));
    message.success('บันทึกข้อมูลโปรไฟล์สำเร็จ!');
    setIsEditModalVisible(false);
  };

  const handleCancel = () => setIsEditModalVisible(false);

  const AboutTab = () => (
    <Card bordered={false}>
        <p><HomeOutlined /> อาศัยอยู่ที่ <strong>{profileData.location}</strong></p>
        <p><BookOutlined /> กำลังศึกษาที่ <strong>{profileData.education}</strong></p>
        <Divider />
        <Title level={5}>ทักษะ</Title>
        <div className="skills-container">
            {profileData.skills.map(skill => <Tag color="blue" key={skill}>{skill}</Tag>)}
        </div>
    </Card>
  );

  const ReviewsTab = () => (
    <List
      itemLayout="horizontal"
      dataSource={mockProfileData.reviews.sort((a, b) => b.id - a.id)}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar shape="square" icon={<UserOutlined />} />}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text style={{ fontSize: "14px" }}>{item.reviewer}</Text>
                  <Text type="secondary" style={{ fontSize: "12px", marginLeft: '8px' }}>{item.date}</Text>
                </div>
                <Rate disabled allowHalf defaultValue={item.rating} />
              </div>
            }
            description={ item.comment ? <Text>{item.comment}</Text> : null }
          />
        </List.Item>
      )}
    />
  );

  const PortfolioTab = () => (
      profileData.portfolio.length > 0 ? (
        <List
            dataSource={profileData.portfolio}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<LinkOutlined />}
                        title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                        description={item.url}
                    />
                </List.Item>
            )}
        />
      ) : <Text type="secondary">ยังไม่มีผลงานที่แสดง</Text>
  );

  if (!profileData) {
      return <Card>กำลังโหลดข้อมูลโปรไฟล์...</Card>
  }

  return (
    <>
      <div className="profile-page">
        <div className="profile-header">
          <div
            className="cover-photo"
            style={{ backgroundImage: `url(${profileData.coverUrl})` }}
          ></div>
          <div className="profile-info-bar">
            <div className="profile-avatar-container">
                <Avatar
                    shape="square"
                    size={168}
                    icon={<UserOutlined />}
                    src={profileData.avatarUrl}
                    className="profile-avatar"
                />
            </div>
            <div className="profile-name-bio">
              <h2>{profileData.name}</h2>
              <p>{profileData.friendCount} เพื่อน</p>
              <Text type="secondary">{profileData.bio}</Text>
              
              <div className="profile-rating-bar">
                  <Progress percent={(mockProfileData.rating / 5) * 100} showInfo={false} strokeColor="#0088FF" size="small" />
                  <Flex justify="space-between">
                      <Text strong>ระดับคะแนน: {mockProfileData.rating.toFixed(1)}/5.0</Text>
                      <Text type="secondary">จาก {mockProfileData.reviews.length} รีวิว</Text>
                  </Flex>
              </div>

            </div>
            <div className="profile-actions">
              <Space>
                {isMyProfile ? (
                  <Button type="primary" icon={<EditOutlined />} onClick={showEditModal}>แก้ไขโปรไฟล์</Button>
                ) : (
                  // ✅ ปุ่ม "เพิ่มเพื่อน" ถูกลบออกจากส่วนนี้แล้ว
                  <Link to="/chat">
                    <Button type="primary" icon={<MessageOutlined />}>แชท</Button>
                  </Link>
                )}
              </Space>
            </div>
          </div>
        </div>

        <div className="profile-content-single-column">
            <Card>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><InfoCircleOutlined /> เกี่ยวกับ</span>} key="1">
                        <AboutTab />
                    </TabPane>
                    <TabPane tab="โพสต์" key="2">
                        {isMyProfile && <PostCreator onAddPost={handleAddPost} />}
                        <Space direction="vertical" size="large" style={{ display: 'flex', marginTop: '24px' }}>
                            {userPosts.length > 0 ? (
                                userPosts.map((post) => (
                                    <PostCard key={post.id} post={post} onDelete={handleDeletePost} onLike={handleLikePost} onAddComment={handleAddComment} onAddReport={onAddReport} onEdit={onEdit} />
                                ))
                            ) : (
                                <Card><p>ยังไม่มีโพสต์...</p></Card>
                            )}
                        </Space>
                    </TabPane>
                    <TabPane tab={<span><CodeOutlined /> ผลงาน</span>} key="3">
                        <PortfolioTab />
                    </TabPane>
                    <TabPane tab={<span><StarOutlined /> รีวิว</span>} key="4">
                        <ReviewsTab />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
      </div>

      <Modal
        title="แก้ไขโปรไฟล์"
        open={isEditModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>ยกเลิก</Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>บันทึก</Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="bio" label="คำอธิบายตัวตน">
            <Input.TextArea rows={3} placeholder="บอกเล่าเกี่ยวกับตัวคุณ..." />
          </Form.Item>
          <Form.Item name="location" label="อาศัยอยู่ที่">
            <Input placeholder="เช่น นครราชสีมา" />
          </Form.Item>
          <Form.Item name="education" label="กำลังศึกษาที่">
            <Input placeholder="เช่น มหาวิทยาลัยเทคโนโลยีสุรนารี" />
          </Form.Item>
          <Divider />
          <Form.Item name="skills" label="ทักษะ" extra="ใส่ทักษะโดยคั่นด้วยเครื่องหมายจุลภาค (comma), เช่น React, Figma">
            <Input placeholder="React, Figma, Content Writing" />
          </Form.Item>
          <Title level={5}>ผลงาน (แสดง 1 ชิ้น)</Title>
          <Form.Item name="portfolio_title" label="ชื่อผลงาน">
            <Input placeholder="เช่น เว็บไซต์ E-commerce" />
          </Form.Item>
          <Form.Item name="portfolio_url" label="ลิงก์ผลงาน (URL)">
            <Input placeholder="https://github.com/your-repo" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProfilePage;