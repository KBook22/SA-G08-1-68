import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import './SuccessAnimation.css';

const { Title, Text } = Typography;

interface SuccessAnimationProps {
  title?: string;
  message?: string;
  duration?: number;
  onComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  title = 'สำเร็จ!',
  message = 'การดำเนินการสำเร็จแล้ว',
  duration = 3000,
  onComplete
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className="success-animation-container">
      <div className="success-animation-card">
        <div className="success-icon-wrapper">
          <CheckCircleOutlined className="success-icon" />
        </div>
        <Title level={2} className="success-title">
          {title}
        </Title>
        <Text className="success-message">
          {message}
        </Text>
        <div className="success-progress-bar">
          <div className="success-progress-fill"></div>
        </div>
      </div>
      <div className="success-backdrop"></div>
    </div>
  );
};

export default SuccessAnimation;
