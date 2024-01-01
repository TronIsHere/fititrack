import DashboardLayout from "@/components/layouts/dashboardLayout";
import BillHistoryComponent from "@/components/settings/billHistory";
import { Theme } from "@/components/types/dashboardTypes";
import { MyPage } from "@/components/types/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { themes } from "@/lib/themeUtils";
import { changeDarkMode, toggleDarkMode } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SettingsPage: MyPage = () => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<Theme>(darkModeState ? "Dark" : "Light");
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    let isDarkMode = false;

    if (theme === "Dark") {
      isDarkMode = true;
    } else if (theme === "Auto") {
      isDarkMode = darkThemeMq.matches;
    }

    if (isDarkMode !== darkModeState) {
      dispatch(changeDarkMode(isDarkMode));
    }
  }, [theme, darkModeState, dispatch]);

  const nextTheme = (selectedTheme: Theme): void => {
    setTheme(selectedTheme);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 ">
        <div className="col-span-5">
          <div className="flex justify-between items-center mb-10">
            <span className="mt-4 block text-2xl font-bold">Settings</span>
          </div>
          <div className="bg-white w-full p-2 rounded-xl dark:bg-darkPrimary">
            <Tabs defaultValue={"general"} className="w-full ">
              <TabsList className="w-full flex justify-start bg-white border-palletGray-100 border-b-2 rounded-none dark:bg-darkPrimary">
                <TabsTrigger
                  value="general"
                  className="rounded-none tab-trigger dark:tab-trigger2"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="rounded-none tab-trigger dark:tab-trigger2"
                >
                  Billing
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <div className="pl-2 pt-4 flex flex-col md:flex-row justify-between items-center pr-2">
                  <div className="flex">
                    <div>
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/f446d7a2a155c6120742978fb528fb82.jpe" />
                        <AvatarFallback>EA</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col justify-center pl-4">
                      <span className="font-semibold text-palletPurple-900 dark:text-white">
                        Erwin Aghajani
                      </span>
                      <span className="text-palletGray-200 text-sm mt-1">
                        erwin.aghajani@gmail.com
                      </span>
                    </div>
                  </div>
                  <button className="text-sm mt-5 md:mt-0 w-full md:w-auto bg-palletPurple-300 text-white h-10 rounded-md px-2">
                    Change avatar
                  </button>
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <div className="flex flex-col pl-2 pt-10 w-full">
                    <span className="pl-0.5 ">Name</span>
                    <input
                      type="text"
                      className="border-2 mt-2 rounded-lg p-1.5 pl-2 text-sm border-palletGray-100 dark:bg-darkPrimary"
                      placeholder="your workout’s name.."
                    />
                  </div>
                  <div className="flex flex-col pl-2 pt-8 ">
                    <span className="pl-0.5 ">Weight</span>
                    <div className="border-2 mt-2 w-24 flex rounded-lg p-1 text-sm border-palletGray-100 dark:bg-darkPrimary">
                      <input
                        type="text"
                        className="p-0.5 pl-2 w-full text-sm focus:outline-none dark:bg-darkPrimary"
                        placeholder=""
                      />
                      <span className="text-palletGray-100 self-center pr-2">
                        KG
                      </span>
                    </div>
                  </div>
                  <div className="pl-2 pt-8">
                    <span className="pl-0.5">Theme</span>
                    <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm w-60 justify-center">
                      {themes.map((t) => (
                        <span
                          key={t}
                          className={`px-5 py-1 rounded-md mr-1 cursor-pointer transition duration-300 ease-in-out ${
                            theme === t
                              ? "bg-palletPurple-300 text-white"
                              : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
                          }`}
                          onClick={() => nextTheme(t)}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-10 mb-4 pr-2">
                  <button className="bg-palletGreen-600 text-white py-2 px-4 rounded-lg text-sm">
                    Save Profile
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="billing" className="mb-5">
                <div className="flex flex-col items-center justify-center ">
                  <p className="font-semibold text-palletGray-200 text-sm mt-8">
                    Current plan
                  </p>
                  <p className="text-3xl mt-5 font-bold">Free Trial</p>
                  <button className="bg-palletPurple-300 text-white px-3 py-2 text-sm rounded-lg font-light mt-5 mb-8">
                    Upgrade plan
                  </button>
                </div>
                <hr />
                <p className="font-semibold mt-8 pl-2">Billing History</p>

                <div className="divide-palletPurple-200 divide-dashed divide-y">
                  <BillHistoryComponent
                    date="2019.8.10 11:06 UTC"
                    type="Pro subscription (1 year)"
                    transactionID="LASH_FLI124SD8CNZ2"
                    price="72.82"
                  />
                  <BillHistoryComponent
                    date="2019.8.10 11:06 UTC"
                    type="Pro subscription (1 year)"
                    transactionID="LASH_FLI124SD8CNZ2"
                    price="72.82"
                  />
                  <BillHistoryComponent
                    date="2019.8.10 11:06 UTC"
                    type="Pro subscription (1 year)"
                    transactionID="LASH_FLI124SD8CNZ2"
                    price="72.82"
                  />
                  <BillHistoryComponent
                    date="2019.8.10 11:06 UTC"
                    type="Pro subscription (1 year)"
                    transactionID="LASH_FLI124SD8CNZ2"
                    price="72.82"
                  />
                </div>
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
