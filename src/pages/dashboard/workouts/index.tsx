import WorkoutComponent from "@/components/dashboard/workout";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import Link from "next/link";

const WorkoutsPage: MyPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="col-span-5">
          <div className="flex justify-between items-center mb-10">
            <span className="mt-4 block text-2xl font-bold">Workouts</span>
            <Link
              href={"workouts/add"}
              className="bg-palletPurple-500 py-2 text-white px-8 rounded-md mt-3"
            >
              Add
            </Link>
          </div>
          <WorkoutComponent editEnabled={true} />
          <WorkoutComponent editEnabled={true} />
          <WorkoutComponent editEnabled={true} />
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};
WorkoutsPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default WorkoutsPage;
