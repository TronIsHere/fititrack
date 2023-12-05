import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NextPage } from "next";
import Image from "next/image";
import { useForm } from "react-hook-form";
const LoginPage: NextPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen ">
        <div className="flex items-center justify-center flex-col ">
          <div className="flex flex-row items-center pt-10 md:pt-0">
            <Image
              src="./images/logo.svg"
              alt="fitittrack logo "
              width={200}
              height={60}
            />
            {/* <p className="pl-5">gaming your exercise!</p> */}
          </div>
          <div className="flex flex-col">
            <form>
              <p className="mt-20 text-sm">Email</p>
              <input
                type={"text"}
                className="border-2 mt-2 rounded-lg p-1.5 pl-2 text-sm border-palletGray-100 w-[300px]"
              />
              <p className="mt-8 text-sm">Password</p>
              <input
                type={"text"}
                className="border-2 mt-2 rounded-lg p-1.5 pl-2 text-sm border-palletGray-100 w-[300px]"
              />
              <a
                href="#"
                className="mt-1 text-sm block hover:text-palletPurple-400"
              >
                forget your password?
              </a>
              <button className="bg-palletPurple-500 text-white mt-8 p-3 rounded-lg flex justify-center text-sm w-full">
                Login
              </button>

              <p className="text-sm block mt-4">
                Don't you have an account with us?{" "}
                <a href="#" className="text-palletPurple-400">
                  {" "}
                  create an account
                </a>
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
    </>
  );
};

export default LoginPage;
