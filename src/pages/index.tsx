import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { BsMoonStars } from "react-icons/bs";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/waitlist");
  // });
  return (
    <div className="max-w-screen-xl mx-auto mt-4">
      <header>
        <div className="flex justify-between px-3 md:px-0">
          <Image
            src="./images/logo.svg"
            alt="logo"
            width={200}
            height={100}
            className="hidden md:block"
          />
          <Image
            src="./images/logo.svg"
            alt="logo"
            width={150}
            height={100}
            className="block md:hidden"
          />
          <div className="flex items-center">
            <div className="bg-darkPrimary p-2 mr-5 rounded-full cursor-pointer">
              <BsMoonStars size={20} className="" color="white" />
            </div>
            <button className="bg-palletPurple-500 px-7 py-2 rounded-md text-white">
              Login
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-2 gap-20 mt-20">
          <div className="flex items-center flex-col justify-center">
            <h1 className="text-4xl font-bold">
              Track your fitness journey and grow you character!
            </h1>
            <p className="text-palletPurple-600 mt-8 text-lg">
              Gamify your fitness journey to make them fun and easy. Join 1,000+
              users!{" "}
            </p>
            <button className="bg-palletPurple-500 text-white w-full mt-10 py-2 rounded-lg font-light">
              GAMIFY MY FITNESS
            </button>
          </div>
          <div className="">
            <img src="./images/headerImg.svg" alt="" />
          </div>
        </div>
      </header>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 px-5 md:px-0 gap-20 mt-40">
          <div className="bg-palletPurple-500 p-5 rounded-lg">
            <img src="./images/chart.svg" alt="" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold">Keep your fitness in Check</h3>
            <p className="mt-10">
              we all know making fitness a habit is hard and requires great
              consistency but this app is here to help you with that!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 px-5 md:px-0 gap-20 mt-20">
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold">
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
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold">You can grow Jeff!!</h3>
            <p className="mt-10">
              Jeff is your fitness companion.. as you grow jeff grows as well
            </p>
            <button className="mt-32 bg-palletGreen-200 py-2 rounded-md text-palletGreen-600">
              Grow Jeff
            </button>
          </div>
        </div>
      </section>
      <section className="mt-40 px-5">
        <div className="bg-palletPurple-400 flex justify-center flex-col items-center px-5 md:px-0 py-8 rounded-md">
          <h3 className="text-3xl font-bold text-white">
            Want to track your fitness?
          </h3>
          <button className=" mt-10 bg-palletGreen-200 py-2 px-5 rounded-md text-palletGreen-600 ">
            Lets go 🔥
          </button>
        </div>
      </section>
      <footer className="mt-40">
        <div className="border-y-2 border-palletPurple-500 grid grid-cols-2 md:grid-cols-4 px-10 py-8 gap-10 md:gap-0 justify-items-center">
          <div className="flex flex-col">
            <span className="text-palletPurple-300 font-bold">Products</span>
            <a href="#" className="mt-5">
              IOS app
            </a>
            <a href="#" className="mt-2">
              Android app
            </a>
            <a href="#" className="mt-2">
              Web app
            </a>
          </div>
          <div className="flex flex-col">
            <span className="text-palletPurple-300 font-bold">Social</span>
            <a href="#" className="mt-5">
              IOS app
            </a>
            <a href="#" className="mt-2">
              Android app
            </a>
            <a href="#" className="mt-2">
              Web app
            </a>
          </div>
          <div className="flex flex-col">
            <span className="text-palletPurple-300 font-bold">Resources</span>
            <a href="#" className="mt-5">
              IOS app
            </a>
            <a href="#" className="mt-2">
              Android app
            </a>
            <a href="#" className="mt-2">
              Web app
            </a>
          </div>
          <div className="flex flex-col">
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
          </div>
        </div>

        <div className="flex justify-center">
          <span className="py-5">
            Made by{" "}
            <a href="https://whitediv.com" className="text-palletPurple-500">
              {" "}
              WhiteDiv
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
