// src/layout/MinimalLayout/index.tsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const MinimalLayout: React.FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Content>
      <Outlet />
    </Content>
  </Layout>
);

export default MinimalLayout;