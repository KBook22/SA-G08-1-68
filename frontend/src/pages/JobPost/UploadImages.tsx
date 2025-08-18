import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const getBase64 = (file: File, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(file);
};

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImages: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // สมมติ response จาก server มี url ของรูป
      const url = info.file.response?.url;
      setLoading(false);
      if (url) {
        setImageUrl(url);
      } else {
        // fallback แปลง Base64 แสดงแทน
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
      className="avatar-uploader"
      showUploadList={false}
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" // เปลี่ยนเป็น API จริงถ้ามี
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
    </Upload>
  );
};

export default UploadImages;
