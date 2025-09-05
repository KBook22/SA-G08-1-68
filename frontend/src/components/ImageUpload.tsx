// src/components/ImageUpload.tsx
import React, { useState } from 'react';
import { Upload, Button, message, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  size?: number;
  showUploadList?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  size = 120,
  showUploadList = false
}) => {
  const [loading, setLoading] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'http://localhost:8080/api/upload',
    method: 'POST',
    withCredentials: false, // ✅ เพิ่มบรรทัดนี้
    showUploadList,
    accept: 'image/*',
    beforeUpload: (file) => {
      console.log('🔍 Uploading file:', file.name, file.type, file.size);
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('คุณสามารถอัปโหลดไฟล์รูปภาพเท่านั้น!');
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('ขนาดไฟล์ต้องไม่เกิน 10MB!');
        return false;
      }

      return true;
    },
    onChange: (info) => {
      console.log('📤 Upload status:', info.file.status, info.file);
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }

      if (info.file.status === 'done') {
        setLoading(false);
        const response = info.file.response;
        console.log('✅ Upload response:', response);
        if (response && response.success && response.url) {
          message.success('อัปโหลดรูปภาพสำเร็จ!');
          onChange?.(response.url);
        } else {
          message.error('เกิดข้อผิดพลาดในการอัปโหลด: ' + (response?.error || 'Unknown error'));
        }
      }

      if (info.file.status === 'error') {
        setLoading(false);
        console.error('❌ Upload error:', info.file.error);
        message.error(`อัปโหลดล้มเหลว: ${info.file.error?.message || 'Unknown error'}`);
      }
    },
    onError: (error) => {
      console.error('❌ Upload error:', error);
      message.error('เกิดข้อผิดพลาดในการอัปโหลด');
      setLoading(false);
    },
  };

  return (
    <div>
      <Avatar
        src={value}
        icon={<UserOutlined />}
        size={size}
        style={{
          marginBottom: '16px',
          display: 'block',
          margin: '0 auto 16px',
          border: '2px solid #f0f0f0'
        }}
      />
      <Upload {...uploadProps}>
        <Button
          icon={<UploadOutlined />}
          loading={loading}
          size="small"
          style={{ borderRadius: '6px' }}
        >
          {loading ? 'กำลังอัปโหลด...' : 'เลือกรูปภาพ'}
        </Button>
      </Upload>
      {value && value.trim() !== '' && (
        <div style={{ marginTop: '8px', color: '#52c41a', fontSize: '12px' }}>
          ✅ รูปภาพถูกอัปโหลดแล้ว
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
