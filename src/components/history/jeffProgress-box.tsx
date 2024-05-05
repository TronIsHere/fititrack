import Image from "next/image";
import { Progress } from "../ui/progress";
type JeffProgressBoxProps = {
  level: number;
  totalWorkoutDuration: number;
};

const JeffProgressBox: React.FC<JeffProgressBoxProps> = ({
  level = 1,
  totalWorkoutDuration,
}) => {
  const levelMessages = [
    "Jeff is now Level 1. He's just getting started on his fitness journey.",
    "Jeff is now Level 2 and he is starting to see some progress.",
    "Jeff is now Level 3 and he started to get compliments from his mom.",
    "Jeff is now Level 4 and he is feeling stronger than ever.",
  ];
  return (
    <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary col-span-1 md:col-span-2 divide-y divide-whitePrimary dark:divide-slate-600 order-2">
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
            {levelMessages[level - 1]}
          </span>
          <span className="mt-5 text-palletYellow-500">Level {level}</span>
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
                  {totalWorkoutDuration}
                </span>{" "}
                hours!
              </p>
              <div className="flex justify-center items-center">
                {/* <Progress
                  value={20}
                  indicatorColor={"#5955ED"}
                  className={
                    "bg-palletGray-100 dark:bg-darkSecondary h-2 mt-6 w-[200px]"
                  }
                />
                <span className="text-xs pl-4 mt-6">
                  70% Complete of your goal
                </span> */}
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
  );
};

export default JeffProgressBox;
