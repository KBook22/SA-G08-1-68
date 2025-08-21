import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Badge,
  Dropdown,
  Space,
  Modal,
  List,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import type { Notification } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
dayjs.extend(relativeTime);
dayjs.locale("th");

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const AppHeader = ({ username = "Profile", logoSize = "250px" }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const loadNotifications = () => {
      const storedNotifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );
      setNotifications(storedNotifications);
    };

    loadNotifications();
    window.addEventListener("storage", loadNotifications);

    return () => {
      window.removeEventListener("storage", loadNotifications);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    if (notification.link) {
      navigate(notification.link);
    }
  };

  const notificationMenu = (
    <List
      header={<div style={{ padding: "8px 16px", fontWeight: "bold" }}>การแจ้งเตือน</div>}
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        width: "350px",
      }}
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item
          style={{
            padding: "12px 16px",
            cursor: "pointer",
            backgroundColor: item.read ? "transparent" : "#e6f7ff",
          }}
          onClick={() => handleNotificationClick(item)}
        >
          <List.Item.Meta
            title={<Text strong={!item.read}>{item.message}</Text>}
            description={dayjs(item.timestamp).fromNow()}
          />
        </List.Item>
      )}
      locale={{ emptyText: <div style={{ padding: "20px" }}>ไม่มีการแจ้งเตือน</div> }}
    />
  );

  const showLogoutConfirm = () => {
    Modal.confirm({
      title: "คุณต้องการออกจากระบบใช่หรือไม่?",
      icon: <ExclamationCircleFilled />,
      content: "การกระทำนี้จะนำคุณไปยังหน้าล็อกอิน",
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk() {
        navigate("/login");
      },
    });
  };

  // ✅ แก้ไข: เปลี่ยนไปใช้ prop `items`
  const profileMenuItems = [
    { key: "1", icon: <UserOutlined />, label: <Link to="/profile">ข้อมูลส่วนตัว</Link> },
    { key: "2", icon: <SettingOutlined />, label: <Link to="/settings">ตั้งค่า</Link> },
    { key: "3", icon: <PlusOutlined />, label: <Link to="/qa">Q&A</Link> },
    { type: 'divider' },
    { key: "4", icon: <LogoutOutlined />, label: 'ออกจากระบบ', onClick: showLogoutConfirm }
  ];

  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "0 24px",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        height: '80px', 
      }}
    >
      <div className="logo" style={{ marginRight: "auto" }}>
        <Link to="/">
          <img
            src="/Logo.svg"
            alt="Logo"
            style={{
              height: logoSize,
              display: "block",
              position: "relative",
              top: "-86px", 
            }}
          />
        </Link>
      </div>

      <Space align="center" size="large">
        <Link to="/create">
          <Button type="primary" icon={<PlusOutlined />}>
            โพสต์
          </Button>
        </Link>
        {/* ✅ แก้ไข: เปลี่ยน overlay เป็น menu */}
        <Dropdown
          popupRender={() => notificationMenu} 
          trigger={["click"]}
          placement="bottomRight"
        >
          <Badge count={unreadCount}>
            <Button
              type="text"
              shape="circle"
              icon={<BellOutlined style={{ fontSize: "20px" }} />}
            />
          </Badge>
        </Dropdown>
        {/* ✅ แก้ไข: เปลี่ยน overlay เป็น menu และใช้ items */}
        <Dropdown
          menu={{ items: profileMenuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} />
            <span>{username}</span>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default AppHeader;