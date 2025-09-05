import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Board.css";
import Announcement from "../../assets/Announcement.svg";
import PostBoard from "./PostBoard";
import "../../index.css";

const Board: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#F8F8F8', padding: 0, minHeight: '85vh' }}>
    
      <div className="board-container">
        <div className="board-content">
          <div className="subheadline">
            <h1>ผู้ว่าจ้างโพสต์งานเพื่อหาคนที่ใช่</h1>
            <h1>นักศึกษาเลือกงานที่สนใจ !</h1>

            <div className="button-row">
              <Button
                type="primary"
                className="btn-startpost"
                onClick={() => navigate("/Job/post-job")}
              >
                เริ่มโพสต์ได้เลย
              </Button>
              <Button
                type="primary"
                className="btn-mypost"
                onClick={() => navigate("/Job/Mypost-job")}
              >
                โพสต์ของฉัน
              </Button>
            </div>
          </div>

          <div className="banner-container">
            <div className="banner-content">
              <h1>เริ่มต้นประกาศหานักศึกษา</h1>
              <p>โพสต์ประกาศหานักศึกษามาช่วยงานแบบตรงใจ ได้เลยทันที</p>
              <Button
                type="primary"
                className="no-border-button"
                onClick={() => navigate("/Job/post-job")}
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
  );
};

export default Board;
