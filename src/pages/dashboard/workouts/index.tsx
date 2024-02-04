import WorkoutComponent from "@/components/dashboard/workout";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { TWorkout } from "@/components/types/DataTypes";
import { MyPage } from "@/components/types/nextjs";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { deleteWorkoutFromServer } from "@/services/workout";
import { updateWorkout } from "@/store/slices/workoutSlice";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const WorkoutsPage: MyPage = () => {
  const workoutsState = useAppSelector((state) => state.workout.workouts);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const session = useSession();
  const handleUpdateWorkout = async (
    type: "edit" | "delete",
    workoutId: number
  ) => {
    if (type == "delete") {
      console.log(workoutId);
      const response = await deleteWorkoutFromServer(
        workoutId,
        session.data?.user?.email!
      );
      if (response.message == "success") {
        const updatedWorkouts: TWorkout[] = workoutsState.filter(
          (workout) => workout._id !== workoutId
        );
        dispatch(updateWorkout(updatedWorkouts));
      }
    } else {
      router.push(`/dashboard/workouts/edit/${workoutId}`);
    }
  };
  return (
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
        {workoutsState.map((workout: TWorkout) => {
          return (
            <WorkoutComponent
              session={session}
              key={workout._id}
              editEnabled={true}
              workout={workout}
              updateWorkout={(type) => handleUpdateWorkout(type, workout._id)}
            />
          );
        })}
      </div>
      <div className="col-span-2"></div>
    </div>
  );
};
WorkoutsPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default WorkoutsPage;
