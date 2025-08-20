import React from "react";
import MainRoutes from "./MainRoutes";
import { Layout } from "antd";

const AllRoutes: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>

      {/* container สำหรับแสดง MainRoutes และ AdminRoutes */}
      <div className="container">
        <MainRoutes />
      </div>

    </Layout>
  );
};

export default AllRoutes;
