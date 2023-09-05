import { NextPage } from "next";
import Image from "next/image";

const WaitlistPage: NextPage = () => {
  return (
    <div className="grid grid-cols-2 h-screen ">
      <div className="flex items-center justify-center flex-col ">
        <div className="flex flex-row items-start">
          <Image src="/images/logo.svg" alt="" width={200} height={60} />
          <span className="bg-palletGreen-200 mt-1.5 rounded-xl block  px-6 ml-5 p-1 text-palletGreen-800">
            Coming soon!
          </span>
        </div>
        <div className="flex flex-col mt-12 ml-6  waitlist-width">
          <h1 className="text-3xl font-semibold text-palletPurple-800">
            Get early access
          </h1>
          <h4 className="text-palletGray-200 font-normal mt-6">
            Join the waitlist for early access and claim your 1 month premium
            for free!
          </h4>
          <span className="mt-6">Email</span>
          <input
            type="text"
            className="border-2 border-palletGray-100 p-1.5 px-3 rounded-lg mt-4"
            placeholder="example@email.com"
          />
          <button className="bg-palletPurple-500 text-white mt-12 p-2 rounded-lg">
            Join the waitlist
          </button>
        </div>
      </div>
      <div className="bg-palletGray-100 flex items-center">
        <div className="relative overflow-hidden">
          <img
            src="/images/waitlist.png"
            alt="background-image"
            className="ml-40"
          />
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
