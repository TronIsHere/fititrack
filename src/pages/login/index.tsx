import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/toasts/use-toast";
import {
  LoginValidator,
  TLoginValidator,
} from "@/lib/validators/AuthValidator";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const LoginPage: NextPage = () => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  useEffect(() => {}, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValidator>({
    resolver: zodResolver(LoginValidator),
  });
  const submitHandler = async ({ email, password }: TLoginValidator) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!result?.error) {
      toast({
        variant: "success",
        description: "logged in!",
        duration: 500,
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        description: result?.error,
      });
      setLoading(false);
    }
  };
  return (
    <>
      <div className={darkModeState ? "dark" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen  dark:text-white dark:bg-darkPrimary">
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
                  className=""
                />
              </Link>
              {/* <p className="pl-5">gaming your exercise!</p> */}
            </div>
            <div className="flex flex-col px-5 md:px-0 pb-10 md:pb-0">
              <form onSubmit={handleSubmit(submitHandler)}>
                <p className="mt-14 md:mt-20 text-sm">Email</p>
                <Input
                  {...register("email")}
                  type={"text"}
                  className=" mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />
                {errors.email && (
                  <p className="text-sm text-palletRed-500  mt-2">
                    {errors.email.message}
                  </p>
                )}
                <p className="mt-8 text-sm">Password</p>
                <Input
                  {...register("password")}
                  type={"password"}
                  className=" mt-2 rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full"
                />

                <a
                  href="#"
                  className="mt-1.5 text-sm block hover:text-palletPurple-400"
                >
                  forget your password?
                </a>
                {errors.password && (
                  <p className="text-sm text-palletRed-500 mt-2">
                    {errors.password.message}
                  </p>
                )}
                <LoadingButton loadingState={loading} label="login" />

                <p className="text-sm block mt-4">
                  Don&apos;t you have an account with us?{" "}
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
export default LoginPage;
