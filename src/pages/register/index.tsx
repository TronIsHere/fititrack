import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RegisterValidator,
  TRegisterValidator,
} from "@/lib/validators/AuthValidator";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
async function createUser(email: string, password: string, name: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response) {
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}
const RegisterPage: NextPage = () => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterValidator>({
    resolver: zodResolver(RegisterValidator),
  });
  const submitHandler = async ({
    email,
    password,
    name,
  }: TRegisterValidator) => {
    console.log(name, password, email);
    // e.preventDefault();
    // const response = await createUser(
    //   emailRef.current!.value,
    //   passwordRef.current!.value,
    //   nameRef.current!.value
    // );
    // router.push("/dashboard");
  };
  return (
    <>
      <div className={darkModeState ? "dark" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen dark:text-white dark:bg-darkPrimary">
          <div className="flex items-center justify-center flex-col ">
            <div className="flex flex-row items-center pt-10 md:pt-0">
              <Link href={"/"}>
                <Image
                  src={
                    darkModeState ? "/images/logoDark.svg" : "/images/logo.svg"
                  }
                  alt="fitittrack logo "
                  width={200}
                  height={60}
                />
              </Link>
              {/* <p className="pl-5">gaming your exercise!</p> */}
            </div>
            <div className="flex flex-col w-full md:w-1/2 px-5 md:px-0 pb-10 md:pb-0">
              <form onSubmit={handleSubmit(submitHandler)}>
                <p className="mt-14 md:mt-20 text-sm">Name and Last name</p>
                <Input
                  {...register("name")}
                  type={"text"}
                  className=" mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                {errors.name && (
                  <p className="text-sm text-palletRed-500 mt-2">
                    {errors.name.message}
                  </p>
                )}
                <p className="pt-8 text-sm">Email</p>
                <Input
                  {...register("email")}
                  type={"email"}
                  className="mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                {errors.email && (
                  <p className="text-sm text-palletRed-500 mt-2">
                    {errors.email.message}
                  </p>
                )}
                <p className="mt-8 text-sm">Password</p>
                <Input
                  {...register("password")}
                  type={"password"}
                  className=" mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                {errors.password && (
                  <p className="text-sm text-palletRed-500 mt-2">
                    {errors.password.message}
                  </p>
                )}
                <a
                  href="#"
                  className="mt-1 text-sm block hover:text-palletPurple-400"
                ></a>
                <Button
                  variant={"primary"}
                  className=" text-white mt-8 p-3 rounded-lg flex justify-center text-sm w-full"
                >
                  Register
                </Button>

                <p className="text-sm block mt-4">
                  Do you have an account?{" "}
                  <Link href="/login" className="text-palletPurple-400">
                    {" "}
                    login
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
export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
export default RegisterPage;
