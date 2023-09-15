import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { GiWeightScale } from "react-icons/gi";
import { FaBedPulse } from "react-icons/fa6";
const DashboardPage: MyPage = () => {
  return (
    <>
      <div className="">
        <span className="mt-4 block text-lg">
          Welcome <strong>Erwin</strong>, good morning
        </span>
        <div className="flex">
          <div className="flex mt-10">
            <div className="bg-white rounded-xl w-56 p-5">
              <div className="flex">
                <GiWeightScale color="#5955ED" size={28} />
                <span className="pl-5 pt-1">Weight</span>
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
          </div>
          <div className="flex mt-10 ml-6">
            <div className="bg-white rounded-xl p-5">
              <div className="flex">
                <FaBedPulse color="#5955ED" size={28} />
                <span className="pl-5 pt-1">Sleep</span>
              </div>
              <div className="flex justify-center mx-10  pt-4">
                <div className="flex flex-col items-center w-10 font-light text-sm">
                  <div className="h-20 w-3 rounded-xl  bg-palletGray-200"></div>
                  <span className="pt-2">Mon</span>
                </div>
                <div className="flex flex-col items-center w-10 font-light text-sm">
                  <div className="h-20 w-3 rounded-xl bg-palletGray-200"></div>
                  <span className="pt-2">Tue</span>
                </div>
                <div className="flex flex-col items-center w-10 font-light text-sm">
                  <div className="h-20 w-3 rounded-xl bg-palletGray-200"></div>
                  <span className="pt-2">Wen</span>
                </div>
                <div className="flex flex-col items-center w-10 font-light text-sm">
                  <div className="h-20 w-3 rounded-xl bg-palletPurple-400"></div>
                  <span className="pt-2">Thu</span>
                </div>
                <div className="flex flex-col items-center w-10 font-light text-sm">
                  <div className="h-20 w-3 rounded-xl bg-palletGray-200"></div>
                  <span className="pt-2">Fri</span>
                </div>
                <div className="flex flex-col items-center w-10 font-light text-sm">
                  <div className="h-20 w-3 rounded-xl bg-palletGray-200"></div>
                  <span className="pt-2">Sat</span>
                </div>
                <div className="flex flex-col items-center w-10 font-light text-sm">
                  <div className="h-20 w-3 rounded-xl bg-palletGray-200"></div>
                  <span className="pt-2">Sun</span>
                </div>
              </div>
              {/* <div className="flex justify-center pt-1">
                <span className="text-palletGray-200 text-sm font-light mt-8 ">
                  current weight
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default DashboardPage;
