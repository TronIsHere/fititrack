"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/toasts/use-toast";
import { useAppSelector } from "@/hooks/storeHooks";
import { set } from "mongoose";
import { validateCheckoutSessionId } from "@/services/checkoutServices";
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
        userEmail
      );
      if (checkoutValidated) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setIsSuccess(false);
      }
      setIsLoading(false);
    };

    verifyCheckout();
  }, [sessionId, userEmail, router, toast]);

  return (
    <div className="flex items-center justify-center h-screen bg-darkPrimary text-white">
      <div className="  z-50 justify-center items-center">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="relative p-10 w-full max-w-md h-full md:h-auto">
            {isSuccess ? (
              <div className="relative  text-center bg-white rounded-lg shadow dark:bg-gray-800 p-10">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <FaCheck
                    className="text-green-500 dark:text-green-400"
                    size={20}
                  />
                  <span className="sr-only">Success</span>
                </div>
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Payment was successful
                </p>
                <Button type="button">Redirecting</Button>
              </div>
            ) : (
              <div className="relative  text-center bg-white rounded-lg shadow dark:bg-gray-800 p-10">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <IoCloseSharp
                    className="text-red-500 dark:text-red-400"
                    size={20}
                  />
                  <span className="sr-only">Failed</span>
                </div>
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Payment didn&apos;t go through!
                </p>
                <Button type="button" className="bg-darkSecondary">
                  Redirecting
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
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
