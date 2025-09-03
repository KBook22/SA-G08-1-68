// import React from "react";
// import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import "./Board.css";
// import Announcement from "../../assets/Announcement.svg";
// import PostBoard from "./PostBoard";
// import "../../index.css";

// const Board: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={{ background: '#fff', padding: 0, minHeight: '85vh' }}>

//       <div className="board-container">
//         <div className="board-content">
//           <div className="subheadline">
//             <h1>ผู้ว่าจ้างโพสต์งานเพื่อหาคนที่ใช่</h1>
//             <h1>นักศึกษาเลือกงานที่สนใจ !</h1>

//             <div className="button-row">
//               <Button
//                 type="primary"
//                 className="btn-startpost"
//                 onClick={() => navigate("/Job/post-job")}
//               >
//                 เริ่มโพสต์ได้เลย
//               </Button>
//               <Button
//                 type="primary"
//                 className="btn-mypost"
//                 onClick={() => navigate("/Job/Mypost-job")}
//               >
//                 โพสต์ของฉัน
//               </Button>
//             </div>
//           </div>

//           <div className="banner-container">
//             <div className="banner-content">
//               <h1>เริ่มต้นประกาศหานักศึกษา</h1>
//               <p>โพสต์ประกาศหานักศึกษามาช่วยงานแบบตรงใจ ได้เลยทันที</p>
//               <Button
//                 type="primary"
//                 className="no-border-button"
//                 onClick={() => navigate("/Job/post-job")}
//               >
//                 เริ่มโพสต์ได้เลย
//               </Button>
//             </div>

//             <img src={Announcement} alt="ประกาศ" className="banner-image" />
//           </div>
//         </div>
//       </div>

//       <PostBoard />
//     </div>
//   );
// };

// export default Board;
import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Board.css";
import Announcement from "../../assets/Announcement.svg";
import PostBoard from "./PostBoard";
import "../../index.css";

const Board: React.FC = () => {
  const navigate = useNavigate();

  // ดึงข้อมูล user จาก localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  //  Ant Design v5 ต้องใช้ useMessage
  const [messageApi, contextHolder] = message.useMessage();

  // ฟังก์ชันจัดการกดปุ่ม "เริ่มโพสต์"
  const handlePostJob = () => {
    if (role === "employer") {
      navigate("/Job/post-job");
    } else if (role === "student") {
      messageApi.warning(
        "นักศึกษาไม่สามารถโพสต์งานได้ กรุณาสมัครสมาชิกเพื่อโพสต์งาน"
      );
    } else {
      messageApi.warning("กรุณาเข้าสู่ระบบในฐานะผู้ว่าจ้างเพื่อโพสต์งาน");
    }
  };

  // ฟังก์ชันจัดการกดปุ่ม "โพสต์ของฉัน"
  const handleMyPost = () => {
    if (role === "employer") {
      navigate("/Job/Mypost-job");
    } 
  };

  return (
    <>
      {contextHolder}

      <div style={{ background: "#fff", padding: 0, minHeight: "85vh" }}>
        <div className="board-container">
          <div className="board-content">
            <div className="subheadline">
              <h1>ผู้ว่าจ้างโพสต์งานเพื่อหาคนที่ใช่</h1>
              <h1>นักศึกษาเลือกงานที่สนใจ !</h1>

              {/*  ปุ่มจะแสดงทุก role แต่จะเช็คสิทธิ์ตอนกด */}
              <div className="button-row">
                <Button
                  type="primary"
                  className="btn-startpost"
                  onClick={handlePostJob}
                >
                  เริ่มโพสต์ได้เลย
                </Button>
                {/* ✅ แสดงปุ่มเฉพาะ employer */}
                {role === "employer" && (
                  <Button
                    type="primary"
                    className="btn-mypost"
                    onClick={handleMyPost}
                  >
                    โพสต์ของฉัน
                  </Button>
                )}
              </div>
            </div>

            <div className="banner-container">
              <div className="banner-content">
                <h1>เริ่มต้นประกาศหานักศึกษา</h1>
                <p>โพสต์ประกาศหานักศึกษามาช่วยงานแบบตรงใจ ได้เลยทันที</p>

                {/*  ปุ่มนี้ก็ใช้ฟังก์ชันเดียวกัน */}
                <Button
                  type="primary"
                  className="no-border-button"
                  onClick={handlePostJob}
                >
                  เริ่มโพสต์ได้เลย
                </Button>
              </div>

              <img src={Announcement} alt="ประกาศ" className="banner-image" />
            </div>
          </div>
        </div>

        <PostBoard />
      </div>
    </>
  );
};

export default Board;
