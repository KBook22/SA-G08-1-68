// import React from "react";
// import { useLocation } from "react-router-dom";
// import PageHeader from "../../components/PageHeader";
// import "./ApplyJob.css";
// import JobAppDetail from "./AppJobDetail";

// const ApplyJob: React.FC = () => {
//   const location = useLocation();
//   const post = location.state?.post;

//   if (!post) {
//     return <div>ไม่พบข้อมูลโพสต์</div>;
//   }

//   return (
//     <div className="apply-job-container">
//       <PageHeader title="ยื่นสมัครงาน" />

//       <div className="apply-job-content">
//         <img src={post.image} alt="Job" className="apply-job-image" />
//         <div className="apply-detail-container">
//           <div className="apply-detail">
//             <h2 className="post-title-AppJob">{post.title}</h2>
//             <p>{post.description}</p>
//             <p>
//               <strong>ระยะเวลา:</strong> {post.duration}
//             </p>
//             <p>
//               <strong>ค่าตอบแทน:</strong> {post.salary}
//             </p>
//             <p>
//               <strong>สถานที่:</strong> {post.location}
//             </p>
//           </div>
//         </div>
//       </div>
//       <JobAppDetail />
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Input,
  Form,
  DatePicker,
  Select,
  Button,
  Upload,
  Alert,
  message,
  Modal,
  Result,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PageHeader from "../../components/PageHeader";
import "./ApplyJob.css";
import "./AppJobDetail.css";
import { jobApplicationAPI } from "../../services/https";

const { TextArea } = Input;

const ApplyJob: React.FC = () => {
  const location = useLocation();
  const { jobpost_id } = useParams();
  const post = location.state?.post;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>({});
  const [jobpost, setJobpost] = useState<any>({});
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  // state สำหรับ Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  // โหลดข้อมูลนักศึกษา + JobPost
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await jobApplicationAPI.init(
          post?.ID || Number(jobpost_id)
        );

        setStudent(res.student);
        setJobpost(res.jobpost);

        form.setFieldsValue({
          ...res.student,
          student_code: res.student_code,
          birthday: dayjs(res.student.birthday),
        });
      } catch (error) {
        message.error("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [form, jobpost_id, post]);

  // กดปุ่มยืนยันสมัครงาน
  const onFinish = async (values: any) => {
    try {
      const payload = {
        student_id: student.ID,
        job_post_id: jobpost.ID,
        application_reason: values.application_reason,
      };

      // เรียก API สมัครงาน
      const res = await jobApplicationAPI.create(payload);

      if (res.status === 201 || res.status === 200) {
        // ถ้าแนบ Portfolio → อัปโหลดเพิ่ม
        // if (portfolioFile) {
        //   await jobApplicationAPI.uploadPortfolio(res.data.ID, portfolioFile);
        // }

        // แสดง Modal เมื่อสมัครสำเร็จ
        setIsModalVisible(true);
        form.resetFields();
      } else {
        message.error("สมัครงานไม่สำเร็จ");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div className="apply-job-container">
      <PageHeader title="ยื่นสมัครงาน" />

      {/* ส่วนรายละเอียดประกาศงาน */}
      <div className="apply-job-content">
        <img
          src={post?.image || "/default-image.jpg"}
          alt="Job"
          className="apply-job-image"
        />
        <div className="apply-detail-container">
          <div className="apply-detail">
            <h2 className="post-title-AppJob">
              {post?.title || jobpost?.title}
            </h2>
            <p>
              <strong>บริษัท:</strong>{" "}
              {post.Employer?.company_name || "ไม่ระบุบริษัท"}
            </p>
            <p>
              <strong>ระยะเวลา:</strong> {post?.deadline || "ไม่ระบุ"}
            </p>
            <p>
              <strong>ค่าตอบแทน:</strong> {post?.salary || "ไม่ระบุ"}
            </p>
            <p>
              <strong>สถานที่:</strong> {post?.locationjob || "ไม่ระบุ"}
            </p>
          </div>
        </div>
      </div>

      {/* ส่วนกรอกฟอร์มสมัครงาน */}
      <div className="job-app-detail-wrapper">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="apply-form"
        >
          <div className="form-grid">
            <Form.Item
              label="ชื่อ"
              name="first_name"
              rules={[{ required: true }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="นามสกุล"
              name="last_name"
              rules={[{ required: true }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item label="รหัสนักศึกษา" name="student_code">
              <Input size="large" readOnly />
            </Form.Item>
            <Form.Item
              label="เบอร์โทร"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="วันเกิด"
              name="birthday"
              rules={[{ required: true }]}
            >
              <DatePicker
                size="large"
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item label="อายุ" name="age" rules={[{ required: true }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item label="อีเมล" name="email" rules={[{ required: true }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item label="คณะ" name="faculty" rules={[{ required: true }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item label="ชั้นปี" name="year" rules={[{ required: true }]}>
              <Select size="large">
                <Select.Option value={1}>ปี 1</Select.Option>
                <Select.Option value={2}>ปี 2</Select.Option>
                <Select.Option value={3}>ปี 3</Select.Option>
                <Select.Option value={4}>ปี 4</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="GPA" name="gpa">
              <Input size="large" />
            </Form.Item>
          </div>

          <Form.Item
            label="เหตุผลการสมัคร"
            name="application_reason"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="เขียนเหตุผลว่าทำไมคุณอยากสมัครตำแหน่งนี้"
              rows={5}
              size="large"
            />
          </Form.Item>

          {jobpost.portfolio_required === "true" && (
            <Form.Item
              label="ไฟล์ผลงาน (Resume)"
              name="portfolio"
              rules={[{ required: true, message: "กรุณาอัปโหลด Portfolio" }]}
            >
              <Upload
                beforeUpload={(file) => {
                  setPortfolioFile(file);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>คลิกเพื่ออัปโหลด</Button>
              </Upload>
            </Form.Item>
          )}

          <Alert
            message="กรุณาตรวจสอบข้อมูลให้ถูกต้อง และแนบเอกสารให้ครบถ้วนก่อนกดยืนยัน"
            type="info"
            showIcon
            style={{
              margin: "20px auto",
              width: "100%",
              maxWidth: "800px",
              display: "block",
            }}
          />

          {/* ปุ่มยืนยันสมัครงาน */}
          <div className="submit-wrapper">
            <Button type="primary" size="large" htmlType="submit">
              ยืนยันสมัครงาน
            </Button>
          </div>

          {/*สมัครสำเร็จ */}
          <Modal
            open={isModalVisible}
            onCancel={handleClose}
            footer={null}
            centered
            width={450}
          >
            <Result
              status="success"
              title="ส่งใบสมัครเรียบร้อยแล้ว"
              subTitle="ระบบได้บันทึกข้อมูลของคุณไว้แล้ว"
            />
          </Modal>
        </Form>
      </div>
    </div>
  );
};

export default ApplyJob;
