import DashboardLayout from "@/components/layouts/dashboardLayout";
import { MyPage } from "@/components/types/nextjs";
import { GiWeightScale } from "react-icons/gi";
import { FaBedPulse } from "react-icons/fa6";
import { AiFillBuild } from "react-icons/ai";
const DashboardPage: MyPage = () => {
  return (
    <>
      <div className="">
        <span className="mt-4 block text-lg">
          Welcome <strong>Erwin</strong>, good morning
        </span>
        <div className="flex flex-col md:flex-row">
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
          <div className="flex mt-10 ml-0 md:ml-6">
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
                  <div className="h-20 w-3 rounded-xl bg-palletPurple-300"></div>
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
            </div>
          </div>
          <div className="flex mt-10 w-full ml-6">
            <div className="bg-white w-full rounded-xl p-5">
              <div className="flex ">
                <AiFillBuild color="#5955ED" size={28} />
                <span className="pl-5 pt-1">Character</span>
              </div>
              <div className="flex  flex-col pt-4">
                <div className="flex">
                  <div className="flex w-full flex-col ">
                    <div className="flex justify-end ">
                      <span className="text-palletYellow-400 font-bold">
                        10/480 xp
                      </span>
                    </div>
                    <div className="h-4  bg-palletYellow-400 rounded-lg mt-2"></div>
                  </div>

                  <img
                    src="/images/jeff.png"
                    alt=""
                    width={50}
                    height={100}
                    className={"ml-10 mr-5 -mt-4"}
                  />
                </div>
                <div className="flex -mt-9">
                  <p className="text-sm w-2/4 mt-4 text-palletGray-300">
                    do missions or workouts to earn xp and level up your
                    character
                  </p>
                  <span className="font-bold ml-12 mt-4">Level 1</span>
                </div>
              </div>
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
