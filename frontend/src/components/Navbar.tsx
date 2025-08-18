import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // เพิ่ม useLocation
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Dropdown, Button } from "antd";
import "./navbar.css";
import logo from "../assets/logo.svg";

//link
const menuItems: MenuProps["items"] = [
  {
    label: (
      <Link to="/" className="menu-item-font">
        หน้าหลัก
      </Link>
    ),
    key: "home",
  },
  {
    label: (
      <Link to="/Board" className="menu-item-font">
        ประกาศงาน
      </Link>
    ),
    key: "manage",
    icon: <AppstoreOutlined />,
  },
];

const profileMenu = (
  <Menu
    items={[
      {
        label: <span className="menu-item-font">แก้ไขโปรไฟล์</span>,
        key: "profile:edit",
      },
      {
        label: <span className="menu-item-font">เปลี่ยนรหัสผ่าน</span>,
        key: "profile:password",
      },
    ]}
  />
);

const Navbar: React.FC = () => {
  const location = useLocation(); // อ่าน path ปัจจุบัน
  const [current, setCurrent] = useState("home");

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrent("home");
    } else if (location.pathname === "/post-job") {
      setCurrent("manage");
    } else {
      setCurrent(""); // หรือ key อื่น ๆ ถ้ามี
    }
  }, [location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  if (current === null) return null;

  return (
    <div className="header">
      <div className="header-top">
        <div className="header-left">
          <img src={logo} alt="Logo" style={{ height: 40 }} />
        </div>

        <div className="header-right">
          <Menu
            key={location.pathname}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={menuItems}
            style={{ borderBottom: "none" }}
          />
          <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
            <Button className="btn-profile">โปรไฟล์</Button>
          </Dropdown>
        </div>
      </div>

      <div className="header-bottom" color="#1976D3"></div>
    </div>
  );
};

export default Navbar;
