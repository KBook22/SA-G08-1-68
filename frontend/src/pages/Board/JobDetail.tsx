import React, { useState } from "react";
import { Button } from "antd";
import lahui from "../../assets/lahui.svg";
import { useNavigate } from "react-router-dom";
import "./JobDetail.css";
import "../../index.css"; // ถ้าไฟล์อยู่ src/index.css
import "../../Layout.css";
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const posts = [
  {
    id: 1,
    title: "พนักงานครัว",
    image: lahui,
    description: "รายละเอียดโพสต์ล่าฮุย",
    duration: "รับสมัครถึง 30 ก.ย. 2568",
    salary: "12,000/เดือน",
    location: "มทส.ประตู4",
  },
  {
    id: 2,
    title: "โพสต์อื่น ๆ",
    image: lahui,
    description: "รายละเอียดโพสต์อื่น ๆ",
    duration: "รับสมัครถึง 15 ต.ค. 2568",
    salary: "10,000/เดือน",
    location: "มทส.ประตู2",
  },
  {
    id: 3,
    title: "โพสต์อื่น ๆ",
    image: lahui,
    description: "รายละเอียดโพสต์อื่น ๆ",
    duration: "รับสมัครถึง 15 ต.ค. 2568",
    salary: "10,000/เดือน",
    location: "มทส.ประตู2",
  },
  {
    id: 4,
    title: "โพสต์อื่น ๆ",
    image: lahui,
    description: "รายละเอียดโพสต์อื่น ๆ",
    duration: "รับสมัครถึง 15 ต.ค. 2568",
    salary: "10,000/เดือน",
    location: "มทส.ประตู2",
  },
  {
    id: 5,
    title: "โพสต์อื่น ๆ",
    image: lahui,
    description: "รายละเอียดโพสต์อื่น ๆ",
    duration: "รับสมัครถึง 15 ต.ค. 2568",
    salary: "10,000/เดือน",
    location: "มทส.ประตู2",
  },
];

const PostLayout: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState(posts[0]);
  const navigate = useNavigate();

  return (
    <div className="post-layout-container">
      {/* 🔹 ฝั่งซ้าย: Sidebar รายการโพสต์ */}
      <div className="post-list-sidebar">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`post-preview ${
              selectedPost.id === post.id ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(post)}
          >
            {/* 🔹 ข้อความฝั่งซ้ายในแต่ละโพสต์ */}
            <div className="post-text">
              <h4>{post.title || "พนักงานครัว"}</h4>
              <p className="post-subtitle">
                LAHUI MALATANG <br />
                ร้านล่าฮุยมาล่าทัง
              </p>

              <div className="post-meta-icons">
                <div className="meta-item">
                  <ClockCircleOutlined />
                  <span>{post.duration}</span>
                </div>
                <div className="meta-item">
                  <DollarCircleOutlined />
                  <span>{post.salary}</span>
                </div>
                <div className="meta-item">
                  <EnvironmentOutlined />
                  <span>{post.location}</span>
                </div>
              </div>
            </div>

            {/* 🔹 รูปภาพฝั่งขวาในแต่ละโพสต์ */}
            <div className="post-image-wrapper">
              <img className="post-image-detail " src={selectedPost.image} />
            </div>
          </div>
        ))}
      </div>
      {/* ----------------------------------------------------------------------------- */}

      {/* 🔸 ฝั่งขวา: รายละเอียดโพสต์ที่ถูกเลือก */}
      {/* ฝั่งขวา: รายละเอียดโพสต์ */}
      <div className="post-full-detail">
        <div className="wrap-title-detail">
          <div>
            <h2 className="title-detail">{selectedPost.title}</h2>
            <div className="image-subtitle-row">
              <img
                src={selectedPost.image}
                className="post-detail-image"
                alt={selectedPost.title}
              />
              <p className="post-subtitle-detail">
                LAHUI MALATANG <br />
                ร้านล่าฮุยมาล่าทัง
              </p>
            </div>
          </div>

          <Button
            className="btn-Job-Application"
            type="primary"
            onClick={() =>
              navigate("/Job/ApplyJob", { state: { post: selectedPost } })
            }
          >
            ยื่นสมัครงาน
          </Button>
        </div>
        <div className="box-with-top-bottom-border">
          {/* เนื้อหาเพิ่มเติม */}
        </div>
        {/* <p>{selectedPost.description}</p>
        <div className="post-meta-icons">
          <span>
            <ClockCircleOutlined style={{ marginRight: 6 }} />
            {selectedPost.duration}
          </span>
          <br />
          <span>
            <DollarCircleOutlined style={{ marginRight: 6 }} />
            {selectedPost.salary}
          </span>
          <br />
          <span>
            <EnvironmentOutlined style={{ marginRight: 6 }} />
            {selectedPost.location}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default PostLayout;
