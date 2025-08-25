"use client"

import type React from "react"
import { useState } from "react"
import { Button, Card, Typography, Space, Row, Col, Modal, TimePicker, Form } from "antd"
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import "dayjs/locale/th"

const { Title, Text } = Typography
const { RangePicker } = TimePicker

interface TimeSlot {
  startTime: string
  endTime: string
  status: "available" | "booked" | "unavailable"
}

type DateStatus = "available" | "booked" | "selected" | "default"

const EmployerSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs("2024-12-01"))
  const [showAddTimeModal, setShowAddTimeModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState<[Dayjs, Dayjs] | null>(null)
  const [form] = Form.useForm()
  const [selectedTimeSlotForDeletion, setSelectedTimeSlotForDeletion] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  // Mock data for existing time slots
  const [timeSlots, setTimeSlots] = useState<Record<string, TimeSlot[]>>({
    "2024-12-08": [
      { startTime: "09:00", endTime: "10:00", status: "available" },
      { startTime: "10:00", endTime: "11:00", status: "booked" },
      { startTime: "13:00", endTime: "14:00", status: "available" },
      { startTime: "15:00", endTime: "16:00", status: "booked" },
    ],
  })

  // Mock data for calendar status
  const getDateStatus = (date: Dayjs): DateStatus => {
    const dateKey = date.format("YYYY-MM-DD")
    const isCurrentMonth = date.month() === currentMonth.month()

    if (!isCurrentMonth) return "default"

    if (selectedDate && date.isSame(selectedDate, "day")) return "selected"

    const daySlots = timeSlots[dateKey]
    if (daySlots && daySlots.length > 0) {
      const hasBooked = daySlots.some((slot) => slot.status === "booked")
      const hasAvailable = daySlots.some((slot) => slot.status === "available")

      if (hasBooked && !hasAvailable) return "booked" // All slots booked
      if (hasAvailable) return "available" // Has available slots
    }

    return "default"
  }

  const handleDateClick = (date: Dayjs) => {
    const isCurrentMonth = date.month() === currentMonth.month()
    if (isCurrentMonth) {
      setSelectedDate(date)
    }
  }

  const dateCellRender = (date: Dayjs) => {
    const status = getDateStatus(date)
    const isCurrentMonth = date.month() === currentMonth.month()

    if (!isCurrentMonth) return null

    let backgroundColor = ""
    let color = ""
    const cursor = "pointer"

    switch (status) {
      case "selected":
        backgroundColor = "#a8e6a3"
        color = "#2d5a2d"
        break
      case "available":
        backgroundColor = "#d9d9d9"
        color = "#8c8c8c"
        break
      case "booked":
        backgroundColor = "#ff7875"
        color = "#ffffff"
        break
      default:
        backgroundColor = "transparent"
        color = "#000000"
    }

    return (
      <div
        style={{
          backgroundColor,
          color,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "16px",
          cursor,
        }}
        onClick={() => handleDateClick(date)}
      >
        {date.date()}
      </div>
    )
  }

  const onMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentMonth(currentMonth.subtract(1, "month"))
    } else {
      setCurrentMonth(currentMonth.add(1, "month"))
    }
    setSelectedDate(null)
  }

  const handleAddTimeSlot = () => {
    if (selectedDate && selectedTimeRange) {
      const dateKey = selectedDate.format("YYYY-MM-DD")
      const newSlot: TimeSlot = {
        startTime: selectedTimeRange[0].format("HH:mm"),
        endTime: selectedTimeRange[1].format("HH:mm"),
        status: "available",
      }

      setTimeSlots((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newSlot],
      }))

      setShowAddTimeModal(false)
      setShowSuccessModal(true)
      setSelectedTimeRange(null)
      form.resetFields()
    }
  }

  const handleTimeSlotClick = (slotIndex: number) => {
    const slotKey = `${selectedDate?.format("YYYY-MM-DD")}-${slotIndex}`
    setSelectedTimeSlotForDeletion(selectedTimeSlotForDeletion === slotKey ? null : slotKey)
  }

  const handleDeleteTimeSlot = () => {
    if (selectedDate && selectedTimeSlotForDeletion) {
      const dateKey = selectedDate.format("YYYY-MM-DD")
      const slotIndex = Number.parseInt(selectedTimeSlotForDeletion.split("-").pop() || "0")

      setTimeSlots((prev) => ({
        ...prev,
        [dateKey]: prev[dateKey]?.filter((_, index) => index !== slotIndex) || [],
      }))

      setShowDeleteModal(false)
      setSelectedTimeSlotForDeletion(null)
    }
  }

  const getCurrentDateSlots = () => {
    if (!selectedDate) return []
    const dateKey = selectedDate.format("YYYY-MM-DD")
    return timeSlots[dateKey] || []
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ padding: "24px" }}>
        <Row gutter={24}>
          <Col span={16}>
            <Card>
              {/* Month Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <Button
                  type="text"
                  icon={<LeftOutlined />}
                  onClick={() => onMonthChange("prev")}
                  style={{
                    backgroundColor: "#2c5aa0",
                    color: "white",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                />
                <div
                  style={{
                    backgroundColor: "#2c5aa0",
                    color: "white",
                    padding: "12px 48px",
                    borderRadius: "24px",
                    margin: "0 16px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {currentMonth.format("MMMM YYYY")}
                </div>
                <Button
                  type="text"
                  icon={<RightOutlined />}
                  onClick={() => onMonthChange("next")}
                  style={{
                    backgroundColor: "#2c5aa0",
                    color: "white",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>

              {/* Calendar Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  backgroundColor: "#2c5aa0",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                  <div key={day} style={{ padding: "16px" }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  border: "1px solid #d9d9d9",
                }}
              >
                {Array.from({ length: 42 }, (_, index) => {
                  const startOfMonth = currentMonth.startOf("month")
                  const startOfWeek = startOfMonth.startOf("week")
                  const currentDate = startOfWeek.add(index, "day")
                  const isCurrentMonth = currentDate.month() === currentMonth.month()

                  return (
                    <div
                      key={index}
                      style={{
                        height: "80px",
                        border: "1px solid #d9d9d9",
                        position: "relative",
                        backgroundColor: !isCurrentMonth ? "#f5f5f5" : "white",
                      }}
                    >
                      {isCurrentMonth && dateCellRender(currentDate)}
                      {!isCurrentMonth && (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#bfbfbf",
                            fontSize: "16px",
                          }}
                        >
                          {currentDate.date()}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Legend */}
              <Card size="small">
                <Space direction="vertical" size="small">
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#a8e6a3",
                        borderRadius: "50%",
                      }}
                    />
                    <Text>วันที่เลือก</Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#ff7875",
                        borderRadius: "50%",
                      }}
                    />
                    <Text>นักศึกษาได้เลือกช่วงเวลาแล้ว</Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#d9d9d9",
                        borderRadius: "50%",
                      }}
                    />
                    <Text>ช่วงเวลาที่คุณได้ใส่</Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "transparent",
                        border: "1px solid #d9d9d9",
                        borderRadius: "50%",
                      }}
                    />
                    <Text>ให้เลือกวันที่นัดสัมภาษณ์แล้ว</Text>
                  </div>
                </Space>
              </Card>

              {/* Time Slots - Only show when date is selected */}
              {selectedDate && (
                <Card
                  title={
                    <Title level={4} style={{ margin: 0 }}>
                      {selectedDate.date()} {selectedDate.format("ddd").toUpperCase()}
                    </Title>
                  }
                  style={{ backgroundColor: "#e6f4ff" }}
                >
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    {getCurrentDateSlots().map((slot, index) => {
                      const slotKey = `${selectedDate?.format("YYYY-MM-DD")}-${index}`
                      const isSelected = selectedTimeSlotForDeletion === slotKey

                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 0",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          <Text strong>
                            {slot.startTime} - {slot.endTime}
                          </Text>
                          <div
                            style={{
                              width: "60px",
                              height: "20px",
                              backgroundColor: isSelected
                                ? "#52c41a" // Green when selected
                                : slot.status === "available"
                                  ? "#d9d9d9" // Gray for available
                                  : "#ff4d4f", // Red for booked
                              borderRadius: "10px",
                              cursor: "pointer",
                              border: isSelected ? "2px solid #389e0d" : "none",
                            }}
                            onClick={() => handleTimeSlotClick(index)}
                          />
                        </div>
                      )
                    })}

                    {getCurrentDateSlots().length === 0 && (
                      <Text style={{ textAlign: "center", color: "#8c8c8c" }}>ยังไม่มีช่วงเวลาที่กำหนด</Text>
                    )}
                  </Space>
                </Card>
              )}

              {/* Add Time Slot Button */}
              <Button
                type="primary"
                size="large"
                block
                disabled={!selectedDate}
                style={{
                  backgroundColor: selectedDate ? "#1890ff" : "#d9d9d9",
                  borderColor: selectedDate ? "#1890ff" : "#d9d9d9",
                  color: selectedDate ? "white" : "#8c8c8c",
                  borderRadius: "24px",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: selectedDate ? "pointer" : "not-allowed",
                }}
                onClick={() => {
                  if (selectedDate) {
                    if (selectedTimeSlotForDeletion) {
                      setShowDeleteModal(true)
                    } else {
                      setShowAddTimeModal(true)
                    }
                  }
                }}
              >
                {selectedTimeSlotForDeletion ? "ลบช่วงเวลา" : "จัดการ"}
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Add Time Slot Modal */}
      <Modal
        open={showAddTimeModal}
        footer={null}
        closable={false}
        centered
        width={500}
        style={{ textAlign: "center" }}
      >
        <div style={{ padding: "20px" }}>
          <div style={{ position: "absolute", top: "16px", right: "16px" }}>
            <CloseOutlined
              style={{ fontSize: "16px", color: "#8c8c8c", cursor: "pointer" }}
              onClick={() => {
                setShowAddTimeModal(false)
                setSelectedTimeRange(null)
                form.resetFields()
              }}
            />
          </div>

          <Title level={4} style={{ marginBottom: "16px" }}>
            {selectedDate?.format("dddd")}ที่ {selectedDate?.date()} {selectedDate?.format("MMMM")}{" "}
            {selectedDate?.year()} เวลา 11:00 น.
          </Title>

          <Text style={{ color: "#1890ff", display: "block", marginBottom: "8px" }}>
            เป็นช่วงเวลาที่คุณสามารถเพิ่มการนัดสัมภาษณ์ได้
          </Text>

          <Text style={{ color: "#52c41a", display: "block", marginBottom: "8px" }}>คุณต้องการเพิ่มช่วงเวลา</Text>

          <Text style={{ display: "block", marginBottom: "24px" }}>นัดสัมภาษณ์หรือไม่ ?</Text>

          <Form form={form} style={{ marginBottom: "24px" }}>
            <Form.Item name="timeRange" style={{ marginBottom: "16px" }}>
              <RangePicker
                format="HH:mm"
                placeholder={["เวลาเริ่ม", "เวลาสิ้นสุด"]}
                style={{ width: "100%" }}
                onChange={(times) => setSelectedTimeRange(times as [Dayjs, Dayjs])}
              />
            </Form.Item>
          </Form>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Button
              size="large"
              style={{
                borderRadius: "20px",
                width: "100px",
                border: "1px solid #1890ff",
                color: "#1890ff",
              }}
              onClick={() => {
                setShowAddTimeModal(false)
                setSelectedTimeRange(null)
                form.resetFields()
              }}
            >
              ยกเลิก
            </Button>
            <Button
              type="primary"
              size="large"
              disabled={!selectedTimeRange}
              style={{
                borderRadius: "20px",
                width: "100px",
                backgroundColor: selectedTimeRange ? "#1890ff" : "#d9d9d9",
              }}
              onClick={handleAddTimeSlot}
            >
              ยืนยัน
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteModal} footer={null} closable={false} centered width={500} style={{ textAlign: "center" }}>
        <div style={{ padding: "20px" }}>
          <div style={{ position: "absolute", top: "16px", right: "16px" }}>
            <CloseOutlined
              style={{ fontSize: "16px", color: "#8c8c8c", cursor: "pointer" }}
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedTimeSlotForDeletion(null)
              }}
            />
          </div>

          <Title level={4} style={{ marginBottom: "16px" }}>
            {selectedDate?.format("dddd")}ที่ {selectedDate?.date()} {selectedDate?.format("MMMM")}{" "}
            {selectedDate?.year()} เวลา 11:00 น.
          </Title>

          <Text style={{ color: "#1890ff", display: "block", marginBottom: "8px" }}>
            เป็นช่วงเวลาที่คุณได้เพิ่มการนัดสัมภาษณ์ไว้แล้ว
          </Text>

          <Text style={{ color: "#ff4d4f", display: "block", marginBottom: "24px" }}>คุณต้องการลบช่วงเวลา</Text>

          <Text style={{ display: "block", marginBottom: "24px" }}>นัดสัมภาษณ์หรือไม่ ?</Text>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Button
              size="large"
              style={{
                borderRadius: "20px",
                width: "100px",
                border: "1px solid #1890ff",
                color: "#1890ff",
              }}
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedTimeSlotForDeletion(null)
              }}
            >
              ยกเลิก
            </Button>
            <Button
              type="primary"
              size="large"
              style={{
                borderRadius: "20px",
                width: "100px",
                backgroundColor: "#1890ff",
              }}
              onClick={handleDeleteTimeSlot}
            >
              ยืนยัน
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Success Modal */}
      <Modal
        open={showSuccessModal && selectedTimeSlotForDeletion !== null}
        footer={null}
        closable={false}
        centered
        width={400}
        style={{ textAlign: "center" }}
      >
        <div style={{ padding: "40px 20px" }}>
          <div style={{ position: "absolute", top: "16px", right: "16px" }}>
            <CloseOutlined
              style={{ fontSize: "16px", color: "#8c8c8c", cursor: "pointer" }}
              onClick={() => {
                setShowSuccessModal(false)
                setSelectedTimeSlotForDeletion(null)
              }}
            />
          </div>
          <CheckCircleOutlined
            style={{
              fontSize: "48px",
              color: "#1890ff",
              marginBottom: "16px",
              border: "2px solid #1890ff",
              borderRadius: "50%",
              padding: "8px",
            }}
          />
          <Title level={4} style={{ marginBottom: "8px" }}>
            ลบช่วงเวลานัดสัมภาษณ์
          </Title>
          <Text style={{ display: "block", marginBottom: "8px" }}>
            {selectedDate?.format("dddd")}ที่ {selectedDate?.date()} {selectedDate?.format("MMMM")} เวลา 11:00 น.
          </Text>
          <Text style={{ fontWeight: "bold" }}>สำเร็จ</Text>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        open={showSuccessModal && !selectedTimeSlotForDeletion}
        footer={null}
        closable={false}
        centered
        width={400}
        style={{ textAlign: "center" }}
      >
        <div style={{ padding: "40px 20px" }}>
          <div style={{ position: "absolute", top: "16px", right: "16px" }}>
            <CloseOutlined
              style={{ fontSize: "16px", color: "#8c8c8c", cursor: "pointer" }}
              onClick={() => setShowSuccessModal(false)}
            />
          </div>
          <CheckCircleOutlined
            style={{
              fontSize: "48px",
              color: "#1890ff",
              marginBottom: "16px",
              border: "2px solid #1890ff",
              borderRadius: "50%",
              padding: "8px",
            }}
          />
          <Title level={4} style={{ marginBottom: "8px" }}>
            เพิ่มช่วงเวลานัดสัมภาษณ์
          </Title>
          <Text style={{ display: "block", marginBottom: "8px" }}>
            {selectedDate?.format("dddd")}ที่ {selectedDate?.date()} {selectedDate?.format("MMMM")} เวลา 11:00 น.
          </Text>
          <Text style={{ fontWeight: "bold" }}>สำเร็จ</Text>
        </div>
      </Modal>
    </div>
  )
}

export default EmployerSchedule
