import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Input } from "../ui/input";
import LoadingButton from "../ui/loading-button";
interface RegistrationFormProps {
  onSubmit: () => void;
  register: any; // use the correct type for register
  errors: any; // use the correct type for errors
  isLoading: boolean;
  darkModeState: boolean;
}
const RegistrationForm: FC<RegistrationFormProps> = ({
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
          />
        </Link>
        {/* <p className="pl-5">gaming your exercise!</p> */}
      </div>
      <div className="flex flex-col w-full md:w-1/2 px-5 md:px-0 pb-10 md:pb-0">
        <form onSubmit={onSubmit}>
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
          <LoadingButton loadingState={isLoading} label="register" />

          <p className="text-sm block mt-4">
            Do you have an account?{" "}
            <Link href="/login" className="text-palletPurple-400">
              {" "}
              login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
