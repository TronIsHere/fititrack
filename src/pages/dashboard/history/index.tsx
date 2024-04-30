import HistoryDataBox from "@/components/history/historyData-box";
import JeffProgressBox from "@/components/history/jeffProgress-box";
import SleepHistoryChart from "@/components/history/sleep-chart";
import SleepyDays from "@/components/history/sleepyDays-chart";
import WeightHistoryChart from "@/components/history/weight-chart";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import MuscleTrainedHistoryBox from "@/components/history/muscleTrained-box";
import { use } from "react";
import { useAppSelector } from "@/hooks/storeHooks";

const HistoryPage: MyPage = () => {
  const userSleep = useAppSelector((state) => state.user.sleep);
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
      <div className="col-span-7">
        <div className="flex justify-between items-center mb-10">
          <span className="mt-4 block text-2xl font-bold">History</span>
        </div>
        <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary mt-5">
          <SleepHistoryChart sleepData={userSleep} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <HistoryDataBox
            title="Sleep Quality overall"
            description="how well did you sleep"
            circularProgressValue={20}
          >
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Deep Sleep</span>
              <span className="text-lg text-bold">{71}%</span>
            </div>
            <div className="flex flex-col mt-3">
              <span className="text-sm text-muted-foreground">Light Sleep</span>
              <span className="text-lg text-bold">{29}%</span>
            </div>
          </HistoryDataBox>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Sleepy days</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              days you sleep the most
            </p>

            <SleepyDays />
          </div>
          <HistoryDataBox
            title="Average Sleep Duration"
            description="On average how much did you sleep"
            circularProgressValue={80}
          >
            {" "}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Deep Sleep</span>
              <span className="text-lg text-bold">{71}%</span>
            </div>
            <div className="flex flex-col mt-3">
              <span className="text-sm text-muted-foreground">Light Sleep</span>
              <span className="text-lg text-bold">{29}%</span>
            </div>
          </HistoryDataBox>
        </div>
        <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary mt-6 ">
          <WeightHistoryChart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <HistoryDataBox
            title="Cardio or Strength"
            description="What did you train the most"
            circularProgressColor="#7B78EB"
            circularProgressValue={80}
            staticProgress={{
              enable: true,
              textColor: "#7B78EB",
              text: "Cardio",
            }}
          />
          <HistoryDataBox
            title="Body Mass Index (BMI)"
            description="Categorizing your body weight relative to height."
            circularProgressColor="#7B78EB"
            circularProgressValue={50}
            staticProgress={{
              enable: true,
              textColor: "#23B24B",
              text: "Healthy",
            }}
          >
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm ">Healthy</span>
              <span className="text-2xl tracking-wide">20.2</span>
            </div>
          </HistoryDataBox>
          <HistoryDataBox
            title="Average Weekly Loss/Gain"
            description="average weight you lost or gained each week"
            circularProgressColor="#7B78EB"
            circularProgressValue={50}
            staticProgress={{
              enable: true,
              textColor: "#23B24B",
              text: "5kg +",
            }}
          >
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm ">
                Weight loss
              </span>
              <p className="text-2xl tracking-normal mt-2">
                5 kg+{" "}
                <span className="text-sm text-muted-foreground">(per day)</span>
              </p>
            </div>
          </HistoryDataBox>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <JeffProgressBox />
          <MuscleTrainedHistoryBox />
        </div>
      </div>
    </div>
  );
};
HistoryPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default HistoryPage;
