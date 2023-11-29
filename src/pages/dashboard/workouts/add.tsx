import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsFillCaretDownFill } from "react-icons/bs";

const AddWorkout: MyPage = () => {
  return (
    <div className="grid grid-cols-7 gap-6">
      <div className="col-span-5">
        <div className="flex justify-between items-center mb-10">
          <span className="mt-4 block text-2xl font-bold">New workout</span>
          <button className="bg-palletPurple-500 h-10 text-white px-8 rounded-md mt-3">
            Cancel
          </button>
        </div>
        <div className="bg-white rounded-lg p-5">
          <div className="flex">
            <div className="flex flex-col w-full mr-2">
              <span>Name of this workout</span>
              <input
                type="text"
                className="border-2 mt-2 rounded-lg p-1.5 pl-2 text-sm border-palletGray-100"
                placeholder="your workout’s name.."
              />
            </div>
            <div className="flex flex-col items-center">
              <span>Color</span>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <div className="border-2 border-palletGray-100 bg-red-400 w-9 h-9 rounded-md mt-2 cursor-pointer"></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <div className="w-4 h-4 rounded-sm mr-1 bg-red-500"></div>
                    Red
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="w-4 h-4 rounded-sm mr-1 bg-blue-500"></div>
                    Blue
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="w-4 h-4 rounded-sm mr-1 bg-green-500"></div>
                    Green
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="w-4 h-4 rounded-sm mr-1 bg-yellow-950"></div>
                    Brown
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="w-4 h-4 rounded-sm mr-1 bg-purple-500"></div>
                    Purple
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="w-4 h-4 rounded-sm mr-1 bg-gray-500"></div>
                    Gray
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex flex-col  ">
              <span>Workout frequency</span>
              <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
                <span className="px-2 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Mon
                </span>
                <span className="px-2 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Tue
                </span>
                <span className="px-2 py-1  text-palletGray-100 rounded-md mr-1 cursor-pointer">
                  Wen
                </span>
                <span className="px-2 py-1  text-palletGray-100 rounded-md mr-1 cursor-pointer">
                  Thu
                </span>
                <span className="px-2 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Fri
                </span>
                <span className="px-2 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Sat
                </span>
                <span className="px-2 py-1  text-palletGray-100 rounded-md mr-1 cursor-pointer">
                  Sun
                </span>
              </div>
            </div>
            <div className="ml-5">
              <br />
              <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
                <span className="px-2 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Weekdays
                </span>
                <span className="px-2 py-1 text-palletGray-100 rounded-md mr-1 cursor-pointer">
                  Every day
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex flex-col  ">
              <span>Workout type</span>
              <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
                <span className="px-5 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Strength
                </span>
                <span className="px-5 py-1 text-palletGray-100 rounded-md mr-1 cursor-pointer">
                  Cardio
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex flex-col  ">
              <span>What muscles you focus</span>
              <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
                <span className="px-2 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Legs
                </span>
                <span className="px-2 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Arms
                </span>
                <span className="px-2 py-1  text-palletGray-100 rounded-md mr-1 cursor-pointer">
                  Chest
                </span>
                <span className="px-2 py-1  text-palletGray-100 rounded-md mr-1 cursor-pointer">
                  Core
                </span>
                <span className="px-2 py-1 bg-palletPurple-300 text-white rounded-md mr-1 cursor-pointer">
                  Neck
                </span>
                <span className="px-2 py-1 text-palletGray-100 rounded-md mr-1 cursor-pointer">
                  Back
                </span>
                <span className="px-2 py-1 bg-palletPurple-300  text-white rounded-md mr-1 cursor-pointer">
                  Gluteus
                </span>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex flex-col">
              <span>How long normally is your workout</span>
              <div className="flex">
                <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
                  <input type="text" className="p-1 w-10 text-center" />
                </div>
                <div className="flex border-2 rounded-lg border-palletGray-100 p-1 px-2 mt-2 text-sm ml-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-palletPurple-300 flex items-center">
                      Minutes
                      <BsFillCaretDownFill className="ml-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Minutes</DropdownMenuItem>
                      <DropdownMenuItem>Hours</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-10 justify-end">
            <button className="bg-palletGreen-600 h-10 text-white px-8 rounded-md mt-3">
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
};
AddWorkout.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AddWorkout;
