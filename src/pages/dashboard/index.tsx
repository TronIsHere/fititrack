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
import {
  addSleepToServer,
  addWeightToServer,
  fetchUserData,
} from "@/services/userServices";
import { initData, newSleep, newWeight } from "@/store/slices/userSlice";
import { initWorkouts } from "@/store/slices/workoutSlice";
import { differenceInDays, parseISO } from "date-fns";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const DashboardPage: MyPage = () => {
  const [open, setOpen] = useState(false);
  //TODO: handle default value for weight
  const [weightData, setWeightData] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("22:00");
  const [showUnskippablePopup, setShowUnskippablePopup] = useState(false);
  const [toTime, setToTime] = useState<string>("7:00");
  const [showBanner, setShowBanner] = useState(false);
  const {
    darkMode: darkModeState,
    name,
    initialized,
  } = useAppSelector((state) => state.user);
  const workoutsState = useAppSelector((state) => state.workout.workouts);

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
      if (!showUnskippablePopup) {
        setOpen(true);
      }
    }
  }, [session.data, isNewDay]);
  useEffect(() => {
    if (!session.data) {
      router.push("/");
      return;
    }
    const initializeUserData = async () => {
      if (!initialized || !workoutsState) {
        const userEmail = session.data.user?.email;
        console.log(userEmail, 1);
        if (userEmail) {
          const userData = await fetchUserData(userEmail);

          if (userData) {
            dispatch(
              initData({
                ...userData,
                initialized: true,
              })
            );

            dispatch(initWorkouts(userData.workouts));

            const trialEndDate = parseISO(userData.trial); // Parse the date string
            const currentDate = new Date();
            const daysLeft = differenceInDays(trialEndDate, currentDate);
            if (daysLeft <= 3 && !userData.paid) {
              setShowBanner(true);
            }
          } else {
            // console.log("userEmail", 1);
          }
        }
      }
    };
    initializeUserData();
  }, []);
  const handleLogClick = async () => {
    const email = session.data!.user?.email;
    // Dispatch newWeight and newSleep actions with the data
    if (weightData !== "") {
      const weightEntry = {
        date: new Date().toISOString(),
        weight: parseFloat(weightData), // Convert string to a number
      };
      await addWeightToServer(weightEntry, email!);
      dispatch(newWeight(weightEntry));
    }

    if (fromTime !== "" && toTime !== "") {
      if (isTimesValid(fromTime, toTime)) {
        const sleepEntry: TSleep = {
          date: new Date().toISOString(),
          from: fromTime,
          to: toTime,
        };

        await addSleepToServer(sleepEntry, email!);
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
      {showBanner && (
        <div className="fixed top-0 left-0 w-full bg-[#FB773C] text-white py-2 z-50">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex-grow text-center">
              Less than 3 days left on your trial,{" "}
              <Link
                href={"/dashboard/settings"}
                className="text-palletPurple-600 cursor-pointer ml-2"
              >
                upgrade now
              </Link>
            </div>
            <button
              className="text-white hover:text-gray-200 transition-colors"
              onClick={() => setShowBanner(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
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
          Welcome <strong>{capitalizeFirstLetter(name!)}</strong>, good morning
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

DashboardPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DashboardPage;
