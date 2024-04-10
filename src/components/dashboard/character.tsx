import { useAppSelector } from "@/hooks/storeHooks";
import Image from "next/image";
import { AiFillBuild } from "react-icons/ai";
import { Progress } from "../ui/progress";
const CharacterComponent = () => {
  const userState = useAppSelector((state) => state.user);
  const maxXpState = userState.maxXp;
  const xpState = userState.xp;
  const levelState = userState.level;
  // const [levelState, setLevelState] = useState<number>(2);
  return (
    <div className="bg-white w-full rounded-xl p-5 dark:bg-darkPrimary">
      <div className="flex ">
        <AiFillBuild color="#5955ED" size={28} />
        <span className="pl-5 pt-1">Character</span>
      </div>
      <div className="flex flex-col pt-4">
        <div className="flex">
          <div className="flex w-full flex-col ">
            <div className="flex justify-end ">
              <span className="text-palletYellow-400 font-bold">
                {xpState}/{maxXpState} xp
              </span>
            </div>
            <Progress
              value={(xpState / maxXpState) * 100}
              className={"mt-2 bg-palletGray-100"}
              indicatorColor={"#F4C05B"}
            />
          </div>

          <Image
            src={`/images/jeff-level${levelState}.png`}
            alt=""
            width={50}
            height={100}
            className={"ml-10 mr-5 -mt-4"}
          />
        </div>
        <div className="flex flex-col md:flex-row -mt-9">
          <p className="text-sm w-2/4 mt-4 text-palletGray-300 order-4 md:order-1">
            do missions or workouts to earn xp and level up your character
          </p>
          <span className="font-bold  ml-0 md:ml-12 mt-4 order-3 md:order-2">
            Level {levelState}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterComponent;
