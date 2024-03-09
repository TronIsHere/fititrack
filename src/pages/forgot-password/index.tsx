import AuthLayout from "@/components/layouts/authLayout";
import { MyPage } from "@/components/types/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  ForgotPasswordValidator,
  TForgotPasswordValidator,
} from "@/lib/validators/AuthValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const ForgotPassword: MyPage = () => {
  const submitHandler = ({ email }: TForgotPasswordValidator) => {
    console.log(email);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordValidator>({
    resolver: zodResolver(ForgotPasswordValidator),
  });
  return (
    <>
      {" "}
      <div className="flex flex-row items-center pt-10 md:pt-0">
        <Link href={"#"}>
          <Image
            src={"/images/forgot-password.svg"}
            alt="fitittrack forgot password"
            width={200}
            height={60}
            className=""
          />
        </Link>
      </div>
      <div className="flex flex-col items-center px-5 md:px-0 pb-10 md:pb-0">
        <p className="w-3/6 inline-block mt-10">
          We will Send you a magic link that will reset your password when you
          click on it. please insert your previously registered email
        </p>
        <form
          action=""
          className="w-3/6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            {...register("email")}
            className="rounded-md p-1.5 pl-2 text-sm border-palletGray-100 w-full mt-10"
            placeholder="example@test.com"
          ></Input>
          {errors.email && (
            <p className="text-sm text-palletRed-500  mt-2">
              {errors.email.message}
            </p>
          )}
          <Button variant={"primary"} className="w-full mt-5">
            Reset Password
          </Button>
        </form>
      </div>
    </>
  );
};
ForgotPassword.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
export default ForgotPassword;
