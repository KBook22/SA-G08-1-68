// import React, { useEffect, useState } from "react";
// import { Card, Button, Empty } from "antd";
// import "./MyPost.css";

// interface JobPost {
//   id: number;
//   title: string;
//   salary: string;
//   location: string;
//   image: string;
//   timestamp?: number; // เผื่อรองรับเวลาโพสต์
// }

// const MyPost: React.FC = () => {
//   const [posts, setPosts] = useState<JobPost[]>([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("posts") || "[]");

//     //  เรียงโพสต์ใหม่ล่าสุดอยู่บนสุด (ใช้ timestamp ถ้ามี ไม่งั้นใช้ id)
//     const sorted = saved.sort(
//       (a: JobPost, b: JobPost) =>
//         (b.timestamp || b.id || 0) - (a.timestamp || a.id || 0)
//     );

//     setPosts(sorted);
//   }, []);

//   const handleDelete = (id: number) => {
//     const updated = posts.filter((p) => p.id !== id);
//     setPosts(updated);
//     localStorage.setItem("posts", JSON.stringify(updated));
//   };

//   return (
//     <div className="mypost-container">
//       <h2 className="mypost-header">โพสต์ของฉัน</h2>

//       {posts.length === 0 ? (
//         <Empty description="ยังไม่มีโพสต์งาน" />
//       ) : (
//         posts.map((post) => (
//           <Card key={post.id} className="mypost-card">
//             <div className="mypost-content">
//               {/*  ข้อมูลโพสต์ (ด้านซ้าย) */}
//               <div className="mypost-info">
//                 <h3 className="mypost-title">{post.title}</h3>
//                 <p className="mypost-company">
//                   ร้านอาหารหมาล่า <br /> LAHUI MALATANG
//                 </p>
//                 <div className="mypost-detail">
//                   <span>📅 วันนี้ - จนกว่าจะปิดรับสมัคร</span>
//                   <span>💰 เงินเดือน: {post.salary}</span>
//                   <span>📍 {post.location}</span>
//                 </div>
//               </div>

//               {/* โลโก้ (ด้านขวา) */}
//               <div className="mypost-logo">
//                 <img src={post.image} alt={post.title} />
//               </div>
//             </div>

//             {/*  ปุ่ม action ทั้งหมด ด้านล่าง */}
//             <div className="mypost-actions">
//               <Button size="small" type="default">
//                 แก้ไข
//               </Button>
//               <Button danger size="small" onClick={() => handleDelete(post.id)}>
//                 ลบโพสต์
//               </Button>
//               <Button type="primary" size="small">
//                 ดูรายชื่อผู้สมัครงาน
//               </Button>
//             </div>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyPost;
import React, { useEffect, useState } from "react";
import { Card, Button, Empty, Spin } from "antd";
import "./MyPost.css";
import type { Jobpost } from "../../interfaces/jobpost";

const MyPost: React.FC = () => {
  const [posts, setPosts] = useState<Jobpost[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const employerId = localStorage.getItem("employer_id"); // ต้องเก็บตอน login

  fetch(`http://localhost:8080/api/employer/myposts/${employerId}`)
    .then((res) => res.json())
    .then((result) => {
      console.log("Employer posts:", result);
      setPosts(result.data || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching employer posts:", err);
      setLoading(false);
    });
}, []);


  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mypost-container">
      <h2 className="mypost-header">โพสต์ของฉัน</h2>

      {posts.length === 0 ? (
        <Empty description="ยังไม่มีโพสต์งาน" />
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="mypost-card">
            <div className="mypost-content">
              <div className="mypost-info">
                <h3 className="mypost-title">{post.title}</h3>
                <p className="mypost-company">
                  {post.employer?.company_name || "ไม่ระบุบริษัท"}
                </p>
                <div className="mypost-detail">
                  <span>
                    📅 Deadline:{" "}
                    {post.deadline
                      ? new Date(post.deadline).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "จนกว่าจะปิดรับสมัคร"}
                  </span>
                  <span>💰 เงินเดือน: {post.salary.toLocaleString()} บาท</span>
                  <span>📍 {post.locationjob}</span>
                </div>
              </div>

              <div className="mypost-logo">
                <img src={post.image_url} alt={post.title} />
              </div>
            </div>

            <div className="mypost-actions">
              <Button size="small" type="default">
                แก้ไข
              </Button>
              <Button danger size="small">
                ลบโพสต์
              </Button>
              <Button type="primary" size="small">
                ดูรายชื่อผู้สมัครงาน
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyPost;
