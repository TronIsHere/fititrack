import HistoryDataBox from "@/components/history/historyData-box";
import JeffProgressBox from "@/components/history/jeffProgress-box";
import MuscleTrainedHistoryBox from "@/components/history/muscleTrained-box";
import SleepHistoryChart from "@/components/history/sleep-chart";
import SleepyDays from "@/components/history/sleepyDays-chart";
import WeightHistoryChart from "@/components/history/weight-chart";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  calculateAverageWeeklyWeightChange,
  calculateMostFrequentMuscleGroups,
  calculateMostFrequentWorkout,
  calculateSleepHoursDeep,
  calculateSleepPercentages,
} from "@/lib/utils";

const HistoryPage: MyPage = () => {
  const userSleep = useAppSelector((state) => state.user.sleep);
  const userWeight = useAppSelector((state) => state.user.weight);
  const userWorkouts = useAppSelector((state) => state.workout.workouts);
  const { deepSleepPercentage, lightSleepPercentage } =
    calculateSleepPercentages(userSleep);
  const { deepSleepTime, lightSleepTime, sleepDurationPercentage } =
    calculateSleepHoursDeep(userSleep);
  const mostFrequentWorkout = calculateMostFrequentWorkout(userWorkouts);
  const averageWeeklyWeightChange =
    calculateAverageWeeklyWeightChange(userWeight);
  const mostFrequentMuscleGroups =
    calculateMostFrequentMuscleGroups(userWorkouts);
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
            circularProgressValue={
              Math.round(deepSleepPercentage + lightSleepPercentage) * 0.5
            }
          >
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Deep Sleep</span>
              <span className="text-lg text-bold">
                {Math.round(deepSleepPercentage)}%
              </span>
            </div>
            <div className="flex flex-col mt-3">
              <span className="text-sm text-muted-foreground">Light Sleep</span>
              <span className="text-lg text-bold">
                {Math.round(lightSleepPercentage)}%
              </span>
            </div>
          </HistoryDataBox>
          <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary ">
            <h3 className="font-bold text-lg">Sleepy days</h3>
            <p className="text-sm text-muted-foreground  pt-2">
              days you sleep the most
            </p>

            <SleepyDays sleepData={userSleep} />
          </div>
          <HistoryDataBox
            title="Average Sleep Duration"
            description="On average how much did you sleep"
            circularProgressValue={Math.round(sleepDurationPercentage)}
          >
            {" "}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Deep Sleep</span>
              <span className="text-lg text-bold">{deepSleepTime}hrs</span>
            </div>
            <div className="flex flex-col mt-3">
              <span className="text-sm text-muted-foreground">Light Sleep</span>
              <span className="text-lg text-bold">{lightSleepTime}hrs</span>
            </div>
          </HistoryDataBox>
        </div>
        <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary mt-6 ">
          <WeightHistoryChart weightData={userWeight} />
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
              text: mostFrequentWorkout,
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
              text: `${averageWeeklyWeightChange.averageChange} kg ${
                averageWeeklyWeightChange.gained ? "+" : "-"
              }`,
            }}
          >
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm ">
                Weight {averageWeeklyWeightChange.gained ? "gained" : "lost"}
              </span>
              <p className="text-2xl tracking-normal mt-2">
                {averageWeeklyWeightChange.averageChange} kg
                {averageWeeklyWeightChange.gained ? "+" : "-"}
                <span className="text-sm text-muted-foreground">
                  (per week)
                </span>
              </p>
            </div>
          </HistoryDataBox>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <JeffProgressBox />
          <MuscleTrainedHistoryBox trainedMuscles={mostFrequentMuscleGroups} />
        </div>
      </div>
    </div>
  );
};
HistoryPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default HistoryPage;
