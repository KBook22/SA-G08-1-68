// src/components/QA/PostCreator.tsx

import React, { useState } from 'react';
import { Upload, Button, message, Space, Dropdown, Menu, Input, Tag } from 'antd';
import { FiPaperclip } from 'react-icons/fi';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { GlobalOutlined, LockOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { FeedPost as Post } from '../../types'; // Renamed Post to FeedPost for clarity and consistency
import { createStudentProfilePost } from '../../services/studentPostService'; // Import API service for creating posts
import "../../pages/StudentPost/StudentPost.css";

interface PostCreatorProps {
  onSuccess: () => void; // New prop to notify parent on successful post creation
}

const PostCreator: React.FC<PostCreatorProps> = ({ onSuccess }) => {
  const [content, setContent] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [privacy, setPrivacy] = useState<Post['privacy']>('public');

  const handleAddSkill = () => {
    const trimmedInput = skillInput.trim();
    if (trimmedInput && !skills.includes(trimmedInput)) {
      setSkills([...skills, trimmedInput]);
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (removedSkill: string) => {
    setSkills(skills.filter(skill => skill !== removedSkill));
  };

  const handlePost = async () => {
    if (content.trim() || file || image || location) {
      try {
        const response = await createStudentProfilePost({
          introduction: content,
          job_type: "full-time", // Default or let user select if UI allows
          skills: skills.join(','),
          phone: "123-456-7890", // Placeholder, retrieve from user context later
          email: "user@example.com", // Placeholder, retrieve from user context later
          year: 2024, // Placeholder, retrieve from user context later
          portfolio_url: "", // Placeholder
        });

        if (response) {
          message.success('โพสต์สำเร็จ!');
          setContent('');
          setSkills([]);
          setFile(null);
          setImage(null);
          setLocation(null);
          setPrivacy('public');
          onSuccess(); // Notify parent component to refresh posts
        } else {
          message.error('เกิดข้อผิดพลาดในการโพสต์');
        }
      } catch (error) {
        console.error('Error creating post:', error);
        message.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      }
    } else {
      message.warning('กรุณาใส่เนื้อหาหรือแนบไฟล์/รูปภาพ/ตำแหน่งที่ตั้งก่อนโพสต์');
    }
  };

  const fileUploadProps: UploadProps = {
    beforeUpload: (f) => { setFile(f); message.success(`เลือกไฟล์: ${f.name}`); return false; },
    onRemove: () => setFile(null),
    multiple: false,
    showUploadList: false,
  };

  const imageUploadProps: UploadProps = {
    accept: 'image/*',
    beforeUpload: (f) => { setImage(f); message.success(`เลือกรูป: ${f.name}`); return false; },
    onRemove: () => setImage(null),
    multiple: false,
    showUploadList: false,
  };

  const privacyMenu = (
    <Menu onClick={({ key }) => setPrivacy(key as Post['privacy'])}>
      <Menu.Item key="public" icon={<GlobalOutlined />}>สาธารณะ</Menu.Item>
      <Menu.Item key="private" icon={<LockOutlined />}>ส่วนตัว</Menu.Item>
    </Menu>
  );

  return (
    <div className="post-creator-card" style={{ boxShadow: 'none', padding: '1.5rem 0' }}>
      <div className="user-info">
        <FaUserCircle size={40} className="user-avatar" />
        <div>
          <span className="user-name">จอมมาร</span>
          <Dropdown overlay={privacyMenu} trigger={['click']}>
            <Button size="small" style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
              {privacy === 'public' ? <GlobalOutlined /> : <LockOutlined />}
              <span style={{ margin: '0 4px' }}>{privacy === 'public' ? 'สาธารณะ' : 'ส่วนตัว'}</span>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <textarea
        className="post-textarea"
        placeholder="คุณกำลังหางานอะไรอยู่..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className="skills-section-creator">
        <Space.Compact style={{ width: '100%' }}>
            <Input
                placeholder="เพิ่มทักษะที่เกี่ยวข้อง (เช่น React, Figma)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onPressEnter={handleAddSkill}
            />
            <Button icon={<PlusOutlined />} onClick={handleAddSkill} />
        </Space.Compact>
        <div style={{ marginTop: '8px' }}>
            {skills.map(skill => (
                <Tag closable onClose={() => handleRemoveSkill(skill)} key={skill}>
                    {skill}
                </Tag>
            ))}
        </div>
      </div>

      {file && <p>ไฟล์ที่แนบ: {file.name}</p>}
      {image && <p>รูปภาพที่แนบ: {image.name}</p>}

      <div className="post-toolbar">
        <span>เพิ่มลงในโพสต์ของคุณ</span>
        <div className="tool-icons">
          <Upload {...fileUploadProps}><Button icon={<FiPaperclip size={24} />} type="text" /></Upload>
          <Upload {...imageUploadProps}><Button icon={<MdOutlinePhotoSizeSelectActual size={24} />} type="text" /></Upload>
          <Button icon={<IoLocationOutline size={24} />} type="text" onClick={() => {}} style={{ color: location ? '#1890ff' : 'inherit' }} />
        </div>
      </div>
      <button className="post-button" onClick={handlePost}>
        โพสต์
      </button>
    </div>
  );
};

export default PostCreator;