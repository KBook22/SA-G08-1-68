import React, { useEffect, useState } from "react";
import { Button } from "antd";
import lahui from "../../assets/lahui.svg";
import { useNavigate, useParams } from "react-router-dom";
import "./JobDetail.css";
import "../../index.css";
import "../../Layout.css";
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

interface Post {
  id: number;
  title: string;
  image: string;
  description?: string;
  duration?: string;
  salary: string;
  location: string;
  timestamp?: number;
}

const PostLayout: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>(); // ดึง id ที่เราคลิกมา
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    setPosts(savedPosts);

    // หาโพสต์ที่ id ตรงกับใน URL
    const foundPost = savedPosts.find((p: Post) => p.id === Number(id));

    if (foundPost) {
      setSelectedPost(foundPost);
    } else if (savedPosts.length > 0) {
      // ถ้า id ไม่เจอ เลือกโพสต์แรก
      setSelectedPost(savedPosts[0]);
    }
  }, [id]);

  return (
    <div className="post-layout-container">
      {/* ฝั่งซ้าย: รายการโพสต์ */}
      <div className="post-list-sidebar">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`post-preview ${
              selectedPost?.id === post.id ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(post)}
          >
            <div className="post-text">
              <h4>{post.title}</h4>
              <p className="post-subtitle">
                LAHUI MALATANG <br />
                ร้านล่าฮุยมาล่าทัง
              </p>

              <div className="post-meta-icons">
                <div className="meta-item">
                  <ClockCircleOutlined />
                  <span>{post.duration || "ยังไม่ระบุ"}</span>
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

            <div className="post-image-wrapper">
              <img className="post-image-detail" src={post.image || lahui} />
            </div>
          </div>
        ))}
      </div>

      {/* ฝั่งขวา: รายละเอียดโพสต์ที่เลือก */}
      <div className="post-full-detail">
        {selectedPost && (
          <>
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
              {selectedPost.description || "ไม่มีรายละเอียดเพิ่มเติม"}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostLayout;
