import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAppDispatch } from "@/hooks/storeHooks";
import { isTimesValid } from "@/lib/timeUtils";
import { newSleep } from "@/store/slices/userSlice";
import { FC, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaBedPulse } from "react-icons/fa6";
import { TSleep } from "../types/sleep";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SleepChart } from "../ui/sleep/sleepChart";
import { useToast } from "../ui/toasts/use-toast";
interface sleepProps {
  darkModeDialog: boolean;
}
const SleepComponent: FC<sleepProps> = ({ darkModeDialog }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [fromTime, setFromTime] = useState<string>();
  const [toTime, setToTime] = useState<string>();
  const dispatch = useAppDispatch();

  const handleSleepData = () => {
    if (fromTime && toTime) {
      if (isTimesValid(fromTime, toTime)) {
        const newSleepData: TSleep = {
          date: new Date().toISOString(),
          from: fromTime,
          to: toTime,
        };
        dispatch(newSleep(newSleepData));
        toast({
          variant: "success",
          description: "Sleep added",
        });
        setOpen(false);
      } else {
        toast({
          variant: "destructive",
          description: "Times are not valid ",
        });
      }
    } else {
      toast({
        variant: "destructive",
        description: "Please insert correct time",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="group bg-white rounded-xl p-5 w-full dark:bg-darkPrimary">
          <div className="flex justify-between">
            <div className="flex">
              <FaBedPulse color="#5955ED" size={28} />
              <span className="pl-5 pt-1">Sleep</span>
            </div>
            <FaPlusCircle
              color="#5955ED"
              size={28}
              className="-mt-2 -mr-2 opacity-20 hidden group-hover:block"
            />
          </div>
          <SleepChart />
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[525px] max-w-[350px] "
        darkMode={darkModeDialog}
      >
        <DialogHeader>
          <DialogTitle>Add new sleep</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <span className="pb-2">Date</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type={"text"}
                  value={"today"}
                  className={darkModeDialog ? "bg-darkPrimary" : "bg-white"}
                  disabled
                ></Input>
              </TooltipTrigger>
              <TooltipContent>
                <p>you can only add sleep data to today</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <span className="pb-2">from</span>
            <Input
              type={"time"}
              onChange={(e) => setFromTime(e.target.value)}
              className={darkModeDialog ? "bg-darkPrimary" : "bg-white"}
            ></Input>
          </div>
          <div className="flex flex-col">
            <span className="pb-2">to</span>
            <Input
              type={"time"}
              onChange={(e) => setToTime(e.target.value)}
              className={darkModeDialog ? "bg-darkPrimary" : "bg-white"}
            ></Input>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={"primary"} onClick={handleSleepData}>
            Add
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
  );
};

export default SleepComponent;
