import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import "./PostBoard.css";
import lahui from "../../assets/lahui.svg"; // รูป default

interface Post {
  id: number;
  title: string;
  salary: string;
  location: string;
  image: string;
  timestamp?: number; // เวลาโพสต์
}

const PostBoard: React.FC = () => {
  const navigate = useNavigate(); // ใช้เปลี่ยนหน้าไปยังหน้ารายละเอียดโพสต์เมื่อกด
  const [posts, setPosts] = useState<Post[]>([]); // สร้าง state สำหรับเก็บโพสต์ทั้งหมด (เริ่มเป็น array ว่าง)
  const [loading, setLoading] = useState(true); // สร้าง state สำหรับสถานะการโหลดข้อมูล (เริ่มต้นให้โหลด)

  useEffect(() => {
    // ทำงานครั้งเดียวตอนเปิดหน้านี้
    setTimeout(() => {
      // จำลองการโหลดข้อมูลให้ช้าลง 1 วินาที (เหมือนรอจาก server)
      const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      // ดึงโพสต์ที่บันทึกไว้จาก localStorage ถ้าไม่มีให้เป็น array ว่าง

      // เรียงโพสต์ใหม่ให้โพสต์ล่าสุดอยู่บนสุด
      const sortedPosts = savedPosts.sort(
        (a: Post, b: Post) => (b.timestamp || b.id) - (a.timestamp || a.id)
      );

      setPosts(sortedPosts); // เก็บโพสต์ที่เรียงแล้ว
      setLoading(false); // เปลี่ยนสถานะว่าโหลดเสร็จแล้ว
    }, 1000); // จำลองโหลด 1 วิ
  }, []);

  return (
    <div className="bg-gray">
      {/* พื้นหลังของหน้า */}
      <div className="container">
        <PageHeader title="บอร์ดโพสต์งาน" />
        <div className="job-list">
          {loading ? (
            // ถ้ายังโหลดอยู่ จะแสดงคำว่า "กำลังโหลด..."
            <p style={{ textAlign: "center" }}>กำลังโหลด...</p>
          ) : posts.length === 0 ? (
            // ถ้าโหลดแล้วแต่ไม่มีโพสต์ จะแสดงว่า "ยังไม่มีโพสต์งาน"
            <p style={{ textAlign: "center" }}>ยังไม่มีโพสต์งาน</p>
          ) : (
            // ถ้ามีโพสต์ จะแสดงรายการโพสต์
            posts.map((post) => (
              <div
                key={post.id}
                className="job-card"
                onClick={() => navigate(`/Job/post-detail/${post.id}`)}
                // กดที่โพสต์แล้วไปหน้ารายละเอียดของโพสต์นั้น
                style={{ cursor: "pointer" }}
              >
                <div className="job-info">
                  <h3 className="job-title">{post.title}</h3>
                  <p className="company">ร้านอาหารหมาล่า LAHUI MALATANG</p>
                  {/* ชื่อบริษัท (เขียนตายตัวไว้ตรงนี้) */}
                  <div className="job-meta">
                    <span>📅 วันนี้ - จนกว่าจะปิดรับสมัคร</span>
                    <span>💰 เงินเดือน: {post.salary}</span>
                    <span>📍 สถานที่: {post.location}</span>
                  </div>
                </div>
                <div className="job-logo">
                  <img
                    src={post.image || lahui}
                    // ถ้ามีรูปโพสต์ใช้รูปนั้น ถ้าไม่มีใช้รูป lahui
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
