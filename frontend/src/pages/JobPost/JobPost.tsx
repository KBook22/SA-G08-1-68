// import React, { useState } from "react";
// import { Form, Input, Button, Modal, Result } from "antd";
// import JobTypeSelector from "./JobTypeSelector";
// import Location from "./Location";
// import WorkTimeAndDeadline from "./WorkTimeAndDeadline";
// import JobPostingSection from "./JobPostingSection";
// import "./JobPost.css";
// import PageHeader from "../../components/PageHeader";
// import lahui from "../../assets/lahui.svg"; // ✅ default logo

// const JobPost: React.FC = () => {
//   const [form] = Form.useForm();
//   const [open, setOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   // เมื่อกด submit
//   const handleFinish = (values: any) => {
//     const oldPosts = JSON.parse(localStorage.getItem("posts") || "[]");

//     const newPost = {
//       id: oldPosts.length + 1,
//       title: values.Name,
//       salary: values.Salary || "12,000 บาท/เดือน",
//       location: values.Location || "มทส. ประตู 4",
//       image: imagePreview || lahui,   // ✅ ถ้าไม่อัปโหลด ใช้ default logo
//     };

//     localStorage.setItem("posts", JSON.stringify([...oldPosts, newPost]));
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setImagePreview(null);
//     // form.resetFields(); // ถ้าอยากล้างฟอร์มหลังโพสต์
//   };

//   // เมื่อเลือกไฟล์รูป → แปลงเป็น base64
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string); // ✅ base64 string
//       };
//       reader.readAsDataURL(file); // แปลงเป็น base64
//     }
//   };

//   return (

//     <div 
//       style={{
//         paddingTop: 50,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         background: "white"
//       }}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         style={{ width: "100%", maxWidth: 800 }}
//         autoComplete="off"
//         onFinish={handleFinish}
//       >
//         <div className="JopPost-container">
//           <PageHeader title="รายละเอียดประกาศงาน" />
//         </div>

//         {/* ฟิลด์กรอก */}
//         <Form.Item
//           label={<span className="label">ชื่องาน</span>}
//           name="Name"
//           rules={[{ required: true, message: "กรุณากรอกชื่องาน" }]}
//         >
//           <Input placeholder="กรอกชื่องาน" size="large" />
//         </Form.Item>

//         <JobTypeSelector />
//         <Location />
//         <WorkTimeAndDeadline />
//         <JobPostingSection />

//         {/* upload รูป */}
//         <Form.Item label="เลือกรูปโลโก้ร้าน (ถ้ามี)">
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="preview"
//               style={{ marginTop: "10px", width: "120px", borderRadius: "8px" }}
//             />
//           )}
//         </Form.Item>

//         {/* ปุ่มยืนยัน */}
//         <div className="submit-button-wrapper">
//           <Button
//             type="primary"
//             size="large"
//             htmlType="submit"
//             className="submit-button"
//           >
//             ยืนยัน
//           </Button>
//         </div>
//       </Form>

//       {/* Modal แสดงผลลัพธ์ */}
//       <Modal
//         open={open}
//         onCancel={handleClose}
//         footer={null}
//         centered
//         width={450}
//         className="success-modal"
//       >
//         <Result
//           status="success"
//           title="โพสต์งานเรียบร้อยแล้ว"
//           subTitle={
//             <>
//               นักศึกษาสามารถเห็นประกาศนี้ได้ทันที <br />
//               คุณสามารถติดตามสถานะผู้สมัครจากหน้ารายชื่อผู้สมัคร <br />
//               หรือแก้ไขข้อมูลได้ตลอดเวลา
//             </>
//           }
//         />
//       </Modal>
//     </div>
//   );
// };

// export default JobPost;

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Result,
  Upload,
  message,
  DatePicker,
  Alert,
  Select,
  Radio,
  Card,
  Row,
  Col,
  TimePicker,
} from "antd";
import { UploadOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps, RadioChangeEvent } from "antd";
import axios from "axios";
import "./JobPost.css";
import PageHeader from "../../components/PageHeader";
import lahui from "../../assets/lahui.svg"; // ✅ default logo

const { TextArea } = Input;
const { RangePicker } = TimePicker;

const JobPost: React.FC = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // เมื่อ submit ฟอร์ม
  const handleFinish = async (values: any) => {
    try {
      const payload = {
        title: values.Name,
        description: values.jobDetails,
        salary: Number(values.compensation),
        location_id: 1,          // 👈 ตอนนี้ fix id = 1 ไปก่อน
        employer_id: 1,
        job_category_id: 1,
        employment_type_id: 1,
        salary_type_id: 1,
        deadline: values.applicationDeadline.toISOString(), 
        status: "Open"
      };

      console.log("📤 ส่งไป backend:", payload);

      await axios.post("http://localhost:8080/api/jobposts", payload);

      setOpen(true);
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
      message.error("บันทึกงานไม่สำเร็จ!");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImagePreview(null);
    form.resetFields();
  };

  // ✅ Upload Image (preview base64)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ UploadImages inline
  const UploadImages: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>();

    const getBase64 = (file: File, callback: (url: string) => void) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result as string));
      reader.readAsDataURL(file);
    };

    const beforeUpload = (file: File) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("คุณสามารถอัพโหลดได้แค่ JPG/PNG เท่านั้น!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("ไฟล์ต้องมีขนาดเล็กกว่า 2MB!");
      }
      return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps["onChange"] = (info) => {
      if (info.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        const url = info.file.response?.url;
        setLoading(false);
        if (url) {
          setImageUrl(url);
        } else {
          getBase64(info.file.originFileObj as File, (base64Url) => {
            setImageUrl(base64Url);
          });
        }
      }
    };

    const uploadButton = (
      <Button style={{ border: 0, background: "none" }}>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </Button>
    );

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  };

  // ✅ JobTypeSelector inline
  const JobTypeSelector: React.FC = () => {
    const [value, setValue] = useState<string>("part-time");
    const onChange = (e: RadioChangeEvent) => setValue(e.target.value);

    const jobTypes = [
      { label: "ฟรีแลนซ์ (โปรเจกต์)", value: "freelance" },
      { label: "สัญญาจ้าง (รายเดือน/รายปี)", value: "contract" },
      { label: "พาร์ทไทม์ (รายชั่วโมง/รายวัน)", value: "part-time" },
      { label: "งานประจำ", value: "full-time" },
    ];

    return (
      <Form.Item
        label="ลักษณะงาน"
        name="jobType"
        rules={[{ required: true, message: "กรุณาเลือกประเภทงาน" }]}
      >
        <Radio.Group onChange={onChange} value={value} style={{ width: "100%" }}>
          <div style={{ display: "grid", gap: 12 }}>
            {jobTypes.map((job) => (
              <Card
                key={job.value}
                onClick={() => setValue(job.value)}
                className={value === job.value ? "custom-card-selected" : ""}
              >
                <Radio value={job.value}>{job.label}</Radio>
              </Card>
            ))}
          </div>
        </Radio.Group>
      </Form.Item>
    );
  };

  // ✅ Location inline
  const Location: React.FC = () => (
    <Form.Item
      label="ที่ตั้ง"
      name="location"
      rules={[{ required: true, message: "กรุณากรอก Location" }]}
    >
      <Input placeholder="กรอก Location" size="large" />
    </Form.Item>
  );

  // ✅ WorkTimeAndDeadline inline
  const WorkTimeAndDeadline: React.FC = () => (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="เวลาเริ่ม-เลิกงาน (ถ้ามี)" name="workTime">
          <RangePicker format="HH:mm" size="large" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="วันหมดเขตรับสมัคร"
          name="applicationDeadline"
          rules={[{ required: true, message: "กรุณาเลือกวันหมดเขตรับสมัคร" }]}
        >
          <DatePicker size="large" style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>
      </Col>
    </Row>
  );

  return (
    <div
      style={{
        paddingTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%", maxWidth: 800 }}
        autoComplete="off"
        onFinish={handleFinish}
      >
        <PageHeader title="รายละเอียดประกาศงาน" />

        <Form.Item
          label="ชื่องาน"
          name="Name"
          rules={[{ required: true, message: "กรุณากรอกชื่องาน" }]}
        >
          <Input placeholder="กรอกชื่องาน" size="large" />
        </Form.Item>

        <JobTypeSelector />
        <Location />
        <WorkTimeAndDeadline />

        <Form.Item
          label="รายละเอียดงาน"
          name="jobDetails"
          rules={[{ required: true, message: "กรุณากรอกรายละเอียดงาน" }]}
        >
          <TextArea rows={4} placeholder="อธิบายรายละเอียดงาน" />
        </Form.Item>

        <Form.Item
          label="เงินเดือน"
          name="compensation"
          rules={[{ required: true, message: "กรุณากรอกเงินเดือน" }]}
        >
          <Input type="number" placeholder="กรอกค่าตอบแทน" />
        </Form.Item>

        <Form.Item label="เลือกรูปโลโก้ร้าน (ถ้ามี)">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              style={{ marginTop: 10, width: 120, borderRadius: 8 }}
            />
          )}
        </Form.Item>

        <Form.Item label="อัพโหลดรูปภาพเพิ่มเติม">
          <UploadImages />
        </Form.Item>

        <Alert
          message="สำหรับโพสต์จ้างงานเท่านั้น"
          description="ห้ามใส่ข้อมูลติดต่อส่วนตัว หากฝ่าฝืนจะถูกลบประกาศ"
          type="warning"
          showIcon
        />

        <div className="submit-button-wrapper" style={{ marginTop: 20 }}>
          <Button type="primary" size="large" htmlType="submit" className="submit-button">
            ยืนยัน
          </Button>
        </div>
      </Form>

      <Modal open={open} onCancel={handleClose} footer={null} centered width={450}>
        <Result
          status="success"
          title="โพสต์งานเรียบร้อยแล้ว"
          subTitle="นักศึกษาสามารถเห็นประกาศนี้ได้ทันที และคุณสามารถติดตามผู้สมัครได้ตลอดเวลา"
        />
      </Modal>
    </div>
  );
};

export default JobPost;
