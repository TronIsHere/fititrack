import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                <div className="pl-2 pt-4 flex justify-between items-center pr-2">
                  <div className="flex">
                    <div>
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/f446d7a2a155c6120742978fb528fb82.jpe" />
                        <AvatarFallback>EA</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col justify-center pl-4">
                      <span className="font-semibold text-palletPurple-900">
                        Erwin Aghajani
                      </span>
                      <span className="text-palletGray-200 text-sm mt-1">
                        erwin.aghajani@gmail.com
                      </span>
                    </div>
                  </div>
                  <button className="text-sm bg-palletPurple-300 text-white h-10 rounded-md px-2">
                    Change avatar
                  </button>
                </div>
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
