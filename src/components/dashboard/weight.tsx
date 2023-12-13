import React from "react";
import { GiWeightScale } from "react-icons/gi";
import { FaPlusCircle } from "react-icons/fa";
import { MyPage } from "@/components/types/nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const WeightComponent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group bg-white rounded-xl p-5 w-full md:w-56 cursor-pointer">
          <div className="flex justify-between  ">
            <div className="flex">
              {" "}
              <GiWeightScale color="#5955ED" size={28} />
              <span className="pl-5 pt-1">Weight</span>
            </div>
            <FaPlusCircle
              color="#5955ED"
              size={28}
              className="-mt-2  -mr-2 opacity-20 hidden group-hover:block"
            />
          </div>
          <div className="flex justify-center pt-8">
            <span className="text-3xl">
              80<span className="text-palletGray-200">kg</span>
            </span>
          </div>
          <div className="flex justify-center pt-1">
            <span className="text-palletGray-200 text-sm font-light mt-8 ">
              current weight
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Add new weight</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="weight" className="text-right col-span-2">
              New Weight
            </Label>
            <div className="col-span-4 flex items-center">
              <Input id="weight" defaultValue="80" />
              <span className="pl-2 font-bold">KG</span>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 flex flex-row justify-end">
          <Button type="submit" className="bg-palletPurple-500">
            Add
          </Button>
          <Button type="submit" variant={"destructive"}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WeightComponent;
