import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  Rate,
  Input,
  Button,
  Space,
  Flex,
  message,
  Alert,
  Result,
  Spin,
} from "antd";

import './review.css';
import { reviewAPI } from "../../services/https/index";
import type { CreateReviewRequest, FindReviewRequest } from "../../interfaces/review";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ReviewPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      setError("ไม่พบรหัสงาน");
      return;
    }

    const checkReviewStatus = async () => {
      // **หมายเหตุ:** ในแอปพลิเคชันจริง ID นี้ควรมาจากระบบ Authentication
      const currentUserId = 1;

      try {
        setLoading(true);
        const payload: FindReviewRequest = {
            job_post_id: parseInt(jobId),
            employer_id: currentUserId,
        };
        const response = await reviewAPI.find(payload);

        if (response && response.data && response.data.length > 0) {
          setIsAlreadyReviewed(true);
        }
      } catch (err) {
        console.error("Failed to check review status:", err);
        setError("ไม่สามารถตรวจสอบข้อมูลรีวิวได้");
      } finally {
        setLoading(false);
      }
    };
    checkReviewStatus();
  }, [jobId]);

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      message.error("กรุณาใส่ข้อความรีวิว");
      return;
    }
    if (!jobId) {
      message.error("ไม่พบรหัสงาน ไม่สามารถส่งรีวิวได้");
      return;
    }

    setIsSubmitting(true);
    const currentUserId = 1;

    try {
        const payload: CreateReviewRequest = {
            job_post_id: parseInt(jobId),
            comment: comment,
            employer_id: currentUserId,
            rating_score_id: rating,
        };
      await reviewAPI.create({ ...payload, comment: comment });


      message.success("ส่งรีวิวสำเร็จ!");

      setTimeout(() => {
        navigate("/my-jobs");
      }, 1500);
    } catch (err) {
      console.error("Error adding document: ", err);
      message.error("เกิดข้อผิดพลาดในการส่งรีวิว");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "85vh" }}>
        <Spin tip="กำลังตรวจสอบข้อมูลรีวิว..." size="large" />
      </Flex>
    );
  }

  if (error) {
    return <Result status="warning" title="เกิดข้อผิดพลาด" subTitle={error} />;
  }

  return (
    <div style={{ background: "#fff", padding: 24, minHeight: "85vh" }}>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: 24, color: "#1E3A5F" }}
      >
        รายการรีวิว
      </Title>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Flex style={{ marginBottom: 24 }}>
          <Text type="secondary" style={{ fontSize: "20px", color: "#1E3A5F" }}>
            รหัสงาน : {jobId || "N/A"}
          </Text>
        </Flex>

        {isAlreadyReviewed ? (
          <Alert
            message="คุณได้รีวิวงานนี้ไปแล้ว"
            description="ขอบคุณสำหรับความคิดเห็นของคุณ"
            type="info"
            showIcon
          />
        ) : (
          <>
            <Card className="review-section" style={{ marginBottom: 24 }}>
              <Flex vertical align="center" gap="middle">
                <Text strong style={{ fontSize: "20px", color: "#1E3A5F" }}>
                  ให้คะแนนการทำงานกับนักศึกษาที่คุณจ้าง
                </Text>
                <Rate
                  onChange={setRating}
                  value={rating}
                  style={{ fontSize: 48, color: "#0088FF" }}
                />
                <Flex
                  justify="space-between"
                  style={{ width: "45%", color: "#1E3A5F" }}
                >
                  <Text type="secondary" style={{ color: "#1E3A5F" }}>
                    แย่ที่สุด
                  </Text>
                  <Text type="secondary" style={{ color: "#1E3A5F" }}>
                    ยอดเยี่ยมที่สุด
                  </Text>
                </Flex>
              </Flex>
            </Card>

            <Card
              className="review-section"
              style={{ border: "none", boxShadow: "none" }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Flex vertical align="center" gap="middle">
                  <Text strong style={{ fontSize: "20px", color: "#1E3A5F" }}>
                    บอกเล่าประสบการณ์ที่คุณได้รับกับเรา
                  </Text>
                </Flex>
                <TextArea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    fontSize: "16px",
                    color: "#1E3A5F",
                    backgroundColor: "#E4F2FD",
                  }}
                  rows={10}
                  placeholder="พิมพ์ข้อความรีวิวของคุณที่นี่..."
                />
              </Space>
            </Card>

            <Flex justify="center" style={{ marginTop: "24px" }}>
              <Button
                type="primary"
                size="large"
                className="review-section middle-width-button"
                onClick={handleSubmitReview}
                loading={isSubmitting}
              >
                ส่งรีวิว
              </Button>
            </Flex>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
