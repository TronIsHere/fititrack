import DashboardLayout from "@/components/layouts/dashboardLayout";
import BillHistoryComponent from "@/components/settings/billHistory";
import { Theme } from "@/components/types/dashboardTypes";
import { MyPage } from "@/components/types/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeSelector from "@/components/ui/settings/themeSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toasts/use-toast";
import { useAppSelector } from "@/hooks/storeHooks";
import { capitalizeFirstLetter } from "@/lib/utils";
import { changeDarkMode, changeName } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SettingsPage: MyPage = () => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<Theme>(darkModeState ? "Dark" : "Light");
  const [nameState, setNameState] = useState<string>("");
  const [newPasswordState, setNewPasswordState] = useState<string>("");
  const [reEnterPasswordState, setReEnterPasswordState] = useState<string>("");
  const name = useAppSelector((state) => state.user.name);
  const email = useAppSelector((state) => state.user.email);
  const { toast } = useToast();

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    let isDarkMode =
      theme === "Dark" || (theme === "Auto" && darkThemeMq.matches);

    if (isDarkMode !== darkModeState) {
      dispatch(changeDarkMode(isDarkMode));
    }
  }, [theme, darkModeState, dispatch]);
  const saveHandler = () => {
    dispatch(changeName(nameState));

    toast({
      variant: "success",
      description: "Saved Successfully",
    });
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
      // Handle the file
    }
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
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="rounded-none tab-trigger dark:tab-trigger2"
                >
                  Password
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="rounded-none tab-trigger dark:tab-trigger2"
                >
                  Billing
                </TabsTrigger>
              </TabsList>
              <TabsContent value="password">
                <div className="flex flex-col w-full md:w-1/2">
                  <div className="flex flex-col pl-2 pt-3 w-full">
                    <span className="pl-0.5 ">Current password</span>
                    <Input
                      type="text"
                      className="border mt-2  text-sm border-palletGray-100 dark:bg-darkPrimary"
                      // onChange={(e) => setNewPasswordState(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col pl-2 pt-8 w-full">
                    <span className="pl-0.5 ">New password</span>
                    <Input
                      type="text"
                      className="border mt-2  text-sm border-palletGray-100 dark:bg-darkPrimary"
                      onChange={(e) => setNewPasswordState(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col pl-2 pt-8 w-full">
                    <span className="pl-0.5 ">Confirm new password</span>
                    <Input
                      type="text"
                      className="border mt-2  text-sm border-palletGray-100 dark:bg-darkPrimary"
                      onChange={(e) => setReEnterPasswordState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10 mb-4 pr-2">
                  <Button
                    className={buttonVariants({ variant: "primary" })}
                    onClick={() => saveHandler()}
                  >
                    Change Password
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="general">
                <form action="">
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
                          {capitalizeFirstLetter(name)}
                        </span>
                        <span className="text-palletGray-200 text-sm mt-1">
                          {email}
                        </span>
                      </div>
                    </div>
                    <div>
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="fileInput"
                        className="text-sm mt-5 md:mt-0 w-full md:w-auto bg-palletPurple-300 text-white h-10 rounded-lg px-4 flex justify-center items-center cursor-pointer"
                      >
                        Change avatar
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex flex-col pl-2 pt-10 w-full">
                      <span className="pl-0.5 ">Name</span>
                      <Input
                        defaultValue={name}
                        type="text"
                        className="border mt-2  text-sm border-palletGray-100 dark:bg-darkPrimary"
                        onChange={(e) => setNameState(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col pl-2 pt-8 w-full">
                      <span className="pl-0.5 ">Email</span>
                      <Input
                        defaultValue={email}
                        type="email"
                        className="border border-palletGray-100 mt-2 dark:bg-darkPrimary cursor-not-allowed"
                        disabled
                      />
                    </div>

                    <div className="pl-2 pt-8">
                      <span className="pl-0.5">Theme</span>
                      <ThemeSelector
                        currentTheme={theme}
                        onSelectTheme={setTheme}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-10 mb-4 pr-2">
                    <Button
                      className={buttonVariants({ variant: "primary" })}
                      onClick={() => saveHandler()}
                    >
                      Save Profile
                    </Button>
                  </div>
                </form>
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
