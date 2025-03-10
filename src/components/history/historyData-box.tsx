import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import CircularProgress from "../ui/history/circularProgress";

interface staticProgressProps {
  enable: boolean;
  textColor: string;
  text: string;
}
interface SleepBoxProps {
  title: string;
  description: string;

  circularProgressValue: number;
  circularProgressColor?: string;
  staticProgress?: staticProgressProps;
  noLeftText?: boolean;
  children?: ReactNode;
}

const HistoryDataBox: FC<SleepBoxProps> = ({
  title,
  description,
  circularProgressValue,
  circularProgressColor,
  noLeftText,
  staticProgress,
  children,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 w-full dark:bg-darkPrimary relative">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground pt-2">{description}</p>
      <div
        className={cn(
          "flex  mt-8",
          noLeftText ? "justify-end" : "justify-between"
        )}
      >
        {!noLeftText ? (
          <div className="flex flex-col justify-center">{children}</div>
        ) : null}
        {staticProgress?.enable ? (
          <CircularProgress
            staticProgress={true}
            textColor={staticProgress.textColor}
            value={100}
            text={staticProgress.text}
            indicatorColor={circularProgressColor}
          />
        ) : (
          <CircularProgress
            showPercentage={true}
            value={circularProgressValue}
            indicatorColor={circularProgressColor}
          />
        )}
      </div>
      {staticProgress?.enable &&
      (staticProgress.text === "" || staticProgress.text == undefined) ? (
        <div className="absolute inset-0 backdrop-blur-sm bg-darkPrimary/30 flex items-center justify-center rounded-xl">
          <span className="text-white text-2xl">No data yet</span>
        </div>
      ) : null}
      {!circularProgressValue ? (
        <div className="absolute inset-0 backdrop-blur-sm bg-darkPrimary/30 flex items-center justify-center rounded-xl">
          <span className="text-white text-2xl">No data yet</span>
        </div>
      ) : null}
    </div>
  );
};

export default HistoryDataBox;
