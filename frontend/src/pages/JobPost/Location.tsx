import React, { useState } from 'react';
import { Input, Form } from 'antd';

const Location: React.FC = () => {
  const [location, setLocation] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <Form.Item
      label={<span className="label">ที่ตั้ง</span>}
      name="location"
      rules={[{ required: true, message: 'กรุณากรอก Location' }]}
    >
      <Input
        placeholder="กรอก Location"
        value={location}
        onChange={onChange}
        size="large"
      />
    </Form.Item>
  );
};

export default Location;
