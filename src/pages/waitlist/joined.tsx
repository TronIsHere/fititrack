import Confetti from "@/components/confetti";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";

const JoinedPage: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [waitlistAmount, setWaitlistAmount] = useState<number>(0);
  useEffect(() => {
    if (getCookie("waitlist") === undefined) {
      router.push("/waitlist");
    }
    const getWaitlistNumbers = async () => {
      let amount = await axios.get("/api/waitlist");
      console.log(amount, 1);
      if (amount.data.success) {
        setWaitlistAmount(amount.data.data);
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong... try again later.",
        });
        setTimeout(() => {
          router.push("/waitlist");
        }, 2000);
      }
    };
    getWaitlistNumbers();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen ">
      <div className="flex items-center justify-center flex-col ">
        <div className="flex flex-row items-start">
          <Image src="/images/logo.svg" alt="" width={200} height={60} />
          <span className="bg-palletGreen-200 mt-1.5 rounded-xl block  px-6 ml-5 p-1 text-palletGreen-800">
            Coming soon!
          </span>
        </div>
        <div className="flex flex-col mt-12 ml-6 p-5 md:p-0  waitlist-width">
          <h1 className="text-3xl font-semibold text-palletPurple-800">
            Your are one of the{" "}
            <span className="text-palletPurple-500">#{waitlistAmount}</span> who
            joined.
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
          <Confetti />
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
