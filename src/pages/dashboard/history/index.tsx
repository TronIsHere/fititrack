import SleepHistoryChart from "@/components/history/sleep-chart";
import SleepyDyas from "@/components/history/sleepyDays-chart";
import WeightHistoryChart from "@/components/history/weight-chart";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import CircularProgress from "@/components/ui/history/circularProgress";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const trained = ["Legs", "Neck", "Gluts", "Chest"];

const HistoryPage: MyPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
      <div className="col-span-7">
        <div className="flex justify-between items-center mb-10">
          <span className="mt-4 block text-2xl font-bold">History</span>
        </div>
        <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary mt-5">
          <SleepHistoryChart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary col-span-1 md:col-span-2 divide-y divide-slate-600 order-2">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
              <Image
                src="/images/jeff-level1.png"
                alt="Jeff Image"
                width={50}
                height={50}
                className={"ml-2 mb-3 md:mb-0"}
              />
              <div className="flex flex-col px-6">
                <span className="text-xl md:text-2xl font-semibold ">
                  Jeff is now Level 3 and he started to get compliments from his
                  mom
                </span>
                <span className="mt-5 text-palletYellow-500">Level 3</span>
              </div>
            </div>
            <div className="mt-8 pt-8">
              <div className="flex flex-col ">
                <span className="text-lg">Congratulations 🎊</span>
                <div className="flex justify-between flex-col md:flex-row items-center ">
                  <div className="flex flex-col ">
                    <p className="text-muted-foreground pt-1">
                      {" "}
                      you have worked out for{" "}
                      <span className="text-palletYellow-500 font-bold">
                        689
                      </span>{" "}
                      hours!
                    </p>
                    <div className="flex justify-center items-center">
                      <Progress
                        value={20}
                        indicatorColor={"#5955ED"}
                        className={"bg-darkSecondary h-2 mt-6 w-[200px]"}
                      />
                      <span className="text-xs pl-4 mt-6">
                        70% Complete of your goal
                      </span>
                    </div>
                  </div>
                  <Image
                    src={"/images/Trophy1.png"}
                    alt="Trophy"
                    width={100}
                    height={80}
                    className={"md:-mt-6 hidden md:block"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary order-1">
            <h3 className="font-bold text-lg">Most muscles trained</h3>

            <div className="flex flex-col mt-5 space-y-3">
              {trained.map((item, index) => (
                <div className="flex justify-between bg-white dark:bg-darkSecondary p-3 rounded-md">
                  <span>
                    {index + 1}.{item}
                  </span>
                </div>
              ))}
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
