import React from "react";
import "./PostBoard.css";
import "./Post.css";
import lahui from "../../assets/lahui.svg";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader"; // <<< นำเข้ามาใช้

const posts = [
  { id: 1, title: "", image: lahui },
  // เพิ่มโพสต์อื่น ๆ ที่นี่ได้
];
const PostBoard: React.FC = () => {
  const navigate = useNavigate();

  return (
   <div className="bg-gray">
  {/* 🟩 Header เต็มจอ */}
  <div className="postboard-container ">
    <PageHeader title="บอร์ดโพสต์งาน" />
  </div>

  {/* ⬜️ เนื้อหาใช้ container จัดกลางตามปกติ */}
  <div className="container">
    <div className="post-list">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-post"
          onClick={() => navigate(`/Job/post-detail/${post.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img src={post.image} alt={post.title} className="post-image" />
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default PostBoard;
