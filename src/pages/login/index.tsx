import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
const LoginPage: NextPage = () => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  return (
    <>
      <div className={darkModeState ? "dark" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen  dark:text-white dark:bg-darkPrimary">
          <div className="flex items-center justify-center flex-col ">
            <div className="flex flex-row items-center pt-10 md:pt-0">
              <Link href={"/"}>
                <Image
                  src="./images/logo.svg"
                  alt="fitittrack logo "
                  width={200}
                  height={60}
                  className="p-3 dark:bg-white rounded-lg"
                />
              </Link>
              {/* <p className="pl-5">gaming your exercise!</p> */}
            </div>
            <div className="flex flex-col px-5 md:px-0 pb-10 md:pb-0">
              <form>
                <p className="mt-14 md:mt-20 text-sm">Email</p>
                <input
                  type={"email"}
                  className="border-2 mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                <p className="mt-8 text-sm">Password</p>
                <input
                  type={"password"}
                  className="border-2 mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                <a
                  href="#"
                  className="mt-1 text-sm block hover:text-palletPurple-400"
                >
                  forget your password?
                </a>
                <Button className="bg-palletPurple-500 text-white mt-8 p-3 rounded-lg flex justify-center text-sm w-full">
                  Login
                </Button>

                <p className="text-sm block mt-4">
                  Don't you have an account with us?{" "}
                  <Link href="/register" className="text-palletPurple-400">
                    {" "}
                    create an account
                  </Link>
                </p>
              </form>
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

export default LoginPage;
