// src/pages/StudentPost/FAQPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Typography,
  Button,
  Tabs,
  Collapse,
  List,
  Tag,
  Empty
} from 'antd';
import {
  QuestionCircleOutlined,
  SendOutlined,
  SearchOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import type { Question } from '../../types';
import './HelpCenter.css';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

interface FAQPageProps {
  questions: Question[];
  onLike: (id: number) => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ questions, onLike }) => {
  const [faqQuestions, setFaqQuestions] = useState<Question[]>([]);
  const [myRequests, setMyRequests] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const allQuestions: Question[] = JSON.parse(localStorage.getItem('allQuestions') || '[]');
    setFaqQuestions(allQuestions.filter(q => q.isFAQ));
    setMyRequests(allQuestions.filter(q => !q.isFAQ && q.author === 'จอมมาร'));
  }, [questions]);

  const filteredFaqs = faqQuestions.filter(faq =>
    faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answers[0]?.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestClick = (request: Question) => {
    const hasAdminReply = request.answers.some(ans => ans.isStaff);
    if (hasAdminReply) {
      navigate(`/help/request/${request.id}`);
    } else {
      navigate(`/help/request-status/${request.id}`);
    }
  };


  return (
    <div className="help-center-wrapper">
      {/* 1. ย้ายปุ่ม "ส่งคำร้องใหม่" มาไว้ตรงนี้ และจัดตำแหน่งด้วย CSS */}
      <div className="new-request-button-container">
        <Button
          type="primary"
          size="large"
          icon={<SendOutlined />}
          onClick={() => navigate('/help/ask')}
        >
          ส่งคำร้องใหม่
        </Button>
      </div>

      <div className="help-center-container">
        {/* ส่วน Header และปุ่ม CTA */}
        <div className="help-center-header">
          <Title level={2}>ศูนย์ช่วยเหลือ</Title>
          <Paragraph>เราพร้อมช่วยเหลือคุณเสมอ! ค้นหาคำตอบจากคำถามที่พบบ่อย หรือส่งคำร้องหาเราโดยตรง</Paragraph>
          <div className="help-center-search">
            <Input
              size="large"
              placeholder="ค้นหาคำถามที่พบบ่อย..."
              prefix={<SearchOutlined />}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
           {/* 2. ลบปุ่มออกจากส่วนนี้ทั้งหมด */}
        </div>

        {/* ส่วน Tabs */}
        <div className="help-center-tabs">
          <Tabs defaultActiveKey="1" size="large" centered>
            <TabPane
              tab={<span><QuestionCircleOutlined /> คำถามที่พบบ่อย</span>}
              key="1"
            >
              {filteredFaqs.length > 0 ? (
                <Collapse accordion className="faq-collapse">
                  {filteredFaqs.map(q => (
                    <Panel header={q.title} key={q.id}>
                      <p>{q.answers.find(a => a.isStaff)?.text || 'ไม่มีคำตอบ'}</p>
                    </Panel>
                  ))}
                </Collapse>
              ) : (
                <Empty description="ไม่พบคำถามที่ตรงกับการค้นหาของคุณ" />
              )}
            </TabPane>

            <TabPane
              tab={<span><FileTextOutlined /> คำร้องของฉัน</span>}
              key="2"
            >
              <List
                className="my-requests-list"
                itemLayout="horizontal"
                dataSource={myRequests}
                renderItem={item => {
                  const hasAdminReply = item.answers.some(ans => ans.isStaff);
                  return (
                    <List.Item
                      style={{cursor: 'pointer'}}
                      onClick={() => handleRequestClick(item)}
                      actions={[
                        <div className="request-item-status">
                          {hasAdminReply ? (
                            <Tag color="success">ตอบกลับแล้ว</Tag>
                          ) : (
                            <Tag color="warning">รอการตอบกลับ</Tag>
                          )}
                        </div>
                      ]}
                    >
                      <List.Item.Meta
                        title={<a onClick={() => handleRequestClick(item)}>{item.title}</a>}
                        description={`ส่งเมื่อ: ${new Date(item.id).toLocaleString('th-TH')}`}
                      />
                    </List.Item>
                  );
                }}
                locale={{ emptyText: "คุณยังไม่มีคำร้องที่เคยส่ง" }}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;