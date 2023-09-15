import { NextPage } from "next";
import { ReactNode } from "react";
import SidebarComponent from "../ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div className="flex  h-screen">
      <aside className="flex-[2]">
        <SidebarComponent />
      </aside>
      <div className="flex-[8] p-4 pl-6 rounded min-h-[300px] custom-background">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
