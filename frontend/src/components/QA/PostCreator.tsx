import React, { useState } from 'react';
import { Upload, Button, message, Space, Dropdown, Menu } from 'antd';
import { FiPaperclip } from 'react-icons/fi';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { GlobalOutlined, LockOutlined, DownOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import type { Post } from '../../types';
import "../../pages/StudentPost/StudentPost.css";

interface PostCreatorProps {
  onAddPost: (content: string, privacy: Post['privacy'], file?: File, image?: File, location?: { lat: number, lng: number }) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ onAddPost }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [privacy, setPrivacy] = useState<Post['privacy']>('public');

  const handlePost = () => {
    if (content.trim() || file || image || location) {
      onAddPost(content, privacy, file || undefined, image || undefined, location || undefined);
      // Reset state ภายในหลังจากโพสต์สำเร็จ
      setContent('');
      setFile(null);
      setImage(null);
      setLocation(null);
      setPrivacy('public');
    } else {
      message.warning('กรุณาใส่เนื้อหาหรือแนบไฟล์/รูปภาพ/ตำแหน่งที่ตั้งก่อนโพสต์');
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          message.success('เพิ่มตำแหน่งที่ตั้งแล้ว!');
        },
        (error) => {
          message.error('ไม่สามารถเข้าถึงตำแหน่งได้: ' + error.message);
        }
      );
    } else {
      message.error('เบราว์เซอร์ของคุณไม่รองรับ Geolocation');
    }
  };
  
  const fileUploadProps: UploadProps = {
    beforeUpload: (f) => {
      setFile(f);
      message.success(`เลือกไฟล์: ${f.name}`);
      return false;
    },
    onRemove: () => setFile(null),
    multiple: false,
    showUploadList: false, // ซ่อนรายการไฟล์ที่อัปโหลด
  };
  
  const imageUploadProps: UploadProps = {
    accept: 'image/*',
    beforeUpload: (f) => {
      setImage(f);
      message.success(`เลือกรูป: ${f.name}`);
      return false;
    },
    onRemove: () => setImage(null),
    multiple: false,
    showUploadList: false, // ซ่อนรายการไฟล์ที่อัปโหลด
  };

  const privacyMenu = (
    <Menu onClick={({ key }) => setPrivacy(key as Post['privacy'])}>
      <Menu.Item key="public" icon={<GlobalOutlined />}>
        สาธารณะ
      </Menu.Item>
      <Menu.Item key="private" icon={<LockOutlined />}>
        ส่วนตัว
      </Menu.Item>
    </Menu>
  );

  return (
    // ไม่ใช้ <main> แล้ว เพราะจะแสดงใน Modal
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
      {/* แสดงชื่อไฟล์และรูปภาพที่เลือก */}
      {file && <p>ไฟล์ที่แนบ: {file.name}</p>}
      {image && <p>รูปภาพที่แนบ: {image.name}</p>}
      <div className="post-toolbar">
        <span>เพิ่มลงในโพสต์ของคุณ</span>
        <div className="tool-icons">
          <Upload {...fileUploadProps}>
            <Button icon={<FiPaperclip size={24} />} type="text" />
          </Upload>
          <Upload {...imageUploadProps}>
            <Button icon={<MdOutlinePhotoSizeSelectActual size={24} />} type="text" />
          </Upload>
          <Button
            icon={<IoLocationOutline size={24} />}
            type="text"
            onClick={handleGetLocation}
            style={{ color: location ? '#1890ff' : 'inherit' }}
          />
        </div>
      </div>
      <button className="post-button" onClick={handlePost}>
        โพสต์
      </button>
    </div>
  );
};

export default PostCreator;