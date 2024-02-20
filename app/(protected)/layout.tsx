import SideNav from "@/components/shared/SideNav";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 px-6 py-8">{children}</div>
    </div>
  );
};

export default DashboardLayout;
