import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Avatar,
  Input,
  Button,
  Divider,
  Tag,
  Result,
  Card,
  message,
  Space,
  Upload,
  type UploadFile,
  type InputRef
} from 'antd';
import { UserOutlined, ClockCircleOutlined, PictureOutlined, CloseCircleFilled } from '@ant-design/icons';
import type { Question, Answer } from '../../types';

const { Title, Paragraph, Text } = Typography;

interface QuestionDetailPageProps {
  questions: Question[];
  onAddAnswer: (questionId: number, answerText: string, author?: string, parentId?: number, image?: File) => void;
}

const QuestionDetailPage: React.FC<QuestionDetailPageProps> = ({ questions, onAddAnswer }) => {
  // ✅ 1. ย้าย Hooks ทั้งหมดขึ้นมาไว้บนสุด
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [commentText, setCommentText] = useState('');
  const [commentFileList, setCommentFileList] = useState<UploadFile[]>([]);
  const [replyingTo, setReplyingTo] = useState<Answer | null>(null);
  const mainInputRef = useRef<InputRef>(null);

  // ✅ 2. ใช้ useEffect ในการหาข้อมูล question หลังจากที่ Component Render แล้ว
  useEffect(() => {
    if (id && questions.length > 0) {
        const allQuestions = JSON.parse(localStorage.getItem('allQuestions') || '[]');
        const foundQuestion = allQuestions.find((q: Question) => q.id.toString() === id);
        setQuestion(foundQuestion || null);
    }
  }, [id, questions]);

  const commentPreviewUrl = useMemo(() => {
    const f = commentFileList?.[0]?.originFileObj;
    return f instanceof File ? URL.createObjectURL(f) : undefined;
  }, [commentFileList]);

  // ✅ 3. ทำการตรวจสอบและ return หลังจากเรียกใช้ Hooks ทั้งหมดแล้ว
  if (!question) {
    return <Result status="404" title="404" subTitle={`ขออภัย, ไม่พบคำถาม ID: ${id}`} />;
  }

  const handleSendComment = () => {
    if (!commentText.trim() && commentFileList.length === 0) {
      message.warn('กรุณาพิมพ์ข้อความหรือแนบรูปอย่างน้อย 1 อย่าง');
      return;
    }
    const image = grabFirstFile(commentFileList);
    onAddAnswer(question.id, commentText.trim(), 'ผู้ใช้งาน', replyingTo?.id, image);
    setCommentText('');
    setCommentFileList([]);
    setReplyingTo(null);
  };

  const handleSetReply = (answer: Answer) => {
    setReplyingTo(answer);
    mainInputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const grabFirstFile = (list: UploadFile[]) => {
    return list?.[0]?.originFileObj as File | undefined;
  };

  const formatTime = (ts?: number) => {
    if (!ts) return '';
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
  
  const renderComment = (ans: Answer) => (
    <div key={ans.id} style={{ display: 'flex', gap: 8, marginBottom: 12, marginLeft: ans.parentId ? 20 : 0 }}>
      <Avatar size="small" icon={<UserOutlined />} />
      <div>
        <div style={{ backgroundColor: '#f0f2f5', padding: '8px 12px', borderRadius: '18px', textAlign: 'left' }}>
            <Text strong>{ans.author}</Text>
            {ans.isStaff && <Tag color="blue" style={{marginLeft: 8}}>แอดมิน</Tag>}
            <div style={{ whiteSpace: 'pre-wrap' }}>{ans.text}</div>
            {ans.imageUrl && (
              <img
                src={ans.imageUrl}
                alt="comment"
                style={{ maxWidth: 320, width: '100%', borderRadius: 8, marginTop: 6 }}
              />
            )}
        </div>
        <div style={{ paddingLeft: '12px', display: 'flex', gap: '8px', fontSize: '12px', color: '#65676b' }}>
            <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSetReply(ans)}>ตอบกลับ</span>
            <span>{formatTime(ans.createdAt)}</span>
        </div>
        <div style={{ marginTop: 8, marginLeft: 20 }}>
            {question.answers.filter(reply => reply.parentId === ans.id).map(renderComment)}
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <Title level={3}>{question.title}</Title>
      <Paragraph type="secondary">โดย: {question.author}</Paragraph>
      <Divider />
      
      <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '16px' }}>
          {question.answers.filter(ans => !ans.parentId).map(renderComment)}
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
              onPressEnter={handleSendComment}
            />
            <Upload accept="image/*" maxCount={1} beforeUpload={() => false} fileList={commentFileList} onChange={({ fileList }) => setCommentFileList(fileList)} showUploadList={false}>
              <Button icon={<PictureOutlined />} />
            </Upload>
            <Button type="primary" onClick={handleSendComment}>ส่ง</Button>
          </Space.Compact>
          {commentPreviewUrl && (
            <div style={{ marginTop: 8, position: 'relative', display: 'inline-block' }}>
              <img src={commentPreviewUrl} alt="preview" style={{ maxWidth: 280, borderRadius: 8 }} />
              <Button size="small" type="text" icon={<CloseCircleFilled />} onClick={() => setCommentFileList([])} style={{ position: 'absolute', top: -8, right: -8, color: 'white', background: 'rgba(0,0,0,0.5)', borderRadius: '50%' }} />
            </div>
          )}
      </div>
    </Card>
  );
};

export default QuestionDetailPage;