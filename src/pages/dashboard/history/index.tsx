import SleepHistoryChart from "@/components/history/sleep-chart";
import WeightHistoryChart from "@/components/history/weight-chart";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import CircularProgress from "@/components/ui/history/circularProgress";

const HistoryPage: MyPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
      <div className="col-span-7">
        <div className="flex justify-between items-center mb-10">
          <span className="mt-4 block text-2xl font-bold">History</span>
        </div>
        <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary mt-5">
          <WeightHistoryChart />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Sleep Quality overall</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              how well did you sleep
            </p>
            <div className="flex justify-between mt-8">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Deep Sleep
                  </span>
                  <span className="text-lg text-bold">71%</span>
                </div>
                <div className="flex flex-col mt-3">
                  <span className="text-sm text-muted-foreground">
                    Light Sleep
                  </span>
                  <span className="text-lg text-bold">29%</span>
                </div>
              </div>
              <div className="">
                <CircularProgress value={20} indicatorColor="#23b14b" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Sleepy days</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              days you sleep the most
            </p>
            <div className="flex justify-center mt-5">
              <span className="text-palletPurple-200 text-2xl mt-2">
                Tuesday
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Average Sleep Duration</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              On average how much did you sleep
            </p>
            <div className="flex justify-between mt-8">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Deep Sleep
                  </span>
                  <span className="text-lg text-bold">71%</span>
                </div>
                <div className="flex flex-col mt-3">
                  <span className="text-sm text-muted-foreground">
                    Light Sleep
                  </span>
                  <span className="text-lg text-bold">29%</span>
                </div>
              </div>
              <div className="">
                <CircularProgress value={80} indicatorColor="#23b14b" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary mt-10 ">
          <WeightHistoryChart />
        </div>
        <div className="grid grid-cols-3 gap-10 mt-6">
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary">
            <h3 className="font-bold text-lg">Historical Best</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              all-time lowest or healthiest weight since they started using the
              app.
            </p>
            <div className="flex justify-center mt-5">
              <span className="text-palletGreen-600 text-2xl mt-2">60kg</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Body Mass Index (BMI)</h3>
            <p className="text-sm text-muted-foreground pt-2">
              Categorizing your body weight relative to height.
            </p>
            <div className="flex justify-center mt-5">
              <span className="text-palletPurple-200 text-2xl mt-2">20.2</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Average Weekly Loss/Gain</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              average amount of weight you lost or gained each week
            </p>
            <div className="flex justify-center mt-5">
              <span className="text-palletPurple-200 text-2xl mt-2">
                8.8 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
HistoryPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default HistoryPage;
