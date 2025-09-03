// import React, { useEffect, useState } from "react";
// import { Button } from "antd";
// import lahui from "../../assets/lahui.svg";
// import { useNavigate, useParams } from "react-router-dom";
// import "./JobDetail.css";
// import "../../index.css";
// import "../../Layout.css";
// import {
//   ClockCircleOutlined,
//   DollarCircleOutlined,
//   EnvironmentOutlined,
// } from "@ant-design/icons";
// import { jobPostAPI } from "../../services/https";

// interface Post {
//   id: number;
//   title: string;
//   image: string;
//   description?: string;
//   duration?: string;
//   salary: string;
//   location: string;
//   timestamp?: number;
// }

// const PostLayout: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
//   const { id } = useParams<{ id: string }>(); // ดึง id ที่เราคลิกมา
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

//     setPosts(savedPosts);

//     // หาโพสต์ที่ id ตรงกับใน URL
//     const foundPost = savedPosts.find((p: Post) => p.id === Number(id));

//     if (foundPost) {
//       setSelectedPost(foundPost);
//     } else if (savedPosts.length > 0) {
//       // ถ้า id ไม่เจอ เลือกโพสต์แรก
//       setSelectedPost(savedPosts[0]);
//     }
//   }, [id]);

//   return (
//     <div className="post-layout-container">
//       {/* ฝั่งซ้าย: รายการโพสต์ */}
//       <div className="post-list-sidebar">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className={`post-preview ${
//               selectedPost?.id === post.id ? "selected" : ""
//             }`}
//             onClick={() => setSelectedPost(post)}
//           >
//             <div className="post-text">
//               <h4>{post.title}</h4>
//               <p className="post-subtitle">
//                 LAHUI MALATANG <br />
//                 ร้านล่าฮุยมาล่าทัง
//               </p>

//               <div className="post-meta-icons">
//                 <div className="meta-item">
//                   <ClockCircleOutlined />
//                   <span>{post.duration || "ยังไม่ระบุ"}</span>
//                 </div>
//                 <div className="meta-item">
//                   <DollarCircleOutlined />
//                   <span>{post.salary}</span>
//                 </div>
//                 <div className="meta-item">
//                   <EnvironmentOutlined />
//                   <span>{post.location}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="post-image-wrapper">
//               <img className="post-image-detail" src={post.image || lahui} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ฝั่งขวา: รายละเอียดโพสต์ที่เลือก */}
//       <div className="post-full-detail">
//         {selectedPost && (
//           <>
//             <div className="wrap-title-detail">
//               <div>
//                 <h2 className="title-detail">{selectedPost.title}</h2>
//                 <div className="image-subtitle-row">
//                   <img
//                     src={selectedPost.image}
//                     className="post-detail-image"
//                     alt={selectedPost.title}
//                   />
//                   <p className="post-subtitle-detail">
//                     LAHUI MALATANG <br />
//                     ร้านล่าฮุยมาล่าทัง
//                   </p>
//                 </div>
//               </div>

//               <Button
//                 className="btn-Job-Application"
//                 type="primary"
//                 onClick={() =>
//                   navigate("/Job/ApplyJob", { state: { post: selectedPost } })
//                 }
//               >
//                 ยื่นสมัครงาน
//               </Button>
//             </div>
//             <div className="box-with-top-bottom-border">
//               {selectedPost.description || "ไม่มีรายละเอียดเพิ่มเติม"}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostLayout;

import React, { useEffect, useState } from "react";
import { Button, Spin, message } from "antd";
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
import { jobPostAPI } from "../../services/https"; //  เพิ่ม API
import type { Jobpost } from "../../interfaces/jobpost";

// interface Post {
//   ID: number;
//   title: string;
//   image_url?: string;
//   description?: string;
//   deadline?: string;
//   salary: number;
//   locationjob: string;
//   Employer?: {
//     company_name: string;
//   };
// }

const PostLayout: React.FC = () => {
  const [posts, setPosts] = useState<Jobpost[]>([]);
  const [selectedPost, setSelectedPost] = useState<Jobpost | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ดึงโพสต์ทั้งหมดจาก API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await jobPostAPI.getAll();
        const data = res.data || res;

        if (!data || data.length === 0) {
          message.warning("ยังไม่มีประกาศงาน");
          setPosts([]);
          return;
        }

        setPosts(data);

        // ถ้ายังไม่ได้เลือกโพสต์ → เลือกโพสต์แรกเป็น default
        if (!selectedPost) {
          setSelectedPost(data[0]);
        }
      } catch (err) {
        console.error("Error fetching job post:", err);
        message.error("โหลดโพสต์งานไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="post-layout-container">
      {/* ฝั่งซ้าย: รายการโพสต์ */}
      <div className="post-list-sidebar">
        {posts.map((post) => (
          <div
            key={post.ID}
            className={`post-preview ${
              selectedPost?.ID === post.ID ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(post)}
          >
            <div className="post-text">
              <h4>{post.title}</h4>
              <p className="post-subtitle">
                {post.employer?.company_name || "ไม่ระบุบริษัท"}
              </p>

              <div className="post-meta-icons">
                <div className="meta-item">
                  <ClockCircleOutlined />
                  <span>
                    {post.deadline
                      ? new Date(post.deadline).toLocaleDateString("th-TH")
                      : "จนกว่าจะปิดรับสมัคร"}
                  </span>
                </div>
                <div className="meta-item">
                  <DollarCircleOutlined />
                  <span>{post.salary.toLocaleString()} บาท</span>
                </div>
                <div className="meta-item">
                  <EnvironmentOutlined />
                  <span>{post.locationjob}</span>
                </div>
              </div>
            </div>

            <div className="post-image-wrapper">
              <img
                className="post-image-detail"
                src={post.image_url || lahui}
                alt={post.title}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ฝั่งขวา: รายละเอียดโพสต์ */}
      <div className="post-full-detail">
        {selectedPost && (
          <>
            <div className="wrap-title-detail">
              <div>
                <h2 className="title-detail">{selectedPost.title}</h2>
                <div className="image-subtitle-row">
                  <img
                    src={selectedPost.image_url || lahui}
                    className="post-detail-image"
                    alt={selectedPost.title}
                  />
                  <p className="post-subtitle-detail">
                    {selectedPost.employer?.company_name || "ไม่ระบุบริษัท"}
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