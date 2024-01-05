import CharacterComponent from "@/components/dashboard/character";
import { MissionsComponent } from "@/components/dashboard/missions";
import SleepComponent from "@/components/dashboard/sleep";
import WeightComponent from "@/components/dashboard/weight";
import WorkoutComponent from "@/components/dashboard/workout";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { TWorkout } from "@/components/types/dashboardTypes";
import { MyPage } from "@/components/types/nextjs";
import { TWeight } from "@/components/types/weight";
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
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { newWeight } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";

const DashboardPage: MyPage = () => {
  const [open, setOpen] = useState(false);
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const workoutsState = useAppSelector((state) => state.workout.workouts);
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const lastVisited = localStorage.getItem("lastVisited"); // Replace with your state management if not using localStorage

    if (lastVisited !== today) {
      setOpen(true); // It's a new day
      localStorage.setItem("lastVisited", today); // Update the last visited date
    }
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] max-w-[350px]"
          darkMode={darkModeState}
        >
          <DialogHeader>
            <DialogTitle>New Day!</DialogTitle>
            <DialogDescription>
              how did you sleep last night? did you weight yourself today?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="sleep" className="text-right col-span-2">
                Last night Sleep
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  id="sleep"
                  defaultValue="7.5"
                  className={darkModeState ? "bg-darkPrimary" : "bg-white"}
                />
                <span className="pl-2 font-bold">Hour</span>
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="weight" className="text-right col-span-2">
                Today&apos;s weight
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  id="weight"
                  defaultValue="80"
                  className={darkModeState ? "bg-darkPrimary" : "bg-white"}
                />
                <span className="pl-2 font-bold">KG</span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-end gap-2">
            <Button type="submit" variant={"primary"}>
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
      <div className="">
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
