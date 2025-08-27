// src/pages/Employer/EmployerFeedPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Spin, Alert, List, Input, Tabs, Row, Col, Modal, Button, Space, Tag, Avatar } from 'antd';
import { SearchOutlined, UserOutlined, EyeOutlined, MessageOutlined, SolutionOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import StudentProfileCard from '../../components/StudentProfileCard';
import PageHeader from '../../components/PageHeader';

const { Paragraph, Text } = Typography;

interface Student {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    faculty: string;
    year: string;
}

// 1. แก้ไขชื่อจาก "Student" เป็น "student" (ตัวพิมพ์เล็ก)
interface StudentProfilePost {
    ID: number;
    CreatedAt: string;
    introduction: string;
    job_type: string;
    portfolio_url?: string;
    skills: string;
    student: Student; 
}

const EmployerFeedPage: React.FC = () => {
    const [posts, setPosts] = useState<StudentProfilePost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 12;
    const [isModalOpen, setIsModalOpen] = useState(false); // 👈 แก้ไขชื่อ state ให้อ่านง่ายขึ้น
    const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/student-profile-posts');
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data = await response.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('ไม่สามารถโหลดข้อมูลโปรไฟล์นักศึกษาได้');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post => {
        // 2. เพิ่มการตรวจสอบว่า post.student มีข้อมูลอยู่จริงหรือไม่ก่อนใช้งาน
        if (!post.student) return false;

        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
            (post.student.first_name || '').toLowerCase().includes(lowerSearch) ||
            (post.student.last_name || '').toLowerCase().includes(lowerSearch) ||
            (post.skills || '').toLowerCase().includes(lowerSearch) ||
            (post.student.faculty || '').toLowerCase().includes(lowerSearch);

        const matchesTab = activeTab === 'all' || post.job_type === activeTab;

        return matchesSearch && matchesTab;
    });

    const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const showModal = (post: StudentProfilePost) => {
        setSelectedPost(post);
        setIsModalOpen(true); // 👈 แก้ไขชื่อ state
    };

    const handleCancel = () => {
        setIsModalOpen(false); // 👈 แก้ไขชื่อ state
        setSelectedPost(null);
    };

    const tabItems = [
      { key: 'all', label: 'ทั้งหมด' },
      { key: 'พาร์ทไทม์', label: 'พาร์ทไทม์' },
      { key: 'ฝึกงาน', label: 'งานฝึกงาน' },
      { key: 'ฟรีแลนซ์', label: 'ฟรีแลนซ์' },
      { key: 'งานประจำ', label: 'งานประจำ' },
    ];

    if (loading) { return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>; }
    if (error) { return <Alert message="เกิดข้อผิดพลาด" description={error} type="error" showIcon style={{ margin: '24px' }} />; }

    return (
        <>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                <PageHeader title="ค้นหาโปรไฟล์นักศึกษา" />
                <Row gutter={[24, 24]}>
                    <Col xs={24}>
                        <Input
                            size="large"
                            placeholder="ค้นหาจากชื่อ, ทักษะ, หรือคณะ..."
                            prefix={<SearchOutlined />}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ marginBottom: '16px' }}
                        />
                        <Tabs
                            defaultActiveKey="all"
                            items={tabItems}
                            onChange={key => { setActiveTab(key); setCurrentPage(1); }}
                        />
                        <List
                            grid={{
                                gutter: 24,
                                xs: 1,
                                sm: 2,
                                md: 2,
                                lg: 3,
                                xl: 4,
                                xxl: 4,
                            }}
                            dataSource={paginatedPosts}
                            renderItem={post => (
                                <List.Item>
                                    <StudentProfileCard post={post} onClick={() => showModal(post)} />
                                </List.Item>
                            )}
                            locale={{ emptyText: 'ไม่พบโปรไฟล์นักศึกษาที่ตรงกับเงื่อนไข' }}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: filteredPosts.length,
                                onChange: (page) => setCurrentPage(page),
                                style: { textAlign: 'center', marginTop: '24px' }
                            }}
                        />
                    </Col>
                </Row>
            </div>

            <Modal
                open={isModalOpen} // 👈 แก้ไขจาก visible เป็น open
                onCancel={handleCancel}
                width={720}
                className="profile-modal"
                destroyOnClose
                footer={
                    <Space>
                        {selectedPost?.portfolio_url && (
                            <a href={selectedPost.portfolio_url} target="_blank" rel="noopener noreferrer">
                                <Button icon={<EyeOutlined />}>ดูผลงาน</Button>
                            </a>
                        )}
                        <Link to={`/profile/${selectedPost?.ID}`}>
                           <Button icon={<SolutionOutlined />}>ดูโปรไฟล์</Button>
                        </Link>
                        <Button type="primary" icon={<MessageOutlined />}>
                            ติดต่อ
                        </Button>
                    </Space>
                }
            >
                {selectedPost && selectedPost.student && ( // 3. แก้ไขการแสดงผลใน Modal ทั้งหมดเป็น post.student
                    <>
                        <div className="modal-header-content">
                            <Avatar size={64} icon={<UserOutlined />} />
                            <div className="modal-header-info">
                                <h3 className="student-name">{selectedPost.student.first_name} {selectedPost.student.last_name}</h3>
                                <p className="student-faculty" style={{ margin: '2px 0' }}>
                                    <span style={{ fontWeight: 500 }}>สาขา:</span> {selectedPost.student.faculty}
                                </p>
                                <p className="student-faculty" style={{ margin: '2px 0', marginLeft: '0px' }}>
                                    <span style={{ fontWeight: 500 }}>ชั้นปีที่:</span> {selectedPost.student.year}
                                </p>
                            </div>
                        </div>
                        <div className="modal-body-section">
                            <section className="modal-introduction">
                                <div className="modal-skills-title">รายละเอียดงาน</div>
                                <Paragraph>{selectedPost.introduction}</Paragraph>
                            </section>
                            <section>
                                <div className="modal-skills-title">ข้อมูลติดต่อ</div>
                                <Space direction="vertical">
                                    <Text><MailOutlined style={{ marginRight: 8 }} />{selectedPost.student.email}</Text>
                                    <Text><PhoneOutlined style={{ marginRight: 8 }} />{selectedPost.student.phone}</Text>
                                </Space>
                            </section>
                            <section>
                                <div className="modal-skills-title">ประเภทงานที่มองหา</div>
                                <Space size={[8, 8]} wrap>
                                    <Tag color="geekblue">{selectedPost.job_type}</Tag>
                                </Space>
                            </section>
                            <section>
                                <div className="modal-skills-title">ทักษะทั้งหมด</div>
                                <div className="modal-skills-container">
                                    <Space size={[8, 8]} wrap>
                                        {(selectedPost.skills?.split(',').map(s => s.trim()).filter(s => s) || []).map(skill => (
                                            <Tag key={skill}>{skill}</Tag>
                                        ))}
                                    </Space>
                                </div>
                            </section>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
};

export default EmployerFeedPage;