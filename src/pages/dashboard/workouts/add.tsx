import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { TWorkout } from "@/components/types/DataTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toasts/use-toast";
import MuscleSelect from "@/components/ui/workout/muscle-select";
import WorkoutType from "@/components/ui/workout/workout-type";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import useMusclesSelect from "@/hooks/workout/useMuscleSelect";
import useWorkoutDetails from "@/hooks/workout/useWorkoutDetails";
import useWorkoutFrequency from "@/hooks/workout/useWorkoutFrequency";
import useWorkoutType from "@/hooks/workout/useWorkoutType";
import { addWorkout } from "@/store/slices/workoutSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { addWorkoutToServer } from "@/services/workout";
import { useSession } from "next-auth/react";

const AddWorkout: MyPage = () => {
  const session = useSession();
  const { nameWorkout, selectedColor, handleNameChange, handleColorSelect } =
    useWorkoutDetails();
  const {
    workoutFrequency,
    selectedDays,
    handleWorkoutFrequencyChange,
    handleDaySelect,
  } = useWorkoutFrequency();
  const { workoutType, handleWorkoutTypeChange } = useWorkoutType();
  const { selectedMuscles, handleMuscleSelect } = useMusclesSelect();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [workoutDuration, setWorkoutDuration] = useState<string>("");

  const [durationUnit, setDurationUnit] = useState<"Minutes" | "Hours">(
    "Minutes"
  );
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutDuration(event.target.value);
  };

  const handleDurationUnitChange = (unit: "Minutes" | "Hours") => {
    setDurationUnit(unit);
  };

  const workoutsState = useAppSelector((state) => state.workout.workouts);
  const addHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newWorkout: TWorkout = {
      title: nameWorkout,
      checkIns: 0,
      created: new Date().toISOString(),
      streak: 0,
      done: false,
      days: [],
      muscles: selectedMuscles,
      type: workoutType,
      color: selectedColor,
      duration:
        durationUnit === "Hours"
          ? parseInt(workoutDuration) * 60
          : parseInt(workoutDuration),
    };
    const email = session.data?.user?.email;
    const response = await addWorkoutToServer(newWorkout, email!);
    console.log(response);
    if (response.message == "success") {
      dispatch(addWorkout({ workout: newWorkout, id: response.newWorkoutId }));
      toast({
        variant: "success",
        description: "Workout added ",
      });
      router.push("/dashboard/workouts");
    } else {
      toast({
        variant: "destructive",
        description: "Something went wrong please try again later.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6 ">
      <div className="col-span-5">
        <div className="flex justify-between items-center mb-10">
          <span className="mt-4 block text-2xl font-bold">New workout</span>
          <Link
            href={"/dashboard/workouts"}
            className="bg-palletPurple-500 py-2 text-white px-8 rounded-md mt-3"
          >
            Cancel
          </Link>
        </div>
        <div className="bg-white rounded-lg p-5 dark:bg-darkPrimary">
          <div className="flex">
            <div className="flex flex-col w-full mr-2">
              <span>Name of this workout</span>
              <input
                onChange={(e) => handleNameChange(e.target.value)}
                type="text"
                className="border-2 mt-2 rounded-lg p-1.5 pl-2 text-sm border-palletGray-100 dark:bg-darkPrimary"
                placeholder="your workout’s name.."
              />
            </div>
            <div className="flex flex-col items-center">
              <span>Color</span>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  {selectedColor == "" ? (
                    <div
                      className={`border-2 border-palletGray-100 checkerboard-pattern w-9 h-9 rounded-md mt-2 cursor-pointer`}
                    ></div>
                  ) : (
                    <div
                      className={`border-2 border-palletGray-100 bg-${selectedColor} w-9 h-9 rounded-md mt-2 cursor-pointer`}
                    ></div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleColorSelect("")}>
                    <div className="w-4 h-4 rounded-sm mr-1 checkerboard-pattern"></div>
                    Dynamic
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleColorSelect("palletPurple-500")}
                  >
                    <div className="w-4 h-4 rounded-sm mr-1 bg-palletPurple-500"></div>
                    Purple
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleColorSelect("red-500")}
                  >
                    <div className="w-4 h-4 rounded-sm mr-1 bg-red-500"></div>{" "}
                    Red
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleColorSelect("blue-500")}
                  >
                    <div className="w-4 h-4 rounded-sm mr-1 bg-blue-500"></div>{" "}
                    Blue
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleColorSelect("green-500")}
                  >
                    <div className="w-4 h-4 rounded-sm mr-1 bg-green-500"></div>
                    Green
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleColorSelect("yellow-500")}
                  >
                    <div className="w-4 h-4 rounded-sm mr-1 bg-yellow-500"></div>
                    Yellow
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleColorSelect("gray-500")}
                  >
                    <div className="w-4 h-4 rounded-sm mr-1 bg-gray-500"></div>
                    Gray
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* <div className="flex flex-col md:flex-row mt-5">
            <WorkoutFrequency
              onWorkoutFrequencyChange={handleWorkoutFrequencyChange}
              workoutFrequencyState={workoutFrequency}
              onWorkoutFrequencyDayChange={handleDaySelect}
              selectedDayState={selectedDays}
            />
          </div> */}
          <div className="flex mt-5">
            <WorkoutType
              onWorkoutTypeChange={handleWorkoutTypeChange}
              workoutType={workoutType}
            />
          </div>
          <div className="flex mt-5">
            <MuscleSelect
              muscleSelectState={selectedMuscles}
              onMuscleSelectChange={handleMuscleSelect}
            />
          </div>
          <div className="flex mt-5">
            <div className="flex flex-col">
              <span>How long normally is your workout</span>
              <div className="flex">
                <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
                  <input
                    type="text"
                    value={workoutDuration}
                    onChange={handleDurationChange}
                    className="p-1 w-10 text-center dark:bg-darkPrimary"
                  />
                </div>
                <div className="flex border-2 rounded-lg border-palletGray-100 p-1 px-2 mt-2 text-sm ml-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-palletPurple-300 flex items-center">
                      {durationUnit}
                      <BsFillCaretDownFill className="ml-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleDurationUnitChange("Minutes")}
                      >
                        Minutes
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDurationUnitChange("Hours")}
                      >
                        Hours
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-10 justify-end">
            <button
              className="bg-palletGreen-600 h-10 text-white px-8 rounded-md mt-3"
              onClick={addHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
};

AddWorkout.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AddWorkout;
