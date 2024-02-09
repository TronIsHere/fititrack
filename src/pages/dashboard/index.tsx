import CharacterComponent from "@/components/dashboard/character";
import { MissionsComponent } from "@/components/dashboard/missions";
import SleepComponent from "@/components/dashboard/sleep";
import WeightComponent from "@/components/dashboard/weight";
import WorkoutComponent from "@/components/dashboard/workout";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { TSleep, TWorkout } from "@/components/types/DataTypes";
import { MyPage } from "@/components/types/nextjs";
import NewDayDialog from "@/components/ui/dialogs/new-day-dialog";
import { toast } from "@/components/ui/toasts/use-toast";
import useLastVisited from "@/hooks/lastVisited";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { isTimesValid } from "@/lib/timeUtils";
import { capitalizeFirstLetter } from "@/lib/utils";
import { fetchUserData } from "@/services/user";
import { initData, newSleep, newWeight } from "@/store/slices/userSlice";
import { initWorkouts } from "@/store/slices/workoutSlice";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage: MyPage = () => {
  const [open, setOpen] = useState(false);
  //TODO: handle default value for weight
  const [weightData, setWeightData] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("22:00");
  const [toTime, setToTime] = useState<string>("7:00");
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const workoutsState = useAppSelector((state) => state.workout.workouts);
  const userState = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const isNewDay = useLastVisited();
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session.data) {
      router.push("/");
      return;
    }

    if (isNewDay) {
      setOpen(true);
    }
  }, [session.data, isNewDay]);
  useEffect(() => {
    if (!session.data) {
      router.push("/");
      return;
    }
    const initializeUserData = async () => {
      // if (!userState || !workoutsState) { //TODO: Returns previous data
      if (true) {
        const userEmail = session.data.user?.email;
        if (userEmail) {
          console.log(userEmail, 1);
          const userData = await fetchUserData(userEmail);

          if (userData) {
            dispatch(
              initData({
                darkMode: userData.darkMode,
                weight: userData.weight,
                age: userData.age,
                email: userData.email,
                sleep: userData.sleep,
                level: userData.level,
                maxXp: userData.maxXp,
                xp: userData.xp,
                name: userData.name,
              })
            );

            dispatch(initWorkouts(userData.workouts));
          } else {
            // Handle case where userData is null
          }
        }
      }
    };

    initializeUserData();
  }, []);

  const handleLogClick = () => {
    //TODO: THIS IS NOT CONNECTED TO DATABASE
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
      <NewDayDialog
        openState={open}
        OpenCallback={setOpen}
        darkMode={darkModeState}
        fromTime={fromTime}
        toTime={toTime}
        fromTimeCallback={setFromTime}
        toTimeCallback={setToTime}
        clickCallBack={handleLogClick}
        OpenChangeCallBack={setOpen}
        setWeightCallback={setWeightData}
      />
      <div>
        <span className="mt-4 block text-lg">
          Welcome <strong>{capitalizeFirstLetter(userState.name)}</strong>, good
          morning
        </span>
        <div className="flex flex-col md:flex-row">
          <div className="flex mt-10">
            <WeightComponent
              darkModeDialog={darkModeState}
              email={session.data?.user?.email! || ""}
            ></WeightComponent>
          </div>
          <div className="flex mt-10 ml-0 md:ml-6">
            <SleepComponent
              darkModeDialog={darkModeState}
              email={session.data?.user?.email! || ""}
            />
          </div>
          <div className="flex mt-10 w-full ml-0 md:ml-6 ">
            <CharacterComponent />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 mt-6 gap-6">
          <div className="col-span-5">
            {workoutsState &&
              workoutsState.map((workout: TWorkout) => {
                return (
                  <WorkoutComponent
                    opacity={workout.done}
                    session={session}
                    key={workout._id}
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
export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
DashboardPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DashboardPage;
