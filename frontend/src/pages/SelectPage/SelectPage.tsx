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
            Bookieee
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
          LookTao 1,2,3,4,5,6
        {/*link to Board*/}
        <Link to="/Home">
            <Button type="primary" block>
              Home
            </Button>
          </Link>
          Tung Tung Tung Sahur
        {/*link to Report Page*/}
        <Link to="/report">
            <Button type="primary" block>
              Report
            </Button>
          </Link>
        {/*link to Student*/}
        <Link to="/students">
            <Button type="primary" block>
              Student
            </Button>
          </Link>
          Plaboo

          Jorm mah
        </Space>
      </Card>
    </div>
  );
};

export default SelectPage;