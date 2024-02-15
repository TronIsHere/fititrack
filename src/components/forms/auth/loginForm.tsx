import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Input } from "../../ui/input";
import LoadingButton from "../../ui/loading-button";
interface LoginFormProps {
  onSubmit: () => void;
  register: any;
  errors: any;
  isLoading: boolean;
  darkModeState: boolean;
}
const LoginForm: FC<LoginFormProps> = ({
  onSubmit,
  register,
  errors,
  isLoading,
  darkModeState,
}) => {
  return (
    <>
      <div className="flex flex-row items-center pt-10 md:pt-0">
        <Link href={"/"}>
          <Image
            src={darkModeState ? "/images/logoDark.svg" : "/images/logo.svg"}
            alt="fitittrack logo "
            width={200}
            height={60}
            className=""
          />
        </Link>
        {/* <p className="pl-5">gaming your exercise!</p> */}
      </div>
      <div className="flex flex-col px-5 md:px-0 pb-10 md:pb-0">
        <form onSubmit={onSubmit}>
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
          <LoadingButton loadingState={isLoading} label="login" />

          <p className="text-sm block mt-4">
            Don&apos;t you have an account with us?{" "}
            <Link href="/register" className="text-palletPurple-400">
              {" "}
              create an account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
