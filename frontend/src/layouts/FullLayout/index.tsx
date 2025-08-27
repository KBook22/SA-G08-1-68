// src/layouts/FullLayout/index.tsx
import React from "react";
// 1. เพิ่ม import 'useOutletContext' เข้ามา
import { Link, useLocation, Outlet, useOutletContext } from "react-router-dom";
import {
  Layout,
  Menu,
  theme,
  Button,
  Flex,
  Space,
  Dropdown,
} from "antd";
import { DownOutlined, BellOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import logoImage from '../../assets/logo.svg';

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const createMenuItem = (key: string, label: React.ReactNode): MenuItem => {
  const path = key === "home" ? "/" : `/${key}`;
  return {
    key,
    label: <Link to={path}>{label}</Link>,
    style: { paddingInline: "20px" },
  } as MenuItem;
};

const navItems: MenuItem[] = [
  createMenuItem("home", "Home"),
  // FIXED: Changed "Job" to "Job/Board" to match the correct route
  createMenuItem("Job/Board", "Jobs"),
  createMenuItem("my-jobs", "My Job"),
  createMenuItem("payment-report", "Payment Report"),
  createMenuItem("help", "Help"),
  createMenuItem("chat", "Chat"),
  createMenuItem("interview","Interview Table"),
  createMenuItem("students","Students List"),
  createMenuItem("report","Report"),
  // Link ไปยังหน้าของนักศึกษา (ส่วนที่รวมเข้ามาใหม่)
  createMenuItem("feed", "Students Post"),
];

const FullLayout: React.FC = () => {
  const {
    token: { colorText },
  } = theme.useToken();
  const location = useLocation();
  const currentPageKey = location.pathname.split("/")[1] || "home"; // แก้ไข default key เป็น 'home'

  // 2. รับ context ที่ส่งมาจาก App.tsx
  const context = useOutletContext();

  return (
    <Layout style={{ minHeight: "auto" }}>
      <Header
        style={{
          position: "sticky", //  <-- เพิ่มบรรทัดนี้
          top: 0,             //  <-- เพิ่มบรรทัดนี้
          zIndex: 1,          //  <-- เพิ่มบรรทัดนี้
          width: "100%",      //  <-- เพิ่มบรรทัดนี้
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: "0 24px",
          height: "64px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div className="website-logo" style={{ marginRight: "24px" }}>
            <Link to="/">
              <img
                src={logoImage}
                alt="SUT Career Logo"
                style={{
                  height: "50px",
                  width: "auto",
                  display: "block",
                  // ลบ position ที่ทำให้โลโก้ลอยออกไป
                }}
              />
            </Link>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[currentPageKey]}
            items={navItems}
            style={{
              borderBottom: "none",
              flex: 1,
              minWidth: 0,
              justifyContent: "flex-start",
            }}
          />
        </div>
        <Flex align="center">
          <Space size="middle">
            <BellOutlined style={{ fontSize: "20px", color: colorText }} />
            <Dropdown
              menu={{
                items: [
                  {
                    key: "th",
                    label: "TH",
                  },
                ],
              }}
            >
              <Button type="text" style={{
                  fontSize: "16px",
                  color: colorText
                }}>
                <Space>
                  TH
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Link to="/profile">
              <Button
                type="text"
                style={{
                  fontSize: "20px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  color: "#0088FF",
                }}
              >
                Profile
              </Button>
            </Link>
          </Space>
        </Flex>
      </Header>
      <Content style={{ padding: "24px 48px" }}>
        {/* 3. ส่งต่อ context ที่ได้รับไปยังหน้าเว็บลูกๆ */}
        <Outlet context={context} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SUT Career ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default FullLayout;



// src/layout/FullLayout/index.tsx
//เเก้ไขโดยพรศิริ: เพิ่ม useState, useEffect
// import React, { useState, useEffect } from "react"; 
// //เเก้ไขโดยพรศิริ: เพิ่ม import ที่จำเป็น
// import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
// import {
//   Layout,
//   Menu,
//   theme,
//   Button,
//   Flex,
//   Space,
//   Dropdown,
//   Badge,
//   List,
//   Typography,
//   //เเก้ไขโดยพรศิริ: เพิ่ม Modal
//   Modal
// } from "antd";
// import { 
//   DownOutlined, 
//   BellOutlined,
//   //เเก้ไขโดยพรศิริ: เพิ่มไอคอน
//   UserOutlined,
//   LogoutOutlined,
//   ExclamationCircleFilled
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import logoImage from '../../assets/logo.svg';
// //เเก้ไขโดยพรศิริ: import type และ dayjs สำหรับการแจ้งเตือน
// import type { Notification } from "../../types";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import "dayjs/locale/th";

// dayjs.extend(relativeTime);
// dayjs.locale("th");

// const { Header, Content, Footer } = Layout;
// const { Text } = Typography;

// // ... (โค้ดส่วน createMenuItem และ navItems เหมือนเดิม) ...
// type MenuItem = Required<MenuProps>["items"][number];

// const createMenuItem = (key: string, label: React.ReactNode): MenuItem => {
//   const path = key === "home" ? "/" : `/${key}`;
//   return {
//     key,
//     label: <Link to={path}>{label}</Link>,
//     style: { paddingInline: "20px" },
//   } as MenuItem;
// };

// const navItems: MenuItem[] = [
//   createMenuItem("home", "Home"),
//   createMenuItem("Job/Board", "Jobs"),
//   createMenuItem("my-jobs", "My Job"),
//   createMenuItem("payment-report", "Payment Report"),
//   createMenuItem("help", "Help"),
//   createMenuItem("chat", "Chat"),
//   createMenuItem("interview","Interview Table"),
//   createMenuItem("students","Students List"),
//   createMenuItem("report","Report"),
//   createMenuItem("feed", "Students Post"),
// ];


// const FullLayout: React.FC = () => {
//   const {
//     token: { colorText },
//   } = theme.useToken();
//   const location = useLocation();
//   const currentPageKey = location.pathname.split("/")[1] || "home";
//   //เเก้ไขโดยพรศิริ: ลบ useOutletContext ที่ไม่จำเป็นออก
//   const navigate = useNavigate(); 
  
//   //เเก้ไขโดยพรศิริ: จัดการสถานะการล็อกอินด้วย localStorage
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   const loggedInUserId = 'johndoe';


//   // --- เเก้ไขโดยพรศิริ: เพิ่มโค้ดระบบแจ้งเตือน ---
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     const loadNotifications = () => {
//       const storedNotifications = JSON.parse(
//         localStorage.getItem("notifications") || "[]"
//       );
//       setNotifications(storedNotifications);
//     };

//     loadNotifications();
//     window.addEventListener("storage", loadNotifications);

//     return () => {
//       window.removeEventListener("storage", loadNotifications);
//     };
//   }, []);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const handleNotificationClick = (notification: Notification) => {
//     const updatedNotifications = notifications.map((n) =>
//       n.id === notification.id ? { ...n, read: true } : n
//     );
//     setNotifications(updatedNotifications);
//     localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

//     if (notification.link) {
//       navigate(notification.link);
//     }
//   };

//   const notificationMenu = (
//     <List
//       header={<div style={{ padding: "8px 16px", fontWeight: "bold" }}>การแจ้งเตือน</div>}
//       style={{
//         backgroundColor: "white",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//         width: "350px",
//       }}
//       dataSource={notifications}
//       renderItem={(item) => (
//         <List.Item
//           style={{
//             padding: "12px 16px",
//             cursor: "pointer",
//             backgroundColor: item.read ? "transparent" : "#e6f7ff",
//           }}
//           onClick={() => handleNotificationClick(item)}
//         >
//           <List.Item.Meta
//             title={<Text strong={!item.read}>{item.message}</Text>}
//             description={dayjs(item.timestamp).fromNow()}
//           />
//         </List.Item>
//       )}
//       locale={{ emptyText: <div style={{ padding: "20px" }}>ไม่มีการแจ้งเตือน</div> }}
//     />
//   );
//   // --- สิ้นสุดส่วนที่แก้ไข ---
  
//   //เเก้ไขโดยพรศิริ: เพิ่มฟังก์ชันและเมนูสำหรับจัดการการล็อกอิน/ล็อกเอาท์
//   const showLogoutConfirm = () => {
//     Modal.confirm({
//       title: "คุณต้องการออกจากระบบใช่หรือไม่?",
//       icon: <ExclamationCircleFilled />,
//       content: "การกระทำนี้จะนำคุณไปยังหน้าล็อกอิน",
//       okText: "ยืนยัน",
//       cancelText: "ยกเลิก",
//       onOk() {
//         //เเก้ไขโดยพรศิริ: อัปเดตสถานะใน localStorage
//         localStorage.setItem('isLoggedIn', 'false');
//         navigate('/login');
//       },
//     });
//   };

//   //เเก้ไขโดยพรศิริ: สร้าง profileMenu
//   const profileMenu = (
//     <Menu>
//       {isLoggedIn ? (
//         <>
//           <Menu.Item key="profile" icon={<UserOutlined />}>
//             <Link to={`/profile/${loggedInUserId}`}>โปรไฟล์</Link>
//           </Menu.Item>
//           <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={showLogoutConfirm}>
//             ออกจากระบบ
//           </Menu.Item>
//         </>
//       ) : (
//         <>
//           <Menu.Item key="login">
//             <Link to="/login">เข้าสู่ระบบ</Link>
//           </Menu.Item>
//           <Menu.Item key="register">
//             <Link to="/register">สมัครสมาชิก</Link>
//           </Menu.Item>
//         </>
//       )}
//     </Menu>
//   );

//   return (
//     <Layout style={{ minHeight: "auto" }}>
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           backgroundColor: "#fff",
//           padding: "0 24px",
//           height: "64px",
//           borderBottom: "1px solid #f0f0f0",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             flex: 1,
//             minWidth: 0,
//           }}
//         >
//           <div className="website-logo" style={{ marginRight: "24px" }}>
//             <Link to="/">
//               <img
//                 src={logoImage}
//                 alt="SUT Career Logo"
//                 style={{
//                   height: "50px",
//                   width: "auto",
//                   display: "block",
//                 }}
//               />
//             </Link>
//           </div>
//           <Menu
//             theme="light"
//             mode="horizontal"
//             selectedKeys={[currentPageKey]}
//             items={navItems}
//             style={{
//               borderBottom: "none",
//               flex: 1,
//               minWidth: 0,
//               justifyContent: "flex-start",
//             }}
//           />
//         </div>
//         <Flex align="center">
//           <Space size="middle">
//             {/* เเก้ไขโดยพรศิริ: เปลี่ยนปุ่มระฆังเป็น Dropdown ที่มีการแจ้งเตือน */}
//             <Dropdown
//               popupRender={() => notificationMenu}
//               trigger={["click"]}
//               placement="bottomRight"
//             >
//               <Badge count={unreadCount}>
//                 <Button
//                   type="text"
//                   shape="circle"
//                   icon={<BellOutlined style={{ fontSize: "20px", color: colorText }} />}
//                 />
//               </Badge>
//             </Dropdown>

//             <Dropdown
//               menu={{
//                 items: [
//                   {
//                     key: "th",
//                     label: "TH",
//                   },
//                 ],
//               }}
//             >
//               <Button type="text" style={{
//                   fontSize: "16px",
//                   color: colorText
//                 }}>
//                 <Space>
//                   TH
//                   <DownOutlined />
//                 </Space>
//               </Button>
//             </Dropdown>
//             {/* เเก้ไขโดยพรศิริ: แทนที่ Link ด้วย Dropdown สำหรับปุ่ม Profile/Login */}
//             <Dropdown
//               overlay={profileMenu}
//               trigger={['click']}
//               placement="bottomRight"
//             >
//               <Button
//                 type="text"
//                 style={{
//                   fontSize: "20px",
//                   border: "1px solid #d9d9d9",
//                   borderRadius: "6px",
//                   color: "#0088FF",
//                 }}
//               >
//                 {isLoggedIn ? 'Profile' : 'Login'}
//               </Button>
//             </Dropdown>
//           </Space>
//         </Flex>
//       </Header>
//       <Content style={{ padding: "24px 48px" }}>
//         {/*เเก้ไขโดยพรศิริ: เอา context prop ออกจาก Outlet */}
//         <Outlet />
//       </Content>
//       <Footer style={{ textAlign: "center" }}>
//         SUT Career ©{new Date().getFullYear()} Created with Ant Design
//       </Footer>
//     </Layout>
//   );
// };

// export default FullLayout;