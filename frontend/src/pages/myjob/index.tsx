import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Typography,
  Flex,
  message,
  Spin,
  Result,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { jobPostAPI } from "../../services/https/index";
import type { Jobpost } from "../../interfaces/jobpost";

import "./myjob.css";

const { Title } = Typography;

const MyJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Jobpost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobPostAPI.getAll();
        if (response && response.data) {
          setJobs(response.data);
        } else {
          setJobs([]);
          console.warn("Could not find job data in response:", response);
          message.warning("ไม่พบข้อมูลงาน");
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("ไม่สามารถโหลดข้อมูลงานได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const columns = [
    {
      title: "ชื่องาน",
      dataIndex: "Title",
      key: "title",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "ชำระเงิน",
      key: "payment",
      render: (_: any, record: Jobpost) => {
        const isApproved = record.status === "อนุมัติ";
        return (
          <Space>
            {isApproved && (
              <Button
                type="primary"
                onClick={() => {
                  if (record.id) {
                    navigate(`/payment/${record.id}`);
                  } else {
                    message.error("ไม่พบรหัสงาน ไม่สามารถดำเนินการชำระเงินได้");
                  }
                }}
              >
                ชำระเงิน
              </Button>
            )}
          </Space>
        );
      },
    },
    { title: "รีวิว",
      key: "review",
      render: (_: any, record: Jobpost) => {
        const isCompleted = record.status === "เสร็จสิ้น";
        return (
            <Space>
              {isCompleted && (
                <Button
                  type="primary"
                  onClick={() => {
                    if (record.id) {
                      navigate(`/review/${record.id}`);
                    } else {
                      message.error("ไม่พบรหัสงาน ไม่สามารถให้คะแนนได้");
                    }
                  }}
                >
                รีวิวการทำงาน
                </Button>
              )}
            </Space>
        );
      },
    },
  ];

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "85vh" }}>
        <Spin tip="กำลังโหลดข้อมูลงาน..." size="large" />
      </Flex>
    );
  }

  if (error) {
    return <Result status="warning" title="เกิดข้อผิดพลาด" subTitle={error} />;
  }

  return (
    <div className="myjob-page-container">
      <div style={{ background: "#fff", padding: 24, minHeight: "85vh" }}>
        <Flex justify="space-between" align="center" style={{ maxWidth: 1000, margin: "0 auto 24px auto" }}>
          <Title
            level={2}
            style={{ marginBottom: 0, color: "#1E3A5F" }}
          >
            งานของฉัน
          </Title>
          <Button type="default" onClick={() => navigate("/payment-report")}>
            รายงานการชำระเงิน
          </Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={jobs}
          rowKey="id" // This should match the unique key from your data, which is 'ID'
          style={{ maxWidth: 1000, margin: "0 auto" }}
        />
      </div>
    </div>
  );
};

export default MyJobPage;