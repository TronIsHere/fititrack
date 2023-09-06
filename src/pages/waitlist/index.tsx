import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";

const WaitlistPage: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const submitHandler = async () => {
    if (email.match(/\S+@\S+\.\S+/) === null) {
      toast({
        variant: "warning",
        description: "Please write a correct email",
      });
      return;
    }
    let sendEmail = await axios.post("/api/waitlist", { email });
    if (sendEmail.data.duplicated) {
      toast({
        variant: "warning",
        description: "This email is registered.",
      });
      return;
    } else if (!sendEmail.data.success) {
      toast({
        variant: "destructive",
        description: "Something went wrong... try again later.",
      });
      return;
    }
    setCookie("waitlist", true);
    router.push("waitlist/joined");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen ">
      <div className="flex items-center justify-center flex-col ">
        <div className="flex flex-row items-start">
          <Image src="/images/logo.svg" alt="" width={200} height={60} />
          <span className="bg-palletGreen-200 mt-1.5 rounded-xl block  px-6 ml-5 p-1 text-palletGreen-800">
            Coming soon!
          </span>
        </div>
        <div className="flex flex-col mt-12 p-10 ml-0 md:p-0 md:ml-6 waitlist-width">
          <h1 className="text-3xl font-semibold text-palletPurple-800">
            Get early access
          </h1>
          <h4 className="text-palletGray-200 font-normal mt-6">
            Join the waitlist for early access and claim your 1 month premium
            for free!
          </h4>
          <span className="mt-6">Email</span>
          <input
            type="email"
            className="border-2 border-palletGray-100 p-1.5 px-3 rounded-lg mt-4"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="bg-palletPurple-500 text-white mt-12 p-2 rounded-lg"
            onClick={submitHandler}
          >
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
