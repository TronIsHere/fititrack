import CharacterComponent from "@/components/dashboard/character";
import { MissionsComponent } from "@/components/dashboard/missions";
import SleepComponent from "@/components/dashboard/sleep";
import WeightComponent from "@/components/dashboard/weight";
import WorkoutComponent from "@/components/dashboard/workout";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
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
import { workoutsData } from "@/data/dummy_data";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { capitalizeFirstLetter } from "@/lib/utils";
import { newWeight } from "@/store/slices/userSlice";
import { TWorkout } from "@/types/workout";
import { useState } from "react";
const DashboardPage: MyPage = () => {
  const [newDayState, setNewDayState] = useState<boolean>(true);
  const weightState = useAppSelector((state) => state.user.weight);
  const dispatch = useAppDispatch();
  const weightHandler = (weight: number) => {
    dispatch(newWeight(weight));
  };
  console.log(new Date("2023/12/28"), 1);
  return (
    <>
      <Dialog open={false}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-w-[350px]">
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
                <Input id="sleep" defaultValue="7.5" />
                <span className="pl-2 font-bold">Hour</span>
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="weight" className="text-right col-span-2">
                Today's weight
              </Label>
              <div className="col-span-3 flex items-center">
                <Input id="weight" defaultValue="80" />
                <span className="pl-2 font-bold">KG</span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-end gap-2">
            <Button type="submit" className="bg-palletPurple-500">
              Log
            </Button>
            <Button type="submit" variant={"destructive"}>
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
            <WeightComponent
              weight={weightState}
              weightHandler={weightHandler}
            ></WeightComponent>
          </div>
          <div className="flex mt-10 ml-0 md:ml-6">
            <SleepComponent />
          </div>
          <div className="flex mt-10 w-full ml-0 md:ml-6 ">
            <CharacterComponent />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 mt-6 gap-6">
          <div className="col-span-5">
            {workoutsData.map((workout: TWorkout) => {
              console.log(workout, 2);
              return (
                <WorkoutComponent
                  workout={workout}
                  updateWorkout={() => console.log("clicked")}
                />
              );
            })}
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
