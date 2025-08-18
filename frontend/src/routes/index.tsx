import React from "react";
import Navbar from "../components/Navbar";
import MainRoutes from "./MainRoutes";
import AdminRoutes from "./EmAdminRoutes";
import { Layout } from "antd";

const AllRoutes: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Navbar /> {/* navbar fixed อยู่ด้านบน */}

      {/* container สำหรับแสดง MainRoutes และ AdminRoutes */}
      <div className="container">
        <MainRoutes />
        <AdminRoutes />
      </div>

    </Layout>
  );
};

export default AllRoutes;
