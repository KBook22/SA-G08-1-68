// src/layouts/FullLayout/index.tsx
import React from "react";
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
  createMenuItem("Job/Board", "Jobs"),
  createMenuItem("my-jobs", "My Job"),
  createMenuItem("payment-report", "Payment Report"),
  createMenuItem("help", "Help"),
  createMenuItem("chat", "Chat"),
  createMenuItem("interview","Interview Table"),
  createMenuItem("students","Students List"),
  createMenuItem("report","Report"),
  // 👇 3. แก้ไขชื่อเมนูตรงนี้
  createMenuItem("feed", "Feed"),
  createMenuItem("Interview-Schedule","Interview Schedule")
];

const FullLayout: React.FC = () => {
  const {
    token: { colorText },
  } = theme.useToken();
  const location = useLocation();
  const currentPageKey = location.pathname.split("/")[1] || "home";

  const context = useOutletContext();

  return (
    <Layout style={{ minHeight: "auto" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
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
      <Content>
        <Outlet context={context} />
      </Content>
      <Footer style={{ textAlign: "center" , minHeight: "auto"}}>
        SUT Career ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default FullLayout;