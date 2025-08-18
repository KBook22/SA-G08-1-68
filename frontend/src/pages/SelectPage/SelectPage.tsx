import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Typography, Space } from 'antd';
const { Title } = Typography;

const SelectPage: React.FC = () => {
  return (
    <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        background: '#f0f2f5'
    }}>
      <Card style={{ width: 300,
        textAlign: 'center',
        }}>
        <Title level={3}>Select Page</Title>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/*link to Interview*/}
          <Link to="/interview">
            <Button type="primary" block>
              Interview
            </Button>
          </Link>
        {/*link to Chat*/}
          <Link to="/chat">
            <Button type="primary" block>
              Chat
            </Button>
          </Link>
        {/*link to Board*/}
        <Link to="/Home">
            <Button type="primary" block>
              Home
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default SelectPage;