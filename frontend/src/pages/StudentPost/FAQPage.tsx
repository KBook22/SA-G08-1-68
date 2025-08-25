// src/pages/StudentPost/FAQPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Typography,
  Button,
  Tabs,
  Collapse,
  List,
  Tag,
  Empty,
  Divider,
  Space,
  message,
  Avatar,
  Form
} from 'antd';
import {
  QuestionCircleOutlined,
  SendOutlined,
  FileTextOutlined,
  PlusOutlined,
  MinusOutlined,
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  LikeFilled,
  DislikeFilled
} from '@ant-design/icons';
import type { Question } from '../../types';
import './HelpCenter.css';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { TextArea } = Input;

// สร้าง Type สำหรับ Comment ภายใน FAQ
interface FaqComment {
    author: string;
    text: string;
    timestamp: string;
}

// Custom Comment Component
const CustomComment = ({ author, avatar, content, datetime }: any) => (
  <div className="custom-comment">
    <div className="custom-comment-avatar">
      {avatar}
    </div>
    <div className="custom-comment-content">
      <div className="custom-comment-author">
        {author}
        <span className="custom-comment-datetime">{datetime}</span>
      </div>
      <div className="custom-comment-text">{content}</div>
    </div>
  </div>
);

// Editor สำหรับส่ง Comment
const CommentEditor = ({ onChange, onSubmit, submitting, value }: any) => (
  <>
    <Form.Item>
      <TextArea rows={3} onChange={onChange} value={value} placeholder="แสดงความคิดเห็นของคุณ..." />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        ส่งความคิดเห็น
      </Button>
    </Form.Item>
  </>
);

// 🔄 แก้ไข: เพิ่ม Props กลับเข้ามา
interface FAQPageProps {
  questions: Question[];
  myRequests: Question[];
}

const FAQPage: React.FC<FAQPageProps> = ({ questions, myRequests }) => {
  const [faqs, setFaqs] = React.useState<Question[]>([]);
  const [feedback, setFeedback] = React.useState<{ [key: number]: 'yes' | 'no' | null }>({});
  
  const [comments, setComments] = React.useState<{ [key: number]: FaqComment[] }>({});
  const [commentInput, setCommentInput] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // 🔄 แก้ไข: ใช้ข้อมูลจาก props แทนข้อมูลจำลอง
    setFaqs(questions.filter(q => q.isFAQ));
  }, [questions]);

  const handleFeedback = (id: number, type: 'yes' | 'no') => {
    setFeedback(prev => ({ ...prev, [id]: type }));
    message.success('ขอบคุณสำหรับความคิดเห็น!');
  };

  const handleCommentSubmit = (id: number) => {
    if (!commentInput.trim()) {
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      const newComment: FaqComment = {
        author: 'ผู้ใช้งาน',
        text: commentInput,
        timestamp: new Date().toLocaleString('th-TH'),
      };
      setComments(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), newComment],
      }));
      setCommentInput('');
    }, 500);
  };

  const handleRequestClick = (request: Question) => {
    const hasAdminReply = request.answers.some(ans => ans.isStaff);
    if (hasAdminReply) {
      navigate(`/help/request/${request.id}`);
    } else {
      navigate(`/help/request-status/${request.id}`);
    }
  };

  return (
    <div className="help-center-wrapper">
      <div className="new-request-button-container">
        <Button
          type="primary"
          size="large"
          icon={<SendOutlined />}
          onClick={() => navigate('/help/ask')}
        >
          ส่งคำร้องใหม่
        </Button>
      </div>

      <div className="help-center-container">
        <div className="help-center-header">
          <Title level={2}>ศูนย์ช่วยเหลือ</Title>
          <Paragraph>เราพร้อมช่วยเหลือคุณเสมอ! ค้นหาคำตอบจากคำถามที่พบบ่อย หรือส่งคำร้องหาเราโดยตรง</Paragraph>
          <div className="help-center-search">
            <Input.Search size="large" placeholder="ค้นหาคำถามที่พบบ่อย..." enterButton="ค้นหา" />
          </div>
        </div>

        <div className="help-center-tabs">
          <Tabs defaultActiveKey="1" size="large" centered>
            <TabPane tab={<span><QuestionCircleOutlined /> คำถามที่พบบ่อย</span>} key="1">
              <Collapse
                accordion
                className="faq-collapse"
                bordered={false}
                expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}
              >
                {faqs.map(q => (
                  <Panel
                    header={<Title level={5} style={{ margin: 0, color: '#1E3A5F' }}>{q.title}</Title>}
                    key={q.id}
                  >
                    <Paragraph className="faq-answer-text">
                      {q.answers.find(a => a.isStaff)?.text || 'ไม่มีคำตอบ'}
                    </Paragraph>
                    <Divider />
                    
                    <div className="faq-feedback-actions">
                      <Text strong>บทความนี้มีประโยชน์หรือไม่?</Text>
                      <Space style={{ marginLeft: 16 }}>
                        <Button
                          type={feedback[q.id] === 'yes' ? 'primary' : 'default'}
                          icon={feedback[q.id] === 'yes' ? <LikeFilled /> : <LikeOutlined />}
                          onClick={() => handleFeedback(q.id, 'yes')}
                        >
                          มีประโยชน์
                        </Button>
                        <Button
                          danger={feedback[q.id] === 'no'}
                          type={feedback[q.id] === 'no' ? 'primary' : 'default'}
                          icon={feedback[q.id] === 'no' ? <DislikeFilled /> : <DislikeOutlined />}
                          onClick={() => handleFeedback(q.id, 'no')}
                        >
                          ไม่มีประโยชน์
                        </Button>
                      </Space>
                    </div>

                    <Divider><Text type="secondary">แสดงความคิดเห็น</Text></Divider>

                    {comments[q.id] && comments[q.id].length > 0 && (
                      <List
                        className="comment-list"
                        dataSource={comments[q.id]}
                        itemLayout="horizontal"
                        renderItem={props => (
                          <li>
                            <CustomComment 
                              author={<Text strong>{props.author}</Text>}
                              avatar={<Avatar icon={<UserOutlined />} />}
                              content={<p>{props.text}</p>}
                              datetime={<Text type="secondary">{props.timestamp}</Text>}
                            />
                          </li>
                        )}
                      />
                    )}

                    <CustomComment
                      avatar={<Avatar icon={<UserOutlined />} />}
                      content={
                        <CommentEditor
                          onChange={(e: any) => setCommentInput(e.target.value)}
                          onSubmit={() => handleCommentSubmit(q.id)}
                          submitting={submitting}
                          value={commentInput}
                        />
                      }
                    />
                  </Panel>
                ))}
              </Collapse>
            </TabPane>

            {/* --- 🔄 แท็บ "คำร้องของฉัน" ที่นำกลับมา --- */}
            <TabPane
              tab={<span><FileTextOutlined /> คำร้องของฉัน</span>}
              key="2"
            >
              <List
                className="my-requests-list"
                itemLayout="horizontal"
                dataSource={myRequests}
                renderItem={item => {
                  const hasAdminReply = item.answers.some(ans => ans.isStaff);
                  return (
                    <List.Item
                      style={{cursor: 'pointer'}}
                      onClick={() => handleRequestClick(item)}
                      actions={[
                        <div className="request-item-status">
                          {hasAdminReply ? (
                            <Tag color="success">ตอบกลับแล้ว</Tag>
                          ) : (
                            <Tag color="warning">รอการตอบกลับ</Tag>
                          )}
                        </div>
                      ]}
                    >
                      <List.Item.Meta
                        title={<a onClick={() => handleRequestClick(item)}>{item.title}</a>}
                        description={`ส่งเมื่อ: ${new Date(item.id).toLocaleString('th-TH')}`}
                      />
                    </List.Item>
                  );
                }}
                locale={{ emptyText: "คุณยังไม่มีคำร้องที่เคยส่ง" }}
              />
            </TabPane>
            {/* --- สิ้นสุดส่วนที่นำกลับมา --- */}

          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;