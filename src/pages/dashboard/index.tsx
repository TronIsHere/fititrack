import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { NextPage } from "next";
import { ReactNode } from "react";

const DashboardPage: MyPage = () => {
  return (
    <>
      <div className="">test</div>
    </>
  );
};

DashboardPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DashboardPage;
