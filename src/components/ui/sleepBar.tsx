import { FC } from "react";
import { Progress } from "./progress";

interface props {
  value: number;
  indicatorColor: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
}

const SleepBar: FC<props> = ({ value, indicatorColor, day }) => {
  return (
    <>
      <Progress
        value={value}
        className={"mt-2 bg-palletGray-100 h-20 w-3"}
        indicatorColor={indicatorColor}
        indicatorBottom={true}
      />
      <span className="pt-2">{day}</span>
    </>
  );
};

export default SleepBar;
