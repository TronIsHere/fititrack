import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { GiWeightScale } from "react-icons/gi";
import WorkoutComponent from "@/components/dashboard/workout";
import { MissionsComponent } from "@/components/dashboard/missions";
import SleepComponent from "@/components/dashboard/sleep";
import CharacterComponent from "@/components/dashboard/character";
import WeightComponent from "@/components/dashboard/weight";
const DashboardPage: MyPage = () => {
  return (
    <>
      <div className="">
        <span className="mt-4 block text-lg">
          Welcome <strong>Erwin</strong>, good morning
        </span>
        <div className="flex flex-col md:flex-row">
          <div className="flex mt-10">
            <WeightComponent />
          </div>
          <div className="flex mt-10 ml-0 md:ml-6">
            <SleepComponent />
          </div>
          <div className="flex mt-10 w-full ml-6">
            <CharacterComponent />
          </div>
        </div>
        <div className="grid grid-cols-7 mt-6 gap-6">
          <div className="col-span-5">
            <WorkoutComponent />
            <WorkoutComponent />
          </div>
          <div className="col-span-2">
            <MissionsComponent />
          </div>
        </div>
      </div>
    </>
  );
};

DashboardPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DashboardPage;
