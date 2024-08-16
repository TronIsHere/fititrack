"use client";

import { useToast } from "@/components/ui/toasts/use-toast";
import { useAppSelector } from "@/hooks/storeHooks";
import { validateCheckoutSessionId } from "@/services/checkoutServices";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BsExclamationDiamond } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import Confetti from "@/components/confetti";
import { Button } from "@/components/ui/button";
const CheckoutPage = ({ sessionId }: { sessionId: string }) => {
  const userEmail = useAppSelector((state) => state.user.email);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const verifyCheckout = async () => {
      setIsLoading(true);
      const checkoutValidated = await validateCheckoutSessionId(
        sessionId,
        userEmail!
      );
      if (checkoutValidated) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        setIsSuccess(false);
      }
      setIsLoading(false);
    };

    verifyCheckout();
  }, [sessionId, userEmail, router, toast]);

  return (
    <div className="bg-darkPrimary h-screen">
      <div className="flex p-5">
        <Image
          src={"/images/logoDark.svg"}
          width={200}
          height={100}
          alt="logo"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="big-donut"></div>
        </div>
      ) : isSuccess ? (
        <div>
          <Confetti />

          <div className="flex flex-col justify-center items-center text-white mt-20">
            <div className="bg-palletGreen-600 p-4 rounded-full">
              <FaCheck className="text-2xl text-white" />
            </div>
            <p className="text-2xl mt-10">Payment Successful</p>
            <p className=" text-sm mt-3">Your Gym Journey Has Begun 🥳</p>
            <div className="grid grid-cols-5 w-1/2  mt-10 gap-10">
              <div className="col-span-3 bg-palletPurple-400 rounded-lg  p-3">
                <div className="flex items-center border-b border-palletPurple-500 pb-3">
                  <Image
                    src={"/images/smallLogo.jpg"}
                    width={40}
                    height={40}
                    alt="logo"
                    className="rounded-full p-2 bg-white "
                  />
                  <p className=" ml-2 text-sm">Fitittrack Membership</p>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span>Mega Gym 🏋️‍♂️</span>
                  <span>10.99 USD</span>
                </div>
                <ul className="flex flex-col text-sm mt-4 ml-4">
                  <li className="list-disc">Access to everything forever</li>
                  <li className="list-disc pt-1">Vote on future features</li>
                </ul>
                <div className="flex items-center text-palletYellow-500 space-x-2 mt-4">
                  <BsExclamationDiamond />
                  <span>Access forever</span>
                </div>
              </div>
              <div className="col-span-2 rounded-lg overflow-hidden">
                <div className="w-full h-full ">
                  <Image
                    src={"/images/goodjob.jpg"}
                    alt="goodjob"
                    width={300}
                    height={200}
                    className="h-full object-cover"
                  ></Image>
                </div>
              </div>
            </div>
            <Button
              variant={"primary"}
              className="mt-10"
              onClick={() => router.push("/dashboard")}
            >
              Back to dashboard
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center text-white mt-20">
            <div className="bg-palletRed-500 p-4 rounded-full">
              <IoClose className="text-2xl text-white" />
            </div>
            <p className="text-2xl mt-10">Payment Failed</p>
            <p className=" text-sm mt-3">Oh no! you have to try again 🥲</p>

            <Button
              variant={"primary"}
              className="mt-10"
              onClick={() => router.push("/dashboard")}
            >
              Back to dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export async function getServerSideProps(context: any) {
  const { sessionId } = context.query;

  if (!sessionId) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { sessionId },
  };
}
export default CheckoutPage;
