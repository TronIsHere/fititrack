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
          <div className="bg-white w-full p-2 rounded-xl ">
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
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-col pl-2 pt-10 w-full">
                    <span className="pl-0.5 ">Name</span>
                    <input
                      type="text"
                      className="border-2 mt-2 rounded-lg p-1.5 pl-2 text-sm border-palletGray-100"
                      placeholder="your workout’s name.."
                    />
                  </div>
                  <div className="flex flex-col pl-2 pt-8 ">
                    <span className="pl-0.5 ">Weight</span>
                    <div className="border-2 mt-2 w-24 flex rounded-lg p-1 text-sm border-palletGray-100">
                      <input
                        type="text"
                        className="p-0.5 pl-2 w-full text-sm focus:outline-none"
                        placeholder=""
                      />
                      <span className="text-palletGray-100 self-center pr-2">
                        KG
                      </span>
                    </div>
                  </div>
                  <div className=" pl-2 pt-8">
                    <span className="pl-0.5 ">Theme</span>
                    <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm w-60 justify-center">
                      <span className="px-5 py-1 text-palletGray-100 rounded-md mr-1 cursor-pointer">
                        Light
                      </span>
                      <span className="px-5 py-1 text-palletGray-100 rounded-md mr-1 cursor-pointer">
                        Auto
                      </span>
                      <span className="px-5 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                        Dark
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-10 mb-4 pr-2">
                  <button className="bg-palletGreen-600 text-white py-2 px-4 rounded-lg text-sm">
                    Save Profile
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
