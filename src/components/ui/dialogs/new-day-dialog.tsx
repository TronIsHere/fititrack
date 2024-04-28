import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
interface NewDayDialogProps {
  openState: boolean;
  OpenCallback: (value: boolean) => void;
  darkMode: boolean;
  fromTime: string;
  fromTimeCallback: (value: string) => void;
  toTime: string;
  toTimeCallback: (value: string) => void;
  setWeightCallback: (value: string) => void;
  clickCallBack: () => void;
  OpenChangeCallBack: (value: boolean) => void;
}
const NewDayDialog: FC<NewDayDialogProps> = ({
  openState,
  OpenCallback,
  darkMode,
  fromTime,
  fromTimeCallback,
  toTime,
  toTimeCallback,
  clickCallBack,
  OpenChangeCallBack,
  setWeightCallback,
}) => {
  return (
    <Dialog open={openState} onOpenChange={OpenCallback}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        className="sm:max-w-[525px] max-w-[350px]"
        darkMode={darkMode}
      >
        <DialogHeader>
          <DialogTitle>New Day!</DialogTitle>
          <DialogDescription>
            how did you sleep last night? did you weight yourself today?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 justify-center items-center">
          <div className="grid grid-cols-5 items-center gap-4 w-full">
            <Label htmlFor="sleep" className="text-right col-span-2">
              Last night Sleep
            </Label>
            <div className="col-span-3 flex items-center ">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div className="flex flex-col">
                  <span className="pb-2">from</span>
                  <Input
                    type={"time"}
                    value={fromTime}
                    onChange={(e) => fromTimeCallback(e.target.value)}
                    className={darkMode ? "bg-darkPrimary" : "bg-white"}
                  ></Input>
                </div>
                <div className="flex flex-col">
                  <span className="pb-2">to</span>
                  <Input
                    type={"time"}
                    value={toTime}
                    onChange={(e) => toTimeCallback(e.target.value)}
                    className={darkMode ? "bg-darkPrimary" : "bg-white"}
                  ></Input>
                </div>
              </div>
              {/* <span className="pl-2 font-bold">Hour</span> */}
            </div>
          </div>
          <div className="grid grid-cols-5 items-center gap-4 mt-5 md:mt-0">
            <Label htmlFor="weight" className="text-right col-span-2">
              Today&apos;s weight
            </Label>
            <div className="col-span-3 flex items-center">
              <Input
                onChange={(e) => setWeightCallback(e.target.value)}
                id="weight"
                defaultValue="80"
                className={darkMode ? "bg-darkPrimary" : "bg-white"}
              />
              <span className="pl-2 font-bold">KG</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button type="submit" variant={"primary"} onClick={clickCallBack}>
            Log
          </Button>
          <Button
            type="submit"
            variant={"destructive"}
            onClick={() => OpenChangeCallBack(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewDayDialog;
