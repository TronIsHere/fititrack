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
import { addSleepToServer } from "@/services/userServices";
import { newSleep } from "@/store/slices/userSlice";
import { FC, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaBedPulse } from "react-icons/fa6";
import { TSleep } from "../types/DataTypes";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SleepChart } from "../ui/sleep/sleepChart";
import { useToast } from "../ui/toasts/use-toast";

interface sleepProps {
  darkModeDialog: boolean;
  email: string;
}
const SleepComponent: FC<sleepProps> = ({ darkModeDialog, email }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [fromTime, setFromTime] = useState<string>();
  const [toTime, setToTime] = useState<string>();
  const dispatch = useAppDispatch();
  const handleSleepData = async () => {
    // Early return if times are not set
    if (!fromTime || !toTime) {
      toast({
        variant: "destructive",
        description: "Please insert correct time",
      });
      return;
    }

    // Early return if times are not valid
    if (!isTimesValid(fromTime, toTime)) {
      toast({
        variant: "destructive",
        description: "Times are not valid",
      });
      return;
    }

    try {
      const newSleepData: TSleep = {
        date: new Date().toISOString(),
        from: fromTime,
        to: toTime,
      };

      // Ensure the async function is awaited
      const response = await addSleepToServer(newSleepData, email);

      dispatch(newSleep(newSleepData));
      toast({
        variant: "success",
        description: "Sleep added",
      });
      setOpen(false);
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error adding sleep data:", error);
      toast({
        variant: "destructive",
        description: "Failed to add sleep data",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
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
                  value={"Today"}
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
        <DialogFooter className="gap-2 flex flex-row justify-end">
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
