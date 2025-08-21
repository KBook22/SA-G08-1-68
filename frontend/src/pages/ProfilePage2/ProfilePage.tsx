// src/pages/ProfilePage2/ProfilePage.tsx

import React from 'react';
import { Avatar, Button, Card, Tabs } from 'antd';
import { EditOutlined, UserOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
// แก้ไข 2 บรรทัดนี้:
import PostCreator from '../../components/QA/PostCreator';
import FeedPage from '../../components/QA/FeedPage';
import type { Post } from '../../types';
import './ProfilePage.css';

interface ProfilePageProps {
  posts: Post[];
  handleAddPost: (content: string, privacy: Post['privacy'], file?: File, image?: File, location?: { lat: number, lng: number }) => void;
  handleDeletePost: (id: number) => void;
  handleLikePost: (id: number) => void;
  handleAddComment: (postId: number, text: string, image?: File, parentId?: number) => void;
  onAddReport: (post: Post, reason: string, details: string) => void;
}

const currentUser = {
  name: 'จอมมาร',
  friendCount: 123,
  avatarUrl: '', 
  coverUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop'
};

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  posts, 
  handleAddPost,
  handleDeletePost,
  handleLikePost,
  handleAddComment,
  onAddReport
}) => {
  const userPosts = posts.filter(p => p.author === currentUser.name);

  const items = [
    {
      key: '1',
      label: 'โพสต์',
      children: (
        <div className="profile-right-col">
          <PostCreator onAddPost={handleAddPost} />
          <FeedPage 
            posts={userPosts} 
            onDelete={handleDeletePost}
            onLike={handleLikePost}
            onAddComment={handleAddComment}
            onAddReport={onAddReport}
          />
        </div>
      ),
    },
    {
      key: '2',
      label: 'เกี่ยวกับ',
      children: <Card>ข้อมูลส่วนตัวจะแสดงที่นี่</Card>,
    },
    {
      key: '3',
      label: 'เพื่อน',
      children: <Card>รายชื่อเพื่อนจะแสดงที่นี่</Card>,
    },
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div 
          className="cover-photo" 
          style={{ backgroundImage: `url(${currentUser.coverUrl})` }}
        ></div>
        <div className="profile-info-container">
          <div className="profile-details">
            <Avatar 
              size={168} 
              icon={<UserOutlined />} 
              src={currentUser.avatarUrl}
              style={{ border: '4px solid white' }}
            />
            <div className="profile-name-actions">
              <div className="profile-name">
                <h2>{currentUser.name}</h2>
                <p>{currentUser.friendCount} เพื่อน</p>
              </div>
              <div className="profile-actions">
                <Button type="primary" icon={<EditOutlined />}>แก้ไขโปรไฟล์</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-left-col">
          <Card title="เกี่ยวกับ">
            <p><HomeOutlined /> อาศัยอยู่ที่ <strong>นครราชสีมา</strong></p>
            <p><BookOutlined /> กำลังศึกษาที่ <strong>มหาวิทยาลัยเทคโนโลยีสุรนารี</strong></p>
          </Card>
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default ProfilePage;