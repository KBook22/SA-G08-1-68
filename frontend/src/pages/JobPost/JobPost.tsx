import React, { useState } from "react";
import { Form, Input, Button, Modal, Result } from "antd";
import JobTypeSelector from "./JobTypeSelector";
import Location from "./Location";
import WorkTimeAndDeadline from "./WorkTimeAndDeadline";
import JobPostingSection from "./JobPostingSection";
import "./JobPost.css";
import PageHeader from "../../components/PageHeader";
import lahui from "../../assets/lahui.svg"; // ✅ default logo

const JobPost: React.FC = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // เมื่อกด submit
  const handleFinish = (values: any) => {
    const oldPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    const newPost = {
      id: oldPosts.length + 1,
      title: values.Name,
      salary: values.Salary || "12,000 บาท/เดือน",
      location: values.Location || "มทส. ประตู 4",
      image: imagePreview || lahui,   // ✅ ถ้าไม่อัปโหลด ใช้ default logo
    };

    localStorage.setItem("posts", JSON.stringify([...oldPosts, newPost]));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImagePreview(null);
    // form.resetFields(); // ถ้าอยากล้างฟอร์มหลังโพสต์
  };

  // เมื่อเลือกไฟล์รูป → แปลงเป็น base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // ✅ base64 string
      };
      reader.readAsDataURL(file); // แปลงเป็น base64
    }
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

        {/* upload รูป */}
        <Form.Item label="เลือกรูปโลโก้ร้าน (ถ้ามี)">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              style={{ marginTop: "10px", width: "120px", borderRadius: "8px" }}
            />
          )}
        </Form.Item>

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
        />
      </Modal>
    </div>
  );
};

export default JobPost;
