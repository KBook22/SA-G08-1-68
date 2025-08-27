// src/pages/StudentPost/RequestSentPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const RequestSentPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="ส่งคำร้องของคุณเรียบร้อยแล้ว!"
      subTitle="ทีมงานจะดำเนินการตรวจสอบและติดต่อกลับโดยเร็วที่สุด"
      extra={[
        <Button
          type="primary"
          key="home"
          icon={<HomeOutlined />}
          size="large"
          onClick={() => navigate('/')}
        >
          กลับไปหน้าหลัก
        </Button>,
      ]}
    />
  );
};

export default RequestSentPage;