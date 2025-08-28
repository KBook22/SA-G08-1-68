import React, { useState } from "react";
import { Form, Input, Button, Modal, Result } from "antd";
import JobTypeSelector from "./JobTypeSelector";
import Location from "./Location";
import WorkTimeAndDeadline from "./WorkTimeAndDeadline";
import JobPostingSection from "./JobPostingSection";
import "./JobPost.css";
import PageHeader from "../../components/PageHeader";

const JobPost: React.FC = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  // เวลากดยืนยันฟอร์ม
  const handleFinish = (values: any) => {
    console.log("ค่าที่กรอก:", values);
    // TODO: call API บันทึกประกาศงาน
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // form.resetFields(); // ถ้าอยากล้างฟอร์มหลังโพสต์เสร็จ
  };

  return (
    <div
      style={{
        paddingTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white"
      }}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%", maxWidth: 800 }}
        autoComplete="off"
        onFinish={handleFinish}
      >
        <div className="JopPost-container">
          <PageHeader title="รายละเอียดประกาศงาน" />
        </div>

        {/* ฟิลด์กรอก */}
        <Form.Item
          label={<span className="label">ชื่องาน</span>}
          name="Name"
          rules={[{ required: true, message: "กรุณากรอกชื่องาน" }]}
        >
          <Input placeholder="กรอกชื่องาน" size="large" />
        </Form.Item>

        <JobTypeSelector />
        <Location />
        <WorkTimeAndDeadline />
        <JobPostingSection />

        {/* ปุ่มยืนยัน */}
        <div className="submit-button-wrapper">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="submit-button"
          >
            ยืนยัน
          </Button>
        </div>
      </Form>

      {/* Modal แสดงผลลัพธ์ */}
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        centered
        width={450}
        
        className="success-modal"
      >
        <Result
          status="success"
          title="โพสต์งานเรียบร้อยแล้ว"
          subTitle={
            <>
              นักศึกษาสามารถเห็นประกาศนี้ได้ทันที <br />
              คุณสามารถติดตามสถานะผู้สมัครจากหน้ารายชื่อผู้สมัคร <br />
              หรือแก้ไขข้อมูลได้ตลอดเวลา
            </>
          }
          // extra={[
          //   <Button type="primary" key="close" onClick={handleClose}>
          //     ปิด
          //   </Button>,
          // ]}
        />
      </Modal>
    </div>
  );
};

export default JobPost;
