// src/components/QA/FeedPage.tsx
import React, { useState } from 'react';
import { Button, Modal, Card } from 'antd'; // <<< แก้ไขบรรทัดนี้: เพิ่ม Card เข้ามา
import { PlusOutlined } from '@ant-design/icons';
import PostCard from './PostCard';
import PostCreator from './PostCreator';
import type { Post } from '../types';

interface FeedPageProps {
  posts: Post[];
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  onAddComment: (postId: number, text: string, image?: File, parentId?: number) => void;
  onAddReport: (post: Post, reason: string, details: string) => void;
  onAddPost: (content: string, privacy: Post['privacy'], file?: File, image?: File, location?: { lat: number, lng: number }) => void;
}

const FeedPage: React.FC<FeedPageProps> = ({
  posts,
  onDelete,
  onLike,
  onAddComment,
  onAddReport,
  onAddPost,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePostSubmit = (content: string, privacy: Post['privacy'], file?: File, image?: File, location?: { lat: number, lng: number }) => {
    onAddPost(content, privacy, file, image, location);
    setIsModalVisible(false);
  };


  return (
    <main className="feed-container">
      <Card style={{ marginBottom: 16, width: '100%', maxWidth: 600 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          block
        >
          สร้างโพสต์
        </Button>
      </Card>

      <Modal
        title="สร้างโพสต์ใหม่"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <PostCreator onAddPost={handlePostSubmit} />
      </Modal>

      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={onDelete}
            onLike={onLike}
            onAddComment={onAddComment}
            onAddReport={onAddReport}
          />
        ))
      ) : (
        <p>ยังไม่มีโพสต์...</p>
      )}
    </main>
  );
};

export default FeedPage;