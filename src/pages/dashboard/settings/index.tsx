import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { useToast } from "@/components/ui/toasts/use-toast";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  SettingsGeneralValidator,
  TSettingsGeneralValidator,
} from "@/lib/validators/AuthValidator";
import { updateUserData } from "@/services/userServices";
import {
  changeDarkMode,
  changeDob,
  changeName,
} from "@/store/slices/userSlice";
import { RootState } from "@/store/store";

import BillingSection from "@/components/settings/billingSection";
import ProfileForm from "@/components/settings/profileForm";
import SettingsHeader from "@/components/settings/settingsHeader";
import SettingsTabs from "@/components/settings/settingsTabs";
import { Theme } from "@/components/types/dashboardTypes";

const SettingsPage: MyPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  const [theme, setTheme] = useState<Theme>(darkModeState ? "Dark" : "Light");
  const { name, email, dob } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSettingsGeneralValidator>({
    resolver: zodResolver(SettingsGeneralValidator),
  });

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    let isDarkMode =
      theme === "Dark" || (theme === "Auto" && darkThemeMq.matches);

    if (isDarkMode !== darkModeState) {
      dispatch(changeDarkMode(isDarkMode));
    }
  }, [theme, darkModeState, dispatch]);

  const handleSave = async ({ name, dob }: TSettingsGeneralValidator) => {
    dispatch(changeName(name));
    dispatch(changeDob(dob));
    const response = await updateUserData(dob, name, email);

    if (!response) {
      return toast({
        variant: "destructive",
        description: "Something went wrong, please try again later",
      });
    }

    toast({
      variant: "success",
      description: "Saved Successfully",
    });
  };

  const handleChangePassword = () => {
    router.push("/forgot-password");
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="col-span-5">
          <SettingsHeader />
          <div className="bg-white w-full p-2 rounded-xl dark:bg-darkPrimary">
            <SettingsTabs
              generalContent={
                <ProfileForm
                  register={register}
                  handleSubmit={handleSubmit}
                  handleSave={handleSave}
                  handleChangePassword={handleChangePassword}
                  name={name}
                  email={email}
                  dob={dob}
                  theme={theme}
                  setTheme={setTheme}
                />
              }
              billingContent={<BillingSection />}
            />
          </div>
        </div>
        <div className="col-span-2" />
      </div>
    </>
  );
};
SettingsPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default SettingsPage;
