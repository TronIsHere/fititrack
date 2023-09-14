import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { NextPage } from "next";
import { ReactNode } from "react";

const dashboard: MyPage = () => {
  return (
    <>
      <div className="">test</div>
    </>
  );
};

dashboard.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default dashboard;
