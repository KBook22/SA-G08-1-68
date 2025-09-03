import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Empty, Spin } from "antd";
import PageHeader from "../../components/PageHeader";
import "./PostBoard.css";
import lahui from "../../assets/lahui.svg"; // รูป default
import { jobPostAPI } from "../../services/https"; //  import api
import { message } from "antd";

interface Post {
  ID: number;
  title: string;
  salary: number;
  image_url?: string;
  CreatedAt: string;
  deadline?: string;
  locationjob: string;
  portfolio_required?: string;
  Employer?: {
    company_name: string;
  };
  employer_id: number;
}

const PostBoard: React.FC = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await jobPostAPI.getAll(); // ใช้ api service
        const result = res.data || res; // เผื่อ backend ส่ง {data:[]} หรือ [] มา
        const sorted = result.sort(
          (a: Post, b: Post) =>
            new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
        );
        setPosts(sorted);
      } catch (err) {
        console.error("Error fetching posts:", err);
        message.error("โหลดโพสต์งานไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
            posts.map((post) => {
              //  format deadline
              const deadlineText = post.deadline
                ? new Date(post.deadline).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "จนกว่าจะปิดรับสมัคร";

              return (
                <div
                  key={post.ID}
                  className="job-card"
                  onClick={() => navigate(`/Job/post-detail/${post.ID}`)}
                >
                  {/* ฝั่งซ้าย */}
                  <div className="job-left">
                    <h3 className="job-title">{post.title}</h3>
                    <p className="company">
                      {post.Employer?.company_name || "ไม่ระบุบริษัท"}
                    </p>

                    <div className="job-details">
                      <div className="job-detail">
                        <span>⏳ ระยะเวลาการรับสมัคร</span>
                        <strong> {deadlineText}</strong>
                      </div>
                      <div className="job-detail">
                        <span>💼 ค่าตอบแทน</span>
                        <strong> {post.salary.toLocaleString()} บาท</strong>
                      </div>
                      <div className="job-detail">
                        <span>📍 สถานที่</span>
                        <strong> {post.locationjob}</strong>
                      </div>
                    </div>
                    <a
                      href={`http://localhost:8080/download/${post.portfolio_required
                        ?.split("/")
                        .pop()}`}
                      target="_blank"
                    >
                      ดาวน์โหลด Portfolio
                    </a>
                  </div>

                  ฝั่งขวา
                  <div className="job-right">
                    <img
                      src={post.image_url || lahui}
                      alt={post.title || "default-logo"}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PostBoard;
