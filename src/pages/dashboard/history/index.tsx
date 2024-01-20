import SleepyDyas from "@/components/history/sleepyDays-chart";
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
                <CircularProgress
                  showPercentage={true}
                  value={20}
                  indicatorColor="#23b14b"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Sleepy days</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              days you sleep the most
            </p>
            {/* TODO: Refactor Charts */}
            <SleepyDyas />
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
                <CircularProgress
                  showPercentage={true}
                  value={80}
                  indicatorColor="#23b14b"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary mt-10 ">
          <WeightHistoryChart />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary">
            <h3 className="font-bold text-lg">Cardio or Strength</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              what did you train the most
            </p>
            <div className="flex justify-end items-center mt-5">
              <CircularProgress
                staticProgress={true}
                textColor={"#7B78EB"}
                value={100}
                text={"Cardio"}
                indicatorColor="#7B78EB"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Body Mass Index (BMI)</h3>
            <p className="text-sm text-muted-foreground pt-2">
              Categorizing your body weight relative to height.
            </p>
            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm ">Healthy</span>
                <span className="text-2xl tracking-wide">20.2</span>
              </div>
              <CircularProgress
                staticProgress={true}
                textColor={"#23B24B"}
                value={50}
                text={"Healthy"}
                indicatorColor="#23B24B"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Average Weekly Loss/Gain</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              average weight you lost or gained each week
            </p>
            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm ">
                  Weight loss
                </span>
                <p className="text-2xl tracking-normal mt-2">
                  5 kg+{" "}
                  <span className="text-sm text-muted-foreground">
                    (per day)
                  </span>
                </p>
              </div>
              <CircularProgress value={100} indicatorColor="#23b14b" />
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
