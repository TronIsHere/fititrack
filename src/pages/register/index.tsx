import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/toasts/use-toast";

import {
  RegisterValidator,
  TRegisterValidator,
} from "@/lib/validators/AuthValidator";
import { createUser } from "@/services/userServices";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const RegisterPage: NextPage = () => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();
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
    dob,
  }: TRegisterValidator) => {
    try {
      setLoading(true);

      const response = await createUser(email, password, name);

      if (response.error) {
        throw new Error("Something went wrong.");
      }

      if (response.status === 409) {
        toast({
          variant: "destructive",
          description:
            "Email already registered. Please log in or reset your password if needed.",
        });
      } else if (response.status === 201) {
        sessionStorage.setItem("emailForVerification", email);
        toast({
          variant: "success",
          description: "Register complete. Please Verify!",
          duration: 500,
        });
        router.push("/email-verify");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={darkModeState ? "dark" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen max-h-full dark:text-white dark:bg-darkPrimary">
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
                <p className="mt-14 md:mt-20 text-sm">Name and Last Name</p>
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
                  isPassword={true}
                  type={"password"}
                  className=" mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                {errors.password && (
                  <p className="text-sm text-palletRed-500 mt-2">
                    {errors.password.message}
                  </p>
                )}
                <p className="mt-8 text-sm">Confirm Password</p>
                <Input
                  isPassword={true}
                  {...register("confirmPassword")}
                  type={"password"}
                  className=" mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-palletRed-500 mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <p className="mt-8 text-sm">Date of Birth</p>

                <Input
                  {...register("dob")}
                  type="date"
                  className=" mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                {errors.dob && (
                  <p className="text-sm text-palletRed-500 mt-2">
                    {errors.dob.message}
                  </p>
                )}
                <a
                  href="#"
                  className="mt-1 text-sm block hover:text-palletPurple-400"
                ></a>
                <LoadingButton loadingState={loading} label="register" />

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
