import CharacterComponent from "@/components/dashboard/character";
import { MissionsComponent } from "@/components/dashboard/missions";
import SleepComponent from "@/components/dashboard/sleep";
import WeightComponent from "@/components/dashboard/weight";
import WorkoutComponent from "@/components/dashboard/workout";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { TWorkout } from "@/components/types/workout";
import { MyPage } from "@/components/types/nextjs";
import { TSleep } from "@/components/types/sleep";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toasts/use-toast";
import useLastVisited from "@/hooks/lastVisited";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { isTimesValid } from "@/lib/timeUtils";
import { newSleep, newWeight } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";

const DashboardPage: MyPage = () => {
  const [open, setOpen] = useState(false);
  const [weightData, setWeightData] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("22:00");
  const [toTime, setToTime] = useState<string>("7:00");
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const workoutsState = useAppSelector((state) => state.workout.workouts);
  const dispatch = useAppDispatch();
  const isNewDay = useLastVisited();

  useEffect(() => {
    if (isNewDay) {
      setOpen(true); // It's a new day
    }
  }, [isNewDay]);

  const handleLogClick = () => {
    // Dispatch newWeight and newSleep actions with the data
    if (weightData !== "") {
      const weightEntry = {
        date: new Date().toISOString(),
        weight: parseFloat(weightData), // Convert string to a number
      };
      dispatch(newWeight(weightEntry));
    }

    if (fromTime !== "" && toTime !== "") {
      if (isTimesValid(fromTime, toTime)) {
        const sleepEntry: TSleep = {
          date: new Date().toISOString(),
          from: fromTime,
          to: toTime,
        };
        dispatch(newSleep(sleepEntry));
        setOpen(false);
      } else {
        toast({
          variant: "destructive",
          description: "Times are not valid ",
        });
      }
    } else {
      setOpen(false);
    }

    // Close the dialog
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="sm:max-w-[525px] max-w-[350px]"
          darkMode={darkModeState}
        >
          <DialogHeader>
            <DialogTitle>New Day!</DialogTitle>
            <DialogDescription>
              how did you sleep last night? did you weight yourself today?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 justify-center items-center">
            <div className="grid grid-cols-5 items-center gap-4 w-full">
              <Label htmlFor="sleep" className="text-right col-span-2">
                Last night Sleep
              </Label>
              <div className="col-span-3 flex items-center ">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <div className="flex flex-col">
                    <span className="pb-2">from</span>
                    <Input
                      type={"time"}
                      value={fromTime}
                      onChange={(e) => setFromTime(e.target.value)}
                      className={darkModeState ? "bg-darkPrimary" : "bg-white"}
                    ></Input>
                  </div>
                  <div className="flex flex-col">
                    <span className="pb-2">to</span>
                    <Input
                      type={"time"}
                      value={toTime}
                      onChange={(e) => setToTime(e.target.value)}
                      className={darkModeState ? "bg-darkPrimary" : "bg-white"}
                    ></Input>
                  </div>
                </div>
                {/* <span className="pl-2 font-bold">Hour</span> */}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4 mt-5 md:mt-0">
              <Label htmlFor="weight" className="text-right col-span-2">
                Today&apos;s weight
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  onChange={(e) => setWeightData(e.target.value)}
                  id="weight"
                  defaultValue="80"
                  className={darkModeState ? "bg-darkPrimary" : "bg-white"}
                />
                <span className="pl-2 font-bold">KG</span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-end gap-2">
            <Button type="submit" variant={"primary"} onClick={handleLogClick}>
              Log
            </Button>
            <Button
              type="submit"
              variant={"destructive"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        <span className="mt-4 block text-lg">
          Welcome <strong>Erwin</strong>, good morning
        </span>
        <div className="flex flex-col md:flex-row">
          <div className="flex mt-10">
            <WeightComponent darkModeDialog={darkModeState}></WeightComponent>
          </div>
          <div className="flex mt-10 ml-0 md:ml-6">
            <SleepComponent darkModeDialog={darkModeState} />
          </div>
          <div className="flex mt-10 w-full ml-0 md:ml-6 ">
            <CharacterComponent />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 mt-6 gap-6">
          <div className="col-span-5">
            {workoutsState.map((workout: TWorkout) => {
              return (
                <WorkoutComponent
                  opacity={workout.done}
                  key={workout.id}
                  workout={workout}
                  updateWorkout={() => console.log("clicked")}
                />
              );
            })}
            {/* <MyChart /> */}
          </div>
          <div className="col-span-5 md:col-span-2">
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
