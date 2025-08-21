import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, List, Modal, message, Typography, Popconfirm, Avatar, Tag, Space, Upload, type InputRef, type UploadFile } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MessageOutlined, UserOutlined, PictureOutlined, CloseCircleFilled } from '@ant-design/icons';
import type { Question, Answer } from '../../types';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface ManageFaqPageProps {
    questions: Question[];
    onAddAnswer: (questionId: number, answerText: string, author?: string, parentId?: number, image?: File) => void;
    onEditAnswer: (questionId: number, answerId: number, newText: string) => void;
    onDeleteAnswer: (questionId: number, answerId: number) => void;
}

const ManageFaqPage: React.FC<ManageFaqPageProps> = ({ questions, onAddAnswer, onEditAnswer, onDeleteAnswer }) => {
    const [faqs, setFaqs] = useState<Question[]>([]);
    const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
    const [editingFaq, setEditingFaq] = useState<Question | null>(null);
    const [selectedFaq, setSelectedFaq] = useState<Question | null>(null);
    const [form] = Form.useForm();

    // States for comment section
    const [commentText, setCommentText] = useState('');
    const [editingComment, setEditingComment] = useState<Answer | null>(null);
    const [editingText, setEditingText] = useState('');
    const mainInputRef = useRef<InputRef>(null);

    useEffect(() => {
        setFaqs(questions.filter((q: Question) => q.isFAQ));
    }, [questions]);

    const showFaqModal = (faq?: Question) => {
        if (faq) {
            setEditingFaq(faq);
            form.setFieldsValue({ title: faq.title, answer: faq.answers.find(a => a.isStaff)?.text });
        } else {
            setEditingFaq(null);
            form.resetFields();
        }
        setIsFaqModalVisible(true);
    };

    const showCommentModal = (faq: Question) => {
        setSelectedFaq(faq);
        setIsCommentModalVisible(true);
    };

    const handleCancel = () => {
        setIsFaqModalVisible(false);
        setIsCommentModalVisible(false);
        setEditingComment(null);
        setEditingText('');
    };

    const onFinishFaq = (values: { title: string; answer: string }) => {
        // Logic for adding/editing main FAQ question
        message.success('บันทึก FAQ สำเร็จ!');
        setIsFaqModalVisible(false);
    };
    
    const handleDeleteFaq = (id: number) => {
        // Logic for deleting FAQ
        message.success('ลบ FAQ สำเร็จ!');
    };
    
    const handleSendComment = () => {
        if (!commentText.trim() || !selectedFaq) return;
        onAddAnswer(selectedFaq.id, commentText, 'แอดมิน');
        setCommentText('');
    };
    
    const handleStartEditComment = (comment: Answer) => {
        setEditingComment(comment);
        setEditingText(comment.text);
    };
    
    const handleSaveEditComment = () => {
        if (!editingText.trim() || !selectedFaq || !editingComment) return;
        onEditAnswer(selectedFaq.id, editingComment.id, editingText);
        setEditingComment(null);
        setEditingText('');
        message.success("แก้ไขคอมเมนต์สำเร็จ");
    };
    
    const formatTime = (ts?: number) => {
        if (!ts) return '';
        return new Date(ts).toLocaleString('th-TH');
    };

    const renderComment = (ans: Answer) => (
        <div key={ans.id} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div style={{ backgroundColor: '#f0f2f5', padding: '8px 12px', borderRadius: '18px', textAlign: 'left' }}>
                <Text strong>{ans.author}</Text>
                {ans.isStaff && <Tag color="blue" style={{marginLeft: 8}}>แอดมิน</Tag>}
                
                {editingComment?.id === ans.id ? (
                    <TextArea value={editingText} onChange={(e) => setEditingText(e.target.value)} autoSize />
                ) : (
                    <div style={{ whiteSpace: 'pre-wrap' }}>{ans.text}</div>
                )}
            </div>
            <div style={{ paddingLeft: '12px', display: 'flex', gap: '8px', fontSize: '12px', color: '#65676b' }}>
                <span>{formatTime(ans.createdAt)}</span>
                {ans.author === 'แอดมิน' && (
                    <>
                    {editingComment?.id === ans.id ? (
                        <>
                            <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleSaveEditComment}>บันทึก</span>
                            <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setEditingComment(null)}>ยกเลิก</span>
                        </>
                    ) : (
                        <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleStartEditComment(ans)}>แก้ไข</span>
                    )}
                    <Popconfirm title="ต้องการลบคอมเมนต์นี้?" onConfirm={() => onDeleteAnswer(selectedFaq!.id, ans.id)}>
                        <span style={{ fontWeight: 'bold', cursor: 'pointer', color: '#ff4d4f' }}>ลบ</span>
                    </Popconfirm>
                    </>
                )}
            </div>
          </div>
        </div>
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>จัดการคำถามที่พบบ่อย (FAQ)</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showFaqModal()}>
                    เพิ่ม FAQ ใหม่
                </Button>
            </div>

            <List
                itemLayout="vertical"
                dataSource={faqs}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button icon={<MessageOutlined />} onClick={() => showCommentModal(item)}>จัดการคอมเมนต์ ({item.answers.length})</Button>,
                            <Button icon={<EditOutlined />} onClick={() => showFaqModal(item)}>แก้ไข</Button>,
                            <Popconfirm title="ต้องการลบ FAQ นี้?" onConfirm={() => handleDeleteFaq(item.id)} okText="ใช่" cancelText="ไม่">
                                <Button danger icon={<DeleteOutlined />}>ลบ</Button>
                            </Popconfirm>,
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={<Paragraph ellipsis={{ rows: 2 }}>{item.answers.find(a => a.isStaff)?.text}</Paragraph>}
                        />
                    </List.Item>
                )}
            />

            {/* Modal for Creating/Editing FAQ */}
            <Modal title={editingFaq ? 'แก้ไข FAQ' : 'สร้าง FAQ ใหม่'} open={isFaqModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={onFinishFaq}>
                    {/* ... Form Items ... */}
                </Form>
            </Modal>
            
            {/* Modal for Managing Comments */}
            <Modal
                title={`คอมเมนต์สำหรับ: ${selectedFaq?.title}`}
                open={isCommentModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={720}
            >
                <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '16px' }}>
                    {selectedFaq?.answers.map(renderComment)}
                </div>
                <div className="comment-input-area" style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            ref={mainInputRef}
                            placeholder="แสดงความคิดเห็นในฐานะแอดมิน..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onPressEnter={handleSendComment}
                        />
                        <Button type="primary" onClick={handleSendComment}>ส่ง</Button>
                    </Space.Compact>
                </div>
            </Modal>
        </div>
    );
};

export default ManageFaqPage;