import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { GiWeightScale } from "react-icons/gi";
import { useToast } from "../ui/toasts/use-toast";
interface weightProps {
  weight: number;
  weightHandler: (value: number) => void;
}
const WeightComponent: FC<weightProps> = ({ weight, weightHandler }) => {
  const [weightState, setNewWeight] = useState<number>(weight);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="group bg-white rounded-xl p-5 w-full md:w-56 cursor-pointer dark:bg-darkPrimary ">
          <div className="flex justify-between  ">
            <div className="flex">
              {" "}
              <GiWeightScale color="#5955ED" size={28} />
              <span className="pl-5 pt-1">Weight</span>
            </div>
            <FaPlusCircle
              color="#5955ED"
              size={28}
              className="-mt-2 -mr-2 opacity-20 hidden group-hover:block"
            />
          </div>
          <div className="flex justify-center pt-8">
            <span className="text-3xl">
              {weight}
              <span className="text-palletGray-200">kg</span>
            </span>
          </div>
          <div className="flex justify-center pt-1">
            <span className="text-palletGray-200 text-sm font-light mt-8 ">
              current weight
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[350px] ">
        <DialogHeader className="">
          <DialogTitle>Add new weight</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 ">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="weight" className="text-right col-span-2">
              New Weight
            </Label>

            <div className="col-span-4 flex flex-col items-center">
              <div className="flex items-center">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (isNaN(weightState)) {
                        toast({
                          variant: "destructive",
                          description: "Amount is incorrect",
                        });
                        return;
                      }
                      weightHandler(weightState!);
                      toast({
                        variant: "success",
                        description: "New weight added",
                      });
                      setOpen(false);
                    } else {
                      console.log(e.key);
                    }
                  }}
                  id="weight"
                  defaultValue={weight}
                  onChange={(e) => setNewWeight(parseInt(e.target.value))}
                />

                <span className="pl-2 font-bold">KG</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 flex flex-row justify-end">
          <Button
            type="submit"
            className="bg-palletPurple-500"
            onClick={() => {
              if (isNaN(weightState)) {
                toast({
                  variant: "destructive",
                  description: "Amount is incorrect",
                });
                return;
              }
              toast({
                variant: "success",
                description: "New weight added",
              });

              weightHandler(weightState!);
              setOpen(false);
            }}
          >
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

export default WeightComponent;
