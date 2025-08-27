// src/components/QA/PostCard.tsx

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiHeart, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import {
  PaperClipOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
  LockOutlined,
  UserOutlined,
  FlagOutlined,
  PictureOutlined,
  CloseCircleFilled,
  GlobalOutlined,
  EditOutlined,
  MessageOutlined,
  PlusOutlined,
  CloseOutlined
} from '@ant-design/icons';
// --- vvvv แก้ไขบรรทัดนี้: ไม่ต้อง import Menu แล้ว vvvv ---
import { Dropdown, Modal, Input, Button, Space, Avatar, Upload, type UploadFile, message, type InputRef, Form, Radio, Tooltip, Tag, Typography } from 'antd';
// --- ^^^^ สิ้นสุดการแก้ไข ^^^^ ---
import type { Post, Comment } from '../../types';

const { Text } = Typography;

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  onAddComment: (id: number, text: string, image?: File, parentId?: number) => void;
  onAddReport: (post: Post, reason: string, details: string) => void;
  onEdit: (id: number, newContent: string, newSkills: string[]) => void;
  onLikeComment: (postId: number, commentId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete, onLike, onAddComment, onAddReport, onEdit, onLikeComment }) => {
  const navigate = useNavigate();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingContent, setEditingContent] = useState(post.content);
  const [editingSkills, setEditingSkills] = useState<string[]>(post.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentFileList, setCommentFileList] = useState<UploadFile[]>([]);
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const mainInputRef = useRef<InputRef>(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [reportForm] = Form.useForm();
  const imageSrc = post.imageUrl;
  const fileHref = post.fileUrl;
  const fileLabel = post.fileName ?? 'ไฟล์แนบ';
  const loggedInUserId = 'johndoe';
  const isMyPost = post.authorId === loggedInUserId;

  useEffect(() => {
    setEditingContent(post.content);
    setEditingSkills(post.skills || []);
  }, [post]);

  const formatTime = (ts?: number | string) => {
    if (!ts) return 'เมื่อสักครู่';
    const date = typeof ts === 'string' ? new Date(ts) : new Date(ts);
    const diff = Date.now() - date.getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'เมื่อสักครู่';
    if (m < 60) return `${m} นาทีที่แล้ว`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} ชม. ที่แล้ว`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d} วันก่อน`;
    return date.toLocaleString('th-TH', { hour12: false });
  };
  
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'คุณต้องการลบโพสต์นี้ใช่หรือไม่?',
      content: 'การกระทำนี้ไม่สามารถย้อนกลับได้',
      okText: 'ลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      onOk: () => onDelete(post.id),
    });
  };

  const handleShowReportModal = () => setIsReportModalVisible(true);
  const handleCancelReportModal = () => {
    setIsReportModalVisible(false);
    reportForm.resetFields();
  };
  const handleFinishReport = (values: { reason: string; details: string }) => {
    onAddReport(post, values.reason, values.details);
    message.success('ขอบคุณสำหรับรายงาน ทางเราจะดำเนินการตรวจสอบโดยเร็วที่สุด');
    handleCancelReportModal();
  };

  const showEditModal = () => {
    setEditingContent(post.content);
    setEditingSkills(post.skills);
    setSkillInput('');
    setIsEditModalVisible(true);
  };

  const handleCancelEditModal = () => setIsEditModalVisible(false);

  const handleSaveEdit = () => {
    onEdit(post.id, editingContent, editingSkills);
    message.success("แก้ไขโพสต์สำเร็จ!");
    setIsEditModalVisible(false);
  };
  
  const handleAddSkillInModal = () => {
      const trimmedInput = skillInput.trim();
      if (trimmedInput && !editingSkills.includes(trimmedInput)) {
          setEditingSkills([...editingSkills, trimmedInput]);
      }
      setSkillInput('');
  };

  const handleRemoveSkillInModal = (removedSkill: string) => {
      setEditingSkills(editingSkills.filter(skill => skill !== removedSkill));
  };


  const menuItems = isMyPost
    ? [
        { key: 'edit', icon: <EditOutlined />, label: 'แก้ไขโพสต์', onClick: showEditModal },
        { key: 'delete', icon: <DeleteOutlined />, label: 'ลบโพสต์', onClick: showDeleteConfirm, danger: true },
      ]
    : [
        { key: 'report', icon: <FlagOutlined />, label: 'รายงาน', onClick: handleShowReportModal },
        { key: 'chat', icon: <MessageOutlined />, label: 'แชท', onClick: () => navigate('/chat') },
      ];

  // --- vvvv ไม่ต้องสร้างตัวแปร <Menu> แล้ว vvvv ---
  // const menu = <Menu items={menuItems} />;
  // --- ^^^^ สิ้นสุดการแก้ไข ^^^^ ---

  const grabFirstFile = (list: UploadFile[]) => {
    const f = list[0]?.originFileObj;
    return f instanceof File ? f : undefined;
  };

  const handleSubmitComment = () => {
    const text = commentText.trim();
    if (!text && commentFileList.length === 0) {
      message.info('พิมพ์ข้อความหรือแนบรูปอย่างน้อย 1 อย่าง');
      return;
    }
    const image = grabFirstFile(commentFileList);
    onAddComment(post.id, text, image, replyingTo?.id);
    setCommentText('');
    setCommentFileList([]);
    setReplyingTo(null);
  };

  const handleSetReply = (comment: Comment) => {
    setReplyingTo(comment);
    mainInputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const commentPreviewUrl = useMemo(() => {
    const f = grabFirstFile(commentFileList);
    return f ? URL.createObjectURL(f) : undefined;
  }, [commentFileList]);

  const renderComment = (c: Comment) => {
    return (
      <div key={c.id} style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div style={{ backgroundColor: '#f0f2f5', padding: '8px 12px', borderRadius: '18px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <strong>{c.author}</strong>
              </div>
              <div style={{ whiteSpace: 'pre-wrap' }}>{c.text}</div>
              {c.imageUrl && (
                <img
                  src={c.imageUrl}
                  alt="comment"
                  style={{ maxWidth: 320, width: '100%', borderRadius: 8, marginTop: 6 }}
                />
              )}
            </div>
            <div style={{ paddingLeft: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#65676b' }}>
                <span
                  style={{ fontWeight: 'bold', cursor: 'pointer', color: c.isLiked ? '#1890ff' : 'inherit' }}
                  onClick={() => onLikeComment(post.id, c.id)}
                >
                  ถูกใจ
                </span>
                {c.likes && c.likes > 0 ? <Text type="secondary" style={{fontSize: '12px'}}>{c.likes}</Text> : null}
                <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSetReply(c)}>ตอบกลับ</span>
                <span>{formatTime(c.createdAt)}</span>
            </div>
            {c.replies?.length ? (
              <div style={{ marginTop: 8 }}>
                {c.replies.map((r) => renderComment(r))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="post-card fb-style">
        <div className="post-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', width: '100%' }}>
          <Link to={`/profile/${post.authorId}`}>
            <FaUserCircle size={40} className="user-avatar" />
          </Link>
          <div className="post-author-info" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <Link to={`/profile/${post.authorId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              <span className="user-name" style={{ fontWeight: 'bold' }}>{post.author}</span>
            </Link>
            <div className="meta-line" style={{ fontSize: '12px', color: '#8a8d91', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>{formatTime(post.createdAt)}</span>
              <span>·</span>
              <Tooltip title={post.privacy === 'public' ? 'สาธารณะ' : 'ส่วนตัว'}>
                {post.privacy === 'public' ? <GlobalOutlined /> : <LockOutlined />}
              </Tooltip>
            </div>
          </div>
          {/* --- vvvv แก้ไข `overlay` เป็น `menu` ตรงนี้ vvvv --- */}
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
              <Button type="text" shape="circle" icon={<FiMoreHorizontal size={20} />} />
          </Dropdown>
          {/* --- ^^^^ สิ้นสุดการแก้ไข ^^^^ --- */}
        </div>

        <p className="post-content" style={{ textAlign: 'left', width: '100%', margin: '8px 0', whiteSpace: 'pre-wrap' }}>{post.content}</p>

        {post.skills && post.skills.length > 0 && (
          <div className="post-skills" style={{ textAlign: 'left', marginTop: '8px' }}>
            <Space size={[0, 8]} wrap>
              {post.skills.map(skill => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </Space>
          </div>
        )}

        {imageSrc && (<img src={imageSrc} alt="Post attachment" className="post-image" />)}
        {fileHref && (<div className="post-attachment" style={{ textAlign: 'left' }}><a href={fileHref} target="_blank" rel="noopener noreferrer"><PaperClipOutlined /> {fileLabel}</a></div>)}
        {post.location && (<div className="post-location" style={{ textAlign: 'left' }}><a href={`http://googleusercontent.com/maps/google.com/1{post.location.lat},${post.location.lng}`} target="_blank" rel="noopener noreferrer"><EnvironmentOutlined /> ดูตำแหน่งที่ตั้งบนแผนที่</a></div>)}

        <div className="post-footer">
          <Button
            type="text"
            icon={<FiHeart fill={post.isLiked ? '#ff4d4f' : 'none'} stroke={post.isLiked ? '#ff4d4f' : 'currentColor'} />}
            className={post.isLiked ? 'action-liked' : ''}
            onClick={() => onLike(post.id)}
            style={{ color: post.isLiked ? '#ff4d4f' : 'inherit' }}
          >
             {post.likes} ถูกใจ
          </Button>
          <Button type="text" icon={<FiMessageSquare />} onClick={() => setIsCommentOpen(true)}>
            {post.comments.length} ความคิดเห็น
          </Button>
        </div>
      </div>

       <Modal
        open={isCommentOpen}
        onCancel={() => { setIsCommentOpen(false); setReplyingTo(null); }}
        footer={null}
        width={720}
        centered
        title={`โพสต์ของ ${post.author}`}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px' }}>
            {post.comments.length > 0 ? post.comments.map(renderComment) : <p>ยังไม่มีความคิดเห็น</p>}
        </div>

        <div className="comment-input-area" style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
            {replyingTo && (
                <div style={{ marginBottom: '8px', padding: '4px 8px', backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>กำลังตอบกลับ: <strong>{replyingTo.author}</strong></span>
                    <Button type="link" size="small" onClick={handleCancelReply}>ยกเลิก</Button>
                </div>
            )}
            <Space.Compact style={{ width: '100%' }}>
              <Input
                ref={mainInputRef}
                placeholder="แสดงความคิดเห็น..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onPressEnter={handleSubmitComment}
              />
              <Upload accept="image/*" maxCount={1} beforeUpload={() => false} fileList={commentFileList} onChange={({ fileList }) => setCommentFileList(fileList)} showUploadList={false}>
                <Button icon={<PictureOutlined />} />
              </Upload>
              <Button type="primary" onClick={handleSubmitComment}>ส่ง</Button>
            </Space.Compact>
            {commentPreviewUrl && (
              <div style={{ marginTop: 8, position: 'relative', display: 'inline-block' }}>
                <img src={commentPreviewUrl} alt="preview" style={{ maxWidth: 280, borderRadius: 8 }} />
                <Button size="small" type="text" icon={<CloseCircleFilled />} onClick={() => setCommentFileList([])} style={{ position: 'absolute', top: -8, right: -8, color: 'white', background: 'rgba(0,0,0,0.5)', borderRadius: '50%' }} />
              </div>
            )}
        </div>
      </Modal>

      <Modal
        title={`รายงานโพสต์ของ ${post.author}`}
        open={isReportModalVisible}
        onCancel={handleCancelReportModal}
        footer={[ <Button key="back" onClick={handleCancelReportModal}>ยกเลิก</Button>, <Button key="submit" type="primary" onClick={() => reportForm.submit()}>ส่งรายงาน</Button> ]}
      >
        <Form form={reportForm} layout="vertical" onFinish={handleFinishReport} initialValues={{ details: '' }}>
          <Form.Item name="reason" label="กรุณาเลือกเหตุผลที่ต้องการรายงาน" rules={[{ required: true, message: 'กรุณาเลือกเหตุผล' }]}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="เนื้อหาไม่เหมาะสม">เนื้อหาไม่เหมาะสม</Radio>
                <Radio value="สแปมหรือทำให้เข้าใจผิด">สแปมหรือทำให้เข้าใจผิด</Radio>
                <Radio value="การกลั่นแกล้งหรือคุกคาม">การกลั่นแกล้งหรือคุกคาม</Radio>
                <Radio value="ข้อมูลเท็จ">ข้อมูลเท็จ</Radio>
                <Radio value="อื่น ๆ">อื่น ๆ (โปรดระบุในรายละเอียด)</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="details" label="รายละเอียดเพิ่มเติม (ถ้ามี)">
            <Input.TextArea rows={4} placeholder="อธิบายเพิ่มเติมเกี่ยวกับปัญหาที่พบ..." />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="แก้ไขโพสต์"
        open={isEditModalVisible}
        onCancel={handleCancelEditModal}
        onOk={handleSaveEdit}
        okText="บันทึก"
        cancelText="ยกเลิก"
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Input.TextArea
              rows={5}
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              placeholder="คุณกำลังหางานอะไรอยู่..."
            />
            <div>
                <p style={{marginBottom: '8px', fontWeight: 500}}>แก้ไขทักษะ:</p>
                <Space.Compact style={{ width: '100%' }}>
                    <Input
                        placeholder="เพิ่มทักษะที่เกี่ยวข้อง..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onPressEnter={handleAddSkillInModal}
                    />
                    <Button icon={<PlusOutlined />} onClick={handleAddSkillInModal} />
                </Space.Compact>
                <div style={{ marginTop: '12px' }}>
                    {editingSkills.map(skill => (
                        <Tag
                            closable
                            onClose={() => handleRemoveSkillInModal(skill)}
                            key={skill}
                            closeIcon={<CloseOutlined />}
                            style={{margin: '4px'}}
                        >
                            {skill}
                        </Tag>
                    ))}
                </div>
            </div>
        </Space>
      </Modal>
    </>
  );
};

export default PostCard;