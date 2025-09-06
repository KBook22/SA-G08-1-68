import React, { useEffect, useState } from "react";
import { Card, Spin, Empty, message, Tag, Progress } from "antd";
import { jobApplicationAPI } from "../../services/https";
import "./MyApplications.css";

import defaultLogo from "../../assets/profile.svg";

const MyApplications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await jobApplicationAPI.getMyApplications();
        setApplications(res?.data || []);
      } catch (error) {
        message.error("โหลดใบสมัครไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "blue";
      case "InterviewPending":
        return "orange";
      case "Accepted":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "default";
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  }

  return (
    <div className="my-applications-container">
      <h2 className="page-title">ใบสมัครของฉัน</h2>

      {applications.length === 0 ? (
        <Empty description="ยังไม่มีใบสมัคร" />
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <Card key={app.ID} className="application-card">
              <div className="application-info">
                <div className="application-details">
                  <h3>{app.JobPost?.title}</h3>
                  <p>{app.JobPost?.Employer?.company_name}</p>
                  <p>
                    วันที่สมัคร:{" "}
                    {new Date(app.CreatedAt).toLocaleDateString("th-TH")}
                  </p>
                  <Tag color={getStatusColor(app.application_status)}>
                    {app.application_status === "Pending" && "รอพิจารณา"}
                    {app.application_status === "InterviewPending" && "รอสัมภาษณ์"}
                    {app.application_status === "Accepted" && "ผ่านการคัดเลือก"}
                    {app.application_status === "Rejected" && "ไม่ผ่านการคัดเลือก"}
                  </Tag>
                </div>

                <div className="application-logo">
                  <img
                    src={app.JobPost?.Employer?.logo || defaultLogo}
                    alt="logo"
                  />
                </div>
              </div>
              <Progress
                percent={
                  app.application_status === "Pending"
                    ? 25
                    : app.application_status === "InterviewPending"
                    ? 50
                    : app.application_status === "Accepted"
                    ? 100
                    : 0
                }
                showInfo={false}
                strokeColor="#1890ff"
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
