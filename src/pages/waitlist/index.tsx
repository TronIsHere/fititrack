import { useToast } from "@/components/ui/toasts/use-toast";
import axios from "axios";
import { setCookie } from "cookies-next";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const WaitlistPage: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const submitHandler = async () => {
    if (email.match(/\S+@\S+\.\S+/) === null) {
      toast({
        variant: "warning",
        description: "Please write a correct email",
      });
      return;
    }
    setLoading(true);
    let sendEmail = await axios.post("/api/waitlist", { email });
    if (sendEmail.data.duplicated) {
      setLoading(false);
      toast({
        variant: "warning",
        description: "This email is registered.",
      });
      return;
    } else if (!sendEmail.data.success) {
      setLoading(false);
      toast({
        variant: "destructive",
        description: "Something went wrong... try again later.",
      });
      return;
    }
    setCookie("waitlist", true);
    // router.push("waitlist/joined");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen ">
      <div className="flex items-center justify-center flex-col ">
        <div className="flex flex-row items-start pt-10 md:pt-0">
          <Image
            src="/images/logo.svg"
            alt="fitittrack image logo "
            width={200}
            height={60}
          />
          <span className="bg-palletGreen-200 mt-1.5 rounded-xl block  px-6 ml-5 p-1 text-palletGreen-800">
            Coming soon!
          </span>
        </div>
        <div className="flex flex-col mt-12 p-10 ml-0 md:p-0 md:ml-6 waitlist-width">
          <h1 className="text-3xl font-semibold text-palletPurple-800">
            Get early access
          </h1>
          <h2 className="text-palletGray-200 font-normal mt-6">
            Join the waitlist for early access and claim your{" "}
            <span className="text-palletPurple-500">
              1 month premium for free!
            </span>
          </h2>
          <span className="text-palletPurple-500 font-bold mt-2">
            Waitlist closed! thanks for joining in
          </span>
          <span className="mt-6">Email</span>
          <input
            type="email"
            className="border-2 border-palletGray-100 p-1.5 px-3 rounded-lg mt-4"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled
          />
          <button
            className="bg-palletPurple-500 text-white mt-12 p-2 rounded-lg flex justify-center"
            onClick={submitHandler}
            disabled={true}
          >
            {loading ? <div className="loader"></div> : "Join the waitlist"}
          </button>
        </div>
      </div>
      <div className="bg-palletGray-100 flex items-center">
        <div className="relative overflow-hidden">
          <img
            src="/images/waitlist.png"
            alt="background-image for right side of the panel"
            className="ml-40"
          />
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
