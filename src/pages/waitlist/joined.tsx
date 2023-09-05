import Confetti from "@/components/confetti";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const JoinedPage: NextPage = () => {
  const [isVisible, setIsVisible] = useState(true);
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
            You are on the list at{" "}
            <span className="text-palletPurple-500">#2,136</span>
          </h1>
          <h4 className="text-palletGray-300 font-normal mt-6">
            Thank your for joining the waitlist .
          </h4>
          <h4 className="text-palletGray-300 font-normal mt-6">
            You’ll be the first to know when this tool is available 🥳
          </h4>
          <h4 className="text-palletGray-300 font-normal mt-6">
            Keep an eye on your inbox for updates
          </h4>
          {isVisible && <Confetti />}
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

export default JoinedPage;
