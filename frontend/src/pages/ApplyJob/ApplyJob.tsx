import React from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import "./ApplyJob.css";
import JobAppDetail from "./AppJobDetail";


const ApplyJob: React.FC = () => {
  const location = useLocation();
  const post = location.state?.post;

  if (!post) {
    return <div>ไม่พบข้อมูลโพสต์</div>;
  }

  return (
    <div className="apply-job-container">
      <PageHeader title="ยื่นสมัครงาน" />

      <div className="apply-job-content">
        <img src={post.image} alt="Job" className="apply-job-image" />
        <div className="apply-detail-container">
          <div className="apply-detail">
            <h2 className="post-title-AppJob">{post.title}</h2>
            <p>{post.description}</p>
            <p>
              <strong>ระยะเวลา:</strong> {post.duration}
            </p>
            <p>
              <strong>ค่าตอบแทน:</strong> {post.salary}
            </p>
            <p>
              <strong>สถานที่:</strong> {post.location}
            </p>
          </div>
        </div>
      </div>
      <JobAppDetail />
    </div>
  );
};

export default ApplyJob;
