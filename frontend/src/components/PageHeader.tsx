// components/PageHeader.tsx
import React from "react";
import "./PageHeader.css";

interface PageHeaderProps {
  title: string;
  className?: string;  // ✅ ลองรับ classname
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="pageHeader">
      {title}
    </div>
  );
};



export default PageHeader;