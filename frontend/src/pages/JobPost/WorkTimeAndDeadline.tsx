import React, { useState } from 'react';
import { Row, Col, Form, DatePicker, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';

const { RangePicker } = TimePicker;

const WorkTimeAndDeadline: React.FC = () => {
  const [workTime, setWorkTime] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [deadline, setDeadline] = useState<Dayjs | null>(null);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label={<span className="label">เวลาเริ่ม-เลิกงาน (ถ้ามี)</span>}
          name="workTime"
          rules={[{ required: false }]}
        >
          <RangePicker
            value={workTime}
            onChange={(values) => setWorkTime(values)}
            format="HH:mm"
            size="large"
            allowEmpty={[true, true]}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label={<span className="label">กำหนดการส่ง (ถ้ามี)</span>}
          name="deadline"
        >
          <DatePicker
            style={{ width: '100%', fontSize: 14 }}
            format="YYYY-MM-DD"
            placeholder="เลือกวันที่"
            value={deadline}
            onChange={(date) => setDeadline(date)}
            size="large"
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default WorkTimeAndDeadline;
