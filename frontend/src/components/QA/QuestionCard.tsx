import { Card, Avatar, Space, Button } from 'antd';
import { LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onLike: (id: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onLike }) => {
  return (
    <Card
      actions={[
        <Button
          key="like"
          type="text"
          icon={<LikeOutlined />}
          onClick={() => onLike(question.id)}
        >
          {question.likes}
        </Button>,
        <Link key="comment" to={`/qa/question/${question.id}`}>
          <Button type="text" icon={<MessageOutlined />}>
            {question.answerCount}
          </Button>
        </Link>,
      ]}
    >
      <Card.Meta
        title={question.title}
        description={
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Avatar size="small" icon={<UserOutlined />} />
              โดย: {question.author}
            </Space>
          </Space>
        }
      />
    </Card>
  );
};

export default QuestionCard;
