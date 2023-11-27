import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const SettingsPage: MyPage = () => {
  return (
    <>
      <div className="grid grid-cols-7 gap-6">
        <div className="col-span-5">
          <div className="flex justify-between items-center mb-10">
            <span className="mt-4 block text-2xl font-bold">Settings</span>
          </div>
          <div className="bg-white w-full p-2 rounded-xl h-72">
            <Tabs defaultValue={"general"} className="w-full">
              <TabsList className="w-full flex justify-start bg-white border-palletGray-100 border-b-2 rounded-none">
                <TabsTrigger
                  value="general"
                  className="rounded-none tab-trigger"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="rounded-none tab-trigger"
                >
                  Billing
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="billing">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};
SettingsPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default SettingsPage;
