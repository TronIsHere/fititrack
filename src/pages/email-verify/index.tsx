import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toasts/use-toast";
import { useAppSelector } from "@/hooks/storeHooks";
import { ResendTokenOnServer } from "@/services/tokenServices";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EmailVerify: NextPage = () => {
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const email = sessionStorage.getItem("emailForVerification");
  const [isCooldown, setIsCooldown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const resendHandler = async () => {
    if (!isCooldown && email) {
      setIsCooldown(true);
      setCountdown(60); // 60 seconds cooldown
      await ResendTokenOnServer(email);
    } else if (!email) {
      toast({
        variant: "destructive",
        description: "oops. you are not supposed to be here",
      });
      router.push("/register");
    }
  };

  useEffect(() => {
    let interval: any;
    if (isCooldown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown <= 0) {
      setIsCooldown(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCooldown, countdown]);
  return (
    <>
      {" "}
      <div className={darkModeState ? "dark" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen  dark:text-white dark:bg-darkPrimary">
          <div className="flex items-center justify-center flex-col ">
            <div className="flex flex-col px-5 md:px-0 pb-10 md:pb-0 justify-center items-center ">
              <Image
                src={"/images/confirmed-email.svg"}
                alt="confirmed email"
                width={200}
                height={60}
                className="-mt-10"
              />
              <h1 className="pt-20 text-lg text-center font-semibold">
                Verify your email
              </h1>
              <p className="pt-2 w-[400px] text-muted-foreground">
                An email sent to <span className="font-semibold">{email}</span>,
                with a link to verify your account. please verify your account
              </p>
              <div className="flex mt-10">
                <Button
                  variant={"primary"}
                  className={"px-8 py-6"}
                  onClick={resendHandler}
                >
                  {isCooldown ? `Resend in ${countdown}s` : "Resend Email"}
                </Button>
              </div>
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
      </div>
    </>
  );
};
// export async function getServerSideProps(context: any) {
//   const session = await getSession({ req: context.req });

//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
export default EmailVerify;
