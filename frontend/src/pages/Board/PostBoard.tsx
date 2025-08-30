import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Empty, Spin } from "antd";
import PageHeader from "../../components/PageHeader";
import "./PostBoard.css";
import lahui from "../../assets/lahui.svg"; // รูป default

interface Post {
  ID: number;
  title: string;
  salary: number;
  image_url?: string;
  CreatedAt: string;
  Employer?: {
    company_name: string;
  };
}

const PostBoard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/jobposts")
      .then((res) => res.json())
      .then((result) => {
        const sorted = result.data.sort(
          (a: Post, b: Post) =>
            new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
        );
        setPosts(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray">
      <div className="container">
        <PageHeader title="บอร์ดโพสต์งาน" />
        <div className="job-list">
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Spin size="large" />
            </div>
          ) : posts.length === 0 ? (
            <Empty description="ยังไม่มีโพสต์งาน" />
          ) : (
            posts.map((post) => (
              <div
                key={post.ID}
                className="job-card"
                onClick={() => navigate(`/Job/post-detail/${post.ID}`)}
              >
                <div className="job-info">
                  <h3 className="job-title">{post.title}</h3>
                  <p className="company">
                    {post.Employer?.company_name || "ไม่ระบุบริษัท"}
                  </p>
                  <div className="job-meta">
                    <span>
                      📅 โพสต์เมื่อ:{" "}
                      {new Date(post.CreatedAt).toLocaleDateString()}
                    </span>
                    <span>💰 เงินเดือน: {post.salary}</span>
                  </div>
                </div>
                <div className="job-logo">
                  <img
                    src={post.image_url || lahui}
                    alt={post.title || "default-logo"}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostBoard;
