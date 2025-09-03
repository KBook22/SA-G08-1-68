// src/components/QA/FeedPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Card, Avatar, Space, Input, Typography, message, Spin, Alert } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import PostCard from './PostCard';
import PostCreator from './PostCreator';
import type { FeedPost } from '../../types'; // Changed from * as types to specific import
import { getStudentProfilePosts } from '../../services/studentPostService'; // Import fetching service
import { Post as APIPost, Update as APIUpdate, Delete as APIDelete } from '../../services/https'; // Removed unused APIGet
import './FeedPage.css';

const { Text } = Typography;

// Remove FeedPageProps interface as component will manage its own state

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<FeedPost[]>([]); // Use FeedPost type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getStudentProfilePosts();
      // Assuming the response from getStudentProfilePosts is an array of posts or similar structure
      if (Array.isArray(response)) {
        setPosts(response);
      } else {
        setPosts([]); // Handle case where response is not an array
      }
    } catch (err: any) {
      console.error('Failed to fetch posts:', err);
      setError(err.message || 'Error fetching posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // Removed handleAddPost function as PostCreator now handles its own logic

  const handleDeletePost = async (id: number) => {
    try {
      const response = await APIDelete(`/api/student-profile-posts/${id}`); // Assuming API endpoint
      if (response && response.status === 200) {
        message.success('Post deleted successfully!');
        await fetchPosts();
      } else {
        message.error(response?.data?.error || 'Failed to delete post.');
      }
    } catch (err: any) {
      message.error(err.message || 'Error deleting post.');
    }
  };

  const handleLikePost = async (id: number) => {
    try {
      const response = await APIPost(`/api/student-profile-posts/${id}/like`, {}); // Assuming API endpoint
      if (response && response.status === 200) {
        message.success('Post liked!');
        await fetchPosts();
      } else {
        message.error(response?.data?.error || 'Failed to like post.');
      }
    } catch (err: any) {
      message.error(err.message || 'Error liking post.');
    }
  };

  const handleAddComment = async (postId: number, text: string, image?: File, parentId?: number) => {
    try {
      const payload = { text, image, parentId };
      const response = await APIPost(`/api/student-profile-posts/${postId}/comments`, payload); // Assuming API endpoint
      if (response && response.status === 200) {
        message.success('Comment added!');
        await fetchPosts();
      } else {
        message.error(response?.data?.error || 'Failed to add comment.');
      }
    } catch (err: any) {
      message.error(err.message || 'Error adding comment.');
    }
  };

  const onAddReport = async (post: FeedPost, reason: string, details: string) => {
    try {
      const payload = { postId: post.ID, reason, details };
      const response = await APIPost('/api/reports', payload); // Assuming API endpoint
      if (response && response.status === 200) {
        message.success('Report submitted!');
      } else {
        message.error(response?.data?.error || 'Failed to submit report.');
      }
    } catch (err: any) {
      message.error(err.message || 'Error submitting report.');
    }
  };

  const onEdit = async (id: number, newContent: string, newSkills: string[]) => {
    try {
      const payload = { content: newContent, skills: newSkills };
      const response = await APIUpdate(`/api/student-profile-posts/${id}`, payload); // Assuming API endpoint
      if (response && response.status === 200) {
        message.success('Post updated!');
        await fetchPosts();
      } else {
        message.error(response?.data?.error || 'Failed to update post.');
      }
    } catch (err: any) {
      message.error(err.message || 'Error updating post.');
    }
  };

  const onLikeComment = async (postId: number, commentId: number) => {
    try {
      const response = await APIPost(`/api/student-profile-posts/${postId}/comments/${commentId}/like`, {}); // Assuming API endpoint
      if (response && response.status === 200) {
        message.success('Comment liked!');
        await fetchPosts();
      } else {
        message.error(response?.data?.error || 'Failed to like comment.');
      }
    } catch (err: any) {
      message.error(err.message || 'Error liking comment.');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.skills || []).some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase())) // Explicitly type skill as string
  );

  if (loading) {
    return <div className="loading-container"><Spin size="large" /></div>;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

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

        {
          // showCreatePostButton is removed as it's not a prop anymore. 
          // If needed, it can be controlled by internal state or context.
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
        }

        <Modal
          title="สร้างโพสต์ใหม่"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          {/* PostCreator will now handle its own post addition and then notify FeedPage to refresh */}
          <PostCreator onSuccess={fetchPosts} />
        </Modal>

        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
                <PostCard
                    key={post.ID}
                    post={post}
                    onDelete={handleDeletePost}
                    onLike={handleLikePost}
                    onAddComment={handleAddComment}
                    onAddReport={onAddReport}
                    onEdit={onEdit}
                    onLikeComment={onLikeComment}
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