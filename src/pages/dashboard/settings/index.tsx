import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";

const SettingsPage: MyPage = () => {
  return <>settings</>;
};
SettingsPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default SettingsPage;
