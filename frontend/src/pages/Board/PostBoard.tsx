import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import "./PostBoard.css";
import lahui from "../../assets/lahui.svg"; // ✅ รูป default

interface Post {
  id: number;
  title: string;
  salary: string;
  location: string;
  image: string;
}

const PostBoard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(savedPosts);
  }, []);

  return (
    <div className="bg-gray">
      <div className="postboard-container">
        <PageHeader title="บอร์ดโพสต์งาน" />
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <p style={{ textAlign: "center" }}>ยังไม่มีโพสต์งาน</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="job-card"
              onClick={() => navigate(`/Job/post-detail/${post.id}`)}
              style={{ cursor: "pointer" }}
            >
              {/* ข้อมูลฝั่งซ้าย */}
              <div className="job-info">
                <h3 className="job-title">{post.title}</h3>
                <p className="company">ร้านอาหารญาล่า LAHUI MALATANG</p>
                <div className="job-meta">
                  <span>📅 วันนี้ - จนกว่าจะปิดรับสมัคร</span>
                  <span>💰 เงินเดือน: {post.salary}</span>
                  <span>📍 สถานที่: {post.location}</span>
                </div>
              </div>

              {/* โลโก้ร้านฝั่งขวา */}
              <div className="job-logo">
                <img
                  src={post.image || lahui} // ✅ base64 หรือ default
                  alt={post.title || "default-logo"}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostBoard;
