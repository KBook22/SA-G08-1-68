import React, { useEffect, useState } from "react";
import { Card, Button, Empty } from "antd";

interface JobPost {
  id: number;
  title: string;
  salary: string;
  location: string;
  image: string;
}

const MyPost: React.FC = () => {
  const [posts, setPosts] = useState<JobPost[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(saved);
  }, []);

  const handleDelete = (id: number) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  return (
    <div style={{ background: "#fff", padding: 24, minHeight: "85vh" }}>
<h2
  style={{
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
    fontSize: "28px",
    fontWeight: 600,
    color: "#1E3A5F"
  }}
>
  โพสต์ของฉัน
</h2>



      {posts.length === 0 ? (
        <Empty description="ยังไม่มีโพสต์งาน" />
      ) : (
        posts.map((post) => (
          <Card
            key={post.id}
            style={{
              marginBottom: 16,
              borderRadius: 10,
              maxWidth: 900,
              margin: "0 auto",
            }}
            cover={
              <img
                alt="logo"
                src={post.image}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                  margin: "12px auto 0",
                }}
              />
            }
            actions={[
              <Button
                danger
                onClick={() => handleDelete(post.id)}
                size="small"
              >
                ลบโพสต์
              </Button>,
              <Button type="primary" size="small">
                ดูรายชื่อผู้สมัครงาน
              </Button>,
            ]}
          >
            <div className="mypost-title">{post.title}</div>
            <div className="mypost-detail">
              <span>📅 วันนี้ - จนกว่าจะปิดรับสมัคร</span>
              <p>💰 {post.salary}</p>
              <p>📍 {post.location}</p>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyPost;
