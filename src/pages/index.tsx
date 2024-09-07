import PriceCards from "@/components/ui/priceCards";
import { toggleDarkMode } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsMoonStars } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
interface HomeProps {
  logged: boolean;
  session: any; // Assuming you have a Session type from 'next-auth'
}
export default function Home({ logged, session }: HomeProps) {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  const dispatch = useDispatch();
  const darkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className={darkModeState ? "dark" : ""}>
      <div className=" dark:bg-darkPrimary transition-all duration-500">
        <div className="max-w-screen-xl mx-auto pt-4">
          <header>
            <div className="flex justify-between px-3 md:px-0 ">
              <a href="#">
                <Image
                  src={
                    darkModeState ? "/images/logoDark.svg" : "/images/logo.svg"
                  }
                  alt="logo"
                  width={200}
                  height={100}
                  className="hidden md:block p-3"
                />
              </a>
              <Image
                src={
                  darkModeState ? "/images/logoDark.svg" : "/images/logo.svg"
                }
                alt="logo"
                width={150}
                height={100}
                className="block md:hidden"
              />
              <div className="flex items-center">
                <div
                  className="bg-darkPrimary p-2 mr-5 rounded-full cursor-pointer"
                  onClick={darkModeHandler}
                >
                  <BsMoonStars size={20} className="" color="white" />
                </div>
                {logged ? (
                  <Link
                    href={"/dashboard"}
                    className="bg-palletPurple-500 px-7 py-2 rounded-md text-white"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href={"/login"}
                    className="bg-palletPurple-500 px-7 py-2 rounded-md text-white"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-2 gap-20 mt-20">
              <div className="flex items-center flex-col justify-center dark:text-white">
                <h1 className="text-4xl font-bold">
                  Track your fitness journey and grow you character!
                </h1>
                <p className="text-palletPurple-600 dark:text-white mt-8 text-lg">
                  Gamify your fitness journey to make them fun and easy. Join
                  1,000+ users!{" "}
                </p>
                <Link
                  href={"/register"}
                  className="bg-palletPurple-500 text-white w-full mt-10 py-2 justify-center flex uppercase rounded-lg font-light"
                >
                  Get 7 days free trial!
                </Link>
              </div>
              <div className="">
                <Image
                  src="./images/headerImg.svg"
                  alt=""
                  width={600}
                  height={200}
                  priority
                />
              </div>
            </div>
          </header>
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 px-5 md:px-0 gap-20 mt-40">
              <div className="bg-palletPurple-500 p-5 rounded-lg">
                <img src="./images/chart.svg" alt="" />
              </div>
              <div className="flex flex-col justify-center dark:text-white">
                <h3 className="text-3xl font-bold">
                  Keep your fitness in Check
                </h3>
                <p className="mt-10">
                  we all know making fitness a habit is hard and requires great
                  consistency but this app is here to help you with that!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 px-5 md:px-0 gap-20 mt-20">
              <div className="flex flex-col justify-center dark:text-white">
                <h3 className="text-3xl font-bold ">
                  Easily keep track of your weight and workouts
                </h3>
                <p className="mt-10">
                  You can see how much your progressed in your weight and how
                  consisted you were with your workouts
                </p>
              </div>
              <div className="">
                <img src="./images/workoutBlock.svg" alt="" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 px-5 md:px-0 gap-20 mt-20">
              <div className="">
                <img src="./images/jeffs.svg" alt="" />
              </div>
              <div className="flex flex-col justify-center dark:text-white">
                <h3 className="text-3xl font-bold">You can grow Jeff!!</h3>
                <p className="mt-10">
                  Jeff is your fitness companion.. as you grow jeff grows as
                  well
                </p>
                <button className=" mt-5 md:mt-32 bg-palletGreen-200 py-3 rounded-md text-palletGreen-800">
                  Grow Jeff
                </button>
              </div>
            </div>
          </section>
          <section className="mt-40 px-5">
            <PriceCards paymentLink="" />
          </section>
          <section className="mt-40 px-5">
            <div className="bg-palletPurple-400 flex justify-center flex-col items-center px-5 md:px-0 py-8 rounded-md">
              <h3 className="text-xl md:text-3xl font-bold text-white dark:text-white">
                Want to track your fitness?
              </h3>
              <Link
                href={"/login"}
                className=" mt-10 bg-palletGreen-200 py-2 px-5 rounded-md text-palletGreen-600 "
              >
                Lets go 🔥
              </Link>
            </div>
          </section>
          <footer className="mt-40">
            <div className="border-y-2 border-palletPurple-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10 py-8 dark:text-white">
              <div className="flex flex-col items-center text-center">
                <span className="text-palletPurple-300 font-bold">Links</span>
                <Link href="/login" className="mt-5">
                  Login
                </Link>
                <Link href="/register" className="mt-5">
                  Signup
                </Link>
                <a href="mailto:contact@fitittrack.com" className="mt-5">
                  Support
                </a>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-palletPurple-300 font-bold">Boring</span>
                <Link href="/privacy-policy" className="mt-5">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="mt-2">
                  Terms of service
                </Link>
              </div>
              {/* <div className="flex flex-col items-center text-center">
                <span className="text-palletPurple-300 font-bold">Legal</span>
                <a href="#" className="mt-5">
                  IOS app
                </a>
                <a href="#" className="mt-2">
                  Android app
                </a>
                <a href="#" className="mt-2">
                  Web app
                </a>
              </div> */}
            </div>

            <div className="flex justify-center dark:text-white">
              <span className="py-5">
                Made by{" "}
                <a
                  href="https://whitediv.com"
                  className="text-palletPurple-500 pl-2"
                >
                  {" "}
                  WhiteDiv
                </a>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      props: { logged: false, session: null },
    };
  }

  return {
    props: { session, logged: true },
  };
};
