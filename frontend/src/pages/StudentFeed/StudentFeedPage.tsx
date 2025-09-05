// src/pages/StudentFeed/StudentFeedPage.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Avatar,
  Button,
  Input,
  Space,
  Modal,
  Spin,
  message,
  Empty,
  Pagination,
  Form,
  Select,
  Popconfirm,
  Dropdown,
  
  Divider,
} from "antd";
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  getStudentProfilePosts, 
  deleteStudentPost 
} from "../../services/studentPostService";
import CreateStudentPostModal from "../../components/CreateStudentPostModal";
import EditStudentPostModal from "../../components/EditStudentPostModal";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

// ✅ Updated interfaces to support Skills as array
interface Skill {
  ID: number;
  skill_name: string;
  SkillName?: string; // backward compatibility
}

interface Student {
  ID: number;
  id?: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  profile_image_url?: string;
  faculty: string;
  year?: number;
  UserID?: number;
  user_id?: number;
}

interface Faculty {
  ID: number;
  Name: string;
}

interface Department {
  ID: number;
  Name: string;
}

interface StudentProfilePost {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  title?: string;
  job_type: string;
  skills: Skill[]; // ✅ เปลี่ยนจาก string เป็น Skill[]
  availability?: string;
  preferred_location?: string;
  expected_compensation?: string;
  content?: string;
  introduction?: string;
  portfolio_url?: string;
  year?: number;
  phone?: string;
  email?: string;
  student_id?: number;
  student?: Student;
  faculty_id?: number;
  faculty?: Faculty;
  department_id?: number;
  department?: Department;
}

const StudentFeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState<StudentProfilePost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<StudentProfilePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedPost, setSelectedPost] = useState<StudentProfilePost | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<StudentProfilePost | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const isStudent = 
    user?.role && 
    (user.role.toLowerCase() === "student" || user.role.toLowerCase() === "stu");

  // ประเภทงาน 6 ตัวเลือกตามรูป
  const jobTypeOptions = [
    { label: "งานประจำ", value: "งานประจำ" },
    { label: "งานพาร์ทไทม์", value: "งานพาร์ทไทม์" },
    { label: "ฟรีแลนซ์", value: "ฟรีแลนซ์" },
    { label: "ฝึกงาน", value: "ฝึกงาน" },
    { label: "งานชั่วคราว", value: "งานชั่วคราว" },
    { label: "งานโครงการ", value: "งานโครงการ" },
  ];

  // Helper functions
  const isOwnPost = (post: StudentProfilePost): boolean => {
    if (!user || !post.student) return false;
    const userId = user.ID || user.id || user.user_id;
    const studentUserId = post.student.UserID || post.student.user_id;
    return userId === studentUserId;
  };

  // ✅ Helper function to get skill names from Skills array
  const getSkillNames = (skills: Skill[]): string[] => {
    if (!Array.isArray(skills)) return [];
    return skills.map(skill => skill.skill_name || skill.SkillName || '').filter(Boolean);
  };

  // ✅ Helper function to handle backward compatibility for skills
  const getSkillsAsArray = (skills: any): string[] => {
    if (Array.isArray(skills)) {
      return getSkillNames(skills);
    } else if (typeof skills === 'string') {
      return skills.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  // API function
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStudentProfilePosts();
      const postsData = response?.data || response || [];
      if (Array.isArray(postsData)) {
        setPosts(postsData);
        setFilteredPosts(postsData);
      } else {
        setPosts([]);
        setFilteredPosts([]);
      }
    } catch (error) {
      console.error("Error fetching student posts:", error);
      message.error("ไม่สามารถโหลดข้อมูลโพสต์ได้");
      setPosts([]);
      setFilteredPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ✅ อัปเดตฟังก์ชันการค้นหา และกรองให้รองรับประเภทงาน และ Skills array
  const applyFilters = useCallback(() => {
    let filtered = posts;

    // กรองด้วยคำค้นหา
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((post) => {
        const studentName = post.student
          ? `${post.student.first_name || ""} ${
              post.student.last_name || ""
            }`.toLowerCase()
          : "";
        const title = post.title?.toLowerCase() || "";
        
        // ✅ แก้ไขการค้นหา skills ให้รองรับทั้ง array และ string
        const skillsText = getSkillsAsArray(post.skills).join(' ').toLowerCase();
        
        const content = post.content?.toLowerCase() || "";
        const introduction = post.introduction?.toLowerCase() || "";
        const jobType = post.job_type?.toLowerCase() || "";
        
        return (
          studentName.includes(searchLower) ||
          title.includes(searchLower) ||
          skillsText.includes(searchLower) ||
          content.includes(searchLower) ||
          introduction.includes(searchLower) ||
          jobType.includes(searchLower)
        );
      });
    }

    // กรองด้วยประเภทงาน
    if (selectedJobType) {
      filtered = filtered.filter((post) =>
        post.job_type?.toLowerCase().includes(selectedJobType.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [posts, searchTerm, selectedJobType]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // ฟังก์ชันจัดการการเลือกประเภทงาน
  const handleJobTypeClick = (jobType: string) => {
    if (selectedJobType === jobType) {
      setSelectedJobType("");
    } else {
      setSelectedJobType(jobType);
    }
  };

  // ฟังก์ชันแสดงทั้งหมด
  const showAllPosts = () => {
    setSearchTerm("");
    setSelectedJobType("");
  };

  // Modal and navigation functions
  const showPostDetail = (post: StudentProfilePost) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPost(null);
  };

  const goToProfile = (studentId: number) => {
    navigate(`/profile/${studentId}`);
  };

  const openCreatePostModal = () => {
    setIsCreatePostModalVisible(true);
  };

  const closeCreatePostModal = () => {
    setIsCreatePostModalVisible(false);
  };

  const handleCreatePostSuccess = () => {
    fetchPosts();
    setIsCreatePostModalVisible(false);
    message.success("โพสต์ของคุณถูกสร้างสำเร็จแล้ว!");
  };

  // Edit and delete functions
  const handleEditPost = (post: StudentProfilePost) => {
    setEditingPost(post);
    setEditModalVisible(true);
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deleteStudentPost(postId);
      message.success("ลบโพสต์สำเร็จ!");
      fetchPosts(); // Refresh posts after deletion
    } catch (error: any) {
      console.error("Error deleting post:", error);
      message.error("เกิดข้อผิดพลาดในการลบโพสต์");
    }
  };

  const handleEditSuccess = () => {
    setEditModalVisible(false);
    setEditingPost(null);
    fetchPosts();
  };

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>กำลังโหลดข้อมูลโพสต์...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div>
          <Title level={1} style={{ marginBottom: "8px" }}>
            โพสต์หางานของนักศึกษา
          </Title>
          <Paragraph style={{ fontSize: "16px", color: "#666" }}>
            ค้นหานักศึกษาที่เหมาะสมสำหรับงานของคุณ
          </Paragraph>
          {isStudent && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreatePostModal}
              style={{
                borderRadius: "8px",
                fontWeight: "500",
              }}
            >
              สร้างโพสต์หางาน
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <Search
          prefix={<SearchOutlined />}
          size="large"
          value={searchTerm}
          onSearch={handleSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "600px", display: "block", margin: "0 auto" }}
          placeholder="ค้นหาโดยชื่อ, ทักษะ, ประเภทงาน..."
        />
      </div>

      {/* ✅ Job Type Filter Bar - ปรับให้ไม่เลื่อนได้ */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {/* ✅ Fixed Filter Bar - ไม่เลื่อนได้ใช้ flex-wrap */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {jobTypeOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleJobTypeClick(option.value)}
                style={{
                  minWidth: "120px",
                  height: "40px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  backgroundColor:
                    selectedJobType === option.value ? "#1890ff" : "white",
                  color: selectedJobType === option.value ? "white" : "#666",
                  borderColor:
                    selectedJobType === option.value ? "#1890ff" : "#d9d9d9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  marginBottom: "8px",
                }}
                onMouseEnter={(e) => {
                  if (selectedJobType !== option.value) {
                    e.currentTarget.style.backgroundColor = "#f0f8ff";
                    e.currentTarget.style.borderColor = "#1890ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedJobType !== option.value) {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor = "#d9d9d9";
                  }
                }}
              >
                {option.label}
              </Button>
            ))}
            {/* ปุ่ม "ทั้งหมด" */}
            <Button
              icon={<AppstoreOutlined />}
              onClick={showAllPosts}
              style={{
                minWidth: "100px",
                height: "40px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor:
                  !selectedJobType && !searchTerm ? "#1890ff" : "white",
                color: !selectedJobType && !searchTerm ? "white" : "#666",
                borderColor:
                  !selectedJobType && !searchTerm ? "#1890ff" : "#d9d9d9",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                marginBottom: "8px",
              }}
              onMouseEnter={(e) => {
                if (selectedJobType || searchTerm) {
                  e.currentTarget.style.backgroundColor = "#f0f8ff";
                  e.currentTarget.style.borderColor = "#1890ff";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedJobType || searchTerm) {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.borderColor = "#d9d9d9";
                }
              }}
            >
              ทั้งหมด
            </Button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Text style={{ fontSize: "16px", color: "#666" }}>
          พบ{" "}
          <span style={{ fontWeight: "bold", color: "#1890ff" }}>
            {filteredPosts.length}
          </span>{" "}
          โพสต์
          {searchTerm && (
            <>
              {" "}
              จากการค้นหา "{searchTerm}"
            </>
          )}
        </Text>
        {selectedJobType && (
          <div style={{ marginTop: "8px" }}>
            <Tag color="blue">
              ประเภทงาน:{" "}
              <span style={{ fontWeight: "500" }}>
                {selectedJobType}
              </span>
            </Tag>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {currentPosts.length > 0 ? (
        <>
          <Row gutter={[16, 16]}>
            {currentPosts.map((post) => {
              const studentName = post.student
                ? `${post.student.first_name || ""} ${
                    post.student.last_name || ""
                  }`.trim() || "ไม่ระบุชื่อ"
                : "ไม่ระบุชื่อ";
              
              // ✅ แก้ไขการจัดการ skills ให้รองรับทั้ง array และ string
              const skillsArray = getSkillsAsArray(post.skills);

              const isOwn = isOwnPost(post);

              // ✅ เมนูตัวเลือกสำหรับโพสต์ของตัวเอง - ใช้ MenuProps แทน Menu
              const moreOptionsItems: MenuProps['items'] = [
                {
                  key: 'edit',
                  icon: <EditOutlined />,
                  label: 'แก้ไขโพสต์',
                  onClick: () => handleEditPost(post),
                },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: (
                    <Popconfirm
                      title="คุณแน่ใจหรือไม่ที่จะลบโพสต์นี้?"
                      onConfirm={() => handleDeletePost(post.ID)}
                      okText="ลบ"
                      cancelText="ยกเลิก"
                      okButtonProps={{ danger: true }}
                    >
                      <span style={{ color: '#ff4d4f' }}>ลบโพสต์</span>
                    </Popconfirm>
                  ),
                },
              ];

              return (
                <Col xs={24} sm={12} md={8} lg={6} key={post.ID}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      height: "400px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                    bodyStyle={{
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                    cover={
                      <div
                        style={{
                          padding: "16px",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <Avatar
                          src={post.student?.profile_image_url}
                          icon={<UserOutlined />}
                          size={64}
                          style={{
                            border: "3px solid white",
                            marginBottom: "8px",
                          }}
                        />
                        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {studentName}
                        </div>
                        <Tag color="blue" style={{ marginTop: "4px" }}>
                          {post.job_type}
                        </Tag>
                      </div>
                    }
                    actions={[
                      <Button
                        key="view"
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => showPostDetail(post)}
                        style={{ color: "#1890ff" }}
                      >
                        ดูรายละเอียด
                      </Button>,
                      <Button
                        key="profile"
                        type="link"
                        icon={<UserOutlined />}
                        onClick={() =>
                          goToProfile(post.student?.ID || post.student?.id || 0)
                        }
                        style={{ color: "#52c41a" }}
                      >
                        ดูโปรไฟล์
                      </Button>,
                    ]}
                  >
                    {/* ปุ่มตัวเลือกสำหรับโพสต์ของตัวเอง */}
                    {isOwn && (
                      <Dropdown
                        menu={{ items: moreOptionsItems }}
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <Button
                          icon={<MoreOutlined />}
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            background: "rgba(255, 255, 255, 0.9)",
                            border: "none",
                            zIndex: 1,
                          }}
                          size="small"
                        />
                      </Dropdown>
                    )}

                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* หัวข้อโพสต์ */}
                      <div style={{ marginBottom: "12px" }}>
                        <Text strong style={{ fontSize: "16px" }}>
                          {post.title || post.job_type || "ไม่ระบุ"}
                        </Text>
                      </div>

                      {/* ข้อความแนะนำตัว */}
                      <div style={{ marginBottom: "12px", flex: 1 }}>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          แนะนำตัว:
                        </Text>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          style={{ margin: 0, fontSize: "14px" }}
                        >
                          {post.content ||
                            post.introduction ||
                            "ไม่มีการแนะนำตัว"}
                        </Paragraph>
                      </div>

                      {/* ทักษะ */}
                      <div>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          🛠️ ทักษะหลัก:
                        </Text>
                        <div style={{ marginTop: "4px" }}>
                          {skillsArray.length > 0 ? (
                            skillsArray.slice(0, 3).map((skill, index) => (
                              <Tag key={index} size="small" color="processing">
                                {skill}
                              </Tag>
                            ))
                          ) : (
                            <Tag size="small" color="default">
                              ไม่มีทักษะระบุ
                            </Tag>
                          )}
                          {skillsArray.length > 3 && (
                            <Tag size="small" color="warning">
                              +{skillsArray.length - 3} อื่นๆ
                            </Tag>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Pagination */}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Pagination
              current={currentPage}
              total={filteredPosts.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} จาก ${total} โพสต์`
              }
            />
          </div>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              {searchTerm || selectedJobType
                ? "🔍 ไม่พบโพสต์ที่ตรงกับเงื่อนไขการค้นหา"
                : "📝 ยังไม่มีโพสต์หางานจากนักศึกษา"}
            </span>
          }
          style={{ margin: "50px 0" }}
        >
          {(searchTerm || selectedJobType) && (
            <Button type="primary" onClick={showAllPosts}>
              แสดงโพสต์ทั้งหมด
            </Button>
          )}
          {isStudent && !searchTerm && !selectedJobType && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreatePostModal}
              size="large"
            >
              สร้างโพสต์หางานแรกของคุณ
            </Button>
          )}
        </Empty>
      )}

      {/* Detail Modal */}
      <Modal
        title={
          <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
            รายละเอียดโพสต์หางาน
          </div>
        }
        open={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            key="profile"
            type="primary"
            onClick={() => {
              if (selectedPost) {
                closeModal();
                goToProfile(
                  selectedPost.student?.ID || selectedPost.student?.id || 0
                );
              }
            }}
          >
            ดูโปรไฟล์เต็ม
          </Button>,
          <Button key="close" onClick={closeModal}>
            ปิด
          </Button>,
        ]}
        width={700}
        centered
      >
        {selectedPost && (
          <div>
            {/* Student Info */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Avatar
                src={selectedPost.student?.profile_image_url}
                icon={<UserOutlined />}
                size={80}
                style={{ marginBottom: "12px" }}
              />
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {selectedPost.student
                  ? `${selectedPost.student.first_name || ""} ${
                      selectedPost.student.last_name || ""
                    }`.trim() || "ไม่ระบุชื่อ"
                  : "ไม่ระบุชื่อ"}
              </div>
              <Text type="secondary">
                🏛️{" "}
                {selectedPost.faculty?.Name ||
                  selectedPost.student?.faculty ||
                  "ไม่ระบุคณะ"}{" "}
                • 📚 {selectedPost.department?.Name || "ไม่ระบุสาขา"}
              </Text>
              <br />
              <Text type="secondary">
                📅 ชั้นปีที่{" "}
                {selectedPost.year || selectedPost.student?.year || "ไม่ระบุ"}
              </Text>
            </div>

            <Divider />

            {/* รายละเอียดโพสต์ */}
            {selectedPost.title && (
              <div style={{ marginBottom: "16px" }}>
                <Text strong>📝 หัวข้อโพสต์:</Text>
                <div>{selectedPost.title}</div>
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <Text strong>💼 ประเภทงานที่ต้องการ:</Text>
              <div>
                <Tag color="blue">{selectedPost.job_type || "ไม่ระบุ"}</Tag>
              </div>
            </div>

            {selectedPost.availability && (
              <div style={{ marginBottom: "16px" }}>
                <Text strong>⏰ เวลาที่สะดวก:</Text>
                <div>{selectedPost.availability}</div>
              </div>
            )}

            {selectedPost.preferred_location && (
              <div style={{ marginBottom: "16px" }}>
                <Text strong>📍 สถานที่ที่สะดวก:</Text>
                <div>{selectedPost.preferred_location}</div>
              </div>
            )}

            {selectedPost.expected_compensation && (
              <div style={{ marginBottom: "16px" }}>
                <Text strong>💰 ค่าตอบแทนที่คาดหวัง:</Text>
                <div>{selectedPost.expected_compensation}</div>
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <Text strong>💭 รายละเอียด:</Text>
              <div style={{ whiteSpace: "pre-wrap" }}>
                {selectedPost.content ||
                  selectedPost.introduction ||
                  "ไม่มีการแนะนำตัว"}
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>🛠️ ทักษะ:</Text>
              <div style={{ marginTop: "8px" }}>
                {getSkillsAsArray(selectedPost.skills).length > 0 ? (
                  getSkillsAsArray(selectedPost.skills).map((skill, index) => (
                    <Tag key={index} color="processing" style={{ margin: "2px" }}>
                      {skill}
                    </Tag>
                  ))
                ) : (
                  "ไม่มีทักษะระบุ"
                )}
              </div>
            </div>

            {selectedPost.portfolio_url && (
              <div style={{ marginBottom: "16px" }}>
                <Text strong>🎨 ผลงาน:</Text>
                <div>
                  <a
                    href={selectedPost.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ดูผลงาน →
                  </a>
                </div>
              </div>
            )}

            <Divider />

            <div style={{ marginBottom: "16px" }}>
              <Text strong>📞 ข้อมูลติดต่อ:</Text>
              {selectedPost.student?.email && (
                <div style={{ marginTop: "4px" }}>
                  <MailOutlined /> {selectedPost.student.email}
                </div>
              )}
              {selectedPost.student?.phone && (
                <div style={{ marginTop: "4px" }}>
                  <PhoneOutlined /> {selectedPost.student.phone}
                </div>
              )}
              {!selectedPost.student?.email && !selectedPost.student?.phone && (
                <div style={{ color: "#999" }}>ไม่มีข้อมูลติดต่อในโพสต์นี้</div>
              )}
            </div>

            <div style={{ textAlign: "center", color: "#999", fontSize: "12px" }}>
              📅 โพสต์เมื่อ:{" "}
              {new Date(selectedPost.CreatedAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        )}
      </Modal>

      {/* Create Post Modal */}
      <CreateStudentPostModal
        visible={isCreatePostModalVisible}
        onClose={closeCreatePostModal}
        onSuccess={handleCreatePostSuccess}
      />

      {/* Edit Post Modal */}
      <EditStudentPostModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSuccess={handleEditSuccess}
        post={editingPost}
      />
    </div>
  );
};

export default StudentFeedPage;
