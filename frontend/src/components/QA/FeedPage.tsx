// src/components/QA/FeedPage.tsx
import React, { useState } from 'react';
import { Button, Modal, Card, Avatar, Space, Input, Typography } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import PostCard from './PostCard';
import PostCreator from './PostCreator';
import type * as types from '../../types';
import './FeedPage.css';

const { Text } = Typography;

interface FeedPageProps {
  posts: types.Post[];
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  onAddComment: (postId: number, text: string, image?: File, parentId?: number) => void;
  onAddReport: (post: types.Post, reason: string, details: string) => void;
  onAddPost: (content: string, privacy: types.Post['privacy'], skills: string[], file?: File, image?: File, location?: { lat: number, lng: number }) => void;
  onEdit: (id: number, newContent: string, newSkills: string[]) => void;
  onLikeComment: (postId: number, commentId: number) => void; // ✅ เพิ่ม prop
  showCreatePostButton?: boolean;
}

const FeedPage: React.FC<FeedPageProps> = ({
  posts,
  onDelete,
  onLike,
  onAddComment,
  onAddReport,
  onAddPost,
  onEdit,
  onLikeComment, // ✅ รับ prop
  showCreatePostButton = true,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handlePostSubmit = (content: string, privacy: types.Post['privacy'], skills: string[], file?: File, image?: File, location?: { lat: number, lng: number }) => {
    onAddPost(content, privacy, skills, file, image, location);
    setIsModalVisible(false);
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="feed-page-layout">
      <main className="feed-main-content">

        <div className="feed-search-bar">
          <Input
            placeholder="ค้นหาโพสต์จากเนื้อหา, ผู้เขียน, หรือทักษะ..."
            size="large"
            allowClear
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: '20px' }}
          />
        </div>

        {showCreatePostButton && (
          <Card className="feed-post-creator-card">
              <Space style={{ width: '100%' }} align="center">
                  <Avatar size="large" icon={<UserOutlined />} />
                  <Input
                    placeholder="คุณกำลังหางานอะไรอยู่..."
                    size="large"
                    readOnly
                    onClick={showModal}
                    style={{ cursor: 'pointer', borderRadius: '20px', backgroundColor: '#f0f2f5' }}
                  />
              </Space>
          </Card>
        )}

        <Modal
          title="สร้างโพสต์ใหม่"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          <PostCreator onAddPost={handlePostSubmit} />
        </Modal>

        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    onDelete={onDelete}
                    onLike={onLike}
                    onAddComment={onAddComment}
                    onAddReport={onAddReport}
                    onEdit={onEdit}
                    onLikeComment={onLikeComment} // ✅ ส่งต่อไปยัง PostCard
                />
            ))
            ) : (
            <Card><Text type="secondary">ไม่พบโพสต์ที่ตรงกับการค้นหาของคุณ</Text></Card>
            )}
        </Space>
      </main>
    </div>
  );
};

export default FeedPage;