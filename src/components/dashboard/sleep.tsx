import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaBedPulse } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SleepBar from "../ui/sleepBar";
const SleepComponent = () => {
  const [open, setOpen] = useState(false);
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
          <div className="flex justify-center  mx-0 md:mx-10  pt-4">
            <div className="flex flex-col items-center w-10 font-light text-sm">
              <SleepBar value={20} indicatorColor={"#7B78EB"} day={"Mon"} />
            </div>
            <div className="flex flex-col items-center w-10 font-light text-sm">
              <SleepBar value={0} indicatorColor={"#7B78EB"} day={"Tue"} />
            </div>
            <div className="flex flex-col items-center w-10 font-light text-sm">
              <SleepBar value={0} indicatorColor={"#7B78EB"} day={"Wed"} />
            </div>
            <div className="flex flex-col items-center w-10 font-light text-sm">
              <SleepBar value={0} indicatorColor={"#7B78EB"} day={"Thu"} />
            </div>
            <div className="flex flex-col items-center w-10 font-light text-sm">
              <SleepBar value={30} indicatorColor={"#7B78EB"} day={"Fri"} />
            </div>
            <div className="flex flex-col items-center w-10 font-light text-sm">
              <SleepBar value={12} indicatorColor={"#7B78EB"} day={"Sat"} />
            </div>
            <div className="flex flex-col items-center w-10 font-light text-sm">
              <SleepBar value={70} indicatorColor={"#7B78EB"} day={"Sun"} />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-w-[350px] ">
        <DialogHeader>
          <DialogTitle>Add new sleep</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <span className="pb-2">Date</span>
          <Input type={"text"} value={"today"} readOnly></Input>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <span className="pb-2">from</span>
            <Input type={"text"} value={"10:00 AM"} readOnly></Input>
          </div>
          <div className="flex flex-col">
            <span className="pb-2">to</span>
            <Input type={"text"} value={"8:00 AM"} readOnly></Input>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-palletPurple-500">
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
