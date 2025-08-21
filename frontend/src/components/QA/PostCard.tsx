import React, { useMemo, useState, useRef } from 'react';
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
} from '@ant-design/icons';
import { Dropdown, Menu, Modal, Input, Button, Space, Avatar, Upload, type UploadFile, message, type InputRef, Form, Radio, Tooltip } from 'antd';
import type { Post, Comment } from '../types';

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  onLike: (id: number) => void;
  onAddComment: (id: number, text: string, image?: File, parentId?: number) => void;
  onAddReport: (post: Post, reason: string, details: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete, onLike, onAddComment, onAddReport }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentFileList, setCommentFileList] = useState<UploadFile[]>([]);
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const mainInputRef = useRef<InputRef>(null);

  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [reportForm] = Form.useForm();
  
  const imageSrc = post.imageUrl ?? (post.image ? URL.createObjectURL(post.image) : null);
  const fileHref = post.fileUrl ?? (post.file ? URL.createObjectURL(post.file) : null);
  const fileLabel = post.fileName ?? post.file?.name ?? 'ไฟล์แนบ';

  const formatTime = (ts?: number) => {
    if (!ts) return 'เมื่อสักครู่';
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'เมื่อสักครู่';
    if (m < 60) return `${m} นาทีที่แล้ว`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} ชม. ที่แล้ว`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d} วันก่อน`;
    return new Date(ts).toLocaleString('th-TH', { hour12: false });
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

  const handleShowReportModal = () => {
    setIsReportModalVisible(true);
  };

  const handleCancelReportModal = () => {
    setIsReportModalVisible(false);
    reportForm.resetFields();
  };

  const handleFinishReport = (values: { reason: string; details: string }) => {
    onAddReport(post, values.reason, values.details);
    message.success('ขอบคุณสำหรับรายงาน ทางเราจะดำเนินการตรวจสอบโดยเร็วที่สุด');
    handleCancelReportModal();
  };
  
  const menu = (
    <Menu>
      <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={showDeleteConfirm}>
        ลบโพสต์
      </Menu.Item>
      <Menu.Item key="report" icon={<FlagOutlined />} onClick={handleShowReportModal}>
        รายงาน
      </Menu.Item>
    </Menu>
  );

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
            
            <div style={{ paddingLeft: '12px', display: 'flex', gap: '8px', fontSize: '12px', color: '#65676b' }}>
                <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>ถูกใจ</span>
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
          <FaUserCircle size={40} className="user-avatar" />
          <div className="post-author-info" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <span className="user-name" style={{ fontWeight: 'bold' }}>{post.author}</span>
            <div className="meta-line" style={{ fontSize: '12px', color: '#8a8d91', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>{formatTime(post.createdAt)}</span>
              <span>·</span>
              <Tooltip title={post.privacy === 'public' ? 'สาธารณะ' : 'ส่วนตัว'}>
                {post.privacy === 'public' ? <GlobalOutlined /> : <LockOutlined />}
              </Tooltip>
            </div>
          </div>
          <Dropdown overlay={menu} trigger={['click']}>
              <Button type="text" shape="circle" icon={<FiMoreHorizontal size={20} />} />
          </Dropdown>
        </div>
        
        <p className="post-content" style={{ textAlign: 'left', width: '100%', margin: '8px 0' }}>{post.content}</p>

        {imageSrc && (<img src={imageSrc} alt="Post attachment" className="post-image" />)}
        {fileHref && (<div className="post-attachment" style={{ textAlign: 'left' }}><a href={fileHref} target="_blank" rel="noopener noreferrer"><PaperClipOutlined /> {fileLabel}</a></div>)}
        {post.location && (<div className="post-location" style={{ textAlign: 'left' }}><a href={`http://googleusercontent.com/maps/google.com/1{post.location.lat},${post.location.lng}`} target="_blank" rel="noopener noreferrer"><EnvironmentOutlined /> ดูตำแหน่งที่ตั้งบนแผนที่</a></div>)}

        <div className="post-footer">
          <Button 
            type="text" 
            icon={
                <FiHeart 
                    fill={post.isLiked ? '#ff4d4f' : 'none'} 
                    stroke={post.isLiked ? '#ff4d4f' : 'currentColor'}
                />
            } 
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
    </>
  );
};

export default PostCard;